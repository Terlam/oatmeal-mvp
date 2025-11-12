import React from 'react'
import { NextPage } from 'next'
import { EventDetails } from '@/features/events/components/organisms/EventDetails'
import { useRouter } from 'next/router'

// Props now come from client-side auth store

const EventPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const eventId = typeof id === 'string' ? id : null

  if (!eventId) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-200">Event ID is required</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <EventDetails eventId={eventId} />
    </div>
  )
}

export default EventPage

// Note: getServerSideProps removed for static export compatibility
// Auth is now handled client-side via useAuthStore

