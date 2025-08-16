export async function renderImageViaKie(params: {
  org_id: string; avatar_id: string; prompt: string; width?: number; height?: number;
}) {
  try {
    const r = await fetch('/api/providers/kieai/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    
    if (!r.ok) {
      const errorText = await r.text();
      throw new Error(`HTTP ${r.status}: ${errorText}`);
    }
    
    return await r.json();
  } catch (error) {
    console.error('Error in renderImageViaKie:', error);
    throw error;
  }
}

export async function renderVideoViaKie(params: {
  org_id: string; avatar_id: string; prompt: string; input_image?: string; seconds?: number;
}) {
  try {
    const r = await fetch('/api/providers/kieai/video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    
    if (!r.ok) {
      const errorText = await r.text();
      throw new Error(`HTTP ${r.status}: ${errorText}`);
    }
    
    return await r.json();
  } catch (error) {
    console.error('Error in renderVideoViaKie:', error);
    throw error;
  }
}

export async function pollKieStatus(payload: {
  job_id: string; provider_job_id: string; org_id: string; avatar_id: string; kind: 'image'|'video';
}) {
  try {
    const r = await fetch('/api/providers/kieai/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!r.ok) {
      const errorText = await r.text();
      throw new Error(`HTTP ${r.status}: ${errorText}`);
    }
    
    return await r.json();
  } catch (error) {
    console.error('Error in pollKieStatus:', error);
    throw error;
  }
}