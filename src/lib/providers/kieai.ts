export async function renderImageViaKie(params: {
  org_id: string; avatar_id: string; prompt: string; width?: number; height?: number;
}) {
  const r = await fetch('/api/providers/kieai/image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  return r.json();
}

export async function renderVideoViaKie(params: {
  org_id: string; avatar_id: string; prompt: string; input_image?: string; seconds?: number;
}) {
  const r = await fetch('/api/providers/kieai/video', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  return r.json();
}

export async function pollKieStatus(payload: {
  job_id: string; provider_job_id: string; org_id: string; avatar_id: string; kind: 'image'|'video';
}) {
  const r = await fetch('/api/providers/kieai/status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return r.json();
}