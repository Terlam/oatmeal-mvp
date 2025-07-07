import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useThemeStore } from '../store/themeStore'
import { Layout } from '@components/organisms/Layout'

export default function MyApp({ Component, pageProps }: AppProps) {
  const startListening = useAuthStore((s) => s.startListening)
  const loading = useAuthStore((s) => s.loading)
  const user = useAuthStore((s) => s.user)

  // --- Dark mode sync ---
  const theme = useThemeStore((s) => s.theme)
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
  // ----------------------

  useEffect(() => {
    startListening()
  }, [startListening])

  if ((Component as any).noLayout) {
    return <Component {...pageProps} />
  }

  return (
    <Layout
      isLoading={loading}
      isLoggedIn={!!user}
      userName={user?.displayName ?? null}
      userEmail={user?.email ?? null}
      userAvatarUrl={user?.photoURL ?? null}
    >
      <Component {...pageProps} />
    </Layout>
  )
}