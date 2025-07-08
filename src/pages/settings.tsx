import { GetServerSideProps } from 'next'
import React from 'react'
import { ProfileForm, ProfileData } from '@components/organisms/ProfileForm'
import { adminAuth } from '@firebase/admin'
import { auth as clientAuth } from '@firebase/clientApp'
import { updateProfile } from 'firebase/auth'

interface SettingsPageProps {
  uid: string
}

const SettingsPage: React.FC<SettingsPageProps> = ({ uid }) => {
  const user = clientAuth.currentUser!

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.__session || ''
  try {
    const decoded = await adminAuth.verifyIdToken(token)
    return { props: { uid: decoded.uid } }
  } catch {
    return {
      redirect: { destination: '/login', permanent: false },
    }
  }
}

(SettingsPage as any).auth = true
export default SettingsPage
