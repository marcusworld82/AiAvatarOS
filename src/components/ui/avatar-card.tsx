import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AvatarCardProps {
  name: string
  image: string
  status: 'active' | 'idle' | 'offline'
  nextPostAt?: string
}

export function AvatarCard({ name, image, status, nextPostAt }: AvatarCardProps) {
  const statusColors = {
    active: 'bg-green-500',
    idle: 'bg-yellow-500',
    offline: 'bg-gray-500'
  }

  return (
    <Card className="p-4">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img src={image} alt={name} className="w-12 h-12 rounded-full" />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${statusColors[status]}`} />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{name}</h3>
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
          {nextPostAt && (
            <p className="text-xs text-muted-foreground mt-1">
              Next post: {nextPostAt}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}