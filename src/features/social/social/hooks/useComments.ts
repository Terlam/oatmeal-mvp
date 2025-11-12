import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment,
  reportComment,
  hasUserLikedComment,
  getUserComments,
} from '../services/commentService'
import type { Comment } from '../types'

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true)
        const data = await getComments(postId)
        setComments(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch comments')
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      fetchComments()
    }
  }, [postId])

  const refetch = async () => {
    try {
      setLoading(true)
      const data = await getComments(postId)
      setComments(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch comments')
    } finally {
      setLoading(false)
    }
  }

  return { comments, loading, error, refetch }
}

export const useComment = (postId: string, commentId: string) => {
  const [comment, setComment] = useState<Comment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchComment = async () => {
      try {
        setLoading(true)
        const data = await getComment(postId, commentId)
        setComment(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch comment')
      } finally {
        setLoading(false)
      }
    }

    if (postId && commentId) {
      fetchComment()
    }
  }, [postId, commentId])

  const refetch = async () => {
    try {
      setLoading(true)
      const data = await getComment(postId, commentId)
      setComment(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch comment')
    } finally {
      setLoading(false)
    }
  }

  return { comment, loading, error, refetch }
}

export const useUserComments = (userId: string) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        setLoading(true)
        const data = await getUserComments(userId)
        setComments(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user comments')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUserComments()
    }
  }, [userId])

  const refetch = async () => {
    try {
      setLoading(true)
      const data = await getUserComments(userId)
      setComments(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user comments')
    } finally {
      setLoading(false)
    }
  }

  return { comments, loading, error, refetch }
}

// Hook for comment actions (like, unlike, report, etc.)
export const useCommentActions = () => {
  const user = useAuthStore((s) => s.user)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLike = async (postId: string, commentId: string) => {
    if (!user?.uid) return
    try {
      setLoading(true)
      setError(null)
      await likeComment(postId, commentId, user.uid)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to like comment')
    } finally {
      setLoading(false)
    }
  }

  const handleUnlike = async (postId: string, commentId: string) => {
    if (!user?.uid) return
    try {
      setLoading(true)
      setError(null)
      await unlikeComment(postId, commentId, user.uid)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unlike comment')
    } finally {
      setLoading(false)
    }
  }

  const handleReport = async (postId: string, commentId: string, reason: string) => {
    if (!user?.uid) return
    try {
      setLoading(true)
      setError(null)
      await reportComment(postId, commentId, user.uid, reason)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to report comment')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (postId: string, commentId: string) => {
    try {
      setLoading(true)
      setError(null)
      await deleteComment(postId, commentId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete comment')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (postId: string, commentId: string, data: Partial<Comment>) => {
    try {
      setLoading(true)
      setError(null)
      await updateComment(postId, commentId, data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update comment')
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    handleLike,
    handleUnlike,
    handleReport,
    handleDelete,
    handleUpdate,
  }
} 