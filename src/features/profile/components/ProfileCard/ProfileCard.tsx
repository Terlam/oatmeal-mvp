import React, { useState, useEffect, ChangeEvent } from 'react'
import { Card, TextInput, Button, Avatar, Spinner } from 'flowbite-react'
import { Label, FileInput } from '@/components/atoms'
import { updateUserProfile } from '../../services/profileService'
import { useAuthStore } from '@/store/authStore'
import clsx from 'clsx'

interface ProfileCardProps {
  name?: string | null
  username?: string | null
  email?: string | null
  avatarUrl?: string | null
  onUpdate?: () => void
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ 
  name, 
  username,
  email, 
  avatarUrl,
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState(name || '')
  const [usernameValue, setUsernameValue] = useState(username || '')
  const [avatarPreview, setAvatarPreview] = useState<string>(avatarUrl || '/user_icon.png')
  const [avatarFile, setAvatarFile] = useState<File | undefined>()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const user = useAuthStore((s) => s.user)

  // Sync state when props change
  useEffect(() => {
    setDisplayName(name || '')
    setUsernameValue(username || '')
    setAvatarPreview(avatarUrl || '/user_icon.png')
  }, [name, username, avatarUrl])

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      await updateUserProfile({
        displayName: displayName.trim(),
        username: usernameValue.trim() || undefined,
        avatarFile,
      })
      
      setSuccess(true)
      setIsEditing(false)
      
      // Refresh auth state to get updated profile
      if (user) {
        await user.reload()
      }
      
      // Call parent callback to refresh page data
      if (onUpdate) {
        onUpdate()
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      console.error('Error updating profile:', err)
      setError(err.message || 'Failed to update profile')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setDisplayName(name || '')
    setUsernameValue(username || '')
    setAvatarPreview(avatarUrl || '/user_icon.png')
    setAvatarFile(undefined)
    setError(null)
    setSuccess(false)
  }

  if (isEditing) {
    return (
      <Card className="bg-yellow-50 dark:bg-gray-800 border-2 border-yellow-200 dark:border-gray-700 animate-fade-in">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <Avatar
              img={avatarPreview}
              rounded
              size="xl"
              className="border-4 border-yellow-300 dark:border-yellow-600"
            />
          </div>

          <div>
            <Label htmlFor="avatar" value="Change Profile Image" />
            <FileInput
              id="avatar"
              name="avatar"
              helperText="PNG, JPG up to 2MB"
              onChange={handleAvatarChange}
              disabled={submitting}
            />
          </div>

          <div>
            <Label htmlFor="displayName" value="Display Name" />
            <TextInput
              id="displayName"
              name="displayName"
              placeholder="Your name"
              value={displayName}
              onChange={e => setDisplayName(e.currentTarget.value)}
              required
              disabled={submitting}
            />
          </div>

          <div>
            <Label htmlFor="username" value="Username (optional)" />
            <TextInput
              id="username"
              name="username"
              placeholder="@username"
              value={usernameValue}
              onChange={e => setUsernameValue(e.currentTarget.value.replace(/[^a-zA-Z0-9_]/g, ''))}
              disabled={submitting}
            />
            <p className="text-xs text-gray-500 dark:text-gray-200 mt-1">
              Letters, numbers, and underscores only
            </p>
          </div>

          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              name="email"
              value={email || ''}
              disabled
              className="bg-gray-100 dark:bg-gray-700"
            />
            <p className="text-xs text-gray-500 dark:text-gray-200 mt-1">
              Email cannot be changed
            </p>
          </div>

          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-600 dark:text-green-400 text-sm text-center">
              Profile updated successfully!
            </p>
          )}

          <div className="flex gap-2">
            <Button
              type="button"
              color="gray"
              onClick={handleCancel}
              disabled={submitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className={clsx(
                'flex-1',
                submitting ? 'opacity-50' : 'opacity-100'
              )}
            >
              {submitting ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </Card>
    )
  }

  return (
    <Card className="bg-yellow-50 dark:bg-gray-800 border-2 border-yellow-200 dark:border-gray-700 animate-fade-in">
      <div className="flex items-center space-x-4">
        <Avatar 
          img={avatarUrl || '/user_icon.png'} 
          alt="User avatar" 
          rounded 
          size="lg"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-yellow-100">
            {name || 'No Name'}
          </h2>
          {username && (
            <p className="text-sm text-gray-500 dark:text-gray-200 font-mono">
              @{username}
            </p>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-300">{email || 'No email'}</p>
        </div>
        <Button
          color="light"
          onClick={() => setIsEditing(true)}
          className="ml-auto"
        >
          Edit Profile
        </Button>
      </div>
    </Card>
  )
}