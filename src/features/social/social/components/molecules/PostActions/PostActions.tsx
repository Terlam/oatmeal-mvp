// features/social/components/molecules/PostActions.tsx

import { Button } from '@components'

export interface PostActionsProps {
  onChew?: () => void
  onScoop?: () => void
  onBurn?: () => void
  disabled?: {
    chew?: boolean
    scoop?: boolean
    burn?: boolean
  }
}

export const PostActions = ({
  onChew,
  onScoop,
  onBurn,
  disabled = {},
}: PostActionsProps) => {
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
