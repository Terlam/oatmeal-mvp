import React from 'react'
import { PostCard } from '../PostCard'
import type { Post } from '../../../types'

interface SavedPostsProps {
  scoops: Post[]
  onChew?: (id: string) => void
  onStir?: (id: string) => void
}

export const SavedPosts: React.FC<SavedPostsProps> = ({ scoops, onChew, onStir }) => (
  <div className="flex flex-col gap-4">
    {scoops.map((scoop) => (
      <PostCard
        key={scoop.id}
        post={scoop}
        onChew={onChew ? () => onChew(scoop.id!) : undefined}
        onStir={onStir ? () => onStir(scoop.id!) : undefined}
      />
    ))}
  </div>
)