import React from 'react'
import { NextPage } from 'next'
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'
import { Avatar } from '@/components/atoms/Avatar'
import { ArrowRight } from 'lucide-react'

// Props now come from client-side auth store

const features = [
  {
    title: 'My Events',
    description: 'View, create, and manage your potluck events. Plan perfect gatherings with your family!',
    href: '/events',
    icon: '🎉',
    cta: 'Go to Events',
  },
  {
    title: 'Create Event',
    description: 'Create a new potluck event. Set the date, time, location, and invite your family!',
    href: '/events/create',
    icon: '➕',
    cta: 'Create Event',
  },
  // Add more features here as you build them!
]

const Dashboard: NextPage = () => {
  const user = useAuthStore((s) => s.user)
  const displayName = user?.displayName ?? 'there'

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/hero1.png')" }}
    >
      {/* Film Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-fuchsia-700/60 to-yellow-400/30" />
      
      {/* Content Container */}
      <div className="relative z-10 p-4 sm:p-8 max-w-2xl mx-auto">
        <div className="rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 md:p-8 mt-4 sm:mt-8 mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <Avatar
              src={'/user_icon.png'}
              alt={displayName}
              className="w-12 h-12 sm:w-14 sm:h-14 sm:mr-4"
            />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Hey {displayName}, ready to plan the perfect potluck? 🦃
              </h1>
              <p className="text-gray-500 dark:text-gray-200 text-sm mt-1">
                Welcome to your dashboard. Explore your events and plan amazing gatherings!
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="block rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5 flex items-center gap-3 sm:gap-4 animate-fade-in min-h-[60px]"
              >
                <div className="w-12 h-12 flex items-center justify-center text-3xl rounded-full bg-orange-100 dark:bg-orange-900">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg text-gray-900 dark:text-white">{feature.title}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</div>
                </div>
                <ArrowRight className="text-orange-600 dark:text-orange-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// mark this page as requiring auth/layout wrap
;(Dashboard as any).auth = true
export default Dashboard

// Note: getServerSideProps removed for static export compatibility
// Auth is now handled client-side via useAuthStore