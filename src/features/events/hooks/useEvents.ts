import { useState, useEffect } from 'react'
import { getEvents, getPublicEvents } from '../services/eventService'
import type { Event } from '../types'

export const useEvents = (hostId?: string) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = hostId ? await getEvents(hostId) : await getPublicEvents()
        setEvents(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch events')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [hostId])

  return { events, loading, error, refetch: () => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = hostId ? await getEvents(hostId) : await getPublicEvents()
        setEvents(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch events')
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  } }
}

