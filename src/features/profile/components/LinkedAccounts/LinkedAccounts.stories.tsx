import type { Meta, StoryObj } from '@storybook/react';
import { LinkedAccounts } from './LinkedAccounts';

const meta: Meta<typeof LinkedAccounts> = {
  title: 'Profile/LinkedAccounts',
  component: LinkedAccounts,
};

export default meta;
type Story = StoryObj<typeof LinkedAccounts>;

const mockAccounts = [
  { id: 'github', name: 'GitHub', linked: true },
  { id: 'twitter', name: 'Twitter', linked: false },
  { id: 'google', name: 'Google', linked: false },
];

export const Default: Story = {
  args: {
    accounts: mockAccounts,
    toggle: () => alert('Toggle triggered'),
  },
};
