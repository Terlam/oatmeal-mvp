import React from 'react'
import { Card } from '@/components/atoms/Card'
import { Avatar } from '@/components/atoms/Avatar'
import { Button } from '@/components/atoms/Button'
import { DietaryBadges } from '@/components/molecules/DietaryBadges'
import { User, CheckCircle, Circle, AlertTriangle } from 'lucide-react'
import type { MenuItem } from '@/features/events/types'
import type { UserDietaryPreferences } from '@/types/dietary'
import { checkDietaryCompatibility, getWarningSeverity } from '@/utils/dietaryMatching'
import clsx from 'clsx'

export interface MenuItemCardProps {
  item: MenuItem
  onClaim?: (itemId: string) => void
  onUnclaim?: (itemId: string) => void
  onEdit?: (itemId: string) => void
  onDelete?: (itemId: string) => void
  currentUserId?: string
  isHost?: boolean
  userDietaryPreferences?: UserDietaryPreferences
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
  userDietaryPreferences,
  className,
}) => {
  const isClaimed = item.isClaimed
  const isClaimedByCurrentUser = item.claimedBy === currentUserId
  const isCreatedByCurrentUser = item.createdBy === currentUserId
  const canEdit = isCreatedByCurrentUser || isHost
  const canDelete = isCreatedByCurrentUser || isHost
  const canClaim = !isClaimed && currentUserId
  const canUnclaim = isClaimed && isClaimedByCurrentUser

  // Check dietary compatibility
  const compatibility = userDietaryPreferences
    ? checkDietaryCompatibility(item.dietaryInfo, userDietaryPreferences)
    : null
  const warningSeverity = compatibility ? getWarningSeverity(compatibility) : 'none'
  const showWarning = userDietaryPreferences?.showWarnings !== false && warningSeverity !== 'none'

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

  return (
    <Card
      className={clsx(
        'p-4 hover:shadow-lg transition-shadow',
        'bg-white dark:bg-gray-800',
        'border-2',
        isClaimed
          ? 'border-green-200 dark:border-green-800'
          : 'border-orange-200 dark:border-orange-800',
        // Add warning border if there are dietary issues
        showWarning &&
          warningSeverity === 'high' &&
          'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20',
        showWarning &&
          warningSeverity === 'medium' &&
          'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20',
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

        {/* Dietary info with compatibility warnings */}
        {item.dietaryInfo && (
          <DietaryBadges
            dietaryInfo={item.dietaryInfo}
            userDietaryPreferences={userDietaryPreferences}
            showWarnings={userDietaryPreferences?.showWarnings !== false}
          />
        )}

        {/* Warning message for high-severity issues */}
        {showWarning && warningSeverity === 'high' && compatibility && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
                  ⚠️ Contains Allergens
                </p>
                <ul className="text-xs text-red-700 dark:text-red-300 list-disc list-inside space-y-1">
                  {compatibility.warnings.map((warning, idx) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              </div>
            </div>
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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            {canEdit && (
              <Button
                size="sm"
                color="light"
                onClick={() => onEdit?.(item.id!)}
                className="min-h-[44px] flex-1 sm:flex-none"
              >
                Edit
              </Button>
            )}
            {canDelete && (
              <Button
                size="sm"
                color="light"
                onClick={() => onDelete?.(item.id!)}
                className="min-h-[44px] flex-1 sm:flex-none"
              >
                Delete
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            {canClaim && (
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white min-h-[44px] flex-1 sm:flex-none"
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
                className="min-h-[44px] flex-1 sm:flex-none"
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

