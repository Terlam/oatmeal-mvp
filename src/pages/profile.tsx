import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/store/authStore'
import { ProfileCard, LinkedAccounts } from '@/features/profile'
import { useLinkedAccounts } from '@/features/profile/hooks/useLinkedAccounts'

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

  const handleProfileUpdate = () => {
    // Refresh the page to get updated data from server
    router.replace(router.asPath)
  }

  return (
    <main className="py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
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
    </main>
  )
}

// Note: getServerSideProps removed for static export compatibility
// Auth is now handled client-side via useAuthStore

(ProfilePage as any).auth = true
export default ProfilePage