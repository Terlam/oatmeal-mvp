import React, { useState } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { adminAuth } from '@firebase'
import { EventForm } from '@/features/events/components/molecules/EventForm'
import { createEvent } from '@/features/events/services/eventService'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/router'
import { Card } from '@/components/atoms/Card'

interface CreateEventPageProps {
  user: {
    name?: string | null
    email?: string | null
    avatarUrl?: string | null
  }
}

const CreateEventPage: NextPage<CreateEventPageProps> = () => {
  const user = useAuthStore((s) => s.user)
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: Omit<any, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) {
      setError('You must be signed in to create an event')
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      
      const eventData = {
        ...event,
        hostId: user.uid,
        hostName: user.displayName || 'User',
        hostEmail: user.email || '',
        hostAvatarUrl: user.photoURL || undefined,
      }
      
      const eventId = await createEvent(eventData)
      router.push(`/events/${eventId}`)
    } catch (err: any) {
      setError(err.message || 'Failed to create event')
    } finally {
      setSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-200">You must be signed in to create an event</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Create Event
      </h1>
      <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-800">
        <EventForm
          onSubmit={handleSubmit}
          loading={submitting}
          error={error}
        />
      </Card>
    </div>
  )
}

;(CreateEventPage as any).auth = true
export default CreateEventPage

export const getServerSideProps: GetServerSideProps<CreateEventPageProps> = async ({ req }) => {
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
    console.error('SSR token verification failed:', err)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

