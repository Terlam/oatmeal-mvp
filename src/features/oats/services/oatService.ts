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
} from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import type { Oat } from '../types'

// Get all oats (optionally for a user)
export const getOats = async (userId?: string): Promise<Oat[]> => {
  let q = query(collection(db, 'oats'), orderBy('createdAt', 'desc'))
  if (userId) {
    q = query(collection(db, 'oats'), where('authorId', '==', userId), orderBy('createdAt', 'desc'))
  }
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Oat))
}

// Get oats created by a specific user
export const getMyOats = async (userId: string): Promise<Oat[]> => {
  return getOats(userId)
}

// Get oats the user has "scooped"
export const getScoopedOats = async (userId: string): Promise<Oat[]> => {
  // Get all scooped oat IDs from user's scoops subcollection
  const scoopsSnap = await getDocs(collection(db, 'users', userId, 'scoops'))
  const oatIds = scoopsSnap.docs.map(doc => doc.id)
  if (oatIds.length === 0) return []
  // Fetch each oat by ID (could be optimized with batched query if needed)
  const oats = await Promise.all(
    oatIds.map(async (id) => {
      const oatDoc = await getDoc(doc(db, 'oats', id))
      return oatDoc.exists() ? ({ id: oatDoc.id, ...oatDoc.data() } as Oat) : null
    })
  )
  return oats.filter(Boolean) as Oat[]
}

// Get a single oat by ID
export const getOat = async (id: string): Promise<Oat | null> => {
  const docRef = doc(db, 'oats', id)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Oat) : null
}

// Create a new oat
export const createOat = async (oat: Omit<Oat, 'id' | 'createdAt'>) => {
  const oatsRef = collection(db, 'oats')
  return await addDoc(oatsRef, {
    ...oat,
    createdAt: serverTimestamp(),
    chews: 0,
  })
}

// Update an oat
export const updateOat = async (id: string, data: Partial<Oat>) => {
  const oatRef = doc(db, 'oats', id)
  return await updateDoc(oatRef, data)
}

// Delete an oat
export const deleteOat = async (id: string) => {
  const oatRef = doc(db, 'oats', id)
  return await deleteDoc(oatRef)
}

// Increment chews
export const chewOat = async (id: string) => {
  const oatRef = doc(db, 'oats', id)
  return await updateDoc(oatRef, { chews: increment(1) })
}