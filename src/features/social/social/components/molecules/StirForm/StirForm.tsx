// features/social/components/molecules/StirForm.tsx

import { useState } from 'react'
import { Input, Button, Label } from '@/components/atoms'

export interface StirFormProps {
  postId: string
  onSubmit: (stir: { content: string }) => void
  loading?: boolean
}

export const StirForm = ({ postId, onSubmit, loading }: StirFormProps) => {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    onSubmit({ content })
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Label htmlFor={`stir-${postId}`}>Stir this Post 🍵</Label>
      <Input
        id={`stir-${postId}`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add your mix-in..."
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Stirring…' : 'Stir'}
      </Button>
    </form>
  )
}
