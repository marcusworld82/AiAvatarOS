import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Palette, Video, Image } from 'lucide-react'

const DynamicPageWrapper = dynamic(() => import('@/components/layout/page-wrapper').then((mod) => ({ default: mod.PageWrapper })), { ssr: false })
const DynamicJobRow = dynamic(() => import('@/components/ui/job-row').then((mod) => ({ default: mod.JobRow })), { ssr: false })

export default function StudioPage() {
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
                    placeholder="Describe the image you want to generate..."
                    className="mt-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="seed">Seed</Label>
                    <Input id="seed" type="number" placeholder="Random" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="guidance">Guidance Scale</Label>
                    <Input id="guidance" type="number" placeholder="7.5" className="mt-2" />
                  </div>
                </div>
                <Button>Generate Image</Button>
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
                    placeholder="Describe the video motion..."
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="input-image">Input Image</Label>
                  <Input id="input-image" type="file" accept="image/*" className="mt-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration (seconds)</Label>
                    <Input id="duration" type="number" placeholder="5" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="motion">Motion Strength</Label>
                    <Input id="motion" type="number" placeholder="0.8" className="mt-2" />
                  </div>
                </div>
                <Button>Generate Video</Button>
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
}