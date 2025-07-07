import { GetServerSideProps, NextPage } from 'next'
import { adminAuth } from '@firebase/admin'
import { ProfileCard } from '@features/profile/components/ProfileCard/ProfileCard'
import { LinkedAccounts } from '@features/profile/components/LinkedAccounts/LinkedAccounts'
import { useLinkedAccounts } from '@features/profile/hooks/useLinkedAccounts'

interface ProfilePageProps {
  uid: string
  email: string | null
  name: string | null
  avatarUrl: string | null
}

const ProfilePage: NextPage<ProfilePageProps> = ({ uid, email, name, avatarUrl }) => {
  // Use the hook to manage linked accounts state
  const { accounts, toggle } = useLinkedAccounts()

  return (
    <main className="py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
      <ProfileCard
        name={name}
        email={email}
        avatarUrl={avatarUrl}
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
    return {
      props: {
        uid: decoded.uid,
        email: decoded.email || null,
        name: decoded.name || null,
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