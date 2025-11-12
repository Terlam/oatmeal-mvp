import React, { useState } from 'react'
import { Avatar } from '@/components/atoms'
import { useAuthStore } from '@/store/authStore'
import { useCommentActions } from '../../../hooks/useComments'
import type { Comment as CommentType } from '../../../types'

interface CommentProps {
  comment: CommentType
  postId: string
  onEdit?: (commentId: string) => void
  onReply?: (commentId: string) => void
  className?: string
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  postId,
  onEdit,
  onReply,
  className,
}) => {
  const user = useAuthStore((s) => s.user)
  const { handleLike, handleUnlike, handleDelete, handleUpdate, loading } = useCommentActions()
  const [isLiked, setIsLiked] = useState(comment.likes?.includes(user?.uid || '') || false)
  const [showOptions, setShowOptions] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)

  const isAuthor = user?.uid === comment.authorId

  const handleLikeClick = async () => {
    if (!user?.uid) return
    if (isLiked) {
      await handleUnlike(postId, comment.id!)
      setIsLiked(false)
    } else {
      await handleLike(postId, comment.id!)
      setIsLiked(true)
    }
  }

  const handleDeleteClick = async () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      await handleDelete(postId, comment.id!)
    }
  }

  const handleSaveEdit = async () => {
    await handleUpdate(postId, comment.id!, { content: editContent })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditContent(comment.content)
    setIsEditing(false)
  }

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString()
  }

  return (
    <div className={`border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-2 ${className}`}>
      <div className="flex items-start gap-3">
        <Avatar alt="User" />
        
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{comment.authorId}</span>
              <span className="text-xs text-gray-500 dark:text-gray-200">
                {formatTimestamp(comment.createdAt)}
                {comment.isEdited && ' (edited)'}
              </span>
            </div>
            
            {/* Options menu */}
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-xs"
              >
                ⋯
              </button>
              {showOptions && (
                <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 min-w-[100px]">
                  {isAuthor && (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full px-3 py-1 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-1 text-xs"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={handleDeleteClick}
                        className="w-full px-3 py-1 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 flex items-center gap-1 text-xs"
                      >
                        🗑️ Delete
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onReply?.(comment.id!)}
                    className="w-full px-3 py-1 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-1 text-xs"
                  >
                    💬 Reply
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  disabled={loading}
                  className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {comment.content}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLikeClick}
              disabled={loading}
              className={`flex items-center gap-1 text-xs transition-colors ${
                isLiked
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {isLiked ? '❤️' : '🤍'} {comment.likeCount || 0}
            </button>
            
            <button
              onClick={() => onReply?.(comment.id!)}
              className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              💬 Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 