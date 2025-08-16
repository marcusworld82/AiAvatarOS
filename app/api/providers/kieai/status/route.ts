import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export async function POST(req: NextRequest) {
  const { job_id, provider_job_id, org_id, avatar_id, kind } = await req.json();

  const r = await fetch(`${process.env.KIE_API_BASE}/${kind}/status`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.KIE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ job_id: provider_job_id }),
  });
  const out = await r.json().catch(() => ({}));

  if (out?.status === 'succeeded' && (out.image_url || out.video_url)) {
    await supabase.from('jobs')
      .update({ status: 'succeeded', output_json: out, finished_at: new Date().toISOString() })
      .eq('id', job_id);
    await supabase.from('assets').insert({
      org_id, avatar_id, job_id,
      type: kind === 'image' ? 'image' : 'video',
      source_url: out.image_url || out.video_url,
      meta: out
    });
  } else if (out?.status === 'failed') {
    await supabase.from('jobs')
      .update({ status: 'failed', output_json: out, error_text: out?.error || null, finished_at: new Date().toISOString() })
      .eq('id', job_id);
  }

  return NextResponse.json(out);
}