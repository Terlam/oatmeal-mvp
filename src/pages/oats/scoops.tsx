import { useAuthStore } from '@store/authStore'
import { useScoopedOats } from '@features/oats/hooks/useOats'
import { ScoopShelf } from '@features/oats/components/organisms/ScoopShelf'

export default function ScoopedOatsPage() {
  const user = useAuthStore((s) => s.user)
  const userId = user?.uid
  const { scoops, loading } = useScoopedOats(userId || '')

  if (!userId) return <div className="p-8 text-center">Please sign in to see your scoops.</div>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Scooped Oats</h1>
      {loading ? (
        <div className="text-center py-12">Loading…</div>
      ) : (
        <ScoopShelf scoops={scoops} />
      )}
    </div>
  )
}