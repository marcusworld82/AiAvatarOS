import { PageWrapper } from '@/components/layout/page-wrapper'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { JobRow } from '@/components/ui/job-row'
import { CalendarSlot } from '@/components/ui/calendar-slot'
import { TrendingUp, Eye, Target, DollarSign } from 'lucide-react'

export default function DashboardPage() {
  const kpis = [
    { title: 'Reach 7d', value: 125400, trend: 12.5, icon: TrendingUp },
    { title: 'Views 7d', value: 89200, trend: 8.3, icon: Eye },
    { title: 'Hit Rate', value: 94, unit: '%', trend: 5.2, icon: Target },
    { title: 'Spend 7d', value: 342, unit: '$', trend: -3.1, icon: DollarSign },
  ]

  const jobs = [
    {
      provider: 'OpenAI',
      model: 'DALL-E 3',
      kind: 'Image Generation',
      status: 'running' as const,
      cost: 0.04,
    },
    {
      provider: 'Midjourney',
      model: 'v6.1',
      kind: 'Image Generation',
      status: 'completed' as const,
      cost: 0.08,
    },
  ]

  const calendarSlots = [
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
  ]

  return (
    <PageWrapper>
      <div className="space-y-8">
        <div>
          <h1 className="text-[28px] font-bold leading-[1.3] mb-2">Dashboard</h1>
          <p className="text-[#6B7280] text-[15px] leading-[1.6]">
            Monitor your AI avatars and manage your content pipeline
          </p>
        </div>

        {/* KPI Cards */}
        <div>
          <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Character Health</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi) => {
              const Icon = kpi.icon
              return (
                <Card key={kpi.title} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-[#F9FAFB] dark:bg-[#1F2937] rounded-lg flex items-center justify-center">
                      <Icon size={20} className="text-[#6B7280]" />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm ${
                      kpi.trend >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
                    }`}>
                      <TrendingUp size={16} className={kpi.trend < 0 ? 'rotate-180' : ''} />
                      <span>{Math.abs(kpi.trend)}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-[13px] text-[#6B7280] font-medium uppercase tracking-wide">{kpi.title}</h3>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-[28px] font-bold leading-[1.3]">
                        {kpi.value.toLocaleString()}
                      </span>
                      {kpi.unit && <span className="text-[15px] text-[#6B7280]">{kpi.unit}</span>}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left column */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Today's Queue */}
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Today's Queue</h2>
              <div className="space-y-3">
                {jobs.map((job, index) => (
                  <JobRow key={index} {...job} />
                ))}
              </div>
            </Card>

            {/* Ready to Publish */}
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Ready to Publish</h2>
              <div className="text-center py-12">
                <p className="text-[#6B7280] mb-4">No assets ready to publish yet.</p>
                <button className="px-4 py-2 bg-[#111111] text-white rounded-lg font-medium text-sm">
                  Generate Content
                </button>
              </div>
            </Card>
          </div>

          {/* Right column */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Calendar */}
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Calendar</h2>
              <div className="space-y-3">
                {calendarSlots.map((slot, index) => (
                  <CalendarSlot key={index} {...slot} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}