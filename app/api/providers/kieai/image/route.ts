import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

type Body = {
  org_id: string;
  avatar_id: string;
  prompt: string;
  width?: number;
  height?: number;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Body;

  const { data: job, error: jobErr } = await supabase
    .from('jobs')
    .insert({
      org_id: body.org_id,
      avatar_id: body.avatar_id,
      provider: 'kieai',
      model: 'image',
      kind: 'image',
      input_json: body,
      status: 'running',
      started_at: new Date().toISOString()
    })
    .select('*')
    .single();
  if (jobErr || !job) return NextResponse.json({ error: jobErr?.message }, { status: 500 });

  const r = await fetch(`${process.env.KIE_API_BASE}/image/generate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.KIE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: body.prompt,
      width: body.width ?? 1024,
      height: body.height ?? 1024,
    }),
  });
  const out = await r.json().catch(() => ({}));

  if (out?.image_url) {
    await supabase.from('jobs')
      .update({ status: 'succeeded', output_json: out, finished_at: new Date().toISOString() })
      .eq('id', job.id);
    await supabase.from('assets').insert({
      org_id: body.org_id,
      avatar_id: body.avatar_id,
      job_id: job.id,
      type: 'image',
      source_url: out.image_url,
      meta: out
    });
    return NextResponse.json({ job_id: job.id, status: 'succeeded', image_url: out.image_url });
  }

  await supabase.from('jobs').update({ status: 'queued', output_json: out }).eq('id', job.id);
  return NextResponse.json({ job_id: job.id, provider_job_id: out?.job_id || out?.id, status: 'queued' });
}