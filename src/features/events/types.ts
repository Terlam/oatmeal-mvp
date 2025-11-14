import { Timestamp } from 'firebase/firestore'
import type { MenuItemDietaryInfo } from '@/types/dietary'

export interface Event {
  id?: string
  hostId: string
  hostName: string
  hostEmail: string
  hostAvatarUrl?: string
  title: string
  description?: string
  eventDate: Timestamp
  eventTime: string // e.g., "2:00 PM"
  location: {
    name: string
    address?: string
    city?: string
    state?: string
    zip?: string
  }
  isPublic: boolean
  shareToken?: string // For public events (unique token for sharing)
  createdAt: Timestamp
  updatedAt: Timestamp
  theme?: 'thanksgiving' | 'christmas' | 'birthday' | 'general'
  coverImageUrl?: string
}

export interface MenuItem {
  id?: string
  eventId: string
  name: string
  description?: string
  category: 'appetizer' | 'main' | 'side' | 'dessert' | 'beverage' | 'other'
  suggestedServingSize?: string
  dietaryInfo?: MenuItemDietaryInfo
  imageUrl?: string
  isClaimed: boolean
  claimedBy?: string // userId who claimed (can be different from createdBy)
  claimedByName?: string
  claimedByAvatarUrl?: string
  claimedAt?: Timestamp
  createdBy: string // userId who added the item (host or attendee)
  createdByName: string // Display name of who added it
  createdByAvatarUrl?: string
  isOfferedByCreator: boolean // True if creator is offering to bring it when adding
  createdAt: Timestamp
  updatedAt?: Timestamp
}

export interface RSVP {
  id?: string
  eventId: string
  userId: string
  userName: string
  userEmail: string
  userAvatarUrl?: string
  status: 'going' | 'maybe' | 'not_going'
  guestCount: number
  message?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface EventComment {
  id?: string
  eventId: string
  userId: string
  userName: string
  userAvatarUrl?: string
  content: string
  createdAt: Timestamp
  updatedAt?: Timestamp
  isEdited?: boolean
}

export interface EventInvite {
  id?: string
  eventId: string
  email: string
  token: string
  invitedBy: string
  status: 'pending' | 'accepted' | 'declined'
  createdAt: Timestamp
}

export type MenuItemCategory = 'appetizer' | 'main' | 'side' | 'dessert' | 'beverage' | 'other'
export type RSVPStatus = 'going' | 'maybe' | 'not_going'
export type EventTheme = 'thanksgiving' | 'christmas' | 'birthday' | 'general'

