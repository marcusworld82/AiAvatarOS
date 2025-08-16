import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const DynamicPageWrapper = dynamic(() => import('@/components/layout/page-wrapper').then((mod) => ({ default: mod.PageWrapper })), { ssr: false })
const DynamicAssetTile = dynamic(() => import('@/components/ui/asset-tile').then((mod) => ({ default: mod.AssetTile })), { ssr: false })

export default function LibraryPage() {
  const assets = [
    {
      thumb: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'image' as const,
      tags: ['fitness', 'motivation'],
      provenanceBadge: 'DALL-E 3',
    },
    {
      thumb: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'video' as const,
      tags: ['tutorial', 'tech'],
      provenanceBadge: 'RunwayML',
    },
    {
      thumb: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'image' as const,
      tags: ['lifestyle', 'inspiration'],
      provenanceBadge: 'Midjourney',
    },
  ]

  return (
    <DynamicPageWrapper>
      <div className="space-y-8">
        <div>
          <h1 className="text-[28px] font-bold leading-[1.3] mb-2">Library</h1>
          <p className="text-[#6B7280] text-[15px] leading-[1.6]">
            Browse and manage all your generated content
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Input placeholder="Search assets..." className="max-w-sm" />
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Clear Filters</Button>
          </div>
        </Card>

        {/* Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {assets.map((asset, index) => (
            <DynamicAssetTile key={index} {...asset} />
          ))}
        </div>
      </div>
    </DynamicPageWrapper>
  )
}