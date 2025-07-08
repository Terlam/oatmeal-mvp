// features/oats/hooks/useStirs.ts

import { useEffect, useState } from 'react'
import { getStirs } from '../services/stirService'
import type { Stir } from '../types'

export const useStirs = (oatId: string) => {
  const [stirs, setStirs] = useState<Stir[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStirs(oatId).then((data) => {
      setStirs(data)
      setLoading(false)
    })
  }, [oatId])

  return { stirs, loading }
}
