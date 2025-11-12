// features/social/components/organisms/PostCard.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { PostCard } from './PostCard'
import { Timestamp } from 'firebase/firestore'

const meta: Meta<typeof PostCard> = {
  title: 'Organisms/PostCard',
  component: PostCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PostCard>

export const Default: Story = {
  args: {
    post: {
      title: 'Curdled Thoughts',
      content: 'I think my brain is yogurt today.',
      authorId: 'user-123',
      createdAt: Timestamp.now(),
    },
    onChew: () => alert('chewed'),
    onScoop: () => alert('scooped'),
    onBurn: () => alert('burned'),
  },
}
