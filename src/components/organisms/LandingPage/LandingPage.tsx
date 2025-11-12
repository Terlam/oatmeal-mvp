// src/components/organisms/LandingPage.tsx
import React, { useEffect, useState } from 'react'
import { Card, Carousel, Button } from 'flowbite-react'
import { Spwoo } from '../../../components/mascot/Spwoo';

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
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSignupClick }) => {
  const [showPeek, setShowPeek] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && !getCookie('spwoo-peeked')) {
      setShowPeek(true);
      setCookie('spwoo-peeked', 'yes', 365);
      const timeout = setTimeout(() => setShowPeek(false), 2200);
      return () => clearTimeout(timeout);
    }
  }, []);
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex-grow flex items-center justify-center bg-cover bg-center min-h-[70vh] p-0 md:p-16"
        style={{ backgroundImage: "url('/hero.png')" }}
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
        <div className="relative z-30 max-w-3xl w-full mx-auto text-center rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-2xl px-8 py-16 flex flex-col items-center border border-gray-200 dark:border-gray-700 overflow-visible animate-fade-in">
          {/* Animated sparkles or oats */}
          <div className="absolute left-8 top-8 animate-float-slow text-3xl opacity-60 select-none pointer-events-none">✨</div>
          <div className="absolute right-8 bottom-8 animate-float-slower text-3xl opacity-60 select-none pointer-events-none">🥣</div>
          {/* Animated Spwoo mascot (bouncing) only if not peeking */}
          {!showPeek && (
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 z-20 animate-spwoo-bounce">
              <Spwoo state="wave" size={180} catchphrase="Oo-wee! Welcome to Oatmeal MVP!" />
            </div>
          )}
          <div className="pt-32" />
          <h1 className="text-6xl md:text-8xl font-extrabold fun-heading mb-6 drop-shadow-lg bg-gradient-to-r from-yellow-400 via-fuchsia-500 to-purple-700 bg-clip-text text-transparent animate-gradient-x">
            Launch Your App, <span className="whitespace-nowrap">Fast & Fun</span>
          </h1>
          <p className="text-gray-700 dark:text-yellow-100 text-xl md:text-2xl mb-10 drop-shadow-md max-w-2xl mx-auto">
            Oatmeal MVP helps you spin up a minimal viable product in minutes—no fluff, just the essentials to validate your big idea and get real user feedback.
          </p>
          <Button
            size="xl"
            className="px-10 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-fuchsia-500 to-purple-700 text-white font-bold text-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:ring-4 focus:ring-fuchsia-400 animate-glow"
            onClick={onSignupClick}
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Feature Carousel */}
      <section id="features" className="py-24 bg-white dark:bg-gray-900">
        <h2 className="text-4xl font-extrabold text-center mb-14 fun-heading text-gray-900 dark:text-yellow-200 animate-fade-in">
          Built-In Features to Jumpstart Your MVP
        </h2>
        <Carousel slideInterval={6000} className="max-w-4xl mx-auto animate-fade-in">
          {[
            {
              icon: '🔐',
              title: 'Authentication Boilerplate',
              desc: 'Sign in, sign up, and password reset flows ready to go.',
            },
            {
              icon: '📱',
              title: 'Responsive UI Templates',
              desc: 'Mobile-first layouts crafted with Flowbite‑React components.',
            },
            {
              icon: '🚀',
              title: 'Deploy-Ready Scripts',
              desc: 'One command deploy to your preferred hosting provider.',
            },
          ].map((item, idx) => (
            <Card key={idx} className="p-8 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-4 hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 animate-float-slow">
              <div className="text-5xl mb-2 animate-bounce-slow">{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-yellow-100 fun-heading">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </Card>
          ))}
        </Carousel>
      </section>

      {/* Why MVP Section */}
      <section id="why-mvp" className="py-24 bg-gray-50 dark:bg-gray-900 px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 fun-heading text-gray-900 dark:text-yellow-200 animate-fade-in">
          Why an MVP?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: '⚡️',
              title: 'Validate Quickly',
              desc: 'Launch core features to test market demand before investing heavily in development.'
            },
            {
              icon: '⏱️',
              title: 'Save Time',
              desc: 'Skip the busywork—use prebuilt components and scripts to move from idea to demo in record time.'
            },
            {
              icon: '🔄',
              title: 'Iterate Easily',
              desc: 'Modular design means you can swap or upgrade pieces without rewriting your entire codebase.'
            },
          ].map((item, idx) => (
            <Card key={idx} className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-4 p-8 hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 animate-float-slower">
              <div className="text-4xl mb-2 animate-float-slow">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-yellow-100 fun-heading">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-200 text-center">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="py-24 text-center bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-2xl px-8 py-16 border border-gray-200 dark:border-gray-700 animate-fade-in">
          <h2 className="text-4xl font-extrabold mb-6 fun-heading text-gray-900 dark:text-yellow-200 animate-fade-in">
            Ready to turn your idea into reality?
          </h2>
          <p className="mb-10 text-gray-700 dark:text-gray-200 text-lg animate-fade-in">
            Sign up for Oatmeal MVP and get your first prototype live today. We’ll handle the scaffolding so you can focus on the fun parts—building features users will love.
          </p>
          <Button
            size="xl"
            className="px-10 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-fuchsia-500 to-purple-700 text-white font-bold text-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:ring-4 focus:ring-fuchsia-400 animate-glow"
            onClick={onSignupClick}
          >
            Get Started Free
          </Button>
        </div>
      </section>
    </>
  )
}
