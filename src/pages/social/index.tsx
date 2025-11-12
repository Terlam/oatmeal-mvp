import { useAuthStore } from '@store/authStore'
import { useMyPosts, usePostActions } from '@features/social/social/hooks/usePosts'
import { FeedGrid } from '@features/social/social/components/organisms/FeedGrid'
import { PostForm } from '@features/social/social/components/molecules/PostForm'
import { createPost } from '@features/social/social/services/postService'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function MyPostsPage() {
  const user = useAuthStore((s) => s.user)
  const userId = user?.uid
  const { posts, loading, refetch } = useMyPosts(userId || '')
  const { handleChew, handleDelete } = usePostActions()
  const router = useRouter()
  const [formOpen, setFormOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!userId) return <div className="p-8 text-center">Please sign in to see your posts.</div>

  const handleCreate = async (data: { title: string; content: string; image?: File }) => {
    setSubmitting(true)
    try {
      // Only pass defined fields to createPost
      const postData: { title: string; content: string; authorId: string } = {
        title: data.title,
        content: data.content,
        authorId: userId,
      }
      
      await createPost(postData)
      setFormOpen(false)
      refetch() // Refresh the posts list
    } catch (error) {
      console.error('Failed to create post:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChewPost = async (id: string) => {
    await handleChew(id)
    refetch() // Refresh to show updated chew count
  }

  const handleDeletePost = async (id: string) => {
    await handleDelete(id)
    refetch() // Refresh to remove deleted post
  }

  const handleComment = (id: string) => {
    router.push(`/social/${id}#comments`)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Posts</h1>
      <button onClick={() => setFormOpen(true)} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">Create Post</button>
      {formOpen && (
        <PostForm onSubmit={handleCreate} loading={submitting} />
      )}
      {loading ? (
        <div className="text-center py-12">Loading…</div>
      ) : (
        <FeedGrid posts={posts} onChew={handleChewPost} onDelete={handleDeletePost} onComment={handleComment} />
      )}
    </div>
  )
}