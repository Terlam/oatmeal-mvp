import React from 'react'
import { OatCard } from '../OatCard'
import type { Oat } from '../../../types'

interface ScoopShelfProps {
  scoops: Oat[]
  onChew?: (id: string) => void
  onStir?: (id: string) => void
}

export const ScoopShelf: React.FC<ScoopShelfProps> = ({ scoops, onChew, onStir }) => (
  <div className="flex flex-col gap-4">
    {scoops.map((scoop) => (
      <OatCard
        key={scoop.id}
        oat={scoop}
        onChew={onChew ? () => onChew(scoop.id!) : undefined}
        onStir={onStir ? () => onStir(scoop.id!) : undefined}
      />
    ))}
  </div>
)