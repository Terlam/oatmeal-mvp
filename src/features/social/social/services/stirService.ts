import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import type { Stir } from '../types'

export const createStir = async (postId: string, stir: Omit<Stir, 'createdAt'>) => {
  const stirsRef = collection(db, 'social', postId, 'stirs')
  return await addDoc(stirsRef, {
    ...stir,
    createdAt: serverTimestamp(),
  })
}

export const getStirs = async (postId: string): Promise<Stir[]> => {
  const q = query(collection(db, 'social', postId, 'stirs'), orderBy('createdAt'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Stir))
}