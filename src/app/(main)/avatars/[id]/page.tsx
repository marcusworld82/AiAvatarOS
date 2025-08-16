import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const DynamicPageWrapper = dynamic(() => import('@/components/layout/page-wrapper').then((mod) => ({ default: mod.PageWrapper })), { ssr: false })

interface AvatarSettingsPageProps {
  params: {
    id: string
  }
}

export default function AvatarSettingsPage({ params }: AvatarSettingsPageProps) {
  const avatar = {
    id: params.id,
    name: 'Maya AI',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'AI fitness coach focused on motivation and healthy living',
    personality: 'Energetic, supportive, and knowledgeable',
  }

  const channels = [
    { platform: 'Instagram', connected: true, followers: '12.5K' },
    { platform: 'Twitter', connected: true, followers: '8.2K' },
    { platform: 'LinkedIn', connected: false, followers: '0' },
    { platform: 'TikTok', connected: false, followers: '0' },
  ]

  return (
    <DynamicPageWrapper>
      <div className="space-y-8">
        <div className="flex items-center space-x-4">
          <img
            src={avatar.image}
            alt={avatar.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-[28px] font-bold leading-[1.3] mb-2">{avatar.name}</h1>
            <p className="text-[#6B7280] text-[15px] leading-[1.6]">
              Configure avatar settings and behavior
            </p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
            <TabsTrigger value="brand-kit">Brand Kit</TabsTrigger>
            <TabsTrigger value="safety">Safety Rules</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="avatar-name">Name</Label>
                  <Input
                    id="avatar-name"
                    value={avatar.name}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="avatar-bio">Bio</Label>
                  <Textarea
                    id="avatar-bio"
                    value={avatar.bio}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="avatar-personality">Personality</Label>
                  <Textarea
                    id="avatar-personality"
                    value={avatar.personality}
                    className="mt-2"
                  />
                </div>
                <Button>Save Changes</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="references">
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Reference Materials</h2>
              <div className="text-center py-8">
                <p className="text-[#6B7280] mb-4">Upload reference images and documents</p>
                <Button variant="outline">Upload References</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="brand-kit">
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Brand Kit</h2>
              <div className="text-center py-8">
                <p className="text-[#6B7280] mb-4">Define colors, fonts, and visual style</p>
                <Button variant="outline">Configure Brand Kit</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="safety">
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Safety Rules</h2>
              <div className="text-center py-8">
                <p className="text-[#6B7280] mb-4">Set content guidelines and restrictions</p>
                <Button variant="outline">Configure Safety Rules</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="channels">
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Connected Channels</h2>
              <div className="space-y-4">
                {channels.map((channel) => (
                  <div
                    key={channel.platform}
                    className="flex items-center justify-between p-4 border border-[#E5E7EB] dark:border-[#1F2937] rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#F9FAFB] dark:bg-[#1F2937] rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium">{channel.platform[0]}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{channel.platform}</h3>
                        <p className="text-sm text-[#6B7280]">
                          {channel.followers} followers
                        </p>
                      </div>
                    </div>
                    <Badge variant={channel.connected ? 'default' : 'secondary'}>
                      {channel.connected ? 'Connected' : 'Not Connected'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DynamicPageWrapper>
  )
}