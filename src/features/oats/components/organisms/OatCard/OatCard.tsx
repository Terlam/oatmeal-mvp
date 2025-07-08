import React from 'react'
import { Card, Button, Avatar } from '@components/atoms'
import type { Oat } from '../../../types'

interface OatCardProps {
  oat: Oat
  onChew?: () => void
  onStir?: () => void
  onScoop?: () => void
  onBurn?: () => void
  className?: string
}

export const OatCard: React.FC<OatCardProps> = ({
  oat,
  onChew,
  onStir,
  onScoop,
  className,
}) => (
  <Card className={`transition-shadow hover:shadow-lg animate-fade-in ${className ?? ''}`}>
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {/* Avatar by userId */}
        <Avatar userId={oat.authorId} alt={'User'} />
        <div>
          <div className="font-bold text-lg">{oat.title}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{oat.content}</div>
        </div>
      </div>
      <div className="text-gray-600 dark:text-gray-300 mt-2">{oat.description}</div>
      <div className="flex gap-2 mt-2">
        {onChew && (
          <Button size="sm" onClick={onChew} className="bg-blue-600 text-white">
            Chew
          </Button>
        )}
        {onStir && (
          <Button size="sm" onClick={onStir} className="bg-yellow-500 text-gray-900">
            Stir
          </Button>
        )}
        {onScoop && (
          <Button size="sm" onClick={onScoop} className="bg-green-600 text-white">
            Scoop
          </Button>
        )}
      </div>
    </div>
  </Card>
)