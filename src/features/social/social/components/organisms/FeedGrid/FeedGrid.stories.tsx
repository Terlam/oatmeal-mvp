// features/social/components/organisms/FeedGrid.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { FeedGrid } from './FeedGrid'
import { Timestamp } from 'firebase/firestore'

const social = Array.from({ length: 3 }, (_, i) => ({
  id: `post-${i}`,
  title: `My Post #${i + 1}`,
  content: 'Just another warm spoonful of thought.',
  authorId: `user-${i}`,
  createdAt: Timestamp.now(),
}))

const meta: Meta<typeof FeedGrid> = {
  title: 'Organisms/FeedGrid',
  component: FeedGrid,
  args: {
    social,
    onBurn: (id) => alert(`burned ${id}`),
    onScoop: (id) => alert(`scooped ${id}`),
    onChew: (id) => alert(`chewed ${id}`),
  },
}

export default meta
type Story = StoryObj<typeof FeedGrid>

export const Default: Story = {}
