import { useEffect, useState } from 'react'

// Replace this with your actual fetch logic (e.g., Firebase Storage)
export function useUserAvatar(userId?: string) {
  const [url, setUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!userId) return
    // Example: fetch from `/api/user/${userId}/avatar`
    // Replace with your actual logic
    fetch(`/api/user/${userId}/avatar`)
      .then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(() => setUrl(undefined))
  }, [userId])

  return url
}