import React from 'react'
import { Card } from '@/components/atoms/Card'
import { Avatar } from '@/components/atoms/Avatar'
import { Button } from '@/components/atoms/Button'
import { User, CheckCircle, Circle } from 'lucide-react'
import type { MenuItem } from '../../types'
import clsx from 'clsx'

export interface MenuItemCardProps {
  item: MenuItem
  onClaim?: (itemId: string) => void
  onUnclaim?: (itemId: string) => void
  onEdit?: (itemId: string) => void
  onDelete?: (itemId: string) => void
  currentUserId?: string
  isHost?: boolean
  className?: string
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onClaim,
  onUnclaim,
  onEdit,
  onDelete,
  currentUserId,
  isHost,
  className,
}) => {
  const isClaimed = item.isClaimed
  const isClaimedByCurrentUser = item.claimedBy === currentUserId
  const isCreatedByCurrentUser = item.createdBy === currentUserId
  const canEdit = isCreatedByCurrentUser || isHost
  const canDelete = isCreatedByCurrentUser || isHost
  const canClaim = !isClaimed && currentUserId
  const canUnclaim = isClaimed && isClaimedByCurrentUser

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'appetizer':
        return '🥗'
      case 'main':
        return '🍗'
      case 'side':
        return '🥔'
      case 'dessert':
        return '🍰'
      case 'beverage':
        return '🥤'
      default:
        return '🍽️'
    }
  }

  const getDietaryBadges = () => {
    const badges = []
    if (item.dietaryInfo?.vegetarian) badges.push('Vegetarian')
    if (item.dietaryInfo?.vegan) badges.push('Vegan')
    if (item.dietaryInfo?.glutenFree) badges.push('Gluten Free')
    if (item.dietaryInfo?.nutFree) badges.push('Nut Free')
    if (item.dietaryInfo?.dairyFree) badges.push('Dairy Free')
    return badges
  }

  return (
    <Card
      className={clsx(
        'p-4 hover:shadow-lg transition-shadow',
        'bg-white dark:bg-gray-800',
        'border-2',
        isClaimed
          ? 'border-green-200 dark:border-green-800'
          : 'border-orange-200 dark:border-orange-800',
        className
      )}
    >
      <div className="flex flex-col space-y-3">
        {/* Header with category and claim status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getCategoryIcon(item.category)}</span>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
              {item.category}
            </span>
          </div>
          {isClaimed ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-300" />
          )}
        </div>

        {/* Item image */}
        {item.imageUrl && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Item name */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {item.name}
        </h3>

        {/* Item description */}
        {item.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {item.description}
          </p>
        )}

        {/* Serving size */}
        {item.suggestedServingSize && (
          <p className="text-sm text-gray-500 dark:text-gray-200">
            Serving size: {item.suggestedServingSize}
          </p>
        )}

        {/* Dietary info */}
        {item.dietaryInfo && getDietaryBadges().length > 0 && (
          <div className="flex flex-wrap gap-2">
            {getDietaryBadges().map((badge) => (
              <span
                key={badge}
                className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Created by */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-200">
          <User className="w-4 h-4" />
          <span>Added by {item.createdByName}</span>
        </div>

        {/* Claimed by */}
        {isClaimed && item.claimedByName && (
          <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span>Bringing: {item.claimedByName}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            {canEdit && (
              <Button
                size="sm"
                color="light"
                onClick={() => onEdit?.(item.id!)}
              >
                Edit
              </Button>
            )}
            {canDelete && (
              <Button
                size="sm"
                color="light"
                onClick={() => onDelete?.(item.id!)}
              >
                Delete
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            {canClaim && (
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => onClaim?.(item.id!)}
              >
                Claim
              </Button>
            )}
            {canUnclaim && (
              <Button
                size="sm"
                color="light"
                onClick={() => onUnclaim?.(item.id!)}
              >
                Unclaim
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

