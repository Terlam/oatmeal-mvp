import React from 'react'
import { Card, Input, Button } from '../../../../components/atoms'
import Image from 'next/image'

interface SignupFormProps {
  email?: string
  password?: string
  confirmPassword?: string
  onChange?: (field: 'email' | 'password' | 'confirmPassword', value: string) => void
  onSubmit: (data: { email: string; password: string; confirmPassword: string }) => void
  loading: boolean
  error: string | null
  children?: React.ReactNode
  inputClassNames?: { email?: string; password?: string; confirmPassword?: string }
}

export const SignupForm: React.FC<SignupFormProps> = ({
  email = '',
  password = '',
  confirmPassword = '',
  onChange,
  onSubmit,
  loading,
  error,
  children,
  inputClassNames = {},
}) => {
  const [localEmail, setLocalEmail] = React.useState(email)
  const [localPassword, setLocalPassword] = React.useState(password)
  const [localConfirmPassword, setLocalConfirmPassword] = React.useState(confirmPassword)
  const [localError, setLocalError] = React.useState<string | null>(null)

  // Keep local state in sync with props (for shared state between auth modes)
  React.useEffect(() => { setLocalEmail(email) }, [email])
  React.useEffect(() => { setLocalPassword(password) }, [password])
  React.useEffect(() => { setLocalConfirmPassword(confirmPassword) }, [confirmPassword])

  const handleChange = (field: 'email' | 'password' | 'confirmPassword', value: string) => {
    if (onChange) onChange(field, value)
    if (field === 'email') setLocalEmail(value)
    if (field === 'password') setLocalPassword(value)
    if (field === 'confirmPassword') setLocalConfirmPassword(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    if (localPassword !== localConfirmPassword) {
      setLocalError('Passwords do not match')
      return
    }
    onSubmit({ email: localEmail, password: localPassword, confirmPassword: localConfirmPassword })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4">
      <Image
        src="/oatmeal_light_logo.png"
        alt="Oatmeal Logo"
        width={80}
        height={80}
        className="dark:hidden mb-6"
      />
      <Image
        src="/oatmeal_dark_logo.png"
        alt="Oatmeal Logo"
        width={80}
        height={80}
        className="hidden dark:block mb-6"
      />

      <Card className="w-full max-w-md p-8 bg-yellow-50 dark:bg-gray-800 shadow-lg border-2 border-yellow-200 dark:border-gray-700 rounded-2xl transition-colors">
        <h2 className="text-2xl font-bold text-center text-yellow-800 dark:text-yellow-300 mb-4">
          Create your Oatmeal account
        </h2>

        {(localError || error) && (
          <p className="text-red-600 dark:text-red-400 text-sm mb-2 text-center">
            {localError || error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={localEmail}
            disabled={loading}
            onChange={e => handleChange('email', e.currentTarget.value)}
            className={`border-yellow-300 dark:border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 dark:focus:ring-yellow-400 dark:focus:border-yellow-400 ${inputClassNames.email ?? ''}`}
            required
            autoComplete="email"
          />

          <Input
            type="password"
            placeholder="Password"
            value={localPassword}
            disabled={loading}
            onChange={e => handleChange('password', e.currentTarget.value)}
            className={`border-yellow-300 dark:border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 dark:focus:ring-yellow-400 dark:focus:border-yellow-400 ${inputClassNames.password ?? ''}`}
            required
            autoComplete="new-password"
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={localConfirmPassword}
            disabled={loading}
            onChange={e => handleChange('confirmPassword', e.currentTarget.value)}
            className={`border-yellow-300 dark:border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 dark:focus:ring-yellow-400 dark:focus:border-yellow-400 ${inputClassNames.confirmPassword ?? ''}`}
            required
            autoComplete="new-password"
          />

          <Button
            type="submit"
            fullSized
            className="bg-yellow-600 hover:bg-yellow-700 text-white dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-gray-900"
            disabled={loading}
          >
            {loading ? 'Creating Account…' : 'Sign Up'}
          </Button>
        </form>
        {children && <div className="mt-4">{children}</div>}
      </Card>
    </div>
  )
}