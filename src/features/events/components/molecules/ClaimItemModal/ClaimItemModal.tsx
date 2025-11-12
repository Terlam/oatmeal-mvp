import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'flowbite-react'
import { Button } from '@/components/atoms/Button'
import type { MenuItem } from '@/features/events/types'

export interface ClaimItemModalProps {
  show: boolean
  onClose: () => void
  item: MenuItem | null
  onClaim: () => Promise<void>
  onUnclaim: () => Promise<void>
  loading?: boolean
  isClaimed?: boolean
}

export const ClaimItemModal: React.FC<ClaimItemModalProps> = ({
  show,
  onClose,
  item,
  onClaim,
  onUnclaim,
  loading = false,
  isClaimed = false,
}) => {
  if (!item) return null

  const handleAction = async () => {
    if (isClaimed) {
      await onUnclaim()
    } else {
      await onClaim()
    }
    onClose()
  }

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>
        {isClaimed ? 'Unclaim Item' : 'Claim Item'}
      </ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          <p>
            {isClaimed
              ? `Are you sure you want to unclaim "${item.name}"?`
              : `Are you sure you want to claim "${item.name}"?`}
          </p>
          {!isClaimed && (
            <p className="text-sm text-gray-600 dark:text-gray-200">
              You'll be responsible for bringing this item to the event.
            </p>
          )}
          <div className="flex justify-end space-x-3">
            <Button
              color="light"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              disabled={loading}
              className={isClaimed 
                ? "bg-gray-500 hover:bg-gray-600 text-white" 
                : "bg-orange-500 hover:bg-orange-600 text-white"}
            >
              {loading ? 'Processing...' : isClaimed ? 'Unclaim' : 'Claim'}
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

