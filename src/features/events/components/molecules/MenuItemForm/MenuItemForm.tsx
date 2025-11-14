import React, { useState, useEffect } from 'react'
import { Input, Label, Button } from '@/components/atoms'
import { Select, Textarea, Checkbox } from 'flowbite-react'
import type { MenuItem, MenuItemCategory } from '@/features/events/types'
import type { MenuItemDietaryInfo, FoodAllergy } from '@/types/dietary'
import { DIETARY_RESTRICTIONS, FOOD_ALLERGIES } from '@/types/dietary'

export interface MenuItemFormProps {
  onSubmit: (item: Omit<MenuItem, 'id' | 'eventId' | 'createdAt' | 'updatedAt'>, imageFile?: File) => Promise<void>
  loading?: boolean
  error?: string | null
  defaultValues?: Partial<MenuItem>
  onCancel?: () => void
  onImageUpload?: (file: File) => Promise<string>
}

export const MenuItemForm: React.FC<MenuItemFormProps> = ({
  onSubmit,
  loading = false,
  error = null,
  defaultValues,
  onCancel,
  onImageUpload,
}) => {
  const [name, setName] = useState(defaultValues?.name || '')
  const [description, setDescription] = useState(defaultValues?.description || '')
  const [category, setCategory] = useState<MenuItemCategory>(defaultValues?.category || 'other')
  const [suggestedServingSize, setSuggestedServingSize] = useState(defaultValues?.suggestedServingSize || '')
  // Dietary restrictions state
  const [vegetarian, setVegetarian] = useState(defaultValues?.dietaryInfo?.vegetarian || false)
  const [vegan, setVegan] = useState(defaultValues?.dietaryInfo?.vegan || false)
  const [glutenFree, setGlutenFree] = useState(defaultValues?.dietaryInfo?.glutenFree || false)
  const [dairyFree, setDairyFree] = useState(defaultValues?.dietaryInfo?.dairyFree || false)
  const [nutFree, setNutFree] = useState(defaultValues?.dietaryInfo?.nutFree || false)
  const [soyFree, setSoyFree] = useState(defaultValues?.dietaryInfo?.soyFree || false)
  const [eggFree, setEggFree] = useState(defaultValues?.dietaryInfo?.eggFree || false)
  const [fishFree, setFishFree] = useState(defaultValues?.dietaryInfo?.fishFree || false)
  const [shellfishFree, setShellfishFree] = useState(defaultValues?.dietaryInfo?.shellfishFree || false)
  const [halal, setHalal] = useState(defaultValues?.dietaryInfo?.halal || false)
  const [kosher, setKosher] = useState(defaultValues?.dietaryInfo?.kosher || false)
  const [lowSodium, setLowSodium] = useState(defaultValues?.dietaryInfo?.lowSodium || false)
  const [lowSugar, setLowSugar] = useState(defaultValues?.dietaryInfo?.lowSugar || false)
  const [keto, setKeto] = useState(defaultValues?.dietaryInfo?.keto || false)
  const [paleo, setPaleo] = useState(defaultValues?.dietaryInfo?.paleo || false)
  const [whole30, setWhole30] = useState(defaultValues?.dietaryInfo?.whole30 || false)
  
  // Allergen information
  const [containsAllergens, setContainsAllergens] = useState<FoodAllergy[]>(
    defaultValues?.dietaryInfo?.containsAllergens || []
  )
  const [mayContainAllergens, setMayContainAllergens] = useState<FoodAllergy[]>(
    defaultValues?.dietaryInfo?.mayContainAllergens || []
  )
  const [customInfo, setCustomInfo] = useState(
    defaultValues?.dietaryInfo?.customInfo?.join(', ') || ''
  )
  const [preparationNotes, setPreparationNotes] = useState(
    defaultValues?.dietaryInfo?.preparationNotes || ''
  )
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValues?.imageUrl || null)
  const [isOfferedByCreator, setIsOfferedByCreator] = useState(defaultValues?.isOfferedByCreator || false)
  const [uploading, setUploading] = useState(false)

  // Update preview when image file changes
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(imageFile)
    } else if (defaultValues?.imageUrl) {
      setImagePreview(defaultValues.imageUrl)
    } else {
      setImagePreview(null)
    }
  }, [imageFile, defaultValues?.imageUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let finalImageUrl: string | undefined = undefined
    
    // Upload image if a new file is selected (only when editing and onImageUpload is provided)
    // For new items, we'll pass the imageFile separately and upload it after creation
    if (imageFile && onImageUpload) {
      try {
        setUploading(true)
        finalImageUrl = await onImageUpload(imageFile)
      } catch (err) {
        console.error('Error uploading image:', err)
        // Don't return, allow form submission without image
      } finally {
        setUploading(false)
      }
    } else if (defaultValues?.imageUrl && !imageFile) {
      // Keep existing image URL if no new file is selected
      finalImageUrl = defaultValues.imageUrl
    }
    
    const customInfoArray = customInfo
      ? customInfo.split(',').map(item => item.trim()).filter(Boolean)
      : undefined
    
    // Build dietary info object
    const dietaryInfo: MenuItemDietaryInfo = {}
    if (vegetarian) dietaryInfo.vegetarian = true
    if (vegan) dietaryInfo.vegan = true
    if (glutenFree) dietaryInfo.glutenFree = true
    if (dairyFree) dietaryInfo.dairyFree = true
    if (nutFree) dietaryInfo.nutFree = true
    if (soyFree) dietaryInfo.soyFree = true
    if (eggFree) dietaryInfo.eggFree = true
    if (fishFree) dietaryInfo.fishFree = true
    if (shellfishFree) dietaryInfo.shellfishFree = true
    if (halal) dietaryInfo.halal = true
    if (kosher) dietaryInfo.kosher = true
    if (lowSodium) dietaryInfo.lowSodium = true
    if (lowSugar) dietaryInfo.lowSugar = true
    if (keto) dietaryInfo.keto = true
    if (paleo) dietaryInfo.paleo = true
    if (whole30) dietaryInfo.whole30 = true
    if (containsAllergens.length > 0) dietaryInfo.containsAllergens = containsAllergens
    if (mayContainAllergens.length > 0) dietaryInfo.mayContainAllergens = mayContainAllergens
    if (customInfoArray && customInfoArray.length > 0) dietaryInfo.customInfo = customInfoArray
    if (preparationNotes.trim()) dietaryInfo.preparationNotes = preparationNotes.trim()
    
    // For new items: pass imageFile separately (not uploaded yet)
    // For editing: imageUrl is already set from onImageUpload above
    await onSubmit({
      name,
      description: description || undefined,
      category,
      suggestedServingSize: suggestedServingSize || undefined,
      dietaryInfo: Object.keys(dietaryInfo).length > 0 ? dietaryInfo : undefined,
      imageUrl: finalImageUrl, // Only set if already uploaded (editing) or existing
      isClaimed: isOfferedByCreator,
      createdBy: '', // Will be set by the service
      createdByName: '', // Will be set by the service
      createdByAvatarUrl: '', // Will be set by the service
      isOfferedByCreator,
    }, imageFile && !onImageUpload ? imageFile : undefined) // Pass imageFile for new items
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded">
          {error}
        </div>
      )}

      <div>
        <Label htmlFor="name">Item Name *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pumpkin Pie"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Delicious homemade pumpkin pie..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="category">Category *</Label>
        <Select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as MenuItemCategory)}
          required
        >
          <option value="appetizer">Appetizer</option>
          <option value="main">Main</option>
          <option value="side">Side</option>
          <option value="dessert">Dessert</option>
          <option value="beverage">Beverage</option>
          <option value="other">Other</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="suggestedServingSize">Serving Size</Label>
        <Input
          id="suggestedServingSize"
          value={suggestedServingSize}
          onChange={(e) => setSuggestedServingSize(e.target.value)}
          placeholder="Serves 8-10"
        />
      </div>

      <div>
        <Label>Dietary Information</Label>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Select all dietary restrictions and preferences this dish satisfies.
        </p>
        
        <div className="space-y-3">
          {/* Lifestyle */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Lifestyle</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <Checkbox
                  id="vegetarian"
                  checked={vegetarian}
                  onChange={(e) => setVegetarian(e.target.checked)}
                />
                <Label htmlFor="vegetarian" className="ml-2">🥬 Vegetarian</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="vegan"
                  checked={vegan}
                  onChange={(e) => setVegan(e.target.checked)}
                />
                <Label htmlFor="vegan" className="ml-2">🌱 Vegan</Label>
              </div>
            </div>
          </div>

          {/* Allergen-Free */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Allergen-Free</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <Checkbox
                  id="glutenFree"
                  checked={glutenFree}
                  onChange={(e) => setGlutenFree(e.target.checked)}
                />
                <Label htmlFor="glutenFree" className="ml-2">🌾 Gluten Free</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="dairyFree"
                  checked={dairyFree}
                  onChange={(e) => setDairyFree(e.target.checked)}
                />
                <Label htmlFor="dairyFree" className="ml-2">🥛 Dairy Free</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="nutFree"
                  checked={nutFree}
                  onChange={(e) => setNutFree(e.target.checked)}
                />
                <Label htmlFor="nutFree" className="ml-2">🥜 Nut Free</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="soyFree"
                  checked={soyFree}
                  onChange={(e) => setSoyFree(e.target.checked)}
                />
                <Label htmlFor="soyFree" className="ml-2">🫘 Soy Free</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="eggFree"
                  checked={eggFree}
                  onChange={(e) => setEggFree(e.target.checked)}
                />
                <Label htmlFor="eggFree" className="ml-2">🥚 Egg Free</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="fishFree"
                  checked={fishFree}
                  onChange={(e) => setFishFree(e.target.checked)}
                />
                <Label htmlFor="fishFree" className="ml-2">🐟 Fish Free</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="shellfishFree"
                  checked={shellfishFree}
                  onChange={(e) => setShellfishFree(e.target.checked)}
                />
                <Label htmlFor="shellfishFree" className="ml-2">🦐 Shellfish Free</Label>
              </div>
            </div>
          </div>

          {/* Religious */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Religious</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <Checkbox
                  id="halal"
                  checked={halal}
                  onChange={(e) => setHalal(e.target.checked)}
                />
                <Label htmlFor="halal" className="ml-2">☪️ Halal</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="kosher"
                  checked={kosher}
                  onChange={(e) => setKosher(e.target.checked)}
                />
                <Label htmlFor="kosher" className="ml-2">✡️ Kosher</Label>
              </div>
            </div>
          </div>

          {/* Health/Diet */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Health & Diet</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <Checkbox
                  id="lowSodium"
                  checked={lowSodium}
                  onChange={(e) => setLowSodium(e.target.checked)}
                />
                <Label htmlFor="lowSodium" className="ml-2">🧂 Low Sodium</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="lowSugar"
                  checked={lowSugar}
                  onChange={(e) => setLowSugar(e.target.checked)}
                />
                <Label htmlFor="lowSugar" className="ml-2">🍬 Low Sugar</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="keto"
                  checked={keto}
                  onChange={(e) => setKeto(e.target.checked)}
                />
                <Label htmlFor="keto" className="ml-2">🥑 Keto</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="paleo"
                  checked={paleo}
                  onChange={(e) => setPaleo(e.target.checked)}
                />
                <Label htmlFor="paleo" className="ml-2">🥩 Paleo</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="whole30"
                  checked={whole30}
                  onChange={(e) => setWhole30(e.target.checked)}
                />
                <Label htmlFor="whole30" className="ml-2">🥗 Whole30</Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="containsAllergens">Contains Allergens (Important!)</Label>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Select allergens that are definitely present in this dish.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(FOOD_ALLERGIES).map((allergy) => (
            <div key={allergy.id} className="flex items-center">
              <Checkbox
                id={`contains-${allergy.id}`}
                checked={containsAllergens.includes(allergy.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setContainsAllergens([...containsAllergens, allergy.id])
                  } else {
                    setContainsAllergens(containsAllergens.filter(a => a !== allergy.id))
                  }
                }}
              />
              <Label htmlFor={`contains-${allergy.id}`} className="ml-2">
                {allergy.icon} {allergy.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="mayContainAllergens">May Contain Allergens (Cross-Contamination)</Label>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Select allergens that may be present due to shared equipment or preparation area.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(FOOD_ALLERGIES).map((allergy) => (
            <div key={allergy.id} className="flex items-center">
              <Checkbox
                id={`may-contain-${allergy.id}`}
                checked={mayContainAllergens.includes(allergy.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setMayContainAllergens([...mayContainAllergens, allergy.id])
                  } else {
                    setMayContainAllergens(mayContainAllergens.filter(a => a !== allergy.id))
                  }
                }}
              />
              <Label htmlFor={`may-contain-${allergy.id}`} className="ml-2">
                {allergy.icon} {allergy.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="customInfo">Custom Dietary Information</Label>
        <Input
          id="customInfo"
          value={customInfo}
          onChange={(e) => setCustomInfo(e.target.value)}
          placeholder="Comma-separated list (e.g., low FODMAP, AIP diet)"
        />
      </div>

      <div>
        <Label htmlFor="preparationNotes">Preparation Notes</Label>
        <Textarea
          id="preparationNotes"
          value={preparationNotes}
          onChange={(e) => setPreparationNotes(e.target.value)}
          placeholder="e.g., Prepared in a facility that processes nuts"
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="image">Dish Photo (Optional)</Label>
        {imagePreview && (
          <div className="mt-2 mb-2 relative w-40 h-40 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <img src={imagePreview} alt="Dish preview" className="w-full h-full object-cover" />
          </div>
        )}
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setImageFile(file)
            } else {
              setImageFile(null)
              setImagePreview(defaultValues?.imageUrl || null)
            }
          }}
          disabled={loading || uploading}
          className="block w-full text-sm text-gray-500 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 dark:file:bg-orange-900 dark:file:text-orange-200 disabled:opacity-50"
        />
      </div>

      <div className="flex items-center">
        <Checkbox
          id="isOfferedByCreator"
          checked={isOfferedByCreator}
          onChange={(e) => setIsOfferedByCreator(e.target.checked)}
        />
        <Label htmlFor="isOfferedByCreator" className="ml-2">
          I'm offering to bring this item
        </Label>
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <Button
            type="button"
            color="light"
            onClick={onCancel}
            disabled={loading || uploading}
          >
            Cancel
          </Button>
        )}
        <Button 
          type="submit" 
          disabled={loading || uploading} 
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          {loading || uploading ? 'Saving...' : 'Save Item'}
        </Button>
      </div>
    </form>
  )
}

