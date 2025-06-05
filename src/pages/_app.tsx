import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { Layout } from '@components/organisms/Layout'

export default function MyApp({ Component, pageProps }: AppProps) {
  const startListening = useAuthStore((s) => s.startListening)

  // subscribe separately to loading and user
  const loading = useAuthStore((s) => s.loading)
  const user = useAuthStore((s) => s.user)

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
