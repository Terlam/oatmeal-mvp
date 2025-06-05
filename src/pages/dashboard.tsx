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

  try {
    const decoded = await adminAuth.verifyIdToken(token)
    const user = {
      name: decoded.name || null,
      email: decoded.email || null,
      avatarUrl: decoded.picture || null,
    }
    return { props: { user } }
  } catch {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
}