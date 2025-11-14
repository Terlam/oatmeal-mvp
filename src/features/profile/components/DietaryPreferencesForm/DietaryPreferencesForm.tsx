import React, { useState, useEffect } from 'react'
import { Card } from '@/components/atoms/Card'
import { Label, Button } from '@/components/atoms'
import { Checkbox, Textarea } from 'flowbite-react'
import type { UserDietaryPreferences, DietaryRestriction, FoodAllergy } from '@/types/dietary'
import {
  DIETARY_RESTRICTIONS,
  FOOD_ALLERGIES,
  type DietaryRestrictionMeta,
  type FoodAllergyMeta,
} from '@/types/dietary'
import clsx from 'clsx'

export interface DietaryPreferencesFormProps {
  initialPreferences?: UserDietaryPreferences
  onSubmit: (preferences: UserDietaryPreferences) => Promise<void>
  onCancel?: () => void
  loading?: boolean
}

export const DietaryPreferencesForm: React.FC<DietaryPreferencesFormProps> = ({
  initialPreferences,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [restrictions, setRestrictions] = useState<DietaryRestriction[]>(
    initialPreferences?.restrictions || []
  )
  const [allergies, setAllergies] = useState<FoodAllergy[]>(
    initialPreferences?.allergies || []
  )
  const [customAllergies, setCustomAllergies] = useState<string>(
    initialPreferences?.customAllergies?.join(', ') || ''
  )
  const [customRestrictions, setCustomRestrictions] = useState<string>(
    initialPreferences?.customRestrictions?.join(', ') || ''
  )
  const [allergySeverity, setAllergySeverity] = useState<'mild' | 'moderate' | 'severe'>(
    initialPreferences?.allergySeverity || 'moderate'
  )
  const [showWarnings, setShowWarnings] = useState<boolean>(
    initialPreferences?.showWarnings !== false // Default to true
  )

  const handleRestrictionToggle = (restriction: DietaryRestriction) => {
    setRestrictions((prev) =>
      prev.includes(restriction)
        ? prev.filter((r) => r !== restriction)
        : [...prev, restriction]
    )
  }

  const handleAllergyToggle = (allergy: FoodAllergy) => {
    setAllergies((prev) =>
      prev.includes(allergy)
        ? prev.filter((a) => a !== allergy)
        : [...prev, allergy]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const preferences: UserDietaryPreferences = {
      restrictions: restrictions.length > 0 ? restrictions : undefined,
      allergies: allergies.length > 0 ? allergies : undefined,
      customAllergies:
        customAllergies.trim().length > 0
          ? customAllergies
              .split(',')
              .map((a) => a.trim())
              .filter(Boolean)
          : undefined,
      customRestrictions:
        customRestrictions.trim().length > 0
          ? customRestrictions
              .split(',')
              .map((r) => r.trim())
              .filter(Boolean)
          : undefined,
      allergySeverity: allergies.length > 0 ? allergySeverity : undefined,
      showWarnings,
    }

    await onSubmit(preferences)
  }

  // Group restrictions by category
  const restrictionsByCategory = Object.values(DIETARY_RESTRICTIONS).reduce(
    (acc, meta) => {
      if (!acc[meta.category]) {
        acc[meta.category] = []
      }
      acc[meta.category].push(meta)
      return acc
    },
    {} as Record<string, DietaryRestrictionMeta[]>
  )

  // Group allergies by severity
  const allergiesBySeverity = Object.values(FOOD_ALLERGIES).reduce(
    (acc, meta) => {
      if (!acc[meta.severity]) {
        acc[meta.severity] = []
      }
      acc[meta.severity].push(meta)
      return acc
    },
    {} as Record<string, FoodAllergyMeta[]>
  )

  return (
    <Card className="p-6 bg-yellow-50 dark:bg-gray-800 border-2 border-yellow-200 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Dietary Restrictions & Preferences
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Select the dietary restrictions or lifestyle choices you follow. We'll help you find
            compatible dishes at events.
          </p>

          {/* Dietary Restrictions by Category */}
          {Object.entries(restrictionsByCategory).map(([category, items]) => (
            <div key={category} className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 capitalize">
                {category}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {items.map((meta) => (
                  <div key={meta.id} className="flex items-center">
                    <Checkbox
                      id={`restriction-${meta.id}`}
                      checked={restrictions.includes(meta.id)}
                      onChange={() => handleRestrictionToggle(meta.id)}
                    />
                    <Label
                      htmlFor={`restriction-${meta.id}`}
                      className="ml-2 flex items-center cursor-pointer"
                    >
                      <span className="mr-1">{meta.icon}</span>
                      <span>{meta.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Food Allergies
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Select any food allergies you have. We'll show prominent warnings for dishes that
            contain these allergens.
          </p>

          {/* Allergies by Severity */}
          {(['severe', 'moderate', 'mild'] as const).map((severity) => {
            const severityAllergies = allergiesBySeverity[severity] || []
            if (severityAllergies.length === 0) return null

            return (
              <div key={severity} className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 capitalize">
                  {severity} Allergies
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {severityAllergies.map((meta) => (
                    <div key={meta.id} className="flex items-center">
                      <Checkbox
                        id={`allergy-${meta.id}`}
                        checked={allergies.includes(meta.id)}
                        onChange={() => handleAllergyToggle(meta.id)}
                      />
                      <Label
                        htmlFor={`allergy-${meta.id}`}
                        className="ml-2 flex items-center cursor-pointer"
                      >
                        <span className="mr-1">{meta.icon}</span>
                        <span>{meta.label}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Allergy Severity Setting */}
          {allergies.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
                Overall Allergy Severity
              </Label>
              <select
                value={allergySeverity}
                onChange={(e) =>
                  setAllergySeverity(e.target.value as 'mild' | 'moderate' | 'severe')
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="mild">Mild - Minor reactions</option>
                <option value="moderate">Moderate - Moderate reactions</option>
                <option value="severe">Severe - Anaphylaxis risk</option>
              </select>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Custom Allergies & Restrictions
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Add any allergies or restrictions not listed above (comma-separated).
          </p>

          <div className="space-y-3">
            <div>
              <Label htmlFor="customAllergies">Custom Allergies</Label>
              <Textarea
                id="customAllergies"
                value={customAllergies}
                onChange={(e) => setCustomAllergies(e.target.value)}
                placeholder="e.g., mango, kiwi, latex"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="customRestrictions">Custom Restrictions</Label>
              <Textarea
                id="customRestrictions"
                value={customRestrictions}
                onChange={(e) => setCustomRestrictions(e.target.value)}
                placeholder="e.g., low FODMAP, AIP diet"
                rows={2}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <Checkbox
            id="showWarnings"
            checked={showWarnings}
            onChange={(e) => setShowWarnings(e.target.checked)}
          />
          <Label htmlFor="showWarnings" className="ml-2">
            Show warnings for dishes that don't match my preferences
          </Label>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          {onCancel && (
            <Button type="button" color="light" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            {loading ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

