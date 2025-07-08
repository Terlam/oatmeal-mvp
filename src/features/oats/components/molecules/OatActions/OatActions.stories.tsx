// features/oats/components/molecules/OatActions.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { OatActions } from './OatActions'

const meta: Meta<typeof OatActions> = {
  title: 'Molecules/OatActions',
  component: OatActions,
  args: {
    onChew: () => alert('Chewed'),
    onScoop: () => alert('Scooped'),
    onBurn: () => alert('Burned'),
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OatActions>

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
