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
  where,
} from 'firebase/firestore'
import { db } from '@/firebase/clientApp'
import type { Event } from '../types'

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

// Get all events (optionally filtered by host)
export const getEvents = async (hostId?: string): Promise<Event[]> => {
  let q = query(collection(db, 'events'), orderBy('eventDate', 'asc'))
  if (hostId) {
    q = query(collection(db, 'events'), where('hostId', '==', hostId), orderBy('eventDate', 'asc'))
  }
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event))
}

// Get public events
export const getPublicEvents = async (): Promise<Event[]> => {
  const q = query(
    collection(db, 'events'),
    where('isPublic', '==', true),
    orderBy('eventDate', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event))
}

// Get event by ID
export const getEvent = async (id: string): Promise<Event | null> => {
  const docRef = doc(db, 'events', id)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Event) : null
}

// Get event by share token
export const getEventByShareToken = async (shareToken: string): Promise<Event | null> => {
  const q = query(
    collection(db, 'events'),
    where('shareToken', '==', shareToken),
    where('isPublic', '==', true)
  )
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const doc = snapshot.docs[0]
  return { id: doc.id, ...doc.data() } as Event
}

// Create event
export const createEvent = async (
  event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const eventsRef = collection(db, 'events')
  const cleanedEvent = cleanData(event)
  
  // Generate share token if event is public
  let shareToken: string | undefined = undefined
  if (cleanedEvent.isPublic) {
    shareToken = generateShareToken()
  }
  
  const docRef = await addDoc(eventsRef, {
    ...cleanedEvent,
    ...(shareToken && { shareToken }),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  
  return docRef.id
}

// Update event
export const updateEvent = async (id: string, data: Partial<Event>): Promise<void> => {
  const eventRef = doc(db, 'events', id)
  const cleanedData = cleanData(data)
  
  // Generate share token if making event public and token doesn't exist
  if (cleanedData.isPublic && !cleanedData.shareToken) {
    cleanedData.shareToken = generateShareToken()
  }
  
  await updateDoc(eventRef, {
    ...cleanedData,
    updatedAt: serverTimestamp(),
  })
}

// Delete event
export const deleteEvent = async (id: string): Promise<void> => {
  const eventRef = doc(db, 'events', id)
  await deleteDoc(eventRef)
}

// Generate unique share token
const generateShareToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Check if user is event host
export const isEventHost = async (eventId: string, userId: string): Promise<boolean> => {
  const event = await getEvent(eventId)
  return event?.hostId === userId
}

