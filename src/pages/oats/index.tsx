import { useAuthStore } from '@store/authStore'
import { useMyOats } from '@features/oats/hooks/useOats'
import { PantryGrid } from '@features/oats/components/organisms/PantryGrid'
import { OatForm } from '@features/oats/components/molecules/OatForm'
import { createOat, deleteOat, chewOat } from '@features/oats/services/oatService'
import { useState } from 'react'

export default function MyOatsPage() {
  const user = useAuthStore((s) => s.user)
  const userId = user?.uid
  const { oats, loading } = useMyOats(userId || '')
  const [formOpen, setFormOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!userId) return <div className="p-8 text-center">Please sign in to see your oats.</div>

  const handleCreate = async (data: { title: string; content: string }) => {
    setSubmitting(true)
    await createOat({ ...data, authorId: userId })
    setSubmitting(false)
    setFormOpen(false)
    // Optionally: refetch oats here or rely on a listener
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Oats</h1>
        <button
          className="bg-yellow-500 text-gray-900 px-4 py-2 rounded shadow hover:bg-yellow-400 transition"
          onClick={() => setFormOpen((v) => !v)}
        >
          {formOpen ? 'Cancel' : 'Scoop a New Oat'}
        </button>
      </div>
      {formOpen && (
        <div className="mb-8 animate-fade-in">
          <OatForm onSubmit={handleCreate} loading={submitting} />
        </div>
      )}
      {loading ? (
        <div className="text-center py-12">Loading…</div>
      ) : (
        <PantryGrid
          oats={oats}
          onChew={async (id) => await chewOat(id)}
          onBurn={async (id) => await deleteOat(id)}
          // onScoop={...} // Add if you have scoop logic
        />
      )}
    </div>
  )
}