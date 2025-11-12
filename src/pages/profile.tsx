import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { adminAuth, adminDb } from '@firebase'
import { ProfileCard, LinkedAccounts } from '@/features/profile'
import { useLinkedAccounts } from '@/features/profile/hooks/useLinkedAccounts'

interface ProfilePageProps {
  uid: string
  email: string | null
  name: string | null
  username: string | null
  avatarUrl: string | null
}

const ProfilePage: NextPage<ProfilePageProps> = ({ uid, email, name, username, avatarUrl }) => {
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.__session || ''
  try {
    const decoded = await adminAuth.verifyIdToken(token)
    
    // Fetch username from Firestore user document
    let username: string | null = null
    try {
      const userDoc = await adminDb.collection('users').doc(decoded.uid).get()
      if (userDoc.exists) {
        username = userDoc.data()?.username || null
      }
    } catch (error) {
      console.error('Error fetching username:', error)
      // Continue without username if Firestore fetch fails
    }
    
    return {
      props: {
        uid: decoded.uid,
        email: decoded.email || null,
        name: decoded.name || null,
        username,
        avatarUrl: decoded.picture || null,
      },
    }
  } catch {
    return {
      redirect: { destination: '/login', permanent: false },
    }
  }
}

(ProfilePage as any).auth = true
export default ProfilePage