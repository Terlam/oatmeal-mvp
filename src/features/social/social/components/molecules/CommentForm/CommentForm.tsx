import React, { useState } from 'react'
import { Button } from '@components/atoms'
import { useAuthStore } from '@store/authStore'
import { createComment } from '../../../services/commentService'

interface CommentFormProps {
  postId: string
  onSubmit?: () => void
  onCancel?: () => void
  placeholder?: string
  className?: string
}

export const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  onSubmit,
  onCancel,
  placeholder = 'Add a comment...',
  className,
}) => {
  const user = useAuthStore((s) => s.user)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.uid || !content.trim()) return

    try {
      setLoading(true)
      await createComment(postId, {
        postId,
        authorId: user.uid,
        content: content.trim(),
      })
      setContent('')
      onSubmit?.()
    } catch (error) {
      console.error('Failed to create comment:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setContent('')
    onCancel?.()
  }

  if (!user) {
    return (
      <div className="text-center py-4 text-gray-500 dark:text-gray-400">
        Please sign in to comment
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          disabled={loading}
        />
        
        <div className="flex gap-2 justify-end">
          {onCancel && (
            <Button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={loading || !content.trim()}
            className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </div>
    </form>
  )
} 