import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface PublishFormProps {
  caption: string
  firstComment: string
  hashtags: string[]
  link: string
  UTMs: Record<string, string>
}

export function PublishForm({ caption, firstComment, hashtags, link, UTMs }: PublishFormProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="caption">Caption</Label>
          <Textarea
            id="caption"
            value={caption}
            placeholder="Write your caption..."
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="firstComment">First Comment</Label>
          <Textarea
            id="firstComment"
            value={firstComment}
            placeholder="Optional first comment..."
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="hashtags">Hashtags</Label>
          <Input
            id="hashtags"
            value={hashtags.join(' ')}
            placeholder="#hashtag1 #hashtag2"
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="link">Link</Label>
          <Input
            id="link"
            value={link}
            placeholder="https://example.com"
            className="mt-2"
          />
        </div>
        
        <div className="flex space-x-2">
          <Button>Schedule</Button>
          <Button variant="outline">Save Draft</Button>
        </div>
      </div>
    </Card>
  )
}