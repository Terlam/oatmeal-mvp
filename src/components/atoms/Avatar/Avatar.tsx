import { Avatar as FlowbiteAvatar } from 'flowbite-react';
import React from 'react';

export const Avatar: React.FC<{ src?: string; alt?: string }> = ({ src, alt }) => (
  <FlowbiteAvatar img={src} rounded={true} alt={alt} />
);
