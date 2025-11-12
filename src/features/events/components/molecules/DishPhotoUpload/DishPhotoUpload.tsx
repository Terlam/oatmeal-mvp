import React, { useState } from 'react'
import { Label, Button } from '@/components/atoms'
import { X } from 'lucide-react'

export interface DishPhotoUploadProps {
  onUpload: (file: File) => Promise<string>
  currentImageUrl?: string
  loading?: boolean
  onDelete?: () => Promise<void>
}

export const DishPhotoUpload: React.FC<DishPhotoUploadProps> = ({
  onUpload,
  currentImageUrl,
  loading = false,
  onDelete,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!imageFile) return
    
    try {
      setUploading(true)
      const url = await onUpload(imageFile)
      setPreviewUrl(url)
      setImageFile(null)
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (onDelete) {
      try {
        setUploading(true)
        await onDelete()
        setPreviewUrl(null)
        setImageFile(null)
      } catch (error) {
        console.error('Error deleting image:', error)
      } finally {
        setUploading(false)
      }
    }
  }

  return (
    <div className="space-y-4">
      <Label htmlFor="dishPhoto">Dish Photo</Label>
      <div className="flex flex-col space-y-3">
        {previewUrl && (
          <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700">
            <img
              src={previewUrl}
              alt="Dish photo"
              className="w-full h-full object-cover"
            />
            {onDelete && (
              <button
                onClick={handleDelete}
                disabled={uploading}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
        <input
          id="dishPhoto"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading || uploading}
          className="block w-full text-sm text-gray-500 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 dark:file:bg-orange-900 dark:file:text-orange-200 disabled:opacity-50"
        />
        {imageFile && (
          <Button
            onClick={handleUpload}
            disabled={loading || uploading}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </Button>
        )}
      </div>
    </div>
  )
}

