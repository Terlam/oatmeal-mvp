import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useThemeStore } from '../store/themeStore'
import { Layout } from '../components/organisms/Layout'
import { useAuthModalStore } from '../store'
import { Modal, ModalHeader, ModalBody, Button } from 'flowbite-react'
import { LoginForm } from '../features/auth/components/LoginForm/LoginForm'
import { SignupForm } from '../features/auth/components/SignupForm/SignupForm'
import { useAboutModalStore } from '../store'
import { Spwoo } from '../components/mascot/Spwoo'
import { X } from 'lucide-react'
import { useRouter } from 'next/router'

// 🥣 Pro tip: When you need to extend component props, create a proper interface
// instead of using 'any'. It's like using a recipe instead of winging it.
interface ExtendedAppProps extends AppProps {
  Component: AppProps['Component'] & {
    noLayout?: boolean;
  };
}

function AboutModal() {
  const { isOpen, section, close, next, prev } = useAboutModalStore()
  const sections = [
    {
      state: 'wave',
      title: "Hi, I'm Spwoo!",
      text: "Welcome to Oatmeal MVP. I'm Spwoo, your friendly code spoon. Let me show you around!",
      catchphrase: "Oo-wee!"
    },
    {
      state: 'think',
      title: "Why Oatmeal?",
      text: "Oatmeal MVP is a teaching template for modern web apps. It's simple, nourishing, and endlessly customizable—just like a good bowl of oatmeal.",
      catchphrase: "Let's stir it up!"
    },
    {
      state: 'code',
      title: "What can I do?",
      text: "Spin up features, learn best practices, and build your MVP fast. Use the AI generator, templates, and atomic components to cook up something great.",
      catchphrase: "Spoon up some code!"
    },
    {
      state: 'celebrate',
      title: "Ready to Build?",
      text: "Download from GitHub, read the README, and start building your own product. Spwoo will be here to cheer you on!",
      catchphrase: "Oat-yeah!"
    },
  ]
  const current = sections[section] || sections[0]
  return (
    <Modal show={isOpen} onClose={close} size="lg" className="!bg-transparent">
      <div className="relative max-w-xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl px-8 py-10 sm:p-14 flex flex-col items-center text-center space-y-6 overflow-visible">
        {/* Close button only on last step */}
        {section === sections.length - 1 && (
          <button
            onClick={close}
            aria-label="Close about modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200/80 dark:bg-gray-800/80 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-yellow-400 transition-colors"
          >
            <X size={24} />
          </button>
        )}
        {/* Spwoo stands out with a floating, offset effect */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-20 drop-shadow-xl" style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.18))' }}>
          <Spwoo state={current.state as any} size={180} catchphrase={current.catchphrase} />
        </div>
        <div className="pt-24" />
        <h2 className="fun-heading text-3xl sm:text-4xl text-brand dark:text-yellow-300 mb-2">{current.title}</h2>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 font-medium mb-4">{current.text}</p>
        <div className="flex justify-between w-full mt-4 gap-4">
          <Button color="light" onClick={prev} disabled={section === 0} className="flex-1 py-3 rounded-xl font-semibold">Back</Button>
          <Button color="light" onClick={next} disabled={section === sections.length - 1} className="flex-1 py-3 rounded-xl font-semibold">Next</Button>
        </div>
        {section === sections.length - 1 && (
          <div className="mt-6 text-center text-gray-600 dark:text-gray-300 text-lg">
            Oo-wee! Thanks for learning about Oatmeal MVP. <br />You can always find Spwoo in the About menu!
          </div>
        )}
      </div>
    </Modal>
  )
}

export default function MyApp({ Component, pageProps }: ExtendedAppProps) {
  const startListening = useAuthStore((s) => s.startListening)
  const loading = useAuthStore((s) => s.loading)
  const user = useAuthStore((s) => s.user)
  const error = useAuthStore((s) => s.error)
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle)
  const theme = useThemeStore((s) => s.theme)
  const { isOpen, mode, open, close } = useAuthModalStore()
  const { open: openAbout } = useAboutModalStore()
  const router = useRouter()

  // --- Dark mode sync ---
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
  // ----------------------

  useEffect(() => {
    startListening()
  }, [startListening])

  // --- Redirect to dashboard after sign-in ---
  useEffect(() => {
    if (user && isOpen) {
      close()
      router.push('/dashboard')
    }
  }, [user, isOpen, close, router])

  // 🥣 Some pages don't need the layout wrapper
  // Like a bowl of plain social vs a full breakfast spread
  if (Component.noLayout) {
    return <Component {...pageProps} />
  }

  return (
    <>
      <Layout
        isLoading={loading}
        isLoggedIn={!!user}
        userName={user?.displayName ?? null}
        userEmail={user?.email ?? null}
        userAvatarUrl={user?.photoURL ?? null}
        onSignIn={() => open('login')}
        onAbout={() => openAbout(0)}
      >
        <Component {...pageProps} onLoginClick={() => open('login')} onSignupClick={() => open('signup')} />
      </Layout>
      <Modal show={isOpen} onClose={close} className="!bg-transparent">
        <div className="relative max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl px-8 py-10 sm:p-12 flex flex-col items-center text-center space-y-6">
          {/* Close button for auth modal */}
          <button
            onClick={close}
            aria-label="Close auth modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200/80 dark:bg-gray-800/80 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand dark:focus:ring-yellow-400 transition-colors"
          >
            <X size={24} />
          </button>
          {mode === 'login' ? (
            <>
              <h2 className="fun-heading text-2xl sm:text-3xl text-brand dark:text-yellow-300 mb-2">Sign In</h2>
              <ModalBody className="w-full p-0">
                <LoginForm onSubmit={close} loading={loading} error={error} onGoogle={loginWithGoogle} />
                <div className="mt-4 text-center">
                  <span>Don't have an account? </span>
                  <Button color="light" onClick={() => open('signup')} className="ml-2 rounded-xl font-semibold">Sign Up</Button>
                </div>
              </ModalBody>
            </>
          ) : (
            <>
              <h2 className="fun-heading text-2xl sm:text-3xl text-brand dark:text-yellow-300 mb-2">Sign Up</h2>
              <ModalBody className="w-full p-0">
                <SignupForm onSubmit={close} loading={loading} error={error} />
                <div className="mt-4 text-center">
                  <span>Already have an account? </span>
                  <Button color="light" onClick={() => open('login')} className="ml-2 rounded-xl font-semibold">Sign In</Button>
                </div>
              </ModalBody>
            </>
          )}
        </div>
      </Modal>
      <AboutModal />
    </>
  )
}