import React from 'react'
import { Card } from '@/components/atoms/Card'
import { Avatar } from '@/components/atoms/Avatar'
import { Button } from '@/components/atoms/Button'
import { Calendar, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import type { Event } from '@/features/events/types'
import clsx from 'clsx'

export interface EventCardProps {
  event: Event
  onViewClick?: (eventId: string) => void
  className?: string
}

export const EventCard: React.FC<EventCardProps> = ({ event, onViewClick, className }) => {
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Date TBD'
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch (error) {
      return 'Date TBD'
    }
  }

  const formatTime = (time: string) => {
    if (!time) return 'Time TBD'
    // If time is in HH:MM format, convert to 12-hour format
    if (time.includes(':') && !time.includes('PM') && !time.includes('AM')) {
      const [hoursStr, minutesStr] = time.split(':')
      const hours = parseInt(hoursStr, 10)
      const minutes = parseInt(minutesStr, 10)
      
      // Validate that hours and minutes are valid numbers
      if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return 'Time TBD' // Return default if invalid
      }
      
      const hour12 = hours % 12 || 12
      const ampm = hours >= 12 ? 'PM' : 'AM'
      return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`
    }
    // If time is already in 12-hour format (contains AM/PM), validate it
    if (time.includes('AM') || time.includes('PM')) {
      const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
      if (!match) return 'Time TBD'
      const hours = parseInt(match[1], 10)
      const minutes = parseInt(match[2], 10)
      if (isNaN(hours) || isNaN(minutes)) return 'Time TBD'
      return time // Return as-is if valid
    }
    return 'Time TBD' // Default if format is unknown
  }

  return (
    <Card
      className={clsx(
        'p-6 hover:shadow-lg transition-shadow cursor-pointer',
        'bg-white dark:bg-gray-800',
        'border-2 border-orange-200 dark:border-orange-800',
        className
      )}
      onClick={() => onViewClick?.(event.id!)}
    >
      <div className="flex flex-col space-y-4">
        {/* Header with host info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar
              src={event.hostAvatarUrl || '/user_icon.png'}
              alt={event.hostName}
              className="w-10 h-10"
            />
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-200">
                Hosted by {event.hostName}
              </p>
            </div>
          </div>
          {event.theme && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
              {event.theme}
            </span>
          )}
        </div>

        {/* Event title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {event.title}
        </h3>

        {/* Event description */}
        {event.description && (
          <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
            {event.description}
          </p>
        )}

        {/* Event details */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-200">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{formatDate(event.eventDate)}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-200">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{formatTime(event.eventTime)}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-200">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{event.location.name}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-200">
            <Users className="w-4 h-4" />
            <span className="text-sm">RSVP Count</span>
          </div>
          <Link href={`/events/${event.id}`}>
            <Button
              color="primary"
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              View Event
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

