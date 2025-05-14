import React from 'react';
import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'], // optional: helps Storybook auto-generate docs
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'I am a button, hear me click',
  },
};

export const Secondary: Story = {
  args: {
    children: 'I am a button, hear me click',
    variant: 'secondary', // assuming your Button supports variants
  },
};

export const DarkMode: Story = {
  args: {
    children: 'I am a button, hear me click',
    darkMode: true, // assuming your Button handles this prop
  },
};

export const something = () => {
  return(
    <div>
      <button className='rounded bg-red py-7'>
        New Button
      </button>
    </div>
  )
}

export const Fallback = () => <div className="force-tailwind-test">Is this styled?</div>;


