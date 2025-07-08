// features/oats/components/organisms/ScoopShelf.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { ScoopShelf } from './ScoopShelf'
import { Timestamp } from 'firebase/firestore'

const scoops = Array.from({ length: 2 }, (_, i) => ({
  id: `scoop-${i}`,
  title: `Featured Oat #${i + 1}`,
  content: '✨ This oat has been scooped to the front!',
  authorId: `author-${i}`,
  createdAt: Timestamp.now(),
}))

const meta: Meta<typeof ScoopShelf> = {
  title: 'Organisms/ScoopShelf',
  component: ScoopShelf,
  args: {
    scoops,
    onChew: (id) => alert(`chewed scoop ${id}`),
  },
}

export default meta
type Story = StoryObj<typeof ScoopShelf>

export const Default: Story = {}
