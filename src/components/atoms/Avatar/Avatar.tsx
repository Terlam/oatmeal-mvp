import { Avatar as FlowbiteAvatar } from 'flowbite-react'
import React from 'react'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', rounded = true, className }) => {
  return (
    <FlowbiteAvatar img={src} alt={alt} size={size} rounded={rounded} className={className} />
  )
}