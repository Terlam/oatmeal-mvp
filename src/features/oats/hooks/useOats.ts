import { useEffect, useState } from 'react'
import { getMyOats, getScoopedOats } from '../services/oatService'
import type { Oat } from '../types'

export const useMyOats = (userId: string) => {
  const [oats, setOats] = useState<Oat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    getMyOats(userId).then((data) => {
      setOats(data)
      setLoading(false)
    })
  }, [userId])

  return { oats, loading }
}

export const useScoopedOats = (userId: string) => {
  const [scoops, setScoops] = useState<Oat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getScoopedOats(userId).then((data) => {
      setScoops(data)
      setLoading(false)
    })
  }, [userId])

  return { scoops, loading }
}
