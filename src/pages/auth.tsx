import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '../store/authStore'
import { LoginForm } from '../features/auth/components/LoginForm/LoginForm'
import { SignupForm } from '../features/auth/components/SignupForm/SignupForm'
import { PasswordResetForm } from '../features/auth/components/PasswordResetForm/PasswordResetForm'

export default function AuthPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to landing page if this page is deprecated
    router.push('/')
  }, [router])
  
  return null
}