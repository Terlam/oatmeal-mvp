import React, { useState } from 'react'
import { ProfileForm, ProfileData } from '@/components/organisms/ProfileForm'
import { DietaryPreferencesForm } from '@/features/profile/components/DietaryPreferencesForm'
import { useAuthStore } from '@/store/authStore'
import { updateProfile } from 'firebase/auth'
import { updateUserProfile } from '@/features/profile/services/profileService'
import { useDietaryPreferences } from '@/features/profile/hooks/useDietaryPreferences'
import type { UserDietaryPreferences } from '@/types/dietary'

const SettingsPage: React.FC = () => {
  const authUser = useAuthStore((s) => s.user)
  const { preferences, refetch } = useDietaryPreferences(authUser?.uid)
  const [savingPreferences, setSavingPreferences] = useState(false)
  
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

  const handleDietaryPreferencesUpdate = async (prefs: UserDietaryPreferences) => {
    try {
      setSavingPreferences(true)
      await updateUserProfile({ dietaryPreferences: prefs })
      await refetch()
    } catch (error) {
      console.error('Error updating dietary preferences:', error)
      throw error
    } finally {
      setSavingPreferences(false)
    }
  }

  return (
    <main className="py-12 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Settings</h1>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
        <ProfileForm user={user} onUpdate={handleUpdate} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Dietary Preferences & Restrictions</h2>
        <DietaryPreferencesForm
          initialPreferences={preferences || undefined}
          onSubmit={handleDietaryPreferencesUpdate}
          loading={savingPreferences}
        />
      </div>
    </main>
  )
}

// Note: getServerSideProps removed for static export compatibility
// Auth is now handled client-side via useAuthStore

(SettingsPage as any).auth = true
export default SettingsPage
