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
import type { MenuItem } from '../types'

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

// Get menu items for an event
export const getMenuItems = async (eventId: string): Promise<MenuItem[]> => {
  const q = query(
    collection(db, 'events', eventId, 'menuItems'),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem))
}

// Get menu items by category
export const getMenuItemsByCategory = async (
  eventId: string,
  category: string
): Promise<MenuItem[]> => {
  const q = query(
    collection(db, 'events', eventId, 'menuItems'),
    where('category', '==', category),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem))
}

// Get menu item by ID
export const getMenuItem = async (eventId: string, itemId: string): Promise<MenuItem | null> => {
  const docRef = doc(db, 'events', eventId, 'menuItems', itemId)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as MenuItem) : null
}

// Create menu item
export const createMenuItem = async (
  eventId: string,
  item: Omit<MenuItem, 'id' | 'eventId' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const menuItemsRef = collection(db, 'events', eventId, 'menuItems')
  const cleanedItem = cleanData(item)
  
  // If creator is offering to bring it, auto-claim it
  const isClaimed = cleanedItem.isOfferedByCreator || false
  
  // Build the document data, only including claim fields if item is claimed
  const docData: any = {
    ...cleanedItem,
    eventId,
    isClaimed,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  
  // Only add claim-related fields if the item is claimed
  if (isClaimed) {
    docData.claimedBy = cleanedItem.createdBy
    docData.claimedByName = cleanedItem.createdByName
    if (cleanedItem.createdByAvatarUrl) {
      docData.claimedByAvatarUrl = cleanedItem.createdByAvatarUrl
    }
    docData.claimedAt = serverTimestamp()
  }
  
  // Clean the final document to remove any undefined values
  const finalDocData = cleanData(docData)
  
  const docRef = await addDoc(menuItemsRef, finalDocData)
  
  return docRef.id
}

// Update menu item
export const updateMenuItem = async (
  eventId: string,
  itemId: string,
  data: Partial<MenuItem>
): Promise<void> => {
  const itemRef = doc(db, 'events', eventId, 'menuItems', itemId)
  const cleanedData = cleanData(data)
  
  await updateDoc(itemRef, {
    ...cleanedData,
    updatedAt: serverTimestamp(),
  })
}

// Delete menu item
export const deleteMenuItem = async (eventId: string, itemId: string): Promise<void> => {
  const itemRef = doc(db, 'events', eventId, 'menuItems', itemId)
  await deleteDoc(itemRef)
}

// Claim menu item
export const claimMenuItem = async (
  eventId: string,
  itemId: string,
  userId: string,
  userName: string,
  userAvatarUrl?: string
): Promise<void> => {
  const itemRef = doc(db, 'events', eventId, 'menuItems', itemId)
  
  const updateData: any = {
    isClaimed: true,
    claimedBy: userId,
    claimedByName: userName,
    claimedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  
  // Only include avatar URL if provided
  if (userAvatarUrl) {
    updateData.claimedByAvatarUrl = userAvatarUrl
  }
  
  // Clean the update data to remove any undefined values
  const cleanedUpdateData = cleanData(updateData)
  
  await updateDoc(itemRef, cleanedUpdateData)
}

// Unclaim menu item
export const unclaimMenuItem = async (eventId: string, itemId: string): Promise<void> => {
  const itemRef = doc(db, 'events', eventId, 'menuItems', itemId)
  
  await updateDoc(itemRef, {
    isClaimed: false,
    claimedBy: null,
    claimedByName: null,
    claimedByAvatarUrl: null,
    claimedAt: null,
    updatedAt: serverTimestamp(),
  })
}

