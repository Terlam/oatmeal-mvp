import { useState, useEffect } from 'react'
import { getEventComments } from '../services/commentService'
import type { EventComment } from '../types'

export const useEventComments = (eventId: string | null) => {
  const [comments, setComments] = useState<EventComment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!eventId) {
      setLoading(false)
      return
    }

    const fetchComments = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getEventComments(eventId)
        setComments(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch comments')
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [eventId])

  return { comments, loading, error, refetch: () => {
    const fetchComments = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getEventComments(eventId!)
        setComments(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch comments')
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  } }
}

