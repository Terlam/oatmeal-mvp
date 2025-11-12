import React, { useState } from 'react'
import { Input, Label, Button } from '@/components/atoms'
import { Select, Textarea } from 'flowbite-react'
import type { RSVP, RSVPStatus } from '@/features/events/types'

export interface RSVPFormProps {
  onSubmit: (rsvp: Omit<RSVP, 'id' | 'eventId' | 'createdAt' | 'updatedAt'>) => Promise<void>
  loading?: boolean
  error?: string | null
  defaultValues?: Partial<RSVP>
  onCancel?: () => void
}

export const RSVPForm: React.FC<RSVPFormProps> = ({
  onSubmit,
  loading = false,
  error = null,
  defaultValues,
  onCancel,
}) => {
  const [status, setStatus] = useState<RSVPStatus>(defaultValues?.status || 'going')
  const [guestCount, setGuestCount] = useState(defaultValues?.guestCount?.toString() || '1')
  const [message, setMessage] = useState(defaultValues?.message || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await onSubmit({
      userId: '', // Will be set by the service
      userName: '', // Will be set by the service
      userEmail: '', // Will be set by the service
      userAvatarUrl: '', // Will be set by the service
      status,
      guestCount: parseInt(guestCount) || 1,
      message: message || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded">
          {error}
        </div>
      )}

      <div>
        <Label htmlFor="status">RSVP Status *</Label>
        <Select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as RSVPStatus)}
          required
        >
          <option value="going">Going</option>
          <option value="maybe">Maybe</option>
          <option value="not_going">Not Going</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="guestCount">Number of Guests *</Label>
        <Input
          id="guestCount"
          type="number"
          min="1"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Looking forward to it!"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <Button
            type="button"
            color="light"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white">
          {loading ? 'Submitting...' : 'Submit RSVP'}
        </Button>
      </div>
    </form>
  )
}

