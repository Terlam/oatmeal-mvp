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

// Get RSVP by user ID
export const getRSVPByUser = async (eventId: string, userId: string): Promise<RSVP | null> => {
  const q = query(
    collection(db, 'events', eventId, 'rsvps'),
    where('userId', '==', userId)
  )
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const doc = snapshot.docs[0]
  return { id: doc.id, ...doc.data() } as RSVP
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

// Create RSVP
export const createRSVP = async (
  eventId: string,
  rsvp: Omit<RSVP, 'id' | 'eventId' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const rsvpsRef = collection(db, 'events', eventId, 'rsvps')
  const cleanedRSVP = cleanData(rsvp)
  
  const docRef = await addDoc(rsvpsRef, {
    ...cleanedRSVP,
    eventId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  
  return docRef.id
}

// Update RSVP
export const updateRSVP = async (
  eventId: string,
  rsvpId: string,
  data: Partial<RSVP>
): Promise<void> => {
  const rsvpRef = doc(db, 'events', eventId, 'rsvps', rsvpId)
  const cleanedData = cleanData(data)
  
  await updateDoc(rsvpRef, {
    ...cleanedData,
    updatedAt: serverTimestamp(),
  })
}

// Delete RSVP
export const deleteRSVP = async (eventId: string, rsvpId: string): Promise<void> => {
  const rsvpRef = doc(db, 'events', eventId, 'rsvps', rsvpId)
  await deleteDoc(rsvpRef)
}

// Create or update RSVP (upsert)
export const upsertRSVP = async (
  eventId: string,
  rsvp: Omit<RSVP, 'id' | 'eventId' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  // Check if RSVP already exists
  const existingRSVP = await getRSVPByUser(eventId, rsvp.userId)
  
  if (existingRSVP) {
    // Update existing RSVP
    await updateRSVP(eventId, existingRSVP.id!, {
      status: rsvp.status,
      guestCount: rsvp.guestCount,
      message: rsvp.message,
    })
    return existingRSVP.id!
  } else {
    // Create new RSVP
    return await createRSVP(eventId, rsvp)
  }
}

