import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Users, Reply } from 'lucide-react'

const DynamicPageWrapper = dynamic(() => import('@/components/layout/page-wrapper').then((mod) => ({ default: mod.PageWrapper })), { ssr: false })

export default function InboxPage() {
  const threads = [
    {
      id: 1,
      platform: 'Instagram',
      user: 'sarah_fitness',
      lastMessage: 'This is exactly what I needed to hear today!',
      time: '2m ago',
      unread: true,
    },
    {
      id: 2,
      platform: 'Twitter',
      user: 'tech_enthusiast',
      lastMessage: 'Great insights! Would love to see more content like this.',
      time: '5m ago',
      unread: false,
    },
  ]

  return (
    <DynamicPageWrapper>
      <div className="space-y-8">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <MessageSquare className="w-8 h-8 text-[#6B7280]" />
            <h1 className="text-[28px] font-bold leading-[1.3]">Inbox</h1>
          </div>
          <p className="text-[#6B7280] text-[15px] leading-[1.6]">
            Engage with your audience and manage conversations from all platforms
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Threads List */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Users className="w-6 h-6 text-[#6B7280]" />
                <h2 className="text-[22px] font-bold leading-[1.3]">Active Conversations</h2>
              </div>
              <div className="space-y-3">
                {threads.map((thread) => (
                  <div
                    key={thread.id}
                    className="p-3 hover:bg-[#F9FAFB] dark:hover:bg-[#0B0B0B] rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{thread.user}</span>
                        <Badge variant="outline" className="text-xs">
                          {thread.platform}
                        </Badge>
                      </div>
                      {thread.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-[#6B7280] truncate">{thread.lastMessage}</p>
                    <p className="text-xs text-[#6B7280] mt-1">{thread.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Message View */}
          <div className="col-span-12 lg:col-span-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Reply className="w-6 h-6 text-[#6B7280]" />
                  <h2 className="text-[22px] font-bold leading-[1.3]">@sarah_fitness</h2>
                </div>
                <Badge variant="outline">Instagram</Badge>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-[#F9FAFB] dark:bg-[#1F2937] p-3 rounded-lg">
                  <p className="text-sm">This is exactly what I needed to hear today! Thank you 🙏</p>
                  <p className="text-xs text-[#6B7280] mt-2">2 minutes ago</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Input placeholder="Type your reply..." className="flex-1" />
                <Button>Send</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DynamicPageWrapper>
  )
}