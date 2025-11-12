import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  increment,
  serverTimestamp,
  query,
  orderBy,
  where,
  arrayUnion,
  arrayRemove,
  writeBatch,
} from 'firebase/firestore'
import { db } from '@/firebase/clientApp'
import type { Post, PostInteraction, Comment } from '../types'

// Helper function to remove undefined values from post data
const cleanPostData = (data: any): any => {
  const cleaned: any = {}
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      cleaned[key] = data[key]
    }
  })
  return cleaned
}

// Get all social (optionally for a user)
export const getPosts = async (userId?: string): Promise<Post[]> => {
  let q = query(collection(db, 'social'), orderBy('createdAt', 'desc'))
  if (userId) {
    q = query(collection(db, 'social'), where('authorId', '==', userId), orderBy('createdAt', 'desc'))
  }
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post))
}

// Get social created by a specific user
export const getMyPosts = async (userId: string): Promise<Post[]> => {
  return getPosts(userId)
}

// Get social the user has "scooped"
export const getScoopedPosts = async (userId: string): Promise<Post[]> => {
  // Get all scooped post IDs from user's scoops subcollection
  const scoopsSnap = await getDocs(collection(db, 'users', userId, 'scoops'))
  const postIds = scoopsSnap.docs.map(doc => doc.id)
  if (postIds.length === 0) return []
  // Fetch each post by ID (could be optimized with batched query if needed)
  const social = await Promise.all(
    postIds.map(async (id) => {
      const postDoc = await getDoc(doc(db, 'social', id))
      return postDoc.exists() ? ({ id: postDoc.id, ...postDoc.data() } as Post) : null
    })
  )
  return social.filter(Boolean) as Post[]
}

// Get a single post by ID
export const getPost = async (id: string): Promise<Post | null> => {
  const docRef = doc(db, 'social', id)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Post) : null
}

// Create a new post
export const createPost = async (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
  const socialRef = collection(db, 'social')
  
  // Clean the post data to remove undefined values
  const cleanedPost = cleanPostData(post)
  
  return await addDoc(socialRef, {
    ...cleanedPost,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    chews: 0,
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    likes: [],
  })
}

// Update an post
export const updatePost = async (id: string, data: Partial<Post>) => {
  const postRef = doc(db, 'social', id)
  
  // Clean the update data to remove undefined values
  const cleanedData = cleanPostData(data)
  
  return await updateDoc(postRef, {
    ...cleanedData,
    updatedAt: serverTimestamp(),
    isEdited: true,
  })
}

// Delete an post
export const deletePost = async (id: string) => {
  const postRef = doc(db, 'social', id)
  return await deleteDoc(postRef)
}

// Increment chews
export const chewPost = async (id: string) => {
  const postRef = doc(db, 'social', id)
  return await updateDoc(postRef, { chews: increment(1) })
}

// Like an post
export const likePost = async (postId: string, userId: string) => {
  const postRef = doc(db, 'social', postId)
  const batch = writeBatch(db)
  
  // Add user to likes array and increment count
  batch.update(postRef, {
    likes: arrayUnion(userId),
    likeCount: increment(1),
  })
  
  // Record interaction
  const interactionRef = doc(collection(db, 'postInteractions'))
  batch.set(interactionRef, {
    postId,
    userId,
    type: 'like',
    createdAt: serverTimestamp(),
    metadata: { reactionType: 'like' },
  })
  
  return await batch.commit()
}

// Unlike an post
export const unlikePost = async (postId: string, userId: string) => {
  const postRef = doc(db, 'social', postId)
  const batch = writeBatch(db)
  
  // Remove user from likes array and decrement count
  batch.update(postRef, {
    likes: arrayRemove(userId),
    likeCount: increment(-1),
  })
  
  // Remove interaction record
  const interactionsRef = collection(db, 'postInteractions')
  const q = query(
    interactionsRef,
    where('postId', '==', postId),
    where('userId', '==', userId),
    where('type', '==', 'like')
  )
  const snapshot = await getDocs(q)
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref)
  })
  
  return await batch.commit()
}

// Share/reshare an post
export const sharePost = async (originalPostId: string, userId: string, shareData: {
  title?: string
  content?: string
  platform?: string
}) => {
  const originalPost = await getPost(originalPostId)
  if (!originalPost) throw new Error('Original post not found')
  
  const batch = writeBatch(db)
  
  // Create new post as a share
  const newPostRef = doc(collection(db, 'social'))
  batch.set(newPostRef, {
    title: shareData.title || originalPost.title,
    content: shareData.content || originalPost.content,
    authorId: userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    sharedFromId: originalPostId,
    sharedFromAuthorId: originalPost.authorId,
    chews: 0,
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    likes: [],
  })
  
  // Increment share count on original post
  const originalPostRef = doc(db, 'social', originalPostId)
  batch.update(originalPostRef, {
    shareCount: increment(1),
  })
  
  // Record interaction
  const interactionRef = doc(collection(db, 'postInteractions'))
  batch.set(interactionRef, {
    postId: originalPostId,
    userId,
    type: 'share',
    createdAt: serverTimestamp(),
    metadata: { sharePlatform: shareData.platform },
  })
  
  return await batch.commit()
}

// Report an post
export const reportPost = async (postId: string, userId: string, reason: string) => {
  const postRef = doc(db, 'social', postId)
  const batch = writeBatch(db)
  
  // Add user to reportedBy array
  batch.update(postRef, {
    reportedBy: arrayUnion(userId),
    isReported: true,
  })
  
  // Record interaction
  const interactionRef = doc(collection(db, 'postInteractions'))
  batch.set(interactionRef, {
    postId,
    userId,
    type: 'report',
    createdAt: serverTimestamp(),
    metadata: { reportReason: reason },
  })
  
  return await batch.commit()
}

// Check if user has liked an post
export const hasUserLikedPost = async (postId: string, userId: string): Promise<boolean> => {
  const post = await getPost(postId)
  return post?.likes?.includes(userId) || false
}

// Get post interactions for a user
export const getUserPostInteractions = async (userId: string): Promise<PostInteraction[]> => {
  const q = query(
    collection(db, 'postInteractions'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PostInteraction))
}