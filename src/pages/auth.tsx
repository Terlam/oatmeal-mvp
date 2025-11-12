import { useRouter } from 'next/router'
import { useAuthStore } from '../store/authStore'
import { LoginForm } from '../features/auth/components/LoginForm/LoginForm'
import { SignupForm } from '../features/auth/components/SignupForm/SignupForm'
import { PasswordResetForm } from '../features/auth/components/PasswordResetForm/PasswordResetForm'

// Optionally, redirect to landing page if this page is deprecated
export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}

export default function AuthPage() {
  return null
}