// src/components/organisms/Layout.tsx
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import {
  Navbar,
  NavbarBrand,
  NavbarLink,
  NavbarToggle,
  NavbarCollapse,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
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

  // Auth state
  const logout = useAuthStore((s) => s.logout )

  // Theme state (split selectors!)
  const theme = useThemeStore((s) => s.theme)
  const toggle = useThemeStore((s) => s.toggle)

  // Prevent icon flicker on SSR
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const bgClass =
    theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'

  return (
    <div className={clsx('flex flex-col min-h-screen transition-colors', bgClass)}>
      <header className="shadow-md">
        <Navbar fluid rounded>
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
              className="p-2 rounded focus:ring-2 dark:focus:ring-gray-600"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === 'dark' ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )
              ) : null}
            </button>

            {isLoading ? (
              <span>Loading…</span>
            ) : isLoggedIn ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4">
                    <span className="sr-only">User menu</span>
                    <Avatar
                      img={userAvatarUrl || '/user_icon.png'}
                      rounded
                      size="sm"
                    />
                  </button>
                }
              >
                <DropdownHeader>
                  <span className="block text-sm">{userName}</span>
                  <span className="block truncate text-sm">{userEmail}</span>
                </DropdownHeader>
                <DropdownItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link href="/settings">Settings</Link>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem onClick={async () => {
      await logout()
      router.push('/')}}>
                  Sign out
                </DropdownItem>
              </Dropdown>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded">
                    Sign in
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="ml-2 px-3 py-1 border border-yellow-600 rounded">
                    Sign up
                  </button>
                </Link>
              </>
            )}
            <NavbarToggle />
          </div>

          <NavbarCollapse>
            <NavbarLink href="/" active>
              Home
            </NavbarLink>
            <NavbarLink href="/about">About</NavbarLink>
            <NavbarLink href="/contact">Contact</NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </header>

      <main className="flex-grow container mx-auto p-4">{children}</main>

      <footer className={clsx('py-6 mt-auto transition-colors', bgClass)}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <Link href="/" className="flex items-center mb-4 md:mb-0">
            <Avatar
              img={`/oatmeal_${theme}_logo.png`}
              rounded
              size="sm"
            />
            <span className="ml-2 text-lg font-semibold">Oatmeal MVP</span>
          </Link>
          <p className="text-sm dark:text-gray-400">
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
