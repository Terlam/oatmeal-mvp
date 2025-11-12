import React from 'react'
import { Avatar } from '@/components/atoms/Avatar'
import { Card } from '@/components/atoms/Card'
import { Button } from '@/components/atoms/Button'
import { Trash2, Edit2 } from 'lucide-react'
import type { EventComment } from '../../types'
import clsx from 'clsx'

export interface CommentListProps {
  comments: EventComment[]
  currentUserId?: string
  onEdit?: (commentId: string) => void
  onDelete?: (commentId: string) => void
  className?: string
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  currentUserId,
  onEdit,
  onDelete,
  className,
}) => {
  const formatDate = (timestamp: any) => {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  return (
    <div className={clsx('space-y-4', className)}>
      {comments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-200 text-center py-8">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        comments.map((comment) => {
          const canEdit = comment.userId === currentUserId
          const canDelete = comment.userId === currentUserId

          return (
            <Card
              key={comment.id}
              className={clsx(
                'p-4',
                'bg-white dark:bg-gray-800',
                'border border-gray-200 dark:border-gray-700'
              )}
            >
              <div className="flex space-x-3">
                <Avatar
                  src={comment.userAvatarUrl || '/user_icon.png'}
                  alt={comment.userName}
                  className="w-10 h-10"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {comment.userName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-200">
                        {formatDate(comment.createdAt)}
                        {comment.isEdited && (
                          <span className="ml-2 text-xs">(edited)</span>
                        )}
                      </p>
                    </div>
                    {(canEdit || canDelete) && (
                      <div className="flex space-x-2">
                        {canEdit && (
                          <Button
                            size="sm"
                            color="light"
                            onClick={() => onEdit?.(comment.id!)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button
                            size="sm"
                            color="light"
                            onClick={() => onDelete?.(comment.id!)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {comment.content}
                  </p>
                </div>
              </div>
            </Card>
          )
        })
      )}
    </div>
  )
}

