import React from 'react'
import { EventCard } from '../../molecules/EventCard'
import type { Event } from '@/features/events/types'
import clsx from 'clsx'

export interface EventListProps {
  events: Event[]
  onEventClick?: (eventId: string) => void
  className?: string
  emptyMessage?: string
}

export const EventList: React.FC<EventListProps> = ({
  events,
  onEventClick,
  className,
  emptyMessage = 'No events found.',
}) => {
  if (events.length === 0) {
    return (
      <div className={clsx('text-center py-12', className)}>
        <p className="text-gray-500 dark:text-gray-200">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={clsx('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onViewClick={onEventClick}
        />
      ))}
    </div>
  )
}

