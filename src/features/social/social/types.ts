// features/social/types.ts
import { Timestamp } from 'firebase/firestore'

export interface Post {
  id?: string
  title: string
  content: string
  authorId: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  isEdited?: boolean
  isScooped?: boolean
  scoopedAt?: Timestamp
  chews?: number
  description?: string
  
  // Social interaction fields
  likes?: string[] // Array of user IDs who liked
  likeCount?: number
  commentCount?: number
  shareCount?: number
  
  // Sharing/resharing
  sharedFromId?: string // Original post ID if this is a reshare
  sharedFromAuthorId?: string // Original author ID
  
  // Optional extras
  media?: string[] // URLs to images/videos
  topicTags?: string[] // Categories/topics
  reactionTypes?: ReactionType[] // Future-proof engagement
  
  // Moderation
  isReported?: boolean
  reportedBy?: string[]
}

export interface Stir {
  id?: string
  postId: string
  authorId: string
  content: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  isEdited?: boolean
  
  // Social interaction fields
  likes?: string[] // Array of user IDs who liked
  likeCount?: number
  
  // Moderation
  isReported?: boolean
  reportedBy?: string[]
}

export type ReactionType = 'like' | 'laugh' | 'cry' | 'love' | 'wow' | 'angry'

export interface PostInteraction {
  id?: string
  postId: string
  userId: string
  type: 'like' | 'share' | 'report'
  createdAt?: Timestamp
  metadata?: {
    reactionType?: ReactionType
    sharePlatform?: string
    reportReason?: string
  }
}

export interface Comment {
  id?: string
  postId: string
  authorId: string
  content: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  isEdited?: boolean
  
  // Social interaction fields
  likes?: string[]
  likeCount?: number
  
  // Moderation
  isReported?: boolean
  reportedBy?: string[]
}

export type DrizzleType = 'vanilla' | 'cinnamon' | 'maple'
