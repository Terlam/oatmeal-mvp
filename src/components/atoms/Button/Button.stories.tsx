import React from 'react';
import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';
import { Button as Button2 }  from "flowbite-react";


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
     <Button2 pill>Cool?</Button2>
  )
}

export const Fallback = () => <div className="force-tailwind-test">Is this styled?</div>;


