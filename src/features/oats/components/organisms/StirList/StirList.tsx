// features/oats/components/organisms/StirList.tsx

import type { Stir } from '../../../types'
import { Avatar } from '@components'

export interface StirListProps {
  stirs: Stir[]
}

export const StirList = ({ stirs }: StirListProps) => {
  if (!stirs.length) return <p className="text-sm text-muted">No stirs yet. Be the first to mix in. 🥄</p>

  return (
    <div className="space-y-4 mt-4">
      {stirs.map((stir) => (
        <div key={stir.id} className="flex gap-3 items-start">
          <Avatar userId={stir.authorId} />
          <div>
            <p className="text-sm">{stir.content}</p>
            <p className="text-xs text-muted">{new Date(stir.createdAt?.toDate?.() || '').toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
