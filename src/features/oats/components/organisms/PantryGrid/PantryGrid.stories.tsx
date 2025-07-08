// features/oats/components/organisms/PantryGrid.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { PantryGrid } from './PantryGrid'
import { Timestamp } from 'firebase/firestore'

const oats = Array.from({ length: 3 }, (_, i) => ({
  id: `oat-${i}`,
  title: `My Oat #${i + 1}`,
  content: 'Just another warm spoonful of thought.',
  authorId: `user-${i}`,
  createdAt: Timestamp.now(),
}))

const meta: Meta<typeof PantryGrid> = {
  title: 'Organisms/PantryGrid',
  component: PantryGrid,
  args: {
    oats,
    onBurn: (id) => alert(`burned ${id}`),
    onScoop: (id) => alert(`scooped ${id}`),
    onChew: (id) => alert(`chewed ${id}`),
  },
}

export default meta
type Story = StoryObj<typeof PantryGrid>

export const Default: Story = {}
