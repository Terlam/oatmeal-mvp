import React from 'react'
import { Card, Input, Button } from '@components/atoms'
import { FcGoogle } from 'react-icons/fc'
import Image from 'next/image'

interface LoginFormProps {
  email?: string
  password?: string
  onChange?: (field: 'email' | 'password', value: string) => void
  onSubmit: (data: { email: string; password: string }) => void
  onGoogle: () => void
  loading: boolean
  error: string | null
  children?: React.ReactNode // For links like "Forgot password?" or "Sign up"
  inputClassNames?: { email?: string; password?: string }
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email = '',
  password = '',
  onChange,
  onSubmit,
  onGoogle,
  loading,
  error,
  children,
  inputClassNames = {},
}) => {
  const [localEmail, setLocalEmail] = React.useState(email)
  const [localPassword, setLocalPassword] = React.useState(password)

  // Keep local state in sync with props (for shared state between auth modes)
  React.useEffect(() => {
    setLocalEmail(email)
  }, [email])
  React.useEffect(() => {
    setLocalPassword(password)
  }, [password])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalEmail(e.target.value)
    onChange?.('email', e.target.value)
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPassword(e.target.value)
    onChange?.('password', e.target.value)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4">
      {/* Oatmeal Logo */}
      <div className="mb-6">
        <Image
          src="/oatmeal_light_logo.png"
          alt="Oatmeal Logo"
          width={80}
          height={80}
          className="dark:hidden"
        />
        <Image
          src="/oatmeal_dark_logo.png"
          alt="Oatmeal Logo"
          width={80}
          height={80}
          className="hidden dark:block"
        />
      </div>

      <Card className="w-full max-w-md p-8 bg-yellow-50 dark:bg-gray-800 shadow-lg border-2 border-yellow-200 dark:border-gray-700 rounded-2xl transition-colors">
        <h2 className="text-2xl font-bold text-center text-yellow-800 dark:text-yellow-300 mb-4">
          Welcome Back to Oatmeal
        </h2>

        {error && (
          <p className="text-red-600 dark:text-red-400 mb-2 text-center">
            {error}
          </p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit({ email: localEmail, password: localPassword })
          }}
          className="space-y-4"
        >
          <Input
            type="email"
            placeholder="Email"
            value={localEmail}
            disabled={loading}
            onChange={handleEmailChange}
            className={`border-yellow-300 dark:border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 dark:focus:ring-yellow-400 dark:focus:border-yellow-400 ${inputClassNames.email ?? ''}`}
            required
            autoComplete="email"
          />

          <Input
            type="password"
            placeholder="Password"
            value={localPassword}
            disabled={loading}
            onChange={handlePasswordChange}
            className={`border-yellow-300 dark:border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 dark:focus:ring-yellow-400 dark:focus:border-yellow-400 ${inputClassNames.password ?? ''}`}
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullSized
            className="bg-yellow-600 hover:bg-yellow-700 text-white dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-gray-900"
            disabled={loading}
          >
            {loading ? 'Signing In…' : 'Sign In'}
          </Button>

          <div className="flex items-center justify-center mt-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm">or</span>
          </div>

          <Button
            type="button"
            outline
            fullSized
            onClick={onGoogle}
            icon={FcGoogle}
            className="text-yellow-700 border-yellow-700 hover:bg-yellow-100 dark:text-yellow-300 dark:border-yellow-300 dark:hover:bg-gray-700"
            disabled={loading}
          >
            {loading ? 'Please wait…' : 'Sign In with Google'}
          </Button>
        </form>

        {/* Links for "Forgot password?" or "Sign up" */}
        {children && <div className="mt-4">{children}</div>}
      </Card>
    </div>
  )
}