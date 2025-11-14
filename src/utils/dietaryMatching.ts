/**
 * Utility functions for matching user dietary preferences with menu items
 * Provides compatibility checking and warning generation
 */

import type {
  UserDietaryPreferences,
  MenuItemDietaryInfo,
  DietaryCompatibility,
  DietaryRestriction,
  FoodAllergy,
} from '@/types/dietary'

/**
 * Maps dietary restrictions to their corresponding menu item flags
 */
const RESTRICTION_TO_MENU_FLAG: Record<DietaryRestriction, keyof MenuItemDietaryInfo> = {
  vegetarian: 'vegetarian',
  vegan: 'vegan',
  glutenFree: 'glutenFree',
  dairyFree: 'dairyFree',
  nutFree: 'nutFree',
  soyFree: 'soyFree',
  eggFree: 'eggFree',
  fishFree: 'fishFree',
  shellfishFree: 'shellfishFree',
  halal: 'halal',
  kosher: 'kosher',
  lowSodium: 'lowSodium',
  lowSugar: 'lowSugar',
  keto: 'keto',
  paleo: 'paleo',
  whole30: 'whole30',
}

/**
 * Maps food allergies to their corresponding menu item flags
 */
const ALLERGY_TO_MENU_FLAG: Partial<Record<FoodAllergy, keyof MenuItemDietaryInfo>> = {
  peanuts: 'nutFree', // If nutFree is true, no peanuts
  treeNuts: 'nutFree', // If nutFree is true, no tree nuts
  milk: 'dairyFree', // If dairyFree is true, no milk
  eggs: 'eggFree', // If eggFree is true, no eggs
  fish: 'fishFree', // If fishFree is true, no fish
  shellfish: 'shellfishFree', // If shellfishFree is true, no shellfish
  soy: 'soyFree', // If soyFree is true, no soy
  wheat: 'glutenFree', // If glutenFree is true, no wheat (usually)
}

/**
 * Check if a menu item is compatible with user dietary preferences
 */
export const checkDietaryCompatibility = (
  menuItem: MenuItemDietaryInfo | undefined,
  userPreferences: UserDietaryPreferences | undefined
): DietaryCompatibility => {
  // If no preferences or no dietary info, assume compatible
  if (!userPreferences || !menuItem) {
    return {
      isCompatible: true,
      isSafe: true,
      warnings: [],
      missingRestrictions: [],
      presentAllergens: [],
      mayContainAllergens: [],
    }
  }

  const warnings: string[] = []
  const missingRestrictions: DietaryRestriction[] = []
  const presentAllergens: FoodAllergy[] = []
  const mayContainAllergens: FoodAllergy[] = []

  // Check dietary restrictions
  if (userPreferences.restrictions && userPreferences.restrictions.length > 0) {
    for (const restriction of userPreferences.restrictions) {
      const menuFlag = RESTRICTION_TO_MENU_FLAG[restriction]
      if (menuFlag && !menuItem[menuFlag]) {
        missingRestrictions.push(restriction)
        warnings.push(`Does not meet ${restriction} requirement`)
      }
    }
  }

  // Check food allergies (critical safety check)
  if (userPreferences.allergies && userPreferences.allergies.length > 0) {
    // Check if item contains allergens
    if (menuItem.containsAllergens) {
      for (const allergen of menuItem.containsAllergens) {
        if (userPreferences.allergies.includes(allergen)) {
          presentAllergens.push(allergen)
          warnings.push(`⚠️ CONTAINS ${allergen.toUpperCase()} - NOT SAFE`)
        }
      }
    }

    // Check if item may contain allergens (cross-contamination)
    if (menuItem.mayContainAllergens) {
      for (const allergen of menuItem.mayContainAllergens) {
        if (userPreferences.allergies.includes(allergen)) {
          mayContainAllergens.push(allergen)
          warnings.push(`⚠️ May contain ${allergen} (cross-contamination risk)`)
        }
      }
    }

    // Check dietary flags that indicate absence of allergens
    for (const allergy of userPreferences.allergies) {
      const menuFlag = ALLERGY_TO_MENU_FLAG[allergy]
      if (menuFlag) {
        // If user has this allergy, check if item is free of it
        if (!menuItem[menuFlag]) {
          // Item doesn't explicitly say it's free of this allergen
          // This is a warning, not necessarily unsafe
          if (!menuItem.containsAllergens?.includes(allergy)) {
            warnings.push(`⚠️ ${allergy} status not specified - check with host`)
          }
        }
      }
    }
  }

  // Check custom allergies
  if (userPreferences.customAllergies && userPreferences.customAllergies.length > 0) {
    if (menuItem.preparationNotes) {
      const notesLower = menuItem.preparationNotes.toLowerCase()
      for (const customAllergy of userPreferences.customAllergies) {
        if (notesLower.includes(customAllergy.toLowerCase())) {
          warnings.push(`⚠️ May contain ${customAllergy} - check with host`)
        }
      }
    }
  }

  // Determine if item is safe (no allergens present)
  const isSafe = presentAllergens.length === 0

  // Determine if item is compatible (meets restrictions and is safe)
  const isCompatible = missingRestrictions.length === 0 && isSafe

  return {
    isCompatible,
    isSafe,
    warnings,
    missingRestrictions,
    presentAllergens,
    mayContainAllergens,
  }
}

/**
 * Get a summary message for dietary compatibility
 */
export const getCompatibilityMessage = (compatibility: DietaryCompatibility): string | null => {
  if (compatibility.isCompatible && compatibility.isSafe) {
    return null // No message needed, everything is good
  }

  if (!compatibility.isSafe) {
    return `⚠️ Contains allergens: ${compatibility.presentAllergens.join(', ')}`
  }

  if (compatibility.missingRestrictions.length > 0) {
    return `Does not meet: ${compatibility.missingRestrictions.join(', ')}`
  }

  return null
}

/**
 * Get the severity level for warnings
 */
export const getWarningSeverity = (compatibility: DietaryCompatibility): 'none' | 'low' | 'medium' | 'high' => {
  if (compatibility.presentAllergens.length > 0) {
    return 'high' // Contains allergens user is allergic to
  }

  if (compatibility.mayContainAllergens.length > 0) {
    return 'medium' // May contain allergens (cross-contamination)
  }

  if (compatibility.missingRestrictions.length > 0) {
    return 'low' // Doesn't meet dietary preferences
  }

  return 'none'
}

