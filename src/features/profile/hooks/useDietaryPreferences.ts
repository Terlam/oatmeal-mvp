import { useState, useEffect } from 'react'
import { getUserDietaryPreferences } from '../services/profileService'
import type { UserDietaryPreferences } from '@/types/dietary'

export const useDietaryPreferences = (userId: string | null | undefined) => {
  const [preferences, setPreferences] = useState<UserDietaryPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      setPreferences(null)
      return
    }

    const fetchPreferences = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getUserDietaryPreferences(userId)
        setPreferences(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch dietary preferences')
      } finally {
        setLoading(false)
      }
    }

    fetchPreferences()
  }, [userId])

  return { preferences, loading, error, refetch: async () => {
    if (!userId) return
    try {
      setLoading(true)
      setError(null)
      const data = await getUserDietaryPreferences(userId)
      setPreferences(data)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dietary preferences')
    } finally {
      setLoading(false)
    }
  } }
}

