import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const DynamicPageWrapper = dynamic(() => import('@/components/layout/page-wrapper').then((mod) => ({ default: mod.PageWrapper })), { ssr: false })

export default function SettingsPage() {
  const apiKeys = [
    { name: 'OpenAI', status: 'active', lastUsed: '2 hours ago' },
    { name: 'Midjourney', status: 'active', lastUsed: '1 day ago' },
    { name: 'RunwayML', status: 'inactive', lastUsed: 'Never' },
  ]

  const teamMembers = [
    { name: 'John Doe', email: 'john@acme.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@acme.com', role: 'Editor' },
    { name: 'Mike Johnson', email: 'mike@acme.com', role: 'Viewer' },
  ]

  return (
    <DynamicPageWrapper>
      <div className="space-y-8">
        <div>
          <h1 className="text-[28px] font-bold leading-[1.3] mb-2">Settings</h1>
          <p className="text-[#6B7280] text-[15px] leading-[1.6]">
            Manage your organization, team, and integrations
          </p>
        </div>

        <Tabs defaultValue="organization" className="space-y-6">
          <TabsList>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
            <TabsTrigger value="consents">Consents</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          </TabsList>

          <TabsContent value="organization">
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Organization Settings</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    value="Acme Corp"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="org-domain">Domain</Label>
                  <Input
                    id="org-domain"
                    value="acme.com"
                    className="mt-2"
                  />
                </div>
                <Button>Save Changes</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="roles">
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Team Members</h2>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-[#E5E7EB] dark:border-[#1F2937] rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-[#6B7280]">{member.email}</p>
                    </div>
                    <Badge variant="outline">{member.role}</Badge>
                  </div>
                ))}
                <Button variant="outline">Invite Member</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="budgets">
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Budget Management</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="monthly-budget">Monthly Budget ($)</Label>
                  <Input
                    id="monthly-budget"
                    type="number"
                    value="500"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="alert-threshold">Alert Threshold (%)</Label>
                  <Input
                    id="alert-threshold"
                    type="number"
                    value="80"
                    className="mt-2"
                  />
                </div>
                <Button>Update Budget</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="consents">
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">Data & Privacy</h2>
              <div className="text-center py-8">
                <p className="text-[#6B7280] mb-4">Manage data usage and privacy settings</p>
                <Button variant="outline">Configure Consents</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="api-keys">
            <Card className="p-6">
              <h2 className="text-[22px] font-bold leading-[1.3] mb-6">API Keys</h2>
              <div className="space-y-4">
                {apiKeys.map((key, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-[#E5E7EB] dark:border-[#1F2937] rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{key.name}</h3>
                      <p className="text-sm text-[#6B7280]">Last used: {key.lastUsed}</p>
                    </div>
                    <Badge variant={key.status === 'active' ? 'default' : 'secondary'}>
                      {key.status}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline">Add API Key</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DynamicPageWrapper>
  )
}