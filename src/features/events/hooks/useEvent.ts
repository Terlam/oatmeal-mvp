import { useState, useEffect } from 'react'
import { getEvent, getEventByShareToken } from '../services/eventService'
import type { Event } from '../types'

export const useEvent = (eventId: string | null, shareToken?: string) => {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!eventId && !shareToken) {
      setLoading(false)
      return
    }

    const fetchEvent = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = shareToken 
          ? await getEventByShareToken(shareToken)
          : eventId 
            ? await getEvent(eventId)
            : null
        setEvent(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch event')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId, shareToken])

  return { event, loading, error, refetch: () => {
    const fetchEvent = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = shareToken 
          ? await getEventByShareToken(shareToken)
          : eventId 
            ? await getEvent(eventId)
            : null
        setEvent(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch event')
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  } }
}

