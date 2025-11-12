import React, { useState } from 'react'
import { Card, Button, Avatar } from '@components/atoms'
import { useAuthStore } from '@store/authStore'
import { usePostActions } from '../../../hooks/usePosts'
import type { Post } from '../../../types'

interface PostCardProps {
  post: Post
  onChew?: () => void
  onStir?: () => void
  onScoop?: () => void
  onBurn?: () => void
  onDelete?: () => void
  onComment?: () => void
  onEdit?: () => void
  onShare?: () => void
  onReport?: () => void
  className?: string
  showActions?: boolean
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onChew,
  onStir,
  onScoop,
  onDelete,
  onComment,
  onEdit,
  onShare,
  onReport,
  className,
  showActions = true,
}) => {
  const user = useAuthStore((s) => s.user)
  const { handleLike, handleUnlike, handleDelete, loading } = usePostActions()
  const [isLiked, setIsLiked] = useState(post.likes?.includes(user?.uid || '') || false)
  const [showOptions, setShowOptions] = useState(false)

  const isAuthor = user?.uid === post.authorId

  const handleLikeClick = async () => {
    if (!user?.uid) return
    if (isLiked) {
      await handleUnlike(post.id!)
      setIsLiked(false)
    } else {
      await handleLike(post.id!)
      setIsLiked(true)
    }
  }

  const handleDeleteClick = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      if (onDelete) {
        onDelete()
      } else {
        await handleDelete(post.id!)
      }
    }
  }

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString()
  }

  return (
    <Card className={`transition-shadow hover:shadow-lg animate-fade-in ${className ?? ''}`}>
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar userId={post.authorId} alt={'User'} />
            <div>
              <div className="font-bold text-lg">{post.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-200">
                {formatTimestamp(post.createdAt)}
                {post.isEdited && ' (edited)'}
                {post.sharedFromId && ' 🔁 Shared'}
              </div>
            </div>
          </div>
          
          {/* Options menu */}
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              ⋯
            </button>
            {showOptions && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 min-w-[120px]">
                {isAuthor && (
                  <>
                    <button
                      onClick={onEdit}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 flex items-center gap-2"
                    >
                      🗑️ Delete
                    </button>
                  </>
                )}
                <button
                  onClick={onReport}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 flex items-center gap-2"
                >
                  🚩 Report
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="text-gray-600 dark:text-gray-300">{post.content}</div>
        {post.description && (
          <div className="text-sm text-gray-500 dark:text-gray-200">{post.description}</div>
        )}

        {/* Media */}
        {post.media && post.media.length > 0 && (
          <div className="flex gap-2 overflow-x-auto">
            {post.media.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Media ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        {/* Topic tags */}
        {post.topicTags && post.topicTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.topicTags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-200">
          {post.likeCount && post.likeCount > 0 && (
            <span>❤️ {post.likeCount}</span>
          )}
          {post.commentCount && post.commentCount > 0 && (
            <span>💬 {post.commentCount}</span>
          )}
          {post.shareCount && post.shareCount > 0 && (
            <span>🔁 {post.shareCount}</span>
          )}
          {post.chews && post.chews > 0 && (
            <span>🥄 {post.chews}</span>
          )}
        </div>

        {/* Action buttons */}
        {showActions && (
          <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLikeClick}
              disabled={loading}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                isLiked
                  ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {isLiked ? '❤️' : '🤍'} Like
            </button>
            
            <button
              onClick={onComment}
              className="flex items-center gap-1 px-3 py-1 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              💬 Comment
            </button>
            
            <button
              onClick={onShare}
              className="flex items-center gap-1 px-3 py-1 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              🔁 Share
            </button>
            
            {onChew && (
              <button
                onClick={onChew}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                🥄 Chew
              </button>
            )}
            
            {onStir && (
              <button
                onClick={onStir}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                🥄 Stir
              </button>
            )}
            
            {onScoop && (
              <button
                onClick={onScoop}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                🥄 Scoop
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}