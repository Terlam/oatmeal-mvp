import React from 'react'
import { Card } from '@/components/atoms/Card'
import { Avatar } from '@/components/atoms/Avatar'
import { CheckCircle, HelpCircle, XCircle } from 'lucide-react'
import type { RSVP } from '@/features/events/types'
import clsx from 'clsx'

export interface RSVPListProps {
  rsvps: RSVP[]
  className?: string
  emptyMessage?: string
}

export const RSVPList: React.FC<RSVPListProps> = ({
  rsvps,
  className,
  emptyMessage = 'No RSVPs yet.',
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'going':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'maybe':
        return <HelpCircle className="w-5 h-5 text-yellow-500" />
      case 'not_going':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'going':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'maybe':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      case 'not_going':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
    }
  }

  if (rsvps.length === 0) {
    return (
      <div className={clsx('text-center py-8', className)}>
        <p className="text-gray-500 dark:text-gray-200">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={clsx('space-y-3', className)}>
      {rsvps.map((rsvp) => (
        <Card
          key={rsvp.id}
          className={clsx(
            'p-4',
            'bg-white dark:bg-gray-800',
            'border border-gray-200 dark:border-gray-700'
          )}
        >
          <div className="flex items-start space-x-3">
            <Avatar
              src={rsvp.userAvatarUrl || '/user_icon.png'}
              alt={rsvp.userName}
              className="w-10 h-10 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">
                    {rsvp.userName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    {rsvp.guestCount} {rsvp.guestCount === 1 ? 'guest' : 'guests'}
                  </p>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {getStatusIcon(rsvp.status)}
                  <span
                    className={clsx(
                      'px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap',
                      getStatusColor(rsvp.status)
                    )}
                  >
                    {rsvp.status}
                  </span>
                </div>
              </div>
              {rsvp.message && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-200 break-words">
                  {rsvp.message}
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

