// src/pages/dashboard.tsx
import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { adminAuth } from '@firebase/admin'
import { DashboardGrid } from '@components/organisms/DashboardGrid'
import { Avatar } from 'flowbite-react'

interface DashboardProps {
  user: {
    name?: string | null
    email?: string | null
    avatarUrl?: string | null
  }
}

const Dashboard: NextPage<DashboardProps> = ({ user }) => {
  const displayName = user.name ?? 'there'

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <Avatar
          img={user.avatarUrl || '/user_icon.png'}
          rounded
          size="lg"
          className="mr-4"
        />
        <h1 className="text-3xl font-bold">
          Hey {displayName}, ready to conquer the day? 🚀
        </h1>
      </div>

      <DashboardGrid />
    </div>
  )
}

// mark this page as requiring auth/layout wrap
;(Dashboard as any).auth = true
export default Dashboard

export const getServerSideProps: GetServerSideProps<DashboardProps> = async ({ req }) => {
  const token = req.cookies.__session || ''
    console.log('SSR: __session cookie:', token?.slice(0, 20))
  const isEmulator = process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true'

  try {
    const decoded = isEmulator
      ? await adminAuth.verifyIdToken(token)
      : await adminAuth.verifySessionCookie(token, true)
    const user = {
      name: decoded.name || null,
      email: decoded.email || null,
      avatarUrl: decoded.picture || null,
    }
    return { props: { user } }
  } catch (err) {
    console.error('SSR token verification failed:', err)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
}