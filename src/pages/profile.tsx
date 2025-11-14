import { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/store/authStore'
import { ProfileCard, LinkedAccounts } from '@/features/profile'
import { useLinkedAccounts } from '@/features/profile/hooks/useLinkedAccounts'
import { ProfileForm, ProfileData } from '@/components/organisms/ProfileForm'
import { DietaryPreferencesForm } from '@/features/profile/components/DietaryPreferencesForm'
import { updateProfile } from 'firebase/auth'
import { updateUserProfile } from '@/features/profile/services/profileService'
import { useDietaryPreferences } from '@/features/profile/hooks/useDietaryPreferences'
import type { UserDietaryPreferences } from '@/types/dietary'

const ProfilePage: NextPage = () => {
  const authUser = useAuthStore((s) => s.user)
  const uid = authUser?.uid || ''
  const email = authUser?.email || null
  const name = authUser?.displayName || null
  const username = null // Would need to fetch from Firestore if needed
  const avatarUrl = authUser?.photoURL || null
  const router = useRouter()
  
  // Use the hook to manage linked accounts state
  const { accounts, toggle } = useLinkedAccounts()
  
  // Dietary preferences
  const { preferences, refetch } = useDietaryPreferences(authUser?.uid)
  const [savingPreferences, setSavingPreferences] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingDietary, setIsEditingDietary] = useState(false)

  const handleProfileUpdate = () => {
    // Refresh the page to get updated data from server
    router.replace(router.asPath)
  }

  const handleProfileFormUpdate = async (data: ProfileData) => {
    if (!authUser) return
    
    const displayName = `${data.firstName} ${data.lastName}`.trim()
    const photoURL = authUser.photoURL

    // If you uploaded a new avatar, your ProfileForm already did that to Storage
    if (data.avatarFile) {
      // fetch the latest URL from storage (or pass it back via onUpdate)
      // e.g. photoURL = await getDownloadURL(...)
    }

    await updateProfile(authUser, { displayName, photoURL })
    setIsEditingProfile(false)
    handleProfileUpdate()
  }

  const handleDietaryPreferencesUpdate = async (prefs: UserDietaryPreferences) => {
    try {
      setSavingPreferences(true)
      await updateUserProfile({ dietaryPreferences: prefs })
      await refetch()
      setIsEditingDietary(false)
    } catch (error) {
      console.error('Error updating dietary preferences:', error)
      throw error
    } finally {
      setSavingPreferences(false)
    }
  }

  if (!authUser) {
    return (
      <main className="py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
        <p className="text-center">Please sign in to view your profile.</p>
      </main>
    )
  }

  return (
    <main className="py-12 max-w-4xl mx-auto space-y-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
      
      {/* Profile Card View/Edit */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Profile Information</h2>
          {!isEditingProfile && (
            <button
              onClick={() => setIsEditingProfile(true)}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white transition-colors"
            >
              Edit
            </button>
          )}
        </div>
        {isEditingProfile ? (
          <ProfileForm 
            user={authUser} 
            onUpdate={handleProfileFormUpdate}
            onCancel={() => setIsEditingProfile(false)}
          />
        ) : (
          <>
            <ProfileCard
              name={name}
              username={username}
              email={email}
              avatarUrl={avatarUrl}
              onUpdate={handleProfileUpdate}
            />
            <div className="mt-8">
              <LinkedAccounts accounts={accounts} toggle={toggle} />
            </div>
          </>
        )}
      </div>

      {/* Dietary Preferences View/Edit */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Dietary Preferences & Restrictions</h2>
          {!isEditingDietary && (
            <button
              onClick={() => setIsEditingDietary(true)}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white transition-colors"
            >
              {preferences ? 'Edit' : 'Add Preferences'}
            </button>
          )}
        </div>
        {isEditingDietary ? (
          <DietaryPreferencesForm
            initialPreferences={preferences || undefined}
            onSubmit={handleDietaryPreferencesUpdate}
            onCancel={() => setIsEditingDietary(false)}
            loading={savingPreferences}
          />
        ) : (
          preferences ? (
            <div className="bg-yellow-50 dark:bg-gray-800 border-2 border-yellow-200 dark:border-gray-700 rounded-lg p-6">
              <div className="space-y-4">
                {preferences.restrictions && preferences.restrictions.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Dietary Restrictions</h3>
                    <div className="flex flex-wrap gap-2">
                      {preferences.restrictions.map((restriction) => (
                        <span
                          key={restriction}
                          className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                        >
                          {restriction}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {preferences.allergies && preferences.allergies.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Food Allergies</h3>
                    <div className="flex flex-wrap gap-2">
                      {preferences.allergies.map((allergy) => (
                        <span
                          key={allergy}
                          className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {preferences.customAllergies && preferences.customAllergies.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Allergies</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {preferences.customAllergies.join(', ')}
                    </p>
                  </div>
                )}
                {preferences.customRestrictions && preferences.customRestrictions.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Restrictions</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {preferences.customRestrictions.join(', ')}
                    </p>
                  </div>
                )}
                {preferences.allergySeverity && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Allergy Severity</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {preferences.allergySeverity}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No dietary preferences set. Click "Add Preferences" to get started.
              </p>
            </div>
          )
        )}
      </div>
    </main>
  )
}

// Note: getServerSideProps removed for static export compatibility
// Auth is now handled client-side via useAuthStore

(ProfilePage as any).auth = true
export default ProfilePage