import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
}

function getInitialTheme(): Theme {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('oatmeal-theme');
    if (stored === '"dark"' || stored === 'dark') return 'dark';
    if (stored === '"light"' || stored === 'light') return 'light';
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'light';
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      setTheme: (theme) => {
        set({ theme });
        if (typeof window !== 'undefined') {
          localStorage.setItem('oatmeal-theme', theme);
        }
      },
      toggle: () => {
        const next = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: next });
        if (typeof window !== 'undefined') {
          localStorage.setItem('oatmeal-theme', next);
        }
      },
    }),
    { name: 'oatmeal-theme' }
  )
);