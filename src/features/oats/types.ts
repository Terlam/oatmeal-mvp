// features/oats/types.ts
import { Timestamp } from 'firebase/firestore'

export interface Oat {
  id?: string
  title: string
  content: string
  authorId: string
  createdAt?: Timestamp
  isScooped?: boolean
  scoopedAt?: Timestamp
  chews?: number
  description?: string
}

export type DrizzleType = 'vanilla' | 'cinnamon' | 'maple'

export interface Stir {
  id?: string
  oatId: string
  authorId: string
  content: string
  createdAt?: Timestamp
}
