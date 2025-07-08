// features/oats/components/molecules/OatForm.tsx

import { useState } from 'react'
import { Input, Label, Button, FileInput } from '@components'

export interface OatFormProps {
  onSubmit: (data: { title: string; content: string; image?: File }) => void
  loading?: boolean
  defaultValues?: {
    title?: string
    content?: string
  }
}

export const OatForm = ({ onSubmit, loading, defaultValues }: OatFormProps) => {
  const [title, setTitle] = useState(defaultValues?.title || '')
  const [content, setContent] = useState(defaultValues?.content || '')
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, content, image: image || undefined })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name your oat…"
          required
        />
      </div>

      <div>
        <Label htmlFor="content">What's cooking?</Label>
        <Input
        //   as="textarea"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your thoughts, your flavor, your moment"
        //   rows={4}
        />
      </div>

      <div>
        <Label htmlFor="image">Add a photo?</Label>
        {/* <FileInput id="image" onChange={(f) => setImage(f)} /> */}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? 'Serving…' : 'Scoop It 🍦'}
        </Button>
      </div>
    </form>
  )
}
