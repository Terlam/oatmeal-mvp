import React from 'react'
import { Card, Input, Button } from '../../atoms'
import { FcGoogle } from 'react-icons/fc'
import Image from 'next/image'

export const LoginForm: React.FC<{
  onSubmit: (data: { email: string; password: string }) => void
  onGoogle: () => void
  loading: boolean
  error: string | null
}> = ({ onSubmit, onGoogle, loading, error }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4">
      {/* Oatmeal Logo */}
      <div className="mb-6">
        <Image src="/oatmeal_light_logo.png" alt="Oatmeal Logo" width={80} height={80} />
      </div>

      <Card className="w-full max-w-md p-8 bg-yellow-50 shadow-lg border-2 border-yellow-200 rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-yellow-800 mb-4">
          Welcome Back to Oatmeal
        </h2>

        {error && (
          <p className="text-red-600 mb-2 text-center">
            {error}
          </p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit({ email, password })
          }}
          className="space-y-4"
        >
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

          <Button
            type="submit"
            fullSized
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
            disabled={loading}
          >
            {loading ? 'Signing In…' : 'Sign In'}
          </Button>

          <div className="flex items-center justify-center mt-2">
            <span className="text-gray-500 text-sm">or</span>
          </div>

          <Button
            type="button"
            outline
            fullSized
            onClick={onGoogle}
            icon={FcGoogle}
            className="text-yellow-700 border-yellow-700 hover:bg-yellow-100"
            disabled={loading}
          >
            {loading ? 'Please wait…' : 'Sign In with Google'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
