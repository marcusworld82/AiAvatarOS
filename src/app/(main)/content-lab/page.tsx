import dynamic from 'next/dynamic'
import { PromptEditor } from '@/components/ui/prompt-editor'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const DynamicPageWrapper = dynamic(() => import('@/components/layout/page-wrapper').then((mod) => ({ default: mod.PageWrapper })), { ssr: false })

export default function ContentLabPage() {
  const ideas = [
    { id: 1, title: 'Morning motivation series', status: 'draft' },
    { id: 2, title: 'Tech tips for beginners', status: 'in-progress' },
    { id: 3, title: 'Behind the scenes content', status: 'completed' },
  ]

  return (
    <DynamicPageWrapper>
      <div className="space-y-8">
        <div>
          <h1 className="text-[28px] font-bold leading-[1.3] mb-2">Content Lab</h1>
          <p className="text-[#6B7280] text-[15px] leading-[1.6]">
            Experiment with ideas, scripts, and prompts
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Ideas List */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[22px] font-bold leading-[1.3]">Ideas</h2>
                <Button size="sm">New Idea</Button>
              </div>
              <div className="space-y-3">
                {ideas.map((idea) => (
                  <div
                    key={idea.id}
                    className="p-3 hover:bg-[#F9FAFB] dark:hover:bg-[#0B0B0B] rounded-lg cursor-pointer"
                  >
                    <h3 className="font-medium text-sm mb-1">{idea.title}</h3>
                    <span className="text-xs text-[#6B7280] capitalize">{idea.status}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Script Editor */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Script Editor</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="script-title">Title</Label>
                  <Input
                    id="script-title"
                    placeholder="Enter script title..."
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="script-content">Content</Label>
                  <Textarea
                    id="script-content"
                    placeholder="Write your script..."
                    className="mt-2 min-h-[200px]"
                  />
                </div>
                <Button>Save Script</Button>
              </div>
            </Card>

            {/* Caption Variants */}
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Caption Variants</h2>
              <div className="space-y-4">
                <div className="p-3 bg-[#F9FAFB] dark:bg-[#1F2937] rounded-lg">
                  <p className="text-sm mb-2">Variant A (Casual)</p>
                  <p className="text-sm text-[#6B7280]">Hey everyone! Just wanted to share this amazing tip...</p>
                </div>
                <div className="p-3 bg-[#F9FAFB] dark:bg-[#1F2937] rounded-lg">
                  <p className="text-sm mb-2">Variant B (Professional)</p>
                  <p className="text-sm text-[#6B7280]">Today I'm excited to share an insight that could transform...</p>
                </div>
                <Button variant="outline">Generate More Variants</Button>
              </div>
            </Card>

            {/* Prompt Editor */}
            <PromptEditor
              template="Create a {style} image of {subject} in {setting}"
              variablesSchema={{ style: 'photorealistic', subject: 'person', setting: 'office' }}
              preview="Create a photorealistic image of person in office"
            />
          </div>
        </div>
      </div>
    </DynamicPageWrapper>
  )
}