import React from 'react'
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import type { MenuItemDietaryInfo, UserDietaryPreferences, DietaryCompatibility } from '@/types/dietary'
import { DIETARY_RESTRICTIONS } from '@/types/dietary'
import {
  checkDietaryCompatibility,
  getWarningSeverity,
} from '@/utils/dietaryMatching'
import clsx from 'clsx'

export interface DietaryBadgesProps {
  dietaryInfo?: MenuItemDietaryInfo
  userPreferences?: UserDietaryPreferences
  showWarnings?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const DietaryBadges: React.FC<DietaryBadgesProps> = ({
  dietaryInfo,
  userPreferences,
  showWarnings = true,
  className,
  size = 'md',
}) => {
  console.log('[DietaryBadges] Component rendering')
  console.log('[DietaryBadges] dietaryInfo:', dietaryInfo)
  console.log('[DietaryBadges] userPreferences:', userPreferences)
  
  if (!dietaryInfo) {
    console.log('[DietaryBadges] No dietaryInfo, returning null')
    return null
  }

  // Get compatibility if user preferences are provided
  let compatibility: DietaryCompatibility | null = null
  if (userPreferences && showWarnings) {
    console.log('[DietaryBadges] Checking compatibility')
    try {
      compatibility = checkDietaryCompatibility(dietaryInfo, userPreferences)
      console.log('[DietaryBadges] Compatibility result:', compatibility)
    } catch (error) {
      console.error('[DietaryBadges] Error checking compatibility:', error)
    }
  }

  const warningSeverity = compatibility ? getWarningSeverity(compatibility) : 'none'
  console.log('[DietaryBadges] Warning severity:', warningSeverity)

  // Get all active dietary flags
  const activeRestrictions: Array<{ id: string; meta: { id: string; label: string; icon: string; description: string; category: string; color: string } }> = []
  console.log('[DietaryBadges] Building active restrictions, DIETARY_RESTRICTIONS:', DIETARY_RESTRICTIONS)

  try {
    Object.entries(DIETARY_RESTRICTIONS).forEach(([key, meta]) => {
      const flagKey = key as keyof MenuItemDietaryInfo
      if (dietaryInfo[flagKey] === true) {
        activeRestrictions.push({ id: key, meta })
      }
    })
    console.log('[DietaryBadges] Active restrictions built:', activeRestrictions)
  } catch (error) {
    console.error('[DietaryBadges] Error building restrictions:', error)
  }

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-2.5 py-1.5',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  console.log('[DietaryBadges] About to render JSX')

  return (
    <div className={clsx('flex flex-wrap gap-2', className)}>
      {/* Show active dietary restrictions */}
      {activeRestrictions.map(({ id, meta }) => (
        <span
          key={id}
          className={clsx(
            'inline-flex items-center gap-1 font-semibold rounded-full',
            sizeClasses[size],
            {
              'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200':
                meta.category === 'lifestyle',
              'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200':
                meta.category === 'religious',
              'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200':
                meta.category === 'health',
              'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200':
                meta.category === 'allergy',
            }
          )}
          title={meta.description}
        >
          <span>{meta.icon}</span>
          <span>{meta.label}</span>
        </span>
      ))}

      {/* Show warnings if user preferences don't match */}
      {compatibility && showWarnings && warningSeverity !== 'none' && (
        <span
          className={clsx(
            'inline-flex items-center gap-1 font-semibold rounded-full',
            sizeClasses[size],
            {
              'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200':
                warningSeverity === 'high',
              'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200':
                warningSeverity === 'medium',
              'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200':
                warningSeverity === 'low',
            }
          )}
          title={compatibility.warnings.join('; ')}
        >
          {warningSeverity === 'high' ? (
            <XCircle className={iconSizes[size]} />
          ) : (
            <AlertTriangle className={iconSizes[size]} />
          )}
          <span>
            {warningSeverity === 'high'
              ? 'Not Safe'
              : warningSeverity === 'medium'
              ? 'Caution'
              : 'Check'}
          </span>
        </span>
      )}

      {/* Show compatibility checkmark if everything matches */}
      {compatibility && showWarnings && compatibility.isCompatible && compatibility.isSafe && (
        <span
          className={clsx(
            'inline-flex items-center gap-1 font-semibold rounded-full',
            sizeClasses[size],
            'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
          )}
          title="Compatible with your dietary preferences"
        >
          <CheckCircle className={iconSizes[size]} />
          <span>Safe for You</span>
        </span>
      )}
    </div>
  )
}
