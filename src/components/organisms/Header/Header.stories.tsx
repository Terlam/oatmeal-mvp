import { Header } from './Header';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
  },
};

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    username: 'Captain Crunch',
  },
};
