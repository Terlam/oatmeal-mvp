// features/oats/components/organisms/PantryGrid.tsx

import { OatCard } from '../OatCard'
import type { Oat } from '../../../types'

export interface PantryGridProps {
  oats: Oat[]
  onChew?: (id: string) => void
  onScoop?: (id: string) => void
  onBurn?: (id: string) => void
}

export const PantryGrid = ({ oats, onChew, onScoop, onBurn }: PantryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {oats.map((oat) => (
        <OatCard
          key={oat.id}
          oat={oat}
          onChew={() => onChew?.(oat.id!)}
          onScoop={() => onScoop?.(oat.id!)}
          onBurn={() => onBurn?.(oat.id!)}
        />
      ))}
    </div>
  )
}
