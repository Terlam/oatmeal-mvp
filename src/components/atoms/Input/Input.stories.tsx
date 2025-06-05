// src/components/atoms/Input.stories.tsx
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input, InputProps } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ width: 300, padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
   
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Type here…',
  },
}

export const WithLabel: Story = {
  args: {
    placeholder: 'Enter your full name',
  },
}

export const WithError: Story = {
  args: {
    placeholder: 'you@example.com',
  },
}

export const PrimaryVariant: Story = {
  args: {
    placeholder: 'Primary style',
  },
}

export const SecondaryVariant: Story = {
  args: {
    placeholder: 'Secondary style',
  },
}
