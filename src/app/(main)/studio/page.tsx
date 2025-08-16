'use client';
import { useState } from 'react';
import { renderImageViaKie, renderVideoViaKie, pollKieStatus } from '@/lib/providers/kieai';

export default function StudioPage() {
  const [orgId] = useState<string>('demo-org-123');
  const [avatarId] = useState<string>('demo-avatar-456');
  const [prompt, setPrompt] = useState('');

  async function makeImage() {
    try {
      const res = await renderImageViaKie({ org_id: orgId, avatar_id: avatarId, prompt });
      console.log('Image generation response:', res);
      
      if (res.status === 'queued') {
        // Poll status every 5 seconds until succeeded
        const pollInterval = setInterval(async () => {
          try {
            const s = await pollKieStatus({ 
              job_id: res.job_id, 
              provider_job_id: res.provider_job_id, 
              org_id: orgId, 
              avatar_id: avatarId, 
              kind: 'image' 
            });
            console.log('Polling status:', s);
            
            if (s.status === 'succeeded' || s.status === 'failed') {
              clearInterval(pollInterval);
              if (s.status === 'succeeded') {
                alert('Image generated successfully! Check Jobs list.');
              } else {
                alert('Image generation failed. Check console for details.');
              }
            }
          } catch (error) {
            console.error('Error polling status:', error);
            clearInterval(pollInterval);
          }
        }, 5000);
      } else if (res.status === 'succeeded') {
        alert('Image generated successfully! Check Jobs list.');
      } else {
        alert('Image generation failed. Check console for details.');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error generating image. Check console for details.');
    }
  }

  async function makeVideo() {
    try {
      const res = await renderVideoViaKie({ org_id: orgId, avatar_id: avatarId, prompt, seconds: 6 });
      console.log('Video generation response:', res);
      
      if (res.status === 'queued') {
        // Poll status every 5 seconds until succeeded
        const pollInterval = setInterval(async () => {
          try {
            const s = await pollKieStatus({ 
              job_id: res.job_id, 
              provider_job_id: res.provider_job_id, 
              org_id: orgId, 
              avatar_id: avatarId, 
              kind: 'video' 
            });
            console.log('Polling status:', s);
            
            if (s.status === 'succeeded' || s.status === 'failed') {
              clearInterval(pollInterval);
              if (s.status === 'succeeded') {
                alert('Video generated successfully! Check Jobs list.');
              } else {
                alert('Video generation failed. Check console for details.');
              }
            }
          } catch (error) {
            console.error('Error polling status:', error);
            clearInterval(pollInterval);
          }
        }, 5000);
      } else if (res.status === 'succeeded') {
        alert('Video generated successfully! Check Jobs list.');
      } else {
        alert('Video generation failed. Check console for details.');
      }
    } catch (error) {
      console.error('Error generating video:', error);
      alert('Error generating video. Check console for details.');
    }
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Studio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <h2 className="font-bold mb-2">Images</h2>
          <textarea 
            className="w-full border p-2 rounded" 
            rows={4} 
            placeholder="Prompt" 
            value={prompt} 
            onChange={e => setPrompt(e.target.value)} 
          />
          <button 
            className="mt-2 px-4 py-2 rounded bg-black text-white" 
            onClick={makeImage}
          >
            Generate Image
          </button>
        </section>
        <section>
          <h2 className="font-bold mb-2">Videos</h2>
          <textarea 
            className="w-full border p-2 rounded" 
            rows={4} 
            placeholder="Prompt" 
            value={prompt} 
            onChange={e => setPrompt(e.target.value)} 
          />
          <button 
            className="mt-2 px-4 py-2 rounded bg-black text-white" 
            onClick={makeVideo}
          >
            Generate Video
          </button>
        </section>
      </div>
    </main>
  );
}