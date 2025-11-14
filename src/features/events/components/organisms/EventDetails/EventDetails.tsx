import React, { useState } from 'react'
import { Card } from '@/components/atoms/Card'
import { Button } from '@/components/atoms/Button'
import { Avatar } from '@/components/atoms/Avatar'
import { Modal, ModalHeader, ModalBody } from 'flowbite-react'
import { Calendar, MapPin, Users, Edit2, Plus } from 'lucide-react'
import { MenuGrid } from '../MenuGrid'
import { RSVPList } from '../RSVPList'
import { CommentList } from '../CommentList'
import { CommentForm } from '../../molecules/CommentForm'
import { RSVPForm } from '../../molecules/RSVPForm'
import { MenuItemForm } from '../../molecules/MenuItemForm'
import { EventForm } from '../../molecules/EventForm'
import { ClaimItemModal } from '../../molecules/ClaimItemModal'
import { useEvent, useMenuItems, useRSVPs, useEventComments } from '../../../hooks'
import { useAuthStore } from '@/store/authStore'
import { useDietaryPreferences } from '@/features/profile/hooks/useDietaryPreferences'
import { 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem, 
  claimMenuItem, 
  unclaimMenuItem,
  upsertRSVP,
  createEventComment,
  updateEvent,
  uploadMenuItemImage,
} from '../../../services'
import type { Event, MenuItem, RSVP, EventComment } from '../../../types'
import clsx from 'clsx'

export interface EventDetailsProps {
  eventId: string
  onEdit?: () => void
  className?: string
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  eventId,
  onEdit,
  className,
}) => {
  const user = useAuthStore((s) => s.user)
  const { event, loading: eventLoading, error: eventError, refetch: refetchEvent } = useEvent(eventId)
  const { menuItems, loading: menuItemsLoading, refetch: refetchMenuItems } = useMenuItems(eventId)
  const { rsvps, loading: rsvpsLoading, refetch: refetchRSVPs } = useRSVPs(eventId)
  const { comments, loading: commentsLoading, refetch: refetchComments } = useEventComments(eventId)
  const { preferences: userDietaryPreferences } = useDietaryPreferences(user?.uid)
  
  const [showRSVPForm, setShowRSVPForm] = useState(false)
  const [showMenuItemForm, setShowMenuItemForm] = useState(false)
  const [showEditEventForm, setShowEditEventForm] = useState(false)
  const [showClaimModal, setShowClaimModal] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null)
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isHost = event?.hostId === user?.uid
  
  // Deduplicate by userId to ensure we don't have duplicate RSVPs
  // Use the most recent RSVP if there are duplicates (by updatedAt or createdAt)
  const uniqueRSVPs = rsvps.reduce((acc, rsvp) => {
    const existing = acc.find(r => r.userId === rsvp.userId)
    if (!existing) {
      acc.push(rsvp)
    } else {
      // Keep the most recent RSVP based on updatedAt or createdAt
      const rsvpTime = rsvp.updatedAt 
        ? (rsvp.updatedAt.toMillis ? rsvp.updatedAt.toMillis() : rsvp.updatedAt.seconds * 1000)
        : rsvp.createdAt
          ? (rsvp.createdAt.toMillis ? rsvp.createdAt.toMillis() : rsvp.createdAt.seconds * 1000)
          : 0
      const existingTime = existing.updatedAt
        ? (existing.updatedAt.toMillis ? existing.updatedAt.toMillis() : existing.updatedAt.seconds * 1000)
        : existing.createdAt
          ? (existing.createdAt.toMillis ? existing.createdAt.toMillis() : existing.createdAt.seconds * 1000)
          : 0
      if (rsvpTime > existingTime) {
        const index = acc.indexOf(existing)
        acc[index] = rsvp
      }
    }
    return acc
  }, [] as typeof rsvps)
  
  const currentRSVP = uniqueRSVPs.find(r => r.userId === user?.uid)
  
  // Calculate separate counts for each status (including guests)
  const goingCount = uniqueRSVPs
    .filter(r => r.status === 'going')
    .reduce((total, rsvp) => total + 1 + (rsvp.guestCount || 0), 0)
  
  const maybeCount = uniqueRSVPs
    .filter(r => r.status === 'maybe')
    .reduce((total, rsvp) => total + 1 + (rsvp.guestCount || 0), 0)
  
  const notGoingCount = uniqueRSVPs
    .filter(r => r.status === 'not_going')
    .reduce((total, rsvp) => total + 1 + (rsvp.guestCount || 0), 0)

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Date TBD'
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    } catch (error) {
      return 'Date TBD'
    }
  }

  const formatTime = (time: string) => {
    if (!time) return 'Time TBD'
    // If time is already in 12-hour format (contains AM/PM), validate and return as-is
    if (time.includes('AM') || time.includes('PM')) {
      const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
      if (!match) return 'Time TBD'
      const hours = parseInt(match[1], 10)
      const minutes = parseInt(match[2], 10)
      if (isNaN(hours) || isNaN(minutes)) return 'Time TBD'
      return time // Return as-is if valid
    }
    // If time is in HH:MM format (24-hour), convert to 12-hour format
    if (time.includes(':') && !time.includes('PM') && !time.includes('AM')) {
      const [hoursStr, minutesStr] = time.split(':')
      const hours = parseInt(hoursStr, 10)
      const minutes = parseInt(minutesStr, 10)
      
      // Validate that hours and minutes are valid numbers
      if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return 'Time TBD' // Return default if invalid
      }
      
      const hour12 = hours % 12 || 12
      const ampm = hours >= 12 ? 'PM' : 'AM'
      return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`
    }
    return 'Time TBD' // Default if format is unknown
  }

  const handleClaimItem = async (itemId: string) => {
    if (!user) return
    try {
      setSubmitting(true)
      setError(null)
      await claimMenuItem(
        eventId,
        itemId,
        user.uid,
        user.displayName || 'User',
        user.photoURL || undefined
      )
      await refetchMenuItems()
      setShowClaimModal(false)
      setSelectedMenuItem(null)
    } catch (err: any) {
      setError(err.message || 'Failed to claim item')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUnclaimItem = async (itemId: string) => {
    try {
      setSubmitting(true)
      setError(null)
      await unclaimMenuItem(eventId, itemId)
      await refetchMenuItems()
      setShowClaimModal(false)
      setSelectedMenuItem(null)
    } catch (err: any) {
      setError(err.message || 'Failed to unclaim item')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCreateMenuItem = async (item: Omit<MenuItem, 'id' | 'eventId' | 'createdAt' | 'updatedAt'>, imageFile?: File) => {
    if (!user) return
    try {
      setSubmitting(true)
      setError(null)
      const itemData = {
        ...item,
        createdBy: user.uid,
        createdByName: user.displayName || 'User',
        createdByAvatarUrl: user.photoURL || undefined,
        // Don't include imageUrl if we have an imageFile to upload
        imageUrl: imageFile ? undefined : item.imageUrl,
      }
      
      // Create the menu item first
      const itemId = await createMenuItem(eventId, itemData)
      
      // Upload image if provided
      if (imageFile) {
        try {
          const imageUrl = await uploadMenuItemImage(eventId, itemId, imageFile)
          // Update the item with the image URL
          await updateMenuItem(eventId, itemId, { imageUrl })
        } catch (err: any) {
          console.error('Error uploading image:', err)
          // Continue even if image upload fails
        }
      }
      
      await refetchMenuItems()
      setShowMenuItemForm(false)
      setEditingMenuItem(null)
    } catch (err: any) {
      setError(err.message || 'Failed to create menu item')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateMenuItem = async (item: Omit<MenuItem, 'id' | 'eventId' | 'createdAt' | 'updatedAt'>, imageFile?: File) => {
    if (!editingMenuItem) return
    try {
      setSubmitting(true)
      setError(null)
      
      // Update the menu item (imageUrl is already set if onImageUpload was used)
      // If imageFile is provided (fallback case), upload it first
      if (imageFile && !item.imageUrl) {
        try {
          const imageUrl = await uploadMenuItemImage(eventId, editingMenuItem.id!, imageFile)
          item.imageUrl = imageUrl
        } catch (err: any) {
          console.error('Error uploading image:', err)
          // Continue even if image upload fails
        }
      }
      
      // Update the menu item with all data (including imageUrl if set)
      await updateMenuItem(eventId, editingMenuItem.id!, item)
      
      await refetchMenuItems()
      setShowMenuItemForm(false)
      setEditingMenuItem(null)
    } catch (err: any) {
      setError(err.message || 'Failed to update menu item')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteMenuItem = async (itemId: string) => {
    try {
      setSubmitting(true)
      setError(null)
      await deleteMenuItem(eventId, itemId)
      await refetchMenuItems()
    } catch (err: any) {
      setError(err.message || 'Failed to delete menu item')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRSVP = async (rsvp: Omit<RSVP, 'id' | 'eventId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return
    try {
      setSubmitting(true)
      setError(null)
      await upsertRSVP(eventId, {
        ...rsvp,
        userId: user.uid,
        userName: user.displayName || 'User',
        userEmail: user.email || '',
        userAvatarUrl: user.photoURL || undefined,
      })
      await refetchRSVPs()
      setShowRSVPForm(false)
    } catch (err: any) {
      setError(err.message || 'Failed to submit RSVP')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCreateComment = async (comment: Omit<EventComment, 'id' | 'eventId' | 'createdAt' | 'updatedAt' | 'isEdited'>) => {
    if (!user) return
    try {
      setSubmitting(true)
      setError(null)
      await createEventComment(eventId, {
        ...comment,
        userId: user.uid,
        userName: user.displayName || 'User',
        userAvatarUrl: user.photoURL || undefined,
      })
      await refetchComments()
    } catch (err: any) {
      setError(err.message || 'Failed to create comment')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!event) return
    try {
      setSubmitting(true)
      setError(null)
      // Only update fields that can be changed
      const updateData: Partial<Event> = {
        title: eventData.title,
        description: eventData.description,
        eventDate: eventData.eventDate,
        eventTime: eventData.eventTime,
        location: eventData.location,
        isPublic: eventData.isPublic,
        theme: eventData.theme,
      }
      await updateEvent(eventId, updateData)
      await refetchEvent()
      setShowEditEventForm(false)
      onEdit?.()
    } catch (err: any) {
      setError(err.message || 'Failed to update event')
    } finally {
      setSubmitting(false)
    }
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    // This will be called when editing a menu item and uploading an image
    if (!editingMenuItem || !editingMenuItem.id) {
      throw new Error('No menu item selected for editing')
    }
    return await uploadMenuItemImage(eventId, editingMenuItem.id, file)
  }

  if (eventLoading) {
    return (
      <div className={clsx('text-center py-12', className)}>
        <p className="text-gray-500 dark:text-gray-200">Loading event...</p>
      </div>
    )
  }

  if (eventError || !event) {
    return (
      <div className={clsx('text-center py-12', className)}>
        <p className="text-red-500 dark:text-red-400">
          {eventError || 'Event not found'}
        </p>
      </div>
    )
  }

  return (
    <div className={clsx('space-y-6', className)}>
      {error && (
        <div className="p-4 text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded">
          {error}
        </div>
      )}

      {/* Event Header */}
      <Card className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-800">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar
                src={event.hostAvatarUrl || '/user_icon.png'}
                alt={event.hostName}
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-200">
                  Hosted by {event.hostName}
                </p>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {event.title}
            </h1>
            {event.description && (
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {event.description}
              </p>
            )}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-200">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(event.eventDate)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-200">
                <Calendar className="w-5 h-5" />
                <span>{formatTime(event.eventTime)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-200">
                <MapPin className="w-5 h-5" />
                <span>{event.location.name}</span>
                {event.location.address && (
                  <span className="text-sm">
                    {event.location.address}
                    {event.location.city && `, ${event.location.city}`}
                    {event.location.state && `, ${event.location.state}`}
                    {event.location.zip && ` ${event.location.zip}`}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1 text-gray-600 dark:text-gray-200">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm sm:text-base">
                    <span className="text-green-600 dark:text-green-400 font-semibold">{goingCount} going</span>
                    {maybeCount > 0 && (
                      <span className="ml-2 text-yellow-600 dark:text-yellow-400">{maybeCount} maybe</span>
                    )}
                    {notGoingCount > 0 && (
                      <span className="ml-2 text-red-600 dark:text-red-400">{notGoingCount} not going</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {isHost && (
            <Button
              color="light"
              onClick={() => setShowEditEventForm(true)}
              className="w-full sm:w-auto min-h-[44px] sm:ml-4"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Event
            </Button>
          )}
        </div>
      </Card>

      {/* RSVP Section */}
      <Card className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            RSVP
          </h2>
          {!currentRSVP && (
            <Button
              onClick={() => setShowRSVPForm(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto min-h-[44px]"
            >
              <Plus className="w-4 h-4 mr-2" />
              RSVP
            </Button>
          )}
        </div>
        {currentRSVP ? (
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-200">
              Your RSVP: <strong>{currentRSVP.status}</strong> ({currentRSVP.guestCount} {currentRSVP.guestCount === 1 ? 'guest' : 'guests'})
            </p>
            <Button
              size="sm"
              color="light"
              onClick={() => setShowRSVPForm(true)}
              className="mt-2"
            >
              Update RSVP
            </Button>
          </div>
        ) : null}
        <RSVPList rsvps={uniqueRSVPs} />
      </Card>

      {/* Menu Items Section */}
      <Card className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Menu Items
          </h2>
          {user && (
            <Button
              onClick={() => {
                setEditingMenuItem(null)
                setShowMenuItemForm(true)
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto min-h-[44px]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          )}
        </div>
        <MenuGrid
          menuItems={menuItems}
          onClaim={(itemId) => {
            const item = menuItems.find(m => m.id === itemId)
            if (item) {
              setSelectedMenuItem(item)
              setShowClaimModal(true)
            }
          }}
          onUnclaim={(itemId) => {
            const item = menuItems.find(m => m.id === itemId)
            if (item) {
              setSelectedMenuItem(item)
              setShowClaimModal(true)
            }
          }}
          onEdit={(itemId) => {
            const item = menuItems.find(m => m.id === itemId)
            if (item) {
              setEditingMenuItem(item)
              setShowMenuItemForm(true)
            }
          }}
          onDelete={handleDeleteMenuItem}
          currentUserId={user?.uid}
          isHost={isHost}
          userDietaryPreferences={userDietaryPreferences || undefined}
        />
      </Card>

      {/* Comments Section */}
      <Card className="p-4 sm:p-6 bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-800">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Comments
        </h2>
        {user && (
          <div className="mb-4">
            <CommentForm
              onSubmit={handleCreateComment}
              loading={submitting}
              error={error}
              userAvatarUrl={user.photoURL || undefined}
              userName={user.displayName || undefined}
            />
          </div>
        )}
        <CommentList
          comments={comments}
          currentUserId={user?.uid}
        />
      </Card>

      {/* Modals */}
      <Modal show={showRSVPForm} onClose={() => setShowRSVPForm(false)} className="w-full max-w-md mx-auto">
        <ModalHeader>RSVP</ModalHeader>
        <ModalBody className="p-4 sm:p-6">
          <RSVPForm
            onSubmit={handleRSVP}
            loading={submitting}
            error={error}
            defaultValues={currentRSVP || undefined}
            onCancel={() => setShowRSVPForm(false)}
          />
        </ModalBody>
      </Modal>

      <Modal show={showMenuItemForm} onClose={() => {
        setShowMenuItemForm(false)
        setEditingMenuItem(null)
      }} className="w-full max-w-md mx-auto">
        <ModalHeader>
          {editingMenuItem ? 'Edit Menu Item' : 'Add Menu Item'}
        </ModalHeader>
        <ModalBody className="p-4 sm:p-6">
          <MenuItemForm
            onSubmit={editingMenuItem ? handleUpdateMenuItem : handleCreateMenuItem}
            loading={submitting}
            error={error}
            defaultValues={editingMenuItem || undefined}
            onCancel={() => {
              setShowMenuItemForm(false)
              setEditingMenuItem(null)
            }}
            onImageUpload={editingMenuItem ? handleImageUpload : undefined}
          />
        </ModalBody>
      </Modal>

      <Modal show={showEditEventForm} onClose={() => setShowEditEventForm(false)} className="w-full max-w-2xl mx-auto">
        <ModalHeader>Edit Event</ModalHeader>
        <ModalBody className="p-4 sm:p-6">
          <EventForm
            onSubmit={async (eventData) => {
              await handleUpdateEvent(eventData)
            }}
            loading={submitting}
            error={error}
            defaultValues={event}
            onCancel={() => setShowEditEventForm(false)}
          />
        </ModalBody>
      </Modal>

      <ClaimItemModal
        show={showClaimModal}
        onClose={() => {
          setShowClaimModal(false)
          setSelectedMenuItem(null)
        }}
        item={selectedMenuItem}
        onClaim={async () => {
          if (selectedMenuItem?.id) {
            await handleClaimItem(selectedMenuItem.id)
          }
        }}
        onUnclaim={async () => {
          if (selectedMenuItem?.id) {
            await handleUnclaimItem(selectedMenuItem.id)
          }
        }}
        loading={submitting}
        isClaimed={selectedMenuItem?.isClaimed || false}
      />
    </div>
  )
}

