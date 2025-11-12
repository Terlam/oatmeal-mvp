import React, { useState, useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { adminAuth } from '@/firebase'
import { EventList } from '@/features/events/components/organisms/EventList'
import { Button } from '@/components/atoms/Button'
import { useEvents } from '@/features/events/hooks/useEvents'
import { getPublicEvents } from '@/features/events/services/eventService'
import { useAuthStore } from '@/store/authStore'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Event } from '@/features/events/types'

interface EventsPageProps {
  user: {
    name?: string | null
    email?: string | null
    avatarUrl?: string | null
  }
}

const EventsPage: NextPage<EventsPageProps> = ({ user }) => {
  const authUser = useAuthStore((s) => s.user)
  const userId = authUser?.uid
  const router = useRouter()
  const { events: myEvents, loading: myEventsLoading, error: myEventsError } = useEvents(userId)
  const [publicEvents, setPublicEvents] = useState<Event[]>([])
  const [publicEventsLoading, setPublicEventsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'my' | 'public'>('public')

  useEffect(() => {
    const fetchPublicEvents = async () => {
      try {
        setPublicEventsLoading(true)
        const events = await getPublicEvents()
        setPublicEvents(events)
      } catch (error) {
        console.error('Failed to fetch public events:', error)
      } finally {
        setPublicEventsLoading(false)
      }
    }
    fetchPublicEvents()
  }, [])

  const events = viewMode === 'my' ? myEvents : publicEvents
  const loading = viewMode === 'my' ? myEventsLoading : publicEventsLoading
  const error = viewMode === 'my' ? myEventsError : null

  const handleEventClick = (eventId: string) => {
    router.push(`/events/${eventId}`)
  }

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/hero1.png')" }}
    >
      {/* Film Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-fuchsia-700/60 to-yellow-400/30" />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto py-8 px-4">
        <div className="rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mt-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Events
            </h1>
            <Link href="/events/create">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </Link>
          </div>

          <div className="flex space-x-4 mb-6">
            <Button
              color={viewMode === 'my' ? 'primary' : 'light'}
              onClick={() => setViewMode('my')}
              className={viewMode === 'my' ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}
            >
              My Events
            </Button>
            <Button
              color={viewMode === 'public' ? 'primary' : 'light'}
              onClick={() => setViewMode('public')}
              className={viewMode === 'public' ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}
            >
              Public Events
            </Button>
          </div>

          {error && (
            <div className="p-4 text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-200">Loading events...</p>
            </div>
          ) : (
            <EventList
              events={events}
              onEventClick={handleEventClick}
              emptyMessage={
                viewMode === 'my'
                  ? "You haven't created any events yet. Create your first event!"
                  : 'No public events found.'
              }
            />
          )}
        </div>
      </div>
    </section>
  )
}

;(EventsPage as any).auth = true
export default EventsPage

// Note: getServerSideProps removed for static export compatibility
// Auth is now handled client-side via useAuthStore

