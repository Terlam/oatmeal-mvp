import React, { useState, useEffect } from 'react'
import { Card, Input, Button } from '@components/atoms'

interface PasswordResetFormProps {
  email?: string
  onChange?: (field: 'email', value: string) => void
  onSubmit: (data: { email: string }) => void
  loading: boolean
  error: string | null
  success?: string | null
  inputClassNames?: { email?: string }
}

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({
  email = '',
  onChange,
  onSubmit,
  loading,
  error,
  success,
  inputClassNames = {},
}) => {
  const [localEmail, setLocalEmail] = useState(email)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setLocalEmail(email)
  }, [email])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalEmail(e.target.value)
    onChange?.('email', e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    onSubmit({ email: localEmail })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4">
      <Card className="w-full max-w-md p-8 bg-yellow-50 dark:bg-gray-800 shadow-lg border-2 border-yellow-200 dark:border-gray-700 rounded-2xl transition-colors">
        <h2 className="text-2xl font-bold text-center text-yellow-800 dark:text-yellow-300 mb-4">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-4 text-sm">
          Enter your email and we’ll send you a password reset link.
        </p>

        {error && (
          <p className="text-red-600 dark:text-red-400 mb-2 text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 dark:text-green-400 mb-2 text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button
            type="submit"
            fullSized
            className="bg-yellow-600 hover:bg-yellow-700 text-white dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-gray-900"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
      </Card>
    </div>
  )
}