// src/components/atoms/Avatar.tsx
import React from 'react';
import clsx from 'clsx';

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  darkMode?: boolean;
};

export const Avatar: React.FC<AvatarProps> = ({ src, alt = '', size = 'md', darkMode }) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-xl',
  };

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center overflow-hidden border border-accent',
        sizeMap[size],
        darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="object-cover w-full h-full" />
      ) : (
        <span role="img" aria-label="fallback-avatar">🥄</span>
      )}
    </div>
  );
};
