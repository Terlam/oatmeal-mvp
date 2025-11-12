import React, { useState, useEffect } from 'react'
import { Input, Label, Button } from '@/components/atoms'
import { Select, Textarea } from 'flowbite-react'
import { Timestamp } from 'firebase/firestore'
import type { Event, EventTheme } from '@/features/events/types'

export interface EventFormProps {
  onSubmit: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  loading?: boolean
  error?: string | null
  defaultValues?: Partial<Event>
  onCancel?: () => void
}

export const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  loading = false,
  error = null,
  defaultValues,
  onCancel,
}) => {
  const [title, setTitle] = useState(defaultValues?.title || '')
  const [description, setDescription] = useState(defaultValues?.description || '')
  const [eventDate, setEventDate] = useState(
    defaultValues?.eventDate?.toDate?.().toISOString().split('T')[0] || ''
  )
  // Convert 12-hour time (H:MM AM/PM) to 24-hour format (HH:MM) for input
  const parseTimeTo24Hour = (time12: string): string => {
    if (!time12) return '14:00' // Default to 2:00 PM
    const match = time12.match(/(\d+):(\d+)\s*(AM|PM)/i)
    if (!match) return '14:00'
    let hours = parseInt(match[1], 10)
    const minutes = parseInt(match[2], 10)
    const ampm = match[3].toUpperCase()
    
    // Validate parsed values
    if (isNaN(hours) || isNaN(minutes) || hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
      return '14:00' // Default to 2:00 PM if invalid
    }
    
    if (ampm === 'PM' && hours !== 12) hours += 12
    if (ampm === 'AM' && hours === 12) hours = 0
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  const [eventTime, setEventTime] = useState(
    defaultValues?.eventTime ? parseTimeTo24Hour(defaultValues.eventTime) : '14:00'
  )
  const [locationName, setLocationName] = useState(defaultValues?.location?.name || '')
  const [locationAddress, setLocationAddress] = useState(defaultValues?.location?.address || '')
  const [locationCity, setLocationCity] = useState(defaultValues?.location?.city || '')
  const [locationState, setLocationState] = useState(defaultValues?.location?.state || '')
  const [locationZip, setLocationZip] = useState(defaultValues?.location?.zip || '')
  const [isPublic, setIsPublic] = useState(defaultValues?.isPublic ?? true)
  const [theme, setTheme] = useState<EventTheme>(defaultValues?.theme || 'thanksgiving')

  // Convert 24-hour time (HH:MM) to 12-hour format (H:MM AM/PM)
  const formatTimeTo12Hour = (time24: string): string => {
    if (!time24 || !time24.includes(':')) return '2:00 PM'
    const [hoursStr, minutesStr] = time24.split(':')
    const hours = parseInt(hoursStr, 10)
    const minutes = parseInt(minutesStr, 10)
    
    // Validate that hours and minutes are valid numbers
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return '2:00 PM' // Default to 2:00 PM if invalid
    }
    
    const hour12 = hours % 12 || 12
    const ampm = hours >= 12 ? 'PM' : 'AM'
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Combine date and time into a single Date object for eventDate
    let eventDateObj: Timestamp
    if (eventDate && eventTime) {
      const [hoursStr, minutesStr] = eventTime.split(':')
      const hours = parseInt(hoursStr, 10)
      const minutes = parseInt(minutesStr, 10)
      
      // Validate time values - default to 2:00 PM if invalid
      const validHours = (!isNaN(hours) && hours >= 0 && hours <= 23) ? hours : 14
      const validMinutes = (!isNaN(minutes) && minutes >= 0 && minutes <= 59) ? minutes : 0
      
      const date = new Date(eventDate)
      date.setHours(validHours, validMinutes, 0, 0)
      eventDateObj = Timestamp.fromDate(date)
    } else if (eventDate) {
      const date = new Date(eventDate)
      date.setHours(14, 0, 0, 0) // Default to 2:00 PM
      eventDateObj = Timestamp.fromDate(date)
    } else {
      eventDateObj = Timestamp.now()
    }
    
    // Convert time to 12-hour format for display (with validation)
    const formattedTime = formatTimeTo12Hour(eventTime)
    
    await onSubmit({
      hostId: '', // Will be set by the service
      hostName: '', // Will be set by the service
      hostEmail: '', // Will be set by the service
      title,
      description: description || undefined,
      eventDate: eventDateObj,
      eventTime: formattedTime,
      location: {
        name: locationName,
        address: locationAddress || undefined,
        city: locationCity || undefined,
        state: locationState || undefined,
        zip: locationZip || undefined,
      },
      isPublic,
      theme,
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
        <Label htmlFor="title">Event Title *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Thanksgiving Dinner 2024"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Let's gather for a wonderful Thanksgiving meal..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="eventDate">Date *</Label>
          <Input
            id="eventDate"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="eventTime">Time *</Label>
          <Input
            id="eventTime"
            type="time"
            value={eventTime}
            onChange={(e) => {
              const value = e.target.value
              // HTML5 time input already validates format, but ensure we have a fallback
              if (value && value.match(/^\d{2}:\d{2}$/)) {
                setEventTime(value)
              } else if (value === '') {
                // Allow empty for required validation, but default to 14:00 on blur if needed
                setEventTime('14:00')
              }
            }}
            onBlur={(e) => {
              // Ensure we always have a valid time value
              if (!e.target.value || !e.target.value.match(/^\d{2}:\d{2}$/)) {
                setEventTime('14:00')
              }
            }}
            required
            min="00:00"
            max="23:59"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="locationName">Location Name *</Label>
        <Input
          id="locationName"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          placeholder="Grandma's House"
          required
        />
      </div>

      <div>
        <Label htmlFor="locationAddress">Address</Label>
        <Input
          id="locationAddress"
          value={locationAddress}
          onChange={(e) => setLocationAddress(e.target.value)}
          placeholder="123 Main St"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="locationCity">City</Label>
          <Input
            id="locationCity"
            value={locationCity}
            onChange={(e) => setLocationCity(e.target.value)}
            placeholder="City"
          />
        </div>
        <div>
          <Label htmlFor="locationState">State</Label>
          <Input
            id="locationState"
            value={locationState}
            onChange={(e) => setLocationState(e.target.value)}
            placeholder="State"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="locationZip">ZIP Code</Label>
        <Input
          id="locationZip"
          value={locationZip}
          onChange={(e) => setLocationZip(e.target.value)}
          placeholder="12345"
        />
      </div>

      <div>
        <Label htmlFor="theme">Theme</Label>
        <Select
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value as EventTheme)}
        >
          <option value="thanksgiving">Thanksgiving</option>
          <option value="christmas">Christmas</option>
          <option value="birthday">Birthday</option>
          <option value="general">General</option>
        </Select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPublic"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="mr-2"
        />
        <Label htmlFor="isPublic">Make this event public (shareable link)</Label>
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
          {loading ? 'Creating...' : 'Create Event'}
        </Button>
      </div>
    </form>
  )
}

