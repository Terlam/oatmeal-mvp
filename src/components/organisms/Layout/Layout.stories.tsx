import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Layout } from './Layout'

const meta: Meta<typeof Layout> = {
  title: 'Organisms/Layout',
  component: Layout,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    isLoggedIn: { control: 'boolean' },
    userName: { control: 'text' },
    userEmail: { control: 'text' },
    userAvatarUrl: { control: 'text' },
    children: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof Layout>

export const LoggedOut: Story = {
  args: {
    isLoading: false,
    isLoggedIn: false,
    children: 'Public Page Content',
  },
}

export const LoggedIn: Story = {
  args: {
    isLoading: false,
    isLoggedIn: true,
    userName: 'John Doe',
    userEmail: 'john@example.com',
    userAvatarUrl: 'https://i.pravatar.cc/150?img=3',
    children: 'Dashboard Content',
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
    isLoggedIn: false,
    children: 'Loading...',
  },
}
