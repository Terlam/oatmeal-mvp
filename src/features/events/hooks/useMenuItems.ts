import { useState, useEffect } from 'react'
import { getMenuItems, getMenuItemsByCategory } from '../services/menuItemService'
import type { MenuItem } from '../types'

export const useMenuItems = (eventId: string | null, category?: string) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!eventId) {
      setLoading(false)
      return
    }

    const fetchMenuItems = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = category 
          ? await getMenuItemsByCategory(eventId, category)
          : await getMenuItems(eventId)
        setMenuItems(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch menu items')
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [eventId, category])

  return { menuItems, loading, error, refetch: () => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = category 
          ? await getMenuItemsByCategory(eventId!, category)
          : await getMenuItems(eventId!)
        setMenuItems(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch menu items')
      } finally {
        setLoading(false)
      }
    }
    fetchMenuItems()
  } }
}

