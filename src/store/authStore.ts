import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signOut,
  User,
} from 'firebase/auth'
import { auth } from '../firebase/clientApp'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  success: string | null

  startListening: () => (() => void) | void
  loginWithEmail: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  signupWithEmail: (email: string, password: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      success: null,

      startListening: () => {
        set({ loading: true })
        const unsubscribe = onAuthStateChanged(
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
        return unsubscribe // <-- Return the unsubscribe function for cleanup
      },

      loginWithEmail: async (email, password) => {
        set({ loading: true, error: null, success: null })
        try {
          const cred = await signInWithEmailAndPassword(auth, email, password)
          const token = await cred.user.getIdToken()
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
        set({ loading: true, error: null, success: null })
        try {
          const cred = await signInWithPopup(auth, new GoogleAuthProvider())
          const token = await cred.user.getIdToken()
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
        set({ loading: true, error: null, success: null })
        try {
          const cred = await createUserWithEmailAndPassword(auth, email, password)
          const token = await cred.user.getIdToken()
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

      resetPassword: async (email) => {
        set({ loading: true, error: null, success: null })
        try {
          await sendPasswordResetEmail(auth, email)
          set({ success: 'Password reset email sent! Please check your inbox.' })
        } catch (err: any) {
          set({ error: err.message })
        } finally {
          set({ loading: false })
        }
      },

      logout: async () => {
        set({ loading: true, error: null, success: null })
        try {
          await signOut(auth)
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