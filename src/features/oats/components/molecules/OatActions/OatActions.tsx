// features/oats/components/molecules/OatActions.tsx

import { Button } from '@components'

export interface OatActionsProps {
  onChew?: () => void
  onScoop?: () => void
  onBurn?: () => void
  disabled?: {
    chew?: boolean
    scoop?: boolean
    burn?: boolean
  }
}

export const OatActions = ({
  onChew,
  onScoop,
  onBurn,
  disabled = {},
}: OatActionsProps) => {
  return (
    <div className="flex gap-3 flex-wrap mt-4">
      {onChew && (
        <Button
          onClick={onChew}
          variant="outline"
          disabled={disabled.chew}
        >
          Chew 🍽️
        </Button>
      )}

      {onScoop && (
        <Button
          onClick={onScoop}
          variant="secondary"
          disabled={disabled.scoop}
        >
          Scoop It 🍦
        </Button>
      )}

      {onBurn && (
        <Button
          onClick={onBurn}
          variant="destructive"
          disabled={disabled.burn}
        >
          Burn 🔥
        </Button>
      )}
    </div>
  )
}
