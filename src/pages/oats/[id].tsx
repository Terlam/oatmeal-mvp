import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getOat } from '@features/oats/services/oatService'
import { useStirs } from '@features/oats/hooks/useStirs'
import { StirList } from '@features/oats/components/organisms/StirList'
import { StirForm } from '@features/oats/components/molecules/StirForm'
import { createStir } from '@features/oats/services/stirService'
import { OatCard } from '@features/oats/components/organisms/OatCard'

export default function OatDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [oat, setOat] = useState(null)
  const { stirs, loading: stirsLoading } = useStirs(id as string)

  useEffect(() => {
    if (id) getOat(id as string).then(setOat)
  }, [id])

  if (!oat) return <div className="p-8 text-center">Loading oat…</div>

  return (
    <div className="container mx-auto py-8">
      <OatCard oat={oat} />
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Stirs</h2>
        {stirsLoading ? (
          <div>Loading stirs…</div>
        ) : (
          <StirList stirs={stirs} />
        )}
        <div className="mt-4">
          <StirForm oatId={id as string} onSubmit={async (data) => await createStir(id as string, data)} />
        </div>
      </div>
    </div>
  )
}