import React, { useState, useEffect, ChangeEvent } from 'react'
import { Card, TextInput, Button, Avatar } from 'flowbite-react'
import { Label, FileInput } from '../../atoms'
import { User } from 'firebase/auth'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import { storage } from '@firebase/clientApp'
import clsx from 'clsx'

export interface ProfileData {
  firstName: string
  lastName: string
  avatarFile?: File
}

interface ProfileFormProps {
  user: User
  onUpdate: (data: ProfileData) => Promise<void>
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, onUpdate }) => {
  const [firstName, setFirstName] = useState(user.displayName?.split(' ')[0] || '')
  const [lastName, setLastName]   = useState(user.displayName?.split(' ')[1] || '')
  const [avatarPreview, setAvatarPreview] = useState<string>(user.photoURL || '/user.jpg')
  const [avatarFile, setAvatarFile] = useState<File | undefined>()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // preview newly chosen avatar
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
      // if avatar changed, upload to Storage
      let photoURL = user.photoURL
      if (avatarFile) {
        const storageRef = ref(storage, `avatars/${user.uid}/${avatarFile.name}`)
        const snapshot = await uploadBytes(storageRef, avatarFile)
        photoURL = await getDownloadURL(snapshot.ref)
      }
      // call parent to update profile (e.g. firebase.auth().updateProfile)
      await onUpdate({ firstName, lastName, avatarFile })
      setSuccess(true)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Update failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <Avatar
            img={avatarPreview}
            rounded
            size="xl"
            className="border-4 border-yellow-200"
          />
        </div>

        <div>
          <Label htmlFor="avatar" value="Change Avatar" />
          <FileInput
            id="avatar"
            name="avatar"
            helperText="PNG, JPG up to 2MB"
            onChange={handleAvatarChange}
            disabled={submitting}
          />
        </div>

        <div>
          <Label htmlFor="firstName" value="First Name" />
          <TextInput
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.currentTarget.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="lastName" value="Last Name" />
          <TextInput
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.currentTarget.value)}
            required
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm text-center">Profile updated!</p>
        )}

        <Button
          type="submit"
          disabled={submitting}
          className={clsx(
            'w-full',
            submitting ? 'opacity-50' : 'opacity-100'
          )}
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Card>
  )
}
