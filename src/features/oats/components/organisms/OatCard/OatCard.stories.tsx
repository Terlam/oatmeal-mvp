// features/oats/components/organisms/OatCard.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { OatCard } from './OatCard'
import { Timestamp } from 'firebase/firestore'

const meta: Meta<typeof OatCard> = {
  title: 'Organisms/OatCard',
  component: OatCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OatCard>

export const Default: Story = {
  args: {
    oat: {
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
