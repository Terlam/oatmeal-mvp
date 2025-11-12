import React, { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { Textarea } from 'flowbite-react'
import { Avatar } from '@/components/atoms/Avatar'
import type { EventComment } from '../../types'

export interface CommentFormProps {
  onSubmit: (comment: Omit<EventComment, 'id' | 'eventId' | 'createdAt' | 'updatedAt' | 'isEdited'>) => Promise<void>
  loading?: boolean
  error?: string | null
  userAvatarUrl?: string
  userName?: string
  placeholder?: string
}

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  loading = false,
  error = null,
  userAvatarUrl,
  userName,
  placeholder = 'Add a comment...',
}) => {
  const [content, setContent] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    
    await onSubmit({
      userId: '', // Will be set by the service
      userName: userName || '', // Will be set by the service
      userAvatarUrl: userAvatarUrl || undefined,
      content: content.trim(),
    })
    
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="p-3 text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded">
          {error}
        </div>
      )}
      <div className="flex space-x-3">
        {userAvatarUrl && (
          <Avatar
            src={userAvatarUrl}
            alt={userName || 'User'}
            className="w-8 h-8"
          />
        )}
        <div className="flex-1">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            rows={2}
            disabled={loading}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading || !content.trim()}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </Button>
      </div>
    </form>
  )
}

