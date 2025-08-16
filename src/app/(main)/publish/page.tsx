import dynamic from 'next/dynamic'
import { PublishForm } from '@/components/ui/publish-form'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Send, Globe, Target } from 'lucide-react'

const DynamicPageWrapper = dynamic(() => import('@/components/layout/page-wrapper').then((mod) => ({ default: mod.PageWrapper })), { ssr: false })

export default function PublishPage() {
  const platforms = [
    { name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { name: 'Threads', color: 'bg-black' },
    { name: 'TikTok', color: 'bg-black' },
    { name: 'YouTube', color: 'bg-red-600' },
    { name: 'X (Twitter)', color: 'bg-blue-500' },
    { name: 'LinkedIn', color: 'bg-blue-700' },
    { name: 'Pinterest', color: 'bg-red-500' },
  ]

  return (
    <DynamicPageWrapper>
      <div className="space-y-8">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Send className="w-8 h-8 text-[#6B7280]" />
            <h1 className="text-[28px] font-bold leading-[1.3]">Publish</h1>
          </div>
          <p className="text-[#6B7280] text-[15px] leading-[1.6]">
            Craft compelling content and distribute across all your social channels
          </p>
        </div>

        {/* Platform Selector */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Globe className="w-6 h-6 text-[#6B7280]" />
            <h2 className="text-[22px] font-bold leading-[1.3]">Select Publishing Platforms</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {platforms.map((platform) => (
              <Badge
                key={platform.name}
                variant="outline"
                className="cursor-pointer hover:bg-muted"
              >
                <div className={`w-3 h-3 rounded-full mr-2 ${platform.color}`}></div>
                {platform.name}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Publish Form */}
        <PublishForm
          caption=""
          firstComment=""
          hashtags={[]}
          link=""
          UTMs={{}}
        />
      </div>
    </DynamicPageWrapper>
  )
}