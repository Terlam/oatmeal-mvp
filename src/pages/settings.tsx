import React from 'react'
import { ProfileForm, ProfileData } from '@/components/organisms/ProfileForm'
import { useAuthStore } from '@/store/authStore'
import { updateProfile } from 'firebase/auth'

const SettingsPage: React.FC = () => {
  const authUser = useAuthStore((s) => s.user)
  
  if (!authUser) {
    return (
      <main className="py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
        <p className="text-center">Please sign in to view your settings.</p>
      </main>
    )
  }
  
  const user = authUser

  const handleUpdate = async (data: ProfileData) => {
    const displayName = `${data.firstName} ${data.lastName}`.trim()
    const photoURL = user.photoURL

    // If you uploaded a new avatar, your ProfileForm already did that to Storage
    if (data.avatarFile) {
      // fetch the latest URL from storage (or pass it back via onUpdate)
      // e.g. photoURL = await getDownloadURL(...)
    }

    await updateProfile(user, { displayName, photoURL })
  }

  return (
    <main className="py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
      <ProfileForm user={user} onUpdate={handleUpdate} />
    </main>
  )
}

// Note: getServerSideProps removed for static export compatibility
// Auth is now handled client-side via useAuthStore

(SettingsPage as any).auth = true
export default SettingsPage
