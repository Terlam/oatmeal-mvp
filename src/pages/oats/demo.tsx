import { useAuthStore } from '@store/authStore'
import { usePosts } from '@features/social/hooks/usePosts'
import { usePostActions } from '@features/social/hooks/usePosts'
import { PostCard } from '@features/social/components/organisms/PostCard'
import { CommentList } from '@features/social/components/molecules/CommentList'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function PostsDemoPage() {
  const user = useAuthStore((s) => s.user)
  const { social, loading, refetch } = usePosts() // Get all social
  const { handleLike, handleUnlike, handleShare, handleReport, handleChew, handleDelete } = usePostActions()
  const router = useRouter()
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)

  const handleComment = (id: string) => {
    setSelectedPostId(id)
  }

  const handleEdit = (id: string) => {
    router.push(`/social/${id}`)
  }

  const handleSharePost = async (id: string) => {
    try {
      await handleShare(id, {
        title: 'Check out this post!',
        content: 'I found this interesting post on Postmeal',
        platform: 'internal'
      })
      alert('Post shared successfully!')
      refetch()
    } catch (error) {
      console.error('Failed to share post:', error)
    }
  }

  const handleReportPost = async (id: string) => {
    try {
      await handleReport(id, 'demo-report')
      alert('Post reported successfully!')
    } catch (error) {
      console.error('Failed to report post:', error)
    }
  }

  const handleChewPost = async (id: string) => {
    await handleChew(id)
    refetch()
  }

  const handleDeletePost = async (id: string) => {
    await handleDelete(id)
    refetch()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Postmeal Social Features Demo</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Explore the new social features for social including likes, comments, shares, and more!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">❤️ Like</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">Give kudos to social you enjoy</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-bold text-green-800 dark:text-green-200 mb-2">💬 Comment</h3>
              <p className="text-sm text-green-700 dark:text-green-300">Share your thoughts and replies</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-2">🔁 Share</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">Amplify social by reposting</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">✏️ Edit</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Update your social (authors only)</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">🗑️ Delete</h3>
              <p className="text-sm text-red-700 dark:text-red-300">Remove social (authors only)</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-2">🚩 Report</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300">Flag content for moderation</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading social...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {social.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onChew={() => handleChewPost(post.id!)}
                  onDelete={() => handleDeletePost(post.id!)}
                  onComment={() => handleComment(post.id!)}
                  onEdit={() => handleEdit(post.id!)}
                  onShare={() => handleSharePost(post.id!)}
                  onReport={() => handleReportPost(post.id!)}
                  showActions={true}
                />
              ))}
            </div>

            {/* Comments Section */}
            {selectedPostId && (
              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Comments</h2>
                  <button
                    onClick={() => setSelectedPostId(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ✕ Close
                  </button>
                </div>
                <CommentList postId={selectedPostId} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 