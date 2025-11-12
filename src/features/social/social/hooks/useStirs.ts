// features/social/hooks/useStirs.ts

import { useEffect, useState } from 'react'
import { getStirs } from '../services/stirService'
import type { Stir } from '../types'

export const useStirs = (postId: string) => {
  const [stirs, setStirs] = useState<Stir[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStirs(postId).then((data) => {
      setStirs(data)
      setLoading(false)
    })
  }, [postId])

  return { stirs, loading }
}
