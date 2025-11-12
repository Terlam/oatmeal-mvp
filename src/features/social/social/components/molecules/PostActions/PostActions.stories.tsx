// features/social/components/molecules/PostActions.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { PostActions } from './PostActions'

const meta: Meta<typeof PostActions> = {
  title: 'Molecules/PostActions',
  component: PostActions,
  args: {
    onChew: () => alert('Chewed'),
    onScoop: () => alert('Scooped'),
    onBurn: () => alert('Burned'),
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PostActions>

export const Default: Story = {}

export const DisabledActions: Story = {
  args: {
    disabled: {
      chew: true,
      scoop: false,
      burn: true,
    },
  },
}
