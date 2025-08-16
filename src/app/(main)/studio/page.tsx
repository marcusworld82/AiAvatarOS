import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Palette, Video, Image } from 'lucide-react'
import { renderImageViaKie, renderVideoViaKie } from '@/lib/providers/kieai'

const DynamicPageWrapper = dynamic(() => import('@/components/layout/page-wrapper').then((mod) => ({ default: mod.PageWrapper })), { ssr: false })
const DynamicJobRow = dynamic(() => import('@/components/ui/job-row').then((mod) => ({ default: mod.JobRow })), { ssr: false })

export default function StudioPage() {
  // Image generation state
  const [imagePrompt, setImagePrompt] = useState('')
  const [imageSeed, setImageSeed] = useState('')
  const [imageGuidance, setImageGuidance] = useState('7.5')
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)

  // Video generation state
  const [videoPrompt, setVideoPrompt] = useState('')
  const [videoDuration, setVideoDuration] = useState('5')
  const [videoMotion, setVideoMotion] = useState('0.8')
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false)

  // Handle image generation
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) {
      alert('Please enter a prompt for image generation')
      return
    }

    setIsGeneratingImage(true)
    try {
      const response = await renderImageViaKie({
        org_id: 'demo-org',
        avatar_id: 'demo-avatar',
        prompt: imagePrompt,
        width: 1024,
        height: 1024
      })
      
      console.log('Image generation response:', response)
      
      if (response.status === 'succeeded' && response.image_url) {
        alert('Image generated successfully! Check the console for details.')
      } else if (response.status === 'queued') {
        alert('Image generation started! Job ID: ' + response.job_id)
      } else {
        alert('Image generation failed. Check console for details.')
      }
    } catch (error) {
      console.error('Image generation error:', error)
      alert('Error generating image. Check console for details.')
    } finally {
      setIsGeneratingImage(false)
    }
  }

  // Handle video generation
  const handleGenerateVideo = async () => {
    if (!videoPrompt.trim()) {
      alert('Please enter a prompt for video generation')
      return
    }

    setIsGeneratingVideo(true)
    try {
      const response = await renderVideoViaKie({
        org_id: 'demo-org',
        avatar_id: 'demo-avatar',
        prompt: videoPrompt,
        seconds: parseInt(videoDuration) || 5
      })
      
      console.log('Video generation response:', response)
      
      if (response.status === 'succeeded' && response.video_url) {
        alert('Video generated successfully! Check the console for details.')
      } else if (response.status === 'queued') {
        alert('Video generation started! Job ID: ' + response.job_id)
      } else {
        alert('Video generation failed. Check console for details.')
      }
    } catch (error) {
      console.error('Video generation error:', error)
      alert('Error generating video. Check console for details.')
    } finally {
      setIsGeneratingVideo(false)
    }
  }

  const recentJobs = [
    {
      provider: 'DALL-E',
      model: '3',
      kind: 'Image Generation',
      status: 'completed' as const,
      cost: 0.04,
    },
    {
      provider: 'RunwayML',
      model: 'Gen-3',
      kind: 'Video Generation',
      status: 'failed' as const,
      cost: 0.00,
    },
  ]

  return (
    <DynamicPageWrapper>
      <div className="space-y-8">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Palette className="w-8 h-8 text-[#6B7280]" />
            <h1 className="text-[28px] font-bold leading-[1.3]">Studio</h1>
          </div>
          <p className="text-[#6B7280] text-[15px] leading-[1.6]">
            Create stunning visuals with AI-powered image and video generation
          </p>
        </div>

        <Tabs defaultValue="images" className="space-y-6">
          <TabsList>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="images">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Image className="w-6 h-6 text-[#6B7280]" />
                <h2 className="text-[22px] font-bold leading-[1.3]">Generate Image</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Prompt</Label>
                  <Textarea
                    id="prompt"
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Describe the image you want to generate... (e.g., A serene mountain landscape at sunset)"
                    className="mt-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="seed">Seed</Label>
                    <Input 
                      id="seed" 
                      type="number" 
                      value={imageSeed}
                      onChange={(e) => setImageSeed(e.target.value)}
                      placeholder="Random" 
                      className="mt-2" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="guidance">Guidance Scale</Label>
                    <Input 
                      id="guidance" 
                      type="number" 
                      value={imageGuidance}
                      onChange={(e) => setImageGuidance(e.target.value)}
                      placeholder="7.5" 
                      className="mt-2" 
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                >
                  {isGeneratingImage ? 'Generating...' : 'Generate Image'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Video className="w-6 h-6 text-[#6B7280]" />
                <h2 className="text-[22px] font-bold leading-[1.3]">Generate Video</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="video-prompt">Prompt</Label>
                  <Textarea
                    id="video-prompt"
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    placeholder="Describe the video motion... (e.g., A gentle ocean wave rolling onto the shore)"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="input-image">Input Image</Label>
                  <Input 
                    id="input-image" 
                    type="file" 
                    accept="image/*" 
                    className="mt-2"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground mt-1">File upload coming soon - using prompt-based generation for now</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration (seconds)</Label>
                    <Input 
                      id="duration" 
                      type="number" 
                      value={videoDuration}
                      onChange={(e) => setVideoDuration(e.target.value)}
                      placeholder="5" 
                      className="mt-2" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="motion">Motion Strength</Label>
                    <Input 
                      id="motion" 
                      type="number" 
                      value={videoMotion}
                      onChange={(e) => setVideoMotion(e.target.value)}
                      placeholder="0.8" 
                      className="mt-2"
                      disabled
                    />
                    <p className="text-xs text-muted-foreground mt-1">Motion strength parameter coming soon</p>
                  </div>
                </div>
                <Button 
                  onClick={handleGenerateVideo}
                  disabled={isGeneratingVideo}
                >
                  {isGeneratingVideo ? 'Generating...' : 'Generate Video'}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Jobs */}
        <Card className="p-6">
          <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Recent Jobs</h2>
          <div className="space-y-3">
            {recentJobs.map((job, index) => (
              <DynamicJobRow key={index} {...job} />
            ))}
          </div>
        </Card>
      </div>
    </DynamicPageWrapper>
  )
'use client'
}