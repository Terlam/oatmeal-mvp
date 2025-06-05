import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SignupForm } from '@components/organisms/SignupForm'
import { useAuthStore } from '../store/authStore'

const SignupPage: NextPage = () => {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)                           
  const loading = useAuthStore((s) => s.loading)
  const error = useAuthStore((s) => s.error)
  const signupWithEmail = useAuthStore((s) => s.signupWithEmail)

  useEffect(() => {
    if (user) router.replace('/dashboard')
  }, [user, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 bg-gray-900/50"></div>
      <SignupForm
        onSubmit={({ email, password, confirmPassword }) =>
          signupWithEmail(email, password)
        }
        loading={loading}
        error={error}
      />
    </div>
  )
}

;(SignupPage as any).noLayout = true
export default SignupPage
