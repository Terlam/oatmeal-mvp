import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'

export function useAuthListener() {
  const start = useAuthStore((s) => s.startListening)
  useEffect(() => {
    const unsubscribe = start()
    return () => unsubscribe?.()
  }, [start])
}
