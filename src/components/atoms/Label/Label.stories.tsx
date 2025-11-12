import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './Label'

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  argTypes: {
    htmlFor: { control: 'text' },
    children: { control: 'text' },
    value: { control: 'text' },
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

export const WithValue: Story = {
  args: {
    value: 'Label with value prop',
    htmlFor: 'some-input',
  },
}

export const DarkMode: Story = {
  args: {
    children: 'Dark mode label',
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

export const Multiple: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="a">First label</Label>
      <Label htmlFor="b">Second label</Label>
      <Label htmlFor="c">Third label</Label>
    </div>
  ),
}
