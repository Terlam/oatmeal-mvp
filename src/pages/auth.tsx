import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '../store/authStore'
import { LoginForm } from '@features/auth/components/LoginForm'
import { SignupForm } from '@features/auth/components/SignupForm'
import { PasswordResetForm } from '@features/auth/components/PasswordResetForm'

type AuthMode = 'login' | 'signup' | 'reset'

const AuthPage = () => {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const loading = useAuthStore((s) => s.loading)
  const error = useAuthStore((s) => s.error)
  const loginWithEmail = useAuthStore((s) => s.loginWithEmail)
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle)
  const signupWithEmail = useAuthStore((s) => s.signupWithEmail)
  const resetPassword = useAuthStore((s) => s.resetPassword)

  const [mode, setMode] = useState<AuthMode>('login')
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  // Track which fields have been filled at least once
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  })

  useEffect(() => {
    if (user) router.replace('/dashboard')
  }, [user, router])

  const handleSwitch = (nextMode: AuthMode) => setMode(nextMode)
  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
    if (value && !touched[field as keyof typeof touched]) {
      setTouched((prev) => ({ ...prev, [field]: true }))
    }
  }

  // Helper to animate only if field is empty and not touched
  const getFieldClass = (field: string) =>
    !formState[field as keyof typeof formState] && !touched[field as keyof typeof touched]
      ? 'animate-fade-in'
      : ''

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative">
      <div className="absolute inset-0 bg-yellow-50/40 dark:bg-gray-900/60"></div>
      <div className="relative z-10 w-full max-w-md bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-8">
        {mode === 'login' && (
          <>
            <LoginForm
              email={formState.email}
              password={formState.password}
              onChange={handleChange}
              onSubmit={({ email, password }) => loginWithEmail(email, password)}
              onGoogle={loginWithGoogle}
              loading={loading}
              error={error}
              // Animate fields individually
              inputClassNames={{
                email: getFieldClass('email'),
                password: getFieldClass('password'),
              }}
            />
            <div className="flex justify-between mt-4 text-sm">
              <button
                className="text-brand hover:underline"
                onClick={() => handleSwitch('signup')}
                type="button"
              >
                Need an account? Sign up
              </button>
              <button
                className="text-brand hover:underline"
                onClick={() => handleSwitch('reset')}
                type="button"
              >
                Forgot password?
              </button>
            </div>
          </>
        )}
        {mode === 'signup' && (
          <>
            <SignupForm
              email={formState.email}
              password={formState.password}
              confirmPassword={formState.confirmPassword}
              onChange={handleChange}
              onSubmit={({ email, password }) => signupWithEmail(email, password)}
              loading={loading}
              error={error}
              inputClassNames={{
                email: getFieldClass('email'),
                password: getFieldClass('password'),
                confirmPassword: getFieldClass('confirmPassword'),
              }}
            />
            <div className="flex justify-between mt-4 text-sm">
              <button
                className="text-brand hover:underline"
                onClick={() => handleSwitch('login')}
                type="button"
              >
                Already have an account? Log in
              </button>
            </div>
          </>
        )}
        {mode === 'reset' && (
          <>
            <PasswordResetForm
              email={formState.email}
              onChange={handleChange}
              onSubmit={({ email }) => resetPassword(email)}
              loading={loading}
              error={error}
              inputClassNames={{
                email: getFieldClass('email'),
              }}
            />
            <div className="flex justify-between mt-4 text-sm">
              <button
                className="text-brand hover:underline"
                onClick={() => handleSwitch('login')}
                type="button"
              >
                Back to login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

;(AuthPage as any).noLayout = true
export default AuthPage