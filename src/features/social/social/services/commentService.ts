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
import { db } from '../../../firebase/clientApp'
import type { Comment } from '../types'

// Helper function to remove undefined values from comment data
const cleanCommentData = (data: any): any => {
  const cleaned: any = {}
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      cleaned[key] = data[key]
    }
  })
  return cleaned
}

// Get comments for an post
export const getComments = async (postId: string): Promise<Comment[]> => {
  const q = query(
    collection(db, 'social', postId, 'comments'),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment))
}

// Get a single comment
export const getComment = async (postId: string, commentId: string): Promise<Comment | null> => {
  const docRef = doc(db, 'social', postId, 'comments', commentId)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Comment) : null
}

// Create a comment
export const createComment = async (postId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>) => {
  const batch = writeBatch(db)
  
  // Clean the comment data to remove undefined values
  const cleanedComment = cleanCommentData(comment)
  
  // Add comment
  const commentRef = doc(collection(db, 'social', postId, 'comments'))
  batch.set(commentRef, {
    ...cleanedComment,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    likeCount: 0,
    likes: [],
  })
  
  // Increment comment count on post
  const postRef = doc(db, 'social', postId)
  batch.update(postRef, {
    commentCount: increment(1),
  })
  
  return await batch.commit()
}

// Update a comment
export const updateComment = async (postId: string, commentId: string, data: Partial<Comment>) => {
  const commentRef = doc(db, 'social', postId, 'comments', commentId)
  
  // Clean the update data to remove undefined values
  const cleanedData = cleanCommentData(data)
  
  return await updateDoc(commentRef, {
    ...cleanedData,
    updatedAt: serverTimestamp(),
    isEdited: true,
  })
}

// Delete a comment
export const deleteComment = async (postId: string, commentId: string) => {
  const batch = writeBatch(db)
  
  // Delete comment
  const commentRef = doc(db, 'social', postId, 'comments', commentId)
  batch.delete(commentRef)
  
  // Decrement comment count on post
  const postRef = doc(db, 'social', postId)
  batch.update(postRef, {
    commentCount: increment(-1),
  })
  
  return await batch.commit()
}

// Like a comment
export const likeComment = async (postId: string, commentId: string, userId: string) => {
  const commentRef = doc(db, 'social', postId, 'comments', commentId)
  return await updateDoc(commentRef, {
    likes: arrayUnion(userId),
    likeCount: increment(1),
  })
}

// Unlike a comment
export const unlikeComment = async (postId: string, commentId: string, userId: string) => {
  const commentRef = doc(db, 'social', postId, 'comments', commentId)
  return await updateDoc(commentRef, {
    likes: arrayRemove(userId),
    likeCount: increment(-1),
  })
}

// Report a comment
export const reportComment = async (postId: string, commentId: string, userId: string, reason: string) => {
  const commentRef = doc(db, 'social', postId, 'comments', commentId)
  return await updateDoc(commentRef, {
    reportedBy: arrayUnion(userId),
    isReported: true,
  })
}

// Check if user has liked a comment
export const hasUserLikedComment = async (postId: string, commentId: string, userId: string): Promise<boolean> => {
  const comment = await getComment(postId, commentId)
  return comment?.likes?.includes(userId) || false
}

// Get comments by a specific user
export const getUserComments = async (userId: string): Promise<Comment[]> => {
  const q = query(
    collection(db, 'comments'),
    where('authorId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment))
} 