// features/social/components/organisms/FeedGrid.tsx

import { PostCard } from '../PostCard'
import type { Post } from '../../../types'

export interface FeedGridProps {
  social: Post[]
  onChew?: (id: string) => void
  onScoop?: (id: string) => void
  onBurn?: (id: string) => void
  onDelete?: (id: string) => void
  onComment?: (id: string) => void
  onEdit?: (id: string) => void
  onShare?: (id: string) => void
  onReport?: (id: string) => void
}

export const FeedGrid = ({ 
  social, 
  onChew, 
  onScoop, 
  onBurn, 
  onDelete, 
  onComment, 
  onEdit, 
  onShare, 
  onReport 
}: FeedGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {social.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onChew={() => onChew?.(post.id!)}
          onScoop={() => onScoop?.(post.id!)}
          onBurn={() => onBurn?.(post.id!)}
          onDelete={() => onDelete?.(post.id!)}
          onComment={() => onComment?.(post.id!)}
          onEdit={() => onEdit?.(post.id!)}
          onShare={() => onShare?.(post.id!)}
          onReport={() => onReport?.(post.id!)}
        />
      ))}
    </div>
  )
}
