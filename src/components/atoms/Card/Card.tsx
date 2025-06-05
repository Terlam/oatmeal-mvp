import { Card as FlowbiteCard } from 'flowbite-react';
import React from 'react';

export const Card: React.FC<React.ComponentProps<typeof FlowbiteCard>> = (props) => (
  <FlowbiteCard {...props} />
);