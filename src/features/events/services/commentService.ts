import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/firebase/clientApp'
import type { EventComment } from '../types'

// Helper function to clean undefined values
const cleanData = (data: any): any => {
  const cleaned: any = {}
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      cleaned[key] = data[key]
    }
  })
  return cleaned
}

// Get comments for an event
export const getEventComments = async (eventId: string): Promise<EventComment[]> => {
  const q = query(
    collection(db, 'events', eventId, 'comments'),
    orderBy('createdAt', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventComment))
}

// Get comment by ID
export const getEventComment = async (
  eventId: string,
  commentId: string
): Promise<EventComment | null> => {
  const docRef = doc(db, 'events', eventId, 'comments', commentId)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as EventComment) : null
}

// Create comment
export const createEventComment = async (
  eventId: string,
  comment: Omit<EventComment, 'id' | 'eventId' | 'createdAt' | 'updatedAt' | 'isEdited'>
): Promise<string> => {
  const commentsRef = collection(db, 'events', eventId, 'comments')
  const cleanedComment = cleanData(comment)
  
  const docRef = await addDoc(commentsRef, {
    ...cleanedComment,
    eventId,
    isEdited: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  
  return docRef.id
}

// Update comment
export const updateEventComment = async (
  eventId: string,
  commentId: string,
  data: Partial<EventComment>
): Promise<void> => {
  const commentRef = doc(db, 'events', eventId, 'comments', commentId)
  const cleanedData = cleanData(data)
  
  await updateDoc(commentRef, {
    ...cleanedData,
    isEdited: true,
    updatedAt: serverTimestamp(),
  })
}

// Delete comment
export const deleteEventComment = async (eventId: string, commentId: string): Promise<void> => {
  const commentRef = doc(db, 'events', eventId, 'comments', commentId)
  await deleteDoc(commentRef)
}

