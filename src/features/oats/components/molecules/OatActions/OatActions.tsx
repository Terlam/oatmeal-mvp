import React from 'react'
import { Button } from '@/components/atoms'
import { Tooltip } from 'flowbite-react'
import { Bookmark, Heart, Share2, Edit, Trash2, PlusCircle } from 'lucide-react'

interface OatActionsProps {
  onScoop?: () => void
  onTaste?: () => void
  onStir?: () => void
  onCompost?: () => void
  onSave?: () => void
  onSprinkle?: () => void
  onShare?: () => void
  disabled?: {
    scoop?: boolean
    taste?: boolean
    stir?: boolean
    compost?: boolean
    save?: boolean
    sprinkle?: boolean
    share?: boolean
  }
}

export const OatActions: React.FC<OatActionsProps> = ({
  onScoop,
  onTaste,
  onStir,
  onCompost,
  onSave,
  onSprinkle,
  onShare,
  disabled = {},
}) => (
  <div className="flex gap-2 flex-wrap mt-4">
    <Tooltip content="Scoop a fresh oat into your bowl. Start a new idea or recipe.">
      <Button onClick={onScoop} disabled={disabled.scoop} icon={PlusCircle}>
        Scoop
      </Button>
    </Tooltip>
    <Tooltip content="Taste this oat to see its details and stirs.">
      <Button onClick={onTaste} disabled={disabled.taste} icon={Edit}>
        Taste
      </Button>
    </Tooltip>
    <Tooltip content="Stir your oat to update its flavor or details.">
      <Button onClick={onStir} disabled={disabled.stir} icon={Edit}>
        Stir
      </Button>
    </Tooltip>
    <Tooltip content="Compost this oat to remove it from your pantry.">
      <Button onClick={onCompost} disabled={disabled.compost} icon={Trash2} variant="destructive">
        Compost
      </Button>
    </Tooltip>
    <Tooltip content="Save this oat to your pantry for later.">
      <Button onClick={onSave} disabled={disabled.save} icon={Bookmark}>
        Save
      </Button>
    </Tooltip>
    <Tooltip content="Sprinkle some love on this oat.">
      <Button onClick={onSprinkle} disabled={disabled.sprinkle} icon={Heart}>
        Sprinkle
      </Button>
    </Tooltip>
    <Tooltip content="Share this oat with friends.">
      <Button onClick={onShare} disabled={disabled.share} icon={Share2}>
        Share
      </Button>
    </Tooltip>
  </div>
)