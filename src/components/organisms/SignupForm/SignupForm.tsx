import React from 'react'
import { Card, Input, Button } from '../../atoms'
import Image from 'next/image'

export const SignupForm: React.FC<{
  onSubmit: (data: { email: string; password: string; confirmPassword: string }) => void
  loading: boolean
  error: string | null
}> = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [localError, setLocalError] = React.useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match')
      return
    }
    onSubmit({ email, password, confirmPassword })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4">
      <Image
        src="/oatmeal_dark_logo.png"
        alt="Oatmeal Logo"
        width={80}
        height={80}
        className="mb-6"
      />

      <Card className="w-full max-w-md p-8 bg-yellow-50 shadow-lg border-2 border-yellow-200 rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-yellow-800 mb-4">
          Create your Oatmeal account
        </h2>

        {(localError || error) && (
          <p className="text-red-600 text-sm mb-2 text-center">
            {localError || error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.currentTarget.value)}
            className="border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            disabled={loading}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            className="border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />

          <Button
            type="submit"
            fullSized
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
            disabled={loading}
          >
            {loading ? 'Creating Account…' : 'Sign Up'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
