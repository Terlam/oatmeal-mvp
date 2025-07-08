import { Avatar as FlowbiteAvatar } from 'flowbite-react'
import React from 'react'
import { useUserAvatar } from '../../../hooks/useUserAvatar'

interface AvatarProps {
  src?: string
  alt?: string
  userId?: string
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, userId }) => {
  const userAvatarUrl = useUserAvatar(userId)
  const avatarSrc = src || userAvatarUrl

  return <FlowbiteAvatar img={avatarSrc} rounded={true} alt={alt} />
}