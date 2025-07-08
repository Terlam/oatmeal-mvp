import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { adminAuth } from '@firebase/admin'
import Link from 'next/link'
import { Avatar } from '@components/atoms'
import { ArrowRight } from 'lucide-react'

interface DashboardProps {
  user: {
    name?: string | null
    email?: string | null
    avatarUrl?: string | null
  }
}

const features = [
  {
    title: 'My Oats',
    description: 'View, create, and manage your own oats. Chew, stir, or burn them as you wish!',
    href: '/oats',
    icon: '/oat-bowl.svg',
    cta: 'Go to My Oats',
  },
  {
    title: 'Scooped Oats',
    description: 'See all the oats you’ve scooped (saved) from others. Never lose a favorite recipe!',
    href: '/oats/scoops',
    icon: '/scoop.svg',
    cta: 'View Scoops',
  },
  // Add more features here as you build them!
]

const Dashboard: NextPage<DashboardProps> = ({ user }) => {
  const displayName = user.name ?? 'there'

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Avatar
          src={user.avatarUrl || '/user_icon.png'}
          alt={displayName}
          className="mr-4 w-14 h-14"
        />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Hey {displayName}, ready to conquer the day? 🚀
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Welcome to your dashboard. Explore your oats and more below!
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="block rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow p-5 flex items-center gap-4 animate-fade-in"
          >
            <img
              src={feature.icon}
              alt=""
              className="w-12 h-12 object-contain rounded-full bg-yellow-100 dark:bg-yellow-900"
            />
            <div className="flex-1">
              <div className="font-semibold text-lg">{feature.title}</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</div>
            </div>
            <ArrowRight className="text-yellow-600 dark:text-yellow-400" />
          </Link>
        ))}
      </div>
    </div>
  )
}

// mark this page as requiring auth/layout wrap
;(Dashboard as any).auth = true
export default Dashboard

export const getServerSideProps: GetServerSideProps<DashboardProps> = async ({ req }) => {
  const token = req.cookies.__session || ''
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