import { updateProfile } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage, auth } from '@/firebase/clientApp'
import { serverTimestamp } from 'firebase/firestore'

export interface UpdateProfileData {
  displayName?: string
  username?: string
  photoURL?: string
  avatarFile?: File
}

// Upload avatar image to Firebase Storage
export const uploadAvatarImage = async (
  userId: string,
  file: File
): Promise<string> => {
  // Generate unique filename to avoid conflicts
  const timestamp = Date.now()
  const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
  const storageRef = ref(storage, `avatars/${userId}/${filename}`)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}

// Update user profile in Firebase Auth
export const updateUserProfile = async (
  data: UpdateProfileData
): Promise<void> => {
  const user = auth.currentUser
  if (!user) {
    throw new Error('User not authenticated')
  }

  const updateData: { displayName?: string; photoURL?: string } = {}

  // If avatar file is provided, upload it first
  if (data.avatarFile) {
    const photoURL = await uploadAvatarImage(user.uid, data.avatarFile)
    updateData.photoURL = photoURL
  } else if (data.photoURL) {
    updateData.photoURL = data.photoURL
  }

  // Update display name if provided
  if (data.displayName !== undefined) {
    updateData.displayName = data.displayName
  }

  // Update Firebase Auth profile
  await updateProfile(user, updateData)

  // Also update user document in Firestore if it exists
  const userRef = doc(db, 'users', user.uid)
  const userDoc = await getDoc(userRef)
  
  const userData: any = {
    displayName: updateData.displayName || user.displayName,
    photoURL: updateData.photoURL || user.photoURL,
    email: user.email,
    updatedAt: serverTimestamp(),
  }

  // Update username if provided
  if (data.username !== undefined) {
    userData.username = data.username.trim() || null
  }

  if (userDoc.exists()) {
    await setDoc(userRef, userData, { merge: true })
  } else {
    userData.createdAt = serverTimestamp()
    await setDoc(userRef, userData)
  }
}

