import { useState, useEffect } from 'react'
import { getRSVPs, getRSVPByUser, getRSVPsByStatus } from '../services/rsvpService'
import type { RSVP } from '../types'

export const useRSVPs = (eventId: string | null, status?: 'going' | 'maybe' | 'not_going') => {
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!eventId) {
      setLoading(false)
      return
    }

    const fetchRSVPs = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = status 
          ? await getRSVPsByStatus(eventId, status)
          : await getRSVPs(eventId)
        setRsvps(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch RSVPs')
      } finally {
        setLoading(false)
      }
    }

    fetchRSVPs()
  }, [eventId, status])

  return { rsvps, loading, error, refetch: () => {
    const fetchRSVPs = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = status 
          ? await getRSVPsByStatus(eventId!, status)
          : await getRSVPs(eventId!)
        setRsvps(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch RSVPs')
      } finally {
        setLoading(false)
      }
    }
    fetchRSVPs()
  } }
}

export const useRSVP = (eventId: string | null, userId: string | null) => {
  const [rsvp, setRsvp] = useState<RSVP | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!eventId || !userId) {
      setLoading(false)
      return
    }

    const fetchRSVP = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getRSVPByUser(eventId, userId)
        setRsvp(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch RSVP')
      } finally {
        setLoading(false)
      }
    }

    fetchRSVP()
  }, [eventId, userId])

  return { rsvp, loading, error, refetch: () => {
    const fetchRSVP = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getRSVPByUser(eventId!, userId!)
        setRsvp(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch RSVP')
      } finally {
        setLoading(false)
      }
    }
    fetchRSVP()
  } }
}

