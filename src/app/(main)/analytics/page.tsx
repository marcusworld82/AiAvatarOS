import dynamic from 'next/dynamic'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, TrendingUp, Eye, Users } from 'lucide-react'

const DynamicPageWrapper = dynamic(() => import('@/components/layout/page-wrapper').then((mod) => ({ default: mod.PageWrapper })), { ssr: false })
const DynamicInsightChart = dynamic(() => import('@/components/ui/insight-chart').then((mod) => ({ default: mod.InsightChart })), { ssr: false })

export default function AnalyticsPage() {
  const reachData = [
    { date: 'Mon', value: 12000 },
    { date: 'Tue', value: 15000 },
    { date: 'Wed', value: 18000 },
    { date: 'Thu', value: 14000 },
    { date: 'Fri', value: 22000 },
    { date: 'Sat', value: 25000 },
    { date: 'Sun', value: 20000 },
  ]

  const viewsData = [
    { date: 'Mon', value: 8000 },
    { date: 'Tue', value: 12000 },
    { date: 'Wed', value: 15000 },
    { date: 'Thu', value: 11000 },
    { date: 'Fri', value: 18000 },
    { date: 'Sat', value: 21000 },
    { date: 'Sun', value: 16000 },
  ]

  return (
    <DynamicPageWrapper>
      <div className="space-y-8">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <BarChart3 className="w-8 h-8 text-[#6B7280]" />
            <h1 className="text-[28px] font-bold leading-[1.3]">Analytics</h1>
          </div>
          <p className="text-[#6B7280] text-[15px] leading-[1.6]">
            Deep insights into your content performance and audience engagement
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-[#6B7280]" />
                  <h3 className="text-lg font-semibold">Performance Metrics</h3>
                </div>
                <DynamicInsightChart metric="Reach (7 days)" timeseries={reachData} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-[#6B7280]" />
                  <h3 className="text-lg font-semibold">Engagement Data</h3>
                </div>
                <DynamicInsightChart metric="Views (7 days)" timeseries={viewsData} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="posts">
            <div className="text-center py-12 space-y-4">
              <TrendingUp className="w-12 h-12 text-[#6B7280] mx-auto" />
              <h3 className="text-lg font-semibold">Post Performance Analysis</h3>
              <p className="text-[#6B7280]">Detailed post analytics and performance metrics coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="audience">
            <div className="text-center py-12 space-y-4">
              <Users className="w-12 h-12 text-[#6B7280] mx-auto" />
              <h3 className="text-lg font-semibold">Audience Demographics</h3>
              <p className="text-[#6B7280]">Comprehensive audience insights and demographics coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DynamicPageWrapper>
  )
}