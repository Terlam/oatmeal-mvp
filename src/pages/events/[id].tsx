import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { adminAuth } from '@firebase'
import { EventDetails } from '@/features/events/components/organisms/EventDetails'
import { useRouter } from 'next/router'

interface EventPageProps {
  user: {
    name?: string | null
    email?: string | null
    avatarUrl?: string | null
  }
}

const EventPage: NextPage<EventPageProps> = () => {
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

export const getServerSideProps: GetServerSideProps<EventPageProps> = async ({ req }) => {
  const token = req.cookies.__session || ''
  const isEmulator = process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true'

  try {
    const decoded = isEmulator
      ? await adminAuth.verifyIdToken(token)
      : await adminAuth.verifySessionCookie(token, true)
    const user = {
      name: decoded.name || null,
      email: decoded.email || null,
      avatarUrl: decoded.picture || null,
    }
    return { props: { user } }
  } catch (err) {
    // Allow unauthenticated access for public events
    return { props: { user: { name: null, email: null, avatarUrl: null } } }
  }
}

