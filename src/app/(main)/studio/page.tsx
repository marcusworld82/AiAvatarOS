'use client';
import { useState } from 'react';
import { renderImageViaKie, renderVideoViaKie, pollKieStatus } from '@/lib/providers/kieai';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const DynamicPageWrapper = dynamic(() => import('@/components/layout/page-wrapper').then((mod) => ({ default: mod.PageWrapper })), { ssr: false });

export default function StudioPage() {
  const [orgId] = useState<string>('demo-org-123'); // Replace with actual ID
  const [avatarId] = useState<string>('demo-avatar-456'); // Replace with actual ID

  const [imagePrompt, setImagePrompt] = useState('');
  const [videoPrompt, setVideoPrompt] = useState('');

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  async function makeImage() {
    if (!imagePrompt) {
      alert('Please enter a prompt for image generation.');
      return;
    }
    setIsGeneratingImage(true);
    try {
      const res = await renderImageViaKie({ org_id: orgId, avatar_id: avatarId, prompt: imagePrompt });
      console.log('Image generation response:', res);

      if (res.status === 'queued') {
        alert('Image generation queued. Polling status...');
        const pollInterval = setInterval(async () => {
          try {
            const s = await pollKieStatus({
              job_id: res.job_id,
              provider_job_id: res.provider_job_id,
              org_id: orgId,
              avatar_id: avatarId,
              kind: 'image'
            });
            console.log('Polling image status:', s);

            if (s.status === 'succeeded' || s.status === 'failed') {
              clearInterval(pollInterval);
              if (s.status === 'succeeded') {
                alert('Image generated successfully! Check Jobs list.');
              } else {
                alert('Image generation failed. Check console for details.');
              }
            }
          } catch (error) {
            console.error('Error polling image status:', error);
            clearInterval(pollInterval);
            alert('Error polling image status. Check console for details.');
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
    } finally {
      setIsGeneratingImage(false);
    }
  }

  async function makeVideo() {
    if (!videoPrompt) {
      alert('Please enter a prompt for video generation.');
      return;
    }
    setIsGeneratingVideo(true);
    try {
      const res = await renderVideoViaKie({ org_id: orgId, avatar_id: avatarId, prompt: videoPrompt, seconds: 6 });
      console.log('Video generation response:', res);

      if (res.status === 'queued') {
        alert('Video generation queued. Polling status...');
        const pollInterval = setInterval(async () => {
          try {
            const s = await pollKieStatus({
              job_id: res.job_id,
              provider_job_id: res.provider_job_id,
              org_id: orgId,
              avatar_id: avatarId,
              kind: 'video'
            });
            console.log('Polling video status:', s);

            if (s.status === 'succeeded' || s.status === 'failed') {
              clearInterval(pollInterval);
              if (s.status === 'succeeded') {
                alert('Video generated successfully! Check Jobs list.');
              } else {
                alert('Video generation failed. Check console for details.');
              }
            }
          } catch (error) {
            console.error('Error polling video status:', error);
            clearInterval(pollInterval);
            alert('Error polling video status. Check console for details.');
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
    } finally {
      setIsGeneratingVideo(false);
    }
  }

  return (
    <DynamicPageWrapper>
      <div className="space-y-8">
        <div>
          <h1 className="text-[28px] font-bold leading-[1.3] mb-2">Studio</h1>
          <p className="text-[#6B7280] text-[15px] leading-[1.6]">
            Generate and manage your AI-powered content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Input/Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <Tabs defaultValue="image-generation">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image-generation">Image Generation</TabsTrigger>
                  <TabsTrigger value="video-generation">Video Generation</TabsTrigger>
                </TabsList>

                <TabsContent value="image-generation" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="image-prompt">Prompt (Required)</Label>
                      <Textarea
                        id="image-prompt"
                        className="mt-2 min-h-[120px]"
                        placeholder="Describe your creative ideas for the image..."
                        value={imagePrompt}
                        onChange={e => setImagePrompt(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Seaside Illustration</Badge>
                      <Badge variant="outline">Cat-Eared Boy</Badge>
                    </div>
                    {/* Placeholder for other image generation options */}
                    <div className="space-y-2">
                      <Label>Image Options</Label>
                      <Input placeholder="Width (e.g., 1024)" type="number" />
                      <Input placeholder="Height (e.g., 1024)" type="number" />
                    </div>
                    <Button
                      onClick={makeImage}
                      disabled={isGeneratingImage}
                      className="w-full"
                    >
                      {isGeneratingImage ? 'Generating Image...' : 'Generate Image'}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="video-generation" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="video-prompt">Prompt (Required)</Label>
                      <Textarea
                        id="video-prompt"
                        className="mt-2 min-h-[120px]"
                        placeholder="Describe the motion or scene for the video..."
                        value={videoPrompt}
                        onChange={e => setVideoPrompt(e.target.value)}
                      />
                    </div>
                    {/* Placeholder for other video generation options */}
                    <div className="space-y-2">
                      <Label>Video Options</Label>
                      <Input placeholder="Duration (seconds, e.g., 6)" type="number" />
                      <Input placeholder="Input Image URL (optional)" />
                    </div>
                    <Button
                      onClick={makeVideo}
                      disabled={isGeneratingVideo}
                      className="w-full"
                    >
                      {isGeneratingVideo ? 'Generating Video...' : 'Generate Video'}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Middle Panel: Main Preview */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 h-full flex flex-col">
              <Tabs defaultValue="images-preview" className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="images-preview">Images</TabsTrigger>
                  <TabsTrigger value="videos-preview">Videos</TabsTrigger>
                </TabsList>

                <TabsContent value="images-preview" className="mt-6 flex-1 flex items-center justify-center">
                  <div className="text-center text-[#6B7280]">
                    <p>Generated images will appear here.</p>
                    <p className="text-sm mt-2">Start by generating an image from the left panel.</p>
                  </div>
                </TabsContent>

                <TabsContent value="videos-preview" className="mt-6 flex-1 flex items-center justify-center">
                  <div className="text-center text-[#6B7280]">
                    <p>Generated videos will appear here.</p>
                    <p className="text-sm mt-2">Start by generating a video from the left panel.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Panel: Asset Gallery */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 h-full">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Asset Gallery</h2>
              <div className="text-center text-[#6B7280]">
                <p>Your generated assets will be listed here.</p>
                <p className="text-sm mt-2">This section is under development.</p>
              </div>
              {/* Placeholder for asset thumbnails */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">Asset 1</div>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">Asset 2</div>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">Asset 3</div>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground">Asset 4</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DynamicPageWrapper>
  );
}