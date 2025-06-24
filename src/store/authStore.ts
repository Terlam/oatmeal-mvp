import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from 'firebase/auth'
import { auth } from '../firebase/clientApp'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null

  startListening: () => void
  loginWithEmail: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  signupWithEmail: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,

      startListening: () => {
        set({ loading: true })
        onAuthStateChanged(
          auth,
          async (u) => {
            set({ user: u, loading: false, error: null })
            if (u) {
              const token = await u.getIdToken()
              // Set the session cookie after login or auth state change
              await fetch('/api/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ token }),
              })
            }
          },
          (err) => set({ error: err.message, loading: false })
        )
      },

      loginWithEmail: async (email, password) => {
        set({ loading: true, error: null })
        try {
          const cred = await signInWithEmailAndPassword(auth, email, password)
          const token = await cred.user.getIdToken()
          // Set the session cookie after login
          await fetch('/api/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ token }),
          })
        } catch (err: any) {
          set({ error: err.message })
        } finally {
          set({ loading: false })
        }
      },

      loginWithGoogle: async () => {
        set({ loading: true, error: null })
        try {
          const cred = await signInWithPopup(auth, new GoogleAuthProvider())
          const token = await cred.user.getIdToken()
          // Set the session cookie after login
          await fetch('/api/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ token }),
          })
        } catch (err: any) {
          set({ error: err.message })
        } finally {
          set({ loading: false })
        }
      },

      signupWithEmail: async (email, password) => {
        set({ loading: true, error: null })
        try {
          const cred = await createUserWithEmailAndPassword(auth, email, password)
          const token = await cred.user.getIdToken()
          // Set the session cookie after signup
          await fetch('/api/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ token }),
          })
        } catch (err: any) {
          set({ error: err.message })
        } finally {
          set({ loading: false })
        }
      },

      logout: async () => {
        set({ loading: true, error: null })
        try {
          await signOut(auth)
          // Remove the session cookie on logout
          await fetch('/api/session', {
            method: 'DELETE',
            credentials: 'include',
          })
          set({ user: null })
        } catch (err: any) {
          set({ error: err.message })
        } finally {
          set({ loading: false })
        }
      },
    }),
    {
      name: 'oatmeal-auth',
      partialize: (state) => ({ user: state.user }),
    }
  )
)