import { create } from 'zustand';

interface AuthModalState {
  isOpen: boolean;
  mode: 'login' | 'signup';
  open: (mode: 'login' | 'signup') => void;
  close: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  mode: 'login',
  open: (mode) => set({ isOpen: true, mode }),
  close: () => set({ isOpen: false }),
}));

interface AboutModalState {
  isOpen: boolean;
  section: number;
  open: (section?: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
}

export const useAboutModalStore = create<AboutModalState>((set, get) => ({
  isOpen: false,
  section: 0,
  open: (section = 0) => set({ isOpen: true, section }),
  close: () => set({ isOpen: false }),
  next: () => set((state) => ({ section: state.section + 1 })),
  prev: () => set((state) => ({ section: Math.max(0, state.section - 1) })),
}));

export * from "./authStore"
export * from "./themeStore"
export * from "./onboardingStore"