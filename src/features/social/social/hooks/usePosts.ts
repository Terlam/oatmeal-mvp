import { useState, useEffect } from 'react'
import { useAuthStore } from '@store/authStore'
import {
  getPosts,
  getMyPosts,
  getScoopedPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  chewPost,
  likePost,
  unlikePost,
  sharePost,
  reportPost,
  hasUserLikedPost,
  getUserPostInteractions,
} from '../services/postService'
import type { Post, PostInteraction } from '../types'

export const usePosts = (userId?: string) => {
  const [social, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const data = await getPosts(userId)
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch social')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchPosts()
    }
  }, [userId])

  const refetch = async () => {
    try {
      setLoading(true)
      const data = await getPosts(userId)
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch social')
    } finally {
      setLoading(false)
    }
  }

  return { social, loading, error, refetch }
}

export const useMyPosts = (userId: string) => {
  const [social, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setLoading(true)
        const data = await getMyPosts(userId)
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch my social')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchMyPosts()
    }
  }, [userId])

  const refetch = async () => {
    try {
      setLoading(true)
      const data = await getMyPosts(userId)
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch my social')
    } finally {
      setLoading(false)
    }
  }

  return { social, loading, error, refetch }
}

export const useScoopedPosts = (userId: string) => {
  const [social, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchScoopedPosts = async () => {
      try {
        setLoading(true)
        const data = await getScoopedPosts(userId)
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch scooped social')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchScoopedPosts()
    }
  }, [userId])

  const refetch = async () => {
    try {
      setLoading(true)
      const data = await getScoopedPosts(userId)
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch scooped social')
    } finally {
      setLoading(false)
    }
  }

  return { social, loading, error, refetch }
}

export const usePost = (id: string) => {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const data = await getPost(id)
        setPost(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch post')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  const refetch = async () => {
    try {
      setLoading(true)
      const data = await getPost(id)
      setPost(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch post')
    } finally {
      setLoading(false)
    }
  }

  return { post, loading, error, refetch }
}

export const usePostInteractions = (userId: string) => {
  const [interactions, setInteractions] = useState<PostInteraction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        setLoading(true)
        const data = await getUserPostInteractions(userId)
        setInteractions(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch interactions')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchInteractions()
    }
  }, [userId])

  const refetch = async () => {
    try {
      setLoading(true)
      const data = await getUserPostInteractions(userId)
      setInteractions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch interactions')
    } finally {
      setLoading(false)
    }
  }

  return { interactions, loading, error, refetch }
}

// Hook for post actions (like, unlike, share, report)
export const usePostActions = () => {
  const user = useAuthStore((s) => s.user)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLike = async (postId: string) => {
    if (!user?.uid) return
    try {
      setLoading(true)
      setError(null)
      await likePost(postId, user.uid)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to like post')
    } finally {
      setLoading(false)
    }
  }

  const handleUnlike = async (postId: string) => {
    if (!user?.uid) return
    try {
      setLoading(true)
      setError(null)
      await unlikePost(postId, user.uid)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unlike post')
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async (postId: string, shareData: {
    title?: string
    content?: string
    platform?: string
  }) => {
    if (!user?.uid) return
    try {
      setLoading(true)
      setError(null)
      await sharePost(postId, user.uid, shareData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share post')
    } finally {
      setLoading(false)
    }
  }

  const handleReport = async (postId: string, reason: string) => {
    if (!user?.uid) return
    try {
      setLoading(true)
      setError(null)
      await reportPost(postId, user.uid, reason)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to report post')
    } finally {
      setLoading(false)
    }
  }

  const handleChew = async (postId: string) => {
    try {
      setLoading(true)
      setError(null)
      await chewPost(postId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to chew post')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (postId: string) => {
    try {
      setLoading(true)
      setError(null)
      await deletePost(postId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    handleLike,
    handleUnlike,
    handleShare,
    handleReport,
    handleChew,
    handleDelete,
  }
}
