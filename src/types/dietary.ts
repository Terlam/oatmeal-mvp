/**
 * Comprehensive dietary restrictions and preferences types
 * Used across features for user profiles and menu items
 */

/**
 * Standard dietary restrictions that can be applied to both users and menu items
 */
export type DietaryRestriction =
  | 'vegetarian'
  | 'vegan'
  | 'glutenFree'
  | 'dairyFree'
  | 'nutFree'
  | 'soyFree'
  | 'eggFree'
  | 'fishFree'
  | 'shellfishFree'
  | 'halal'
  | 'kosher'
  | 'lowSodium'
  | 'lowSugar'
  | 'keto'
  | 'paleo'
  | 'whole30'

/**
 * Food allergies (more specific than dietary restrictions)
 */
export type FoodAllergy =
  | 'peanuts'
  | 'treeNuts'
  | 'milk'
  | 'eggs'
  | 'fish'
  | 'shellfish'
  | 'soy'
  | 'wheat'
  | 'sesame'
  | 'mustard'
  | 'sulfites'
  | 'lupin'
  | 'celery'
  | 'other'

/**
 * Dietary preferences for users
 * Includes both restrictions they follow and allergies they have
 */
export interface UserDietaryPreferences {
  // Dietary restrictions/lifestyles the user follows
  restrictions?: DietaryRestriction[]
  
  // Food allergies the user has (critical - these are safety concerns)
  allergies?: FoodAllergy[]
  
  // Custom allergies or restrictions not in the standard list
  customAllergies?: string[]
  customRestrictions?: string[]
  
  // Severity level for allergies (affects how prominently warnings are shown)
  allergySeverity?: 'mild' | 'moderate' | 'severe'
  
  // Whether to show warnings for items that don't match preferences
  showWarnings?: boolean
}

/**
 * Dietary information for menu items
 * What dietary restrictions/preferences this item satisfies
 */
export interface MenuItemDietaryInfo {
  // Standard dietary restrictions this item satisfies
  vegetarian?: boolean
  vegan?: boolean
  glutenFree?: boolean
  dairyFree?: boolean
  nutFree?: boolean
  soyFree?: boolean
  eggFree?: boolean
  fishFree?: boolean
  shellfishFree?: boolean
  halal?: boolean
  kosher?: boolean
  lowSodium?: boolean
  lowSugar?: boolean
  keto?: boolean
  paleo?: boolean
  whole30?: boolean
  
  // Contains allergens (for warning purposes)
  containsAllergens?: FoodAllergy[]
  
  // May contain allergens (cross-contamination warnings)
  mayContainAllergens?: FoodAllergy[]
  
  // Custom dietary information
  customInfo?: string[]
  
  // Preparation notes (e.g., "prepared in a facility that processes nuts")
  preparationNotes?: string
}

/**
 * Dietary compatibility result
 * Used to determine if a menu item is safe/compatible for a user
 */
export interface DietaryCompatibility {
  isCompatible: boolean
  isSafe: boolean // True if no allergens present
  warnings: string[]
  missingRestrictions: DietaryRestriction[] // User restrictions not met by item
  presentAllergens: FoodAllergy[] // Allergens in item that user is allergic to
  mayContainAllergens: FoodAllergy[] // Potential cross-contamination
}

/**
 * Dietary restriction metadata for UI display
 */
export interface DietaryRestrictionMeta {
  id: DietaryRestriction
  label: string
  icon: string
  description: string
  category: 'lifestyle' | 'allergy' | 'health' | 'religious'
  color: string
}

/**
 * Food allergy metadata for UI display
 */
export interface FoodAllergyMeta {
  id: FoodAllergy
  label: string
  icon: string
  description: string
  severity: 'mild' | 'moderate' | 'severe'
  color: string
}

/**
 * Standard dietary restrictions metadata
 */
export const DIETARY_RESTRICTIONS: Record<DietaryRestriction, DietaryRestrictionMeta> = {
  vegetarian: {
    id: 'vegetarian',
    label: 'Vegetarian',
    icon: '🥬',
    description: 'No meat or fish',
    category: 'lifestyle',
    color: 'green',
  },
  vegan: {
    id: 'vegan',
    label: 'Vegan',
    icon: '🌱',
    description: 'No animal products',
    category: 'lifestyle',
    color: 'green',
  },
  glutenFree: {
    id: 'glutenFree',
    label: 'Gluten Free',
    icon: '🌾',
    description: 'No gluten-containing ingredients',
    category: 'health',
    color: 'amber',
  },
  dairyFree: {
    id: 'dairyFree',
    label: 'Dairy Free',
    icon: '🥛',
    description: 'No dairy products',
    category: 'allergy',
    color: 'red',
  },
  nutFree: {
    id: 'nutFree',
    label: 'Nut Free',
    icon: '🥜',
    description: 'No tree nuts or peanuts',
    category: 'allergy',
    color: 'red',
  },
  soyFree: {
    id: 'soyFree',
    label: 'Soy Free',
    icon: '🫘',
    description: 'No soy products',
    category: 'allergy',
    color: 'red',
  },
  eggFree: {
    id: 'eggFree',
    label: 'Egg Free',
    icon: '🥚',
    description: 'No eggs',
    category: 'allergy',
    color: 'red',
  },
  fishFree: {
    id: 'fishFree',
    label: 'Fish Free',
    icon: '🐟',
    description: 'No fish',
    category: 'allergy',
    color: 'red',
  },
  shellfishFree: {
    id: 'shellfishFree',
    label: 'Shellfish Free',
    icon: '🦐',
    description: 'No shellfish',
    category: 'allergy',
    color: 'red',
  },
  halal: {
    id: 'halal',
    label: 'Halal',
    icon: '☪️',
    description: 'Prepared according to Islamic dietary laws',
    category: 'religious',
    color: 'blue',
  },
  kosher: {
    id: 'kosher',
    label: 'Kosher',
    icon: '✡️',
    description: 'Prepared according to Jewish dietary laws',
    category: 'religious',
    color: 'blue',
  },
  lowSodium: {
    id: 'lowSodium',
    label: 'Low Sodium',
    icon: '🧂',
    description: 'Low salt content',
    category: 'health',
    color: 'blue',
  },
  lowSugar: {
    id: 'lowSugar',
    label: 'Low Sugar',
    icon: '🍬',
    description: 'Low sugar content',
    category: 'health',
    color: 'blue',
  },
  keto: {
    id: 'keto',
    label: 'Keto',
    icon: '🥑',
    description: 'Ketogenic diet friendly',
    category: 'health',
    color: 'purple',
  },
  paleo: {
    id: 'paleo',
    label: 'Paleo',
    icon: '🥩',
    description: 'Paleolithic diet friendly',
    category: 'health',
    color: 'purple',
  },
  whole30: {
    id: 'whole30',
    label: 'Whole30',
    icon: '🥗',
    description: 'Whole30 diet friendly',
    category: 'health',
    color: 'purple',
  },
}

/**
 * Food allergy metadata
 */
export const FOOD_ALLERGIES: Record<FoodAllergy, FoodAllergyMeta> = {
  peanuts: {
    id: 'peanuts',
    label: 'Peanuts',
    icon: '🥜',
    description: 'Peanut allergy',
    severity: 'severe',
    color: 'red',
  },
  treeNuts: {
    id: 'treeNuts',
    label: 'Tree Nuts',
    icon: '🌰',
    description: 'Tree nut allergy (almonds, walnuts, etc.)',
    severity: 'severe',
    color: 'red',
  },
  milk: {
    id: 'milk',
    label: 'Milk',
    icon: '🥛',
    description: 'Milk/dairy allergy',
    severity: 'moderate',
    color: 'red',
  },
  eggs: {
    id: 'eggs',
    label: 'Eggs',
    icon: '🥚',
    description: 'Egg allergy',
    severity: 'moderate',
    color: 'red',
  },
  fish: {
    id: 'fish',
    label: 'Fish',
    icon: '🐟',
    description: 'Fish allergy',
    severity: 'severe',
    color: 'red',
  },
  shellfish: {
    id: 'shellfish',
    label: 'Shellfish',
    icon: '🦐',
    description: 'Shellfish allergy',
    severity: 'severe',
    color: 'red',
  },
  soy: {
    id: 'soy',
    label: 'Soy',
    icon: '🫘',
    description: 'Soy allergy',
    severity: 'moderate',
    color: 'red',
  },
  wheat: {
    id: 'wheat',
    label: 'Wheat',
    icon: '🌾',
    description: 'Wheat allergy',
    severity: 'moderate',
    color: 'red',
  },
  sesame: {
    id: 'sesame',
    label: 'Sesame',
    icon: '🌰',
    description: 'Sesame allergy',
    severity: 'moderate',
    color: 'red',
  },
  mustard: {
    id: 'mustard',
    label: 'Mustard',
    icon: '🌿',
    description: 'Mustard allergy',
    severity: 'mild',
    color: 'orange',
  },
  sulfites: {
    id: 'sulfites',
    label: 'Sulfites',
    icon: '🧪',
    description: 'Sulfite sensitivity',
    severity: 'moderate',
    color: 'orange',
  },
  lupin: {
    id: 'lupin',
    label: 'Lupin',
    icon: '🌺',
    description: 'Lupin allergy',
    severity: 'moderate',
    color: 'orange',
  },
  celery: {
    id: 'celery',
    label: 'Celery',
    icon: '🥬',
    description: 'Celery allergy',
    severity: 'mild',
    color: 'orange',
  },
  other: {
    id: 'other',
    label: 'Other',
    icon: '⚠️',
    description: 'Other food allergy',
    severity: 'moderate',
    color: 'red',
  },
}

