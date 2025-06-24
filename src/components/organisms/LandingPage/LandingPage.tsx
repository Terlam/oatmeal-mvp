// src/components/organisms/LandingPage.tsx
import React from 'react'
import { Card, Carousel, Button } from 'flowbite-react'
import Link from 'next/link'

export const LandingPage: React.FC = () => {
  return (
      <>
      {/* Hero Section */}
<section
  className="
    relative
    flex-grow
    flex
    items-center
    justify-center
    bg-cover
    bg-center
    p-16
  "
  style={{ backgroundImage: "url('/hero.png')" }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-purple-900/60" />

  {/* Text & buttons wrapper */}
  <div className="relative z-10 max-w-2xl text-center">
    <h1 className="
      text-white
      text-5xl md:text-7xl
      font-extrabold
      mb-6
      drop-shadow-lg
    ">
      Launch Your App, Fast and Friendly
    </h1>
    <p className="
      text-gray-100
      text-lg md:text-2xl
      mb-8
      drop-shadow-md
    ">
      Oatmeal MVP helps you spin up a minimal viable product in minutes—no fluff,
      just the essentials to validate your big idea and get real user feedback.
    </p>
    <div className="flex justify-center space-x-4">
      <Button size="lg" color="primary" className="animate-bounce">
        <Link href="/signup">Get Started</Link>
      </Button>
      <Button size="lg" color="light">
        <Link href="/docs">Learn More</Link>
      </Button>
    </div>
  </div>
</section>


      {/* Feature Carousel */}
      <section id="features" className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          Built-In Features to Jumpstart Your MVP
        </h2>
        <Carousel slideInterval={6000} className="max-w-3xl mx-auto">
          {[
            {
              title: 'Authentication Boilerplate',
              desc: 'Sign in, sign up, and password reset flows ready to go.',
            },
            {
              title: 'Responsive UI Templates',
              desc: 'Mobile-first layouts crafted with Flowbite‑React components.',
            },
            {
              title: 'Deploy-Ready Scripts',
              desc: 'One command deploy to your preferred hosting provider.',
            },
          ].map((item, idx) => (
            <Card key={idx} className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </Card>
          ))}
        </Carousel>
      </section>

      {/* Why MVP Section */}
      <section id="why-mvp" className="py-16 bg-gray-50 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why an MVP?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <h3 className="text-xl font-semibold mb-2">Validate Quickly</h3>
            <p>
              Launch core features to test market demand before investing heavily in
              development.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold mb-2">Save Time</h3>
            <p>
              Skip the busywork—use prebuilt components and scripts to move from idea to
              demo in record time.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold mb-2">Iterate Easily</h3>
            <p>
              Modular design means you can swap or upgrade pieces without rewriting
              your entire codebase.
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="py-16 text-center bg-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to turn your idea into reality?
        </h2>
        <p className="mb-6 text-gray-700">
          Sign up for Oatmeal MVP and get your first prototype live today. We’ll handle
          the scaffolding so you can focus on the fun parts—building features users will love.
        </p>
        <Button size="xl" color="success">
          <Link href="/signup">Start My MVP</Link>
        </Button>
      </section>
      </>
  )
}
