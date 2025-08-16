import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabase } from '@/lib/supabase'

const DynamicPageWrapper = dynamic(() => import('@/components/layout/page-wrapper').then((mod) => ({ default: mod.PageWrapper })), { ssr: false })

interface Asset {
  id: string
  type: 'image' | 'video'
  source_url: string
  meta: any
  created_at: string
}

export default function LibraryPage() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAssets() {
      try {
        const { data, error } = await supabase
          .from('assets')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) {
          console.error('Error fetching assets:', error)
        } else {
          setAssets(data || [])
        }
      } catch (error) {
        console.error('Error fetching assets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, [])

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
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              </Card>
            ))}
          </div>
        ) : assets.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <p className="text-[#6B7280] mb-4">No assets generated yet</p>
              <p className="text-sm text-[#6B7280]">Go to Studio to generate your first image or video</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {assets.map((asset) => (
              <Card key={asset.id} className="overflow-hidden hover:shadow-md transition-all duration-220">
                <div className="relative aspect-square">
                  {asset.type === 'image' ? (
                    <img
                      src={asset.source_url}
                      alt="Generated asset"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={asset.source_url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}
                  
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                      {asset.type}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-[#6B7280] mb-2">
                    {new Date(asset.created_at).toLocaleDateString()}
                  </p>
                  <Button className="w-full" size="sm">
                    Use Asset
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DynamicPageWrapper>
  )
}