import React, { useState } from 'react'
import { Comment } from '../Comment'
import { CommentForm } from '../CommentForm'
import { useComments } from '../../../hooks/useComments'
import type { Comment as CommentType } from '../../../types'

interface CommentListProps {
  postId: string
  className?: string
}

export const CommentList: React.FC<CommentListProps> = ({ postId, className }) => {
  const { comments, loading, error, refetch } = useComments(postId)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  const handleCommentSubmit = () => {
    setShowCommentForm(false)
    refetch()
  }

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId)
    setShowCommentForm(true)
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
    setShowCommentForm(false)
  }

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-500 dark:text-gray-200">Loading comments...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400">Failed to load comments</p>
          <button
            onClick={refetch}
            className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Comment form */}
      {showCommentForm && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
          {replyingTo && (
            <div className="mb-3 text-sm text-gray-600 dark:text-gray-200">
              Replying to comment...
            </div>
          )}
          <CommentForm
            postId={postId}
            onSubmit={handleCommentSubmit}
            onCancel={handleCancelReply}
            placeholder={replyingTo ? 'Write your reply...' : 'Add a comment...'}
          />
        </div>
      )}

      {/* Comments */}
      <div className="space-y-2">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-200">
            <p>No comments yet</p>
            <p className="text-sm">Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              postId={postId}
              onReply={handleReply}
            />
          ))
        )}
      </div>

      {/* Add comment button */}
      {!showCommentForm && (
        <button
          onClick={() => setShowCommentForm(true)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-left text-gray-500 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          💬 Add a comment...
        </button>
      )}
    </div>
  )
} 