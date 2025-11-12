import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OnboardingState {
  isOpen: boolean
  section: number
  isCompleted: boolean
  open: (section?: number) => void
  close: () => void
  next: () => void
  prev: () => void
  complete: () => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      section: 0,
      isCompleted: false,
      open: (section = 0) => set({ isOpen: true, section }),
      close: () => set({ isOpen: false }),
      next: () => {
        const currentSection = get().section
        const maxSections = 4 // 0-4 = 5 sections
        if (currentSection < maxSections) {
          set({ section: currentSection + 1 })
        } else {
          get().complete()
        }
      },
      prev: () => set((state) => ({ section: Math.max(0, state.section - 1) })),
      complete: () => {
        set({ isCompleted: true, isOpen: false })
      },
      reset: () => {
        set({ isCompleted: false, section: 0, isOpen: false })
      },
    }),
    {
      name: 'potluck-onboarding',
      partialize: (state) => ({ isCompleted: state.isCompleted }),
    }
  )
)

