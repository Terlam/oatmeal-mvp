import React from 'react'
import { MenuItemCard } from '../../molecules/MenuItemCard'
import type { MenuItem, MenuItemCategory } from '@/features/events/types'
import type { UserDietaryPreferences } from '@/types/dietary'
import clsx from 'clsx'

export interface MenuGridProps {
  menuItems: MenuItem[]
  onClaim?: (itemId: string) => void
  onUnclaim?: (itemId: string) => void
  onEdit?: (itemId: string) => void
  onDelete?: (itemId: string) => void
  currentUserId?: string
  isHost?: boolean
  userDietaryPreferences?: UserDietaryPreferences
  className?: string
  emptyMessage?: string
  groupByCategory?: boolean
}

const categoryLabels: Record<MenuItemCategory, string> = {
  appetizer: 'Appetizers',
  main: 'Main Dishes',
  side: 'Sides',
  dessert: 'Desserts',
  beverage: 'Beverages',
  other: 'Other',
}

export const MenuGrid: React.FC<MenuGridProps> = ({
  menuItems,
  onClaim,
  onUnclaim,
  onEdit,
  onDelete,
  currentUserId,
  isHost,
  userDietaryPreferences,
  className,
  emptyMessage = 'No menu items yet.',
  groupByCategory = true,
}) => {
  if (menuItems.length === 0) {
    return (
      <div className={clsx('text-center py-12', className)}>
        <p className="text-gray-500 dark:text-gray-200">{emptyMessage}</p>
      </div>
    )
  }

  if (!groupByCategory) {
    return (
      <div className={clsx('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
        {menuItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onClaim={onClaim}
            onUnclaim={onUnclaim}
            onEdit={onEdit}
            onDelete={onDelete}
            currentUserId={currentUserId}
            isHost={isHost}
            userDietaryPreferences={userDietaryPreferences}
          />
        ))}
      </div>
    )
  }

  // Group by category
  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<MenuItemCategory, MenuItem[]>)

  const categories: MenuItemCategory[] = ['appetizer', 'main', 'side', 'dessert', 'beverage', 'other']

  return (
    <div className={clsx('space-y-8', className)}>
      {categories.map((category) => {
        const items = groupedItems[category] || []
        if (items.length === 0) return null

        return (
          <div key={category}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {categoryLabels[category]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onClaim={onClaim}
                  onUnclaim={onUnclaim}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  currentUserId={currentUserId}
                  isHost={isHost}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

