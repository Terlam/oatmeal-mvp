// features/social/components/organisms/SavedPosts.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { SavedPosts } from './SavedPosts'
import { Timestamp } from 'firebase/firestore'

const scoops = Array.from({ length: 2 }, (_, i) => ({
  id: `scoop-${i}`,
  title: `Featured Post #${i + 1}`,
  content: '✨ This post has been scooped to the front!',
  authorId: `author-${i}`,
  createdAt: Timestamp.now(),
}))

const meta: Meta<typeof SavedPosts> = {
  title: 'Organisms/SavedPosts',
  component: SavedPosts,
  args: {
    scoops,
    onChew: (id) => alert(`chewed scoop ${id}`),
  },
}

export default meta
type Story = StoryObj<typeof SavedPosts>

export const Default: Story = {}
