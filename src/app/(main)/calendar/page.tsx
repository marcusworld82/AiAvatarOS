import dynamic from 'next/dynamic'
import { CalendarSlot } from '@/components/ui/calendar-slot'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar as CalendarIcon, Clock, Filter } from 'lucide-react'

const DynamicPageWrapper = dynamic(() => import('@/components/layout/page-wrapper').then((mod) => ({ default: mod.PageWrapper })), { ssr: false })

export default function CalendarPage() {
  const posts = [
    {
      time: '9:00 AM',
      channel: 'Instagram',
      status: 'scheduled' as const,
      assetRef: 'Morning workout motivation',
    },
    {
      time: '12:00 PM',
      channel: 'Twitter',
      status: 'draft' as const,
      assetRef: 'Industry insights thread',
    },
    {
      time: '6:00 PM',
      channel: 'LinkedIn',
      status: 'approved' as const,
      assetRef: 'Career tips carousel',
    },
  ]

  return (
    <DynamicPageWrapper>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <CalendarIcon className="w-8 h-8 text-[#6B7280]" />
              <h1 className="text-[28px] font-bold leading-[1.3]">Calendar</h1>
            </div>
            <p className="text-[#6B7280] text-[15px] leading-[1.6]">
              Plan, schedule, and track your content publishing timeline
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">Month</Button>
            <Button>Week</Button>
          </div>
        </div>

        {/* Status Legend */}
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">Draft</Badge>
          <Badge className="bg-[#DCFCE7] text-[#16A34A] hover:bg-[#DCFCE7]">Approved</Badge>
          <Badge className="bg-[#FEF3C7] text-[#EAB308] hover:bg-[#FEF3C7]">Scheduled</Badge>
          <Badge className="bg-[#DBEAFE] text-[#3B82F6] hover:bg-[#DBEAFE]">Posted</Badge>
        </div>

        {/* Calendar Grid */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="w-6 h-6 text-[#6B7280]" />
            <h2 className="text-[22px] font-bold leading-[1.3]">This Week's Schedule</h2>
          </div>
          <div className="space-y-3">
            {posts.map((post, index) => (
              <CalendarSlot key={index} {...post} />
            ))}
          </div>
        </Card>

        {/* Drag to reschedule placeholder */}
        <Card className="p-6">
          <div className="text-center py-8">
            <p className="text-[#6B7280] mb-2">Drag and drop to reschedule posts</p>
            <p className="text-sm text-[#6B7280]">Feature coming soon</p>
          </div>
        </Card>
      </div>
    </DynamicPageWrapper>
  )
}