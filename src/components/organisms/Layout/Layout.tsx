import React, { useState, useEffect } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarLink,
  NavbarToggle,
  NavbarCollapse,
  Avatar,
} from 'flowbite-react'
import { Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore, useThemeStore } from '../../../store'
import { useRouter } from 'next/router'

type LayoutProps = {
  children: React.ReactNode
  isLoading: boolean
  isLoggedIn: boolean
  userName?: string | null
  userEmail?: string | null
  userAvatarUrl?: string | null
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  isLoading,
  isLoggedIn,
  userName,
  userEmail,
  userAvatarUrl,
}) => {
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)
  const theme = useThemeStore((s) => s.theme)
  const toggle = useThemeStore((s) => s.toggle)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="flex flex-col min-h-screen transition-colors bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <header className="shadow-md transition-colors bg-white dark:bg-gray-900">
        <Navbar fluid rounded className="bg-transparent dark:bg-transparent">
          <NavbarBrand href="/">
            <Avatar
              alt="Logo"
              img={`/oatmeal_${theme}_logo.png`}
              rounded
              size="md"
            />
            <span className="self-center text-xl font-semibold ml-2">
              Oatmeal MVP
            </span>
          </NavbarBrand>
          <div className="flex items-center md:order-2 space-x-2">
            <button
              onClick={toggle}
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-yellow-400 bg-gray-200 dark:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />
              ) : null}
            </button>
            {isLoading ? (
              <span>Loading…</span>
            ) : isLoggedIn ? (
              <button
                onClick={async () => {
                  await logout()
                  router.push('/')
                }}
                className="ml-2 px-3 py-1 bg-blue-600 text-white rounded dark:bg-yellow-500 dark:text-gray-900 transition-colors"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => router.push('/auth')}
                className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-full dark:bg-yellow-500 dark:text-gray-900 transition-colors"
              >
                Sign in 
              </button>
            )}
            <NavbarToggle />
          </div>
          <NavbarCollapse>
            <NavbarLink href="/" active>
              Home
            </NavbarLink>
            <NavbarLink href="/about">About</NavbarLink>
            <NavbarLink href="/dashboard">Dashboard</NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </header>
      <main className="flex-grow container mx-auto p-4 transition-colors">{children}</main>
      <footer className="py-6 mt-auto transition-colors bg-white dark:bg-gray-900">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <Link href="/" className="flex items-center mb-4 md:mb-0">
            <Avatar
              img={`/oatmeal_${theme}_logo.png`}
              rounded
              size="sm"
            />
            <span className="ml-2 text-lg font-semibold">Oatmeal MVP</span>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Oatmeal MVP.
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