'use client'

import { motion } from 'framer-motion'
import { Calendar, Play, Image } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface AssetTileProps {
  thumb: string
  type: 'image' | 'video'
  tags: string[]
  provenanceBadge: string
}

export function AssetTile({ thumb, type, tags, provenanceBadge }: AssetTileProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden hover:shadow-md transition-all duration-220">
        <div className="relative aspect-square">
          <img
            src={thumb}
            alt="Asset preview"
            className="w-full h-full object-cover"
          />
          
          {/* Type indicator */}
          <div className="absolute top-3 left-3">
            <div className="w-8 h-8 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
              {type === 'video' ? (
                <Play size={16} className="text-white ml-0.5" />
              ) : (
                <Image size={16} className="text-white" />
              )}
            </div>
          </div>

          {/* Provenance badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-black/60 backdrop-blur-sm text-white border-0">
              {provenanceBadge}
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Button className="w-full" size="sm">
            <Calendar size={16} className="mr-2" />
            Schedule
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}