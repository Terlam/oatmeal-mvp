import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Layout } from './Layout'

const meta: Meta<typeof Layout> = {
  title: 'Organisms/Layout',
  component: Layout,
  tags: ['autodocs'],
  argTypes: {
    isLoggedIn: { control: 'boolean' },
    darkMode: { control: 'boolean' },
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
    isLoggedIn: false,
    darkMode: false,
    children: 'Public Page Content',
  },
}

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    darkMode: false,
    userName: 'John Doe',
    userEmail: 'john@example.com',
    userAvatarUrl: 'https://i.pravatar.cc/150?img=3',
    children: 'Dashboard Content',
  },
}

export const DarkMode: Story = {
  args: {
    isLoggedIn: true,
    darkMode: true,
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    userAvatarUrl: 'https://i.pravatar.cc/150?img=3',
    children: 'Dark Themed Content',
  },
}
