import React, { useState, useEffect } from 'react'
import { Input, Label, Button } from '@/components/atoms'
import { Select, Textarea, Checkbox } from 'flowbite-react'
import type { MenuItem, MenuItemCategory } from '../../types'

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
  const [vegetarian, setVegetarian] = useState(defaultValues?.dietaryInfo?.vegetarian || false)
  const [vegan, setVegan] = useState(defaultValues?.dietaryInfo?.vegan || false)
  const [glutenFree, setGlutenFree] = useState(defaultValues?.dietaryInfo?.glutenFree || false)
  const [nutFree, setNutFree] = useState(defaultValues?.dietaryInfo?.nutFree || false)
  const [dairyFree, setDairyFree] = useState(defaultValues?.dietaryInfo?.dairyFree || false)
  const [otherDietary, setOtherDietary] = useState(defaultValues?.dietaryInfo?.other?.join(', ') || '')
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
    
    const otherDietaryArray = otherDietary
      ? otherDietary.split(',').map(item => item.trim()).filter(Boolean)
      : undefined
    
    // Clean up dietary info - remove undefined values
    const dietaryInfo: any = {}
    if (vegetarian) dietaryInfo.vegetarian = true
    if (vegan) dietaryInfo.vegan = true
    if (glutenFree) dietaryInfo.glutenFree = true
    if (nutFree) dietaryInfo.nutFree = true
    if (dairyFree) dietaryInfo.dairyFree = true
    if (otherDietaryArray && otherDietaryArray.length > 0) dietaryInfo.other = otherDietaryArray
    
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
        <div className="space-y-2 mt-2">
          <div className="flex items-center">
            <Checkbox
              id="vegetarian"
              checked={vegetarian}
              onChange={(e) => setVegetarian(e.target.checked)}
            />
            <Label htmlFor="vegetarian" className="ml-2">Vegetarian</Label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="vegan"
              checked={vegan}
              onChange={(e) => setVegan(e.target.checked)}
            />
            <Label htmlFor="vegan" className="ml-2">Vegan</Label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="glutenFree"
              checked={glutenFree}
              onChange={(e) => setGlutenFree(e.target.checked)}
            />
            <Label htmlFor="glutenFree" className="ml-2">Gluten Free</Label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="nutFree"
              checked={nutFree}
              onChange={(e) => setNutFree(e.target.checked)}
            />
            <Label htmlFor="nutFree" className="ml-2">Nut Free</Label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="dairyFree"
              checked={dairyFree}
              onChange={(e) => setDairyFree(e.target.checked)}
            />
            <Label htmlFor="dairyFree" className="ml-2">Dairy Free</Label>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="otherDietary">Other Dietary Restrictions</Label>
        <Input
          id="otherDietary"
          value={otherDietary}
          onChange={(e) => setOtherDietary(e.target.value)}
          placeholder="Comma-separated list"
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

