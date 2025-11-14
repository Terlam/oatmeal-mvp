// src/components/organisms/LandingPage.tsx
import React, { useEffect, useState } from 'react'
import { Card, Carousel, Button } from 'flowbite-react'
import { Spwoo } from '../../../components/mascot/Spwoo'
import { useAuthStore } from '../../../store/authStore'
import { useRouter } from 'next/router'

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}
function getCookie(name: string) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '');
}

export interface LandingPageProps {
  onLoginClick?: () => void
  onSignupClick?: () => void
  onGoogleSignIn?: () => void
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSignupClick, onGoogleSignIn, onLoginClick }) => {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle)
  const loading = useAuthStore((s) => s.loading)
  const [showPeek, setShowPeek] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && !getCookie('spwoo-peeked')) {
      setShowPeek(true);
      setCookie('spwoo-peeked', 'yes', 365);
      const timeout = setTimeout(() => setShowPeek(false), 2200);
      return () => clearTimeout(timeout);
    }
  }, []);

  // Redirect after successful sign-in (use stored path or default to events)
  useEffect(() => {
    if (user && isSigningIn) {
      setIsSigningIn(false);
      // Get stored redirect path or default to /events
      const storedPath = typeof window !== 'undefined' ? sessionStorage.getItem('authRedirectPath') : null
      if (storedPath) {
        sessionStorage.removeItem('authRedirectPath')
        router.push(storedPath)
      } else {
        router.push('/events')
      }
    }
  }, [user, isSigningIn, router]);

  const handleGetStarted = async () => {
    if (user) {
      // If already logged in, go to events page
      router.push('/events');
    } else {
      // If not logged in, sign in with Google (redirect will happen via useEffect above)
      setIsSigningIn(true);
      await loginWithGoogle();
    }
  }
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex-grow flex items-center justify-center bg-cover bg-center min-h-[70vh] p-0 md:p-16"
        style={{ backgroundImage: "url('/hero1.png')" }}
      >
        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-fuchsia-700/60 to-yellow-400/30 animate-pulse-slow" />
        {/* Spwoo Peek Animation (between hero image and hero text) */}
        {showPeek ? (
          <div
            className="absolute z-20"
            style={{
              top: 0,
              right: '2.5rem',
              transform: 'translateY(-60%)',
              transition: 'transform 0.5s cubic-bezier(.68,-0.55,.27,1.55)',
              animation: 'spwoo-peek 2s cubic-bezier(.68,-0.55,.27,1.55) forwards',
            }}
          >
            <Spwoo state="wave" size={90} catchphrase="" />
          </div>
        ) : null}
        {/* Glassy Card Overlay */}
        <div className="relative z-30 max-w-3xl w-full mx-auto text-center rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-2xl px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 flex flex-col items-center border border-gray-200 dark:border-gray-700 overflow-visible animate-fade-in">
          {/* Animated sparkles or food icons */}
          <div className="absolute left-4 sm:left-8 top-4 sm:top-8 animate-float-slow text-2xl sm:text-3xl opacity-60 select-none pointer-events-none">🦃</div>
          <div className="absolute right-4 sm:right-8 bottom-4 sm:bottom-8 animate-float-slower text-2xl sm:text-3xl opacity-60 select-none pointer-events-none">🍽️</div>
          {/* Animated Spwoo mascot (bouncing) only if not peeking */}
          {/* {!showPeek && (
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 z-20 animate-spwoo-bounce">
              <Spwoo state="wave" size={180} catchphrase="Gobble-gobble! Welcome to Potluck Planner!" />
            </div>
          )} */}
          <div className="pt-16 sm:pt-24 md:pt-32" />
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold fun-heading mb-4 sm:mb-6 drop-shadow-lg bg-gradient-to-r from-orange-400 via-red-500 to-orange-700 bg-clip-text text-transparent animate-gradient-x px-2">
            Plan Perfect Potluck Meals, <span className="whitespace-nowrap">Together</span>
          </h1>
          <p className="text-gray-700 dark:text-orange-100 text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 drop-shadow-md max-w-2xl mx-auto px-2">
            Potluck Planner makes it easy to organize family gatherings and potluck events. Plan menus, coordinate dishes, track RSVPs, and ensure everyone has a great time!
          </p>
          <Button
            size="xl"
            className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full bg-gradient-to-r from-orange-500 via-red-600 to-orange-700 text-white font-bold text-lg sm:text-xl md:text-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:ring-4 focus:ring-orange-400 animate-glow min-h-[44px] w-full sm:w-auto"
            onClick={handleGetStarted}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Get Started'}
          </Button>
        </div>
      </section>

      {/* Feature Carousel */}
      <section id="features" className="py-12 sm:py-16 md:py-24 bg-white dark:bg-gray-900 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-12 md:mb-14 fun-heading text-gray-900 dark:text-orange-200 animate-fade-in">
          Plan Perfect Potluck Meals
        </h2>
        <Carousel slideInterval={6000} className="max-w-4xl mx-auto animate-fade-in">
          {[
            {
              icon: '🎉',
              title: 'Create Events',
              desc: 'Create potluck events with date, time, and location. Share with your family using shareable links.',
            },
            {
              icon: '🍽️',
              title: 'Manage Menu',
              desc: 'Add dishes to your menu. Both hosts and guests can add items they want to offer. No approval needed!',
            },
            {
              icon: '✅',
              title: 'RSVP & Claim Items',
              desc: 'RSVP to events and claim items you want to bring. Upload photos of your dishes to show off your cooking!',
            },
          ].map((item, idx) => (
            <Card key={idx} className="p-4 sm:p-6 md:p-8 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl border border-orange-200 dark:border-orange-800 flex flex-col items-center gap-3 sm:gap-4 hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 animate-float-slow">
              <div className="text-4xl sm:text-5xl mb-2 animate-bounce-slow">{item.icon}</div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 dark:text-orange-100 fun-heading">{item.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center">{item.desc}</p>
            </Card>
          ))}
        </Carousel>
      </section>

      {/* Why Potluck Planner Section */}
      <section id="why-potluck" className="py-12 sm:py-16 md:py-24 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-10 md:mb-12 fun-heading text-gray-900 dark:text-orange-200 animate-fade-in">
          Why Potluck Planner?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: '👨‍👩‍👧‍👦',
              title: 'Coordinate Together',
              desc: 'Everyone can add items they want to bring. No approval needed—just add and claim!'
            },
            {
              icon: '📸',
              title: 'Share Photos',
              desc: 'Upload photos of your dishes to show off your cooking and inspire others.'
            },
            {
              icon: '🎯',
              title: 'Track Everything',
              desc: 'See who\'s bringing what, track RSVPs, and make sure everything is covered for your event.'
            },
          ].map((item, idx) => (
            <Card key={idx} className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl border border-orange-200 dark:border-orange-800 flex flex-col items-center gap-4 p-4 sm:p-6 md:p-8 hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 animate-float-slower">
              <div className="text-4xl mb-2 animate-float-slow">{item.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-orange-100 fun-heading text-center">{item.title}</h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 text-center">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="py-12 sm:py-16 md:py-24 text-center bg-white dark:bg-gray-900 px-4">
        <div className="max-w-2xl mx-auto rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-2xl px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 border border-orange-200 dark:border-orange-800 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 fun-heading text-gray-900 dark:text-orange-200 animate-fade-in">
            Ready to plan your perfect potluck?
          </h2>
          <p className="mb-6 sm:mb-8 md:mb-10 text-gray-700 dark:text-gray-200 text-base sm:text-lg animate-fade-in">
            Sign up for Potluck Planner and start organizing amazing family gatherings today. Create events, coordinate dishes, and make sure everyone has a great time!
          </p>
          <Button
            size="xl"
            className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full bg-gradient-to-r from-orange-500 via-red-600 to-orange-700 text-white font-bold text-lg sm:text-xl md:text-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:ring-4 focus:ring-orange-400 animate-glow min-h-[44px] w-full sm:w-auto"
            onClick={handleGetStarted}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Get Started'}
          </Button>
        </div>
      </section>
    </>
  )
}
