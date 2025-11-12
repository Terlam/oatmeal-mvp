import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '@/firebase/clientApp'

// Upload event cover image
export const uploadEventCoverImage = async (
  eventId: string,
  file: File,
  userId: string
): Promise<string> => {
  const storageRef = ref(storage, `events/${eventId}/cover/${file.name}`)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}

// Upload dish photo
export const uploadDishPhoto = async (
  eventId: string,
  itemId: string,
  file: File,
  userId: string
): Promise<string> => {
  const storageRef = ref(storage, `events/${eventId}/dishes/${itemId}/${userId}/${file.name}`)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}

// Upload menu item image
// Note: itemId can be a temporary ID when creating a new item
export const uploadMenuItemImage = async (
  eventId: string,
  itemId: string,
  file: File
): Promise<string> => {
  // Generate unique filename to avoid conflicts
  const timestamp = Date.now()
  const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
  const storageRef = ref(storage, `events/${eventId}/menuItems/${itemId}/${filename}`)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}

// Delete image
export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    const imageRef = ref(storage, imageUrl)
    await deleteObject(imageRef)
  } catch (error) {
    console.error('Error deleting image:', error)
    // Don't throw error if image doesn't exist
  }
}

// Get image URL from storage path
export const getImageUrl = async (storagePath: string): Promise<string> => {
  const imageRef = ref(storage, storagePath)
  return await getDownloadURL(imageRef)
}

