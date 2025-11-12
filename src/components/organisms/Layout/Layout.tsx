import React, { useEffect } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarLink,
  NavbarToggle,
  NavbarCollapse,
  Avatar,
} from 'flowbite-react'
import Link from 'next/link'
import { useAuthStore, useThemeStore } from '../../../store'
import { useRouter } from 'next/router'
import { FcGoogle } from 'react-icons/fc'

type LayoutProps = {
  children: React.ReactNode
  isLoading: boolean
  isLoggedIn: boolean
  userName?: string | null
  userEmail?: string | null
  userAvatarUrl?: string | null
  onSignIn?: () => void
  onAbout?: () => void
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  isLoading,
  isLoggedIn,
  userName,
  userEmail,
  userAvatarUrl,
  onSignIn,
  onAbout,
}) => {
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle)
  const loading = useAuthStore((s) => s.loading)
  const theme = useThemeStore((s) => s.theme)

  // Ensure <html> class is always in sync with system theme
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [theme])

  return (
    <div className="flex flex-col min-h-screen transition-colors bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <header className="shadow-md transition-colors bg-white dark:bg-gray-900 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <Navbar fluid rounded className="bg-transparent dark:bg-transparent">
          <NavbarBrand href="/">
            <span className="self-center text-2xl mr-2">🦃</span>
            <span className="self-center text-xl font-semibold">
              Potluck Planner
            </span>
          </NavbarBrand>
          <div className="flex items-center md:order-2 space-x-2">
            {isLoading ? (
              <span>Loading…</span>
            ) : isLoggedIn ? (
              <>
                <Link href="/profile" className="mr-2 block">
                  <Avatar
                    img={userAvatarUrl || '/user_icon.png'}
                    alt={userName || 'User'}
                    rounded
                    size="md"
                    className="cursor-pointer hover:ring-2 hover:ring-yellow-500 dark:hover:ring-yellow-400 transition-all hover:scale-110"
                  />
                </Link>
                <button
                  onClick={async () => {
                    await logout()
                    router.push('/')
                  }}
                  className="ml-2 px-3 py-1 bg-blue-600 text-white rounded dark:bg-yellow-500 dark:text-gray-900 transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={loginWithGoogle}
                disabled={loading}
                className="ml-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FcGoogle size={20} />
                {loading ? 'Signing in...' : 'Sign in with Google'}
              </button>
            )}
            <NavbarToggle />
          </div>
          <NavbarCollapse>
            <NavbarLink href="#" onClick={e => { e.preventDefault(); onAbout && onAbout(); }}>About</NavbarLink>
            <NavbarLink href="/events" active={router.pathname === '/events'}>Events</NavbarLink>
            {isLoggedIn && (
              <NavbarLink href="/dashboard" active={router.pathname === '/dashboard'}>Dashboard</NavbarLink>
            )}
          </NavbarCollapse>
        </Navbar>
      </header>
      <main className="flex-grow container mx-auto p-4 transition-colors">{children}</main>
      <footer className="py-6 mt-auto transition-colors bg-white dark:bg-gray-900 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <Link href="/" className="flex items-center mb-4 md:mb-0">
            <span className="text-2xl mr-2">🦃</span>
            <span className="text-lg font-semibold">Potluck Planner</span>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-200">
            © {new Date().getFullYear()} Potluck Planner.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}