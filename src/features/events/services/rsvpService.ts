import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
} from 'firebase/firestore'
import { db } from '@/firebase/clientApp'
import type { RSVP } from '../types'

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

// Get RSVPs for an event
export const getRSVPs = async (eventId: string): Promise<RSVP[]> => {
  const q = query(
    collection(db, 'events', eventId, 'rsvps'),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RSVP))
}

// Get RSVP by user ID (using userId as document ID)
export const getRSVPByUser = async (eventId: string, userId: string): Promise<RSVP | null> => {
  const rsvpRef = doc(db, 'events', eventId, 'rsvps', userId)
  const rsvpSnap = await getDoc(rsvpRef)
  if (!rsvpSnap.exists()) return null
  return { id: rsvpSnap.id, ...rsvpSnap.data() } as RSVP
}

// Get RSVPs by status
export const getRSVPsByStatus = async (
  eventId: string,
  status: 'going' | 'maybe' | 'not_going'
): Promise<RSVP[]> => {
  const q = query(
    collection(db, 'events', eventId, 'rsvps'),
    where('status', '==', status),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RSVP))
}

// Create RSVP (using userId as document ID for efficient rule checking)
export const createRSVP = async (
  eventId: string,
  rsvp: Omit<RSVP, 'id' | 'eventId' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  // Use userId as document ID for efficient Firestore rule checking
  const rsvpRef = doc(db, 'events', eventId, 'rsvps', rsvp.userId)
  const cleanedRSVP = cleanData(rsvp)
  
  await setDoc(rsvpRef, {
    ...cleanedRSVP,
    eventId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  
  return rsvp.userId
}

// Update RSVP (rsvpId is now the userId)
export const updateRSVP = async (
  eventId: string,
  rsvpId: string, // This is now the userId
  data: Partial<RSVP>
): Promise<void> => {
  const rsvpRef = doc(db, 'events', eventId, 'rsvps', rsvpId)
  const cleanedData = cleanData(data)
  
  await updateDoc(rsvpRef, {
    ...cleanedData,
    updatedAt: serverTimestamp(),
  })
}

// Delete RSVP (rsvpId is now the userId)
export const deleteRSVP = async (eventId: string, rsvpId: string): Promise<void> => {
  const rsvpRef = doc(db, 'events', eventId, 'rsvps', rsvpId)
  await deleteDoc(rsvpRef)
}

// Create or update RSVP (upsert) - uses userId as document ID
export const upsertRSVP = async (
  eventId: string,
  rsvp: Omit<RSVP, 'id' | 'eventId' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  // Check if RSVP already exists
  const existingRSVP = await getRSVPByUser(eventId, rsvp.userId)
  
  if (existingRSVP) {
    // Update existing RSVP (using userId as document ID)
    await updateRSVP(eventId, rsvp.userId, {
      status: rsvp.status,
      guestCount: rsvp.guestCount,
      message: rsvp.message,
    })
    return rsvp.userId
  } else {
    // Create new RSVP (using userId as document ID)
    return await createRSVP(eventId, rsvp)
  }
}

