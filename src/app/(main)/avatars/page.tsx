import dynamic from 'next/dynamic'
import { AvatarCard } from '@/components/ui/avatar-card'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const DynamicPageWrapper = dynamic(() => import('@/components/layout/page-wrapper').then((mod) => ({ default: mod.PageWrapper })), { ssr: false })

export default function AvatarsPage() {
  const avatars = [
    {
      id: '1',
      name: 'Maya AI',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'active' as const,
      nextPostAt: 'Today 3:00 PM',
      platforms: ['Instagram', 'Twitter', 'LinkedIn'],
    },
    {
      id: '2',
      name: 'Alex Tech',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'idle' as const,
      nextPostAt: 'Tomorrow 9:00 AM',
      platforms: ['YouTube', 'TikTok'],
    },
    {
      id: '3',
      name: 'Sarah Fitness',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'offline' as const,
      platforms: ['Instagram', 'TikTok'],
    },
  ]

  return (
    <DynamicPageWrapper>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-bold leading-[1.3] mb-2">Avatars</h1>
            <p className="text-[#6B7280] text-[15px] leading-[1.6]">
              Manage your AI avatars and their personalities
            </p>
          </div>
          <Button>New Avatar</Button>
        </div>

        {/* Avatars Table */}
        <Card className="p-6">
          <div className="space-y-4">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className="flex items-center justify-between p-4 hover:bg-[#F9FAFB] dark:hover:bg-[#0B0B0B] rounded-lg transition-colors duration-120"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={avatar.image}
                    alt={avatar.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{avatar.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant={avatar.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {avatar.status}
                      </Badge>
                      <div className="flex space-x-1">
                        {avatar.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {avatar.nextPostAt && (
                    <div className="text-right">
                      <p className="text-sm text-[#6B7280]">Next post</p>
                      <p className="text-sm font-medium">{avatar.nextPostAt}</p>
                    </div>
                  )}
                  <Link href={`/avatars/${avatar.id}`}>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DynamicPageWrapper>
  )
}