import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LoginForm } from '@components/organisms/LoginForm'
import { useAuthStore } from '../store/authStore'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)                            
  const loading = useAuthStore((s) => s.loading)
  const error = useAuthStore((s) => s.error)
  const loginWithEmail = useAuthStore((s) => s.loginWithEmail)
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle)

  useEffect(() => {
    if (user) router.replace('/dashboard')
  }, [user, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 bg-yellow-50/40"></div>
      <LoginForm
        onSubmit={({ email, password }) => loginWithEmail(email, password)}
        onGoogle={() => loginWithGoogle()}
        loading={loading}
        error={error}
      />
    </div>
  )
}

;(LoginPage as any).noLayout = true
export default LoginPage
