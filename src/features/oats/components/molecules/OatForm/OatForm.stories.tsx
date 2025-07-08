// features/oats/components/molecules/OatForm.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { OatForm } from './OatForm'

const meta: Meta<typeof OatForm> = {
  title: 'Molecules/OatForm',
  component: OatForm,
  args: {
    defaultValues: {
      title: 'Today’s Thought',
      content: 'Trying to grow peace in pots on the balcony…',
    },
    loading: false,
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OatForm>

export const Default: Story = {
  args: {
    onSubmit: (data) => alert(`Submitted: ${JSON.stringify(data, null, 2)}`),
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    onSubmit: () => {},
  },
}
