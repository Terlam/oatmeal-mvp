import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Label, LabelProps } from './Label'

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'inverse', 'error'] as LabelProps['variant'][],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'] as LabelProps['size'][],
    },
    htmlFor: { control: 'text' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    children: 'Default label',
    htmlFor: 'some-input',
  },
}

export const Inverse: Story = {
  args: {
    children: 'Inverse label',
    variant: 'inverse',
    htmlFor: 'some-input',
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-800 p-6">
        <Story />
      </div>
    ),
  ],
}

export const Error: Story = {
  args: {
    children: 'Error label',
    variant: 'error',
    htmlFor: 'some-input',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Label size="sm" htmlFor="a">Small size</Label>
      <Label size="md" htmlFor="b">Medium size</Label>
      <Label size="lg" htmlFor="c">Large size</Label>
    </div>
  ),
}
