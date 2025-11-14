import React from 'react'
import { Modal, Button } from 'flowbite-react'
import { X } from 'lucide-react'
import { useOnboardingStore } from '@/store/onboardingStore'
import { Spwoo } from '@/components/mascot/Spwoo'

export const OnboardingModal: React.FC = () => {
  const { isOpen, section, close, next, prev, complete } = useOnboardingStore()
  
  const sections = [
    {
      state: 'wave' as const,
      title: "Hi, I'm Spwoo the Turkey!",
      text: "Welcome to Potluck Planner! I'm Spwoo, your friendly Thanksgiving turkey. Let me show you how to plan perfect potluck meals for your family!",
      catchphrase: "Gobble-gobble!"
    },
    {
      state: 'think' as const,
      title: "Create Events",
      text: "Start by creating an event with date, time, and location. Share it with your family using a shareable link. You can make events public or private!",
      catchphrase: "Let's plan it!"
    },
    {
      state: 'strut' as const,
      title: "Add Menu Items",
      text: "Add dishes to your menu! Both you (the host) and your guests can add items they want to offer. You can add items directly - no approval needed!",
      catchphrase: "Time to feast!"
    },
    {
      state: 'wave' as const,
      title: "RSVP & Claim Items",
      text: "Guests can RSVP to events and claim items they want to bring. Upload photos of your dishes to show off your cooking! Track who's bringing what.",
      catchphrase: "Claim your dish!"
    },
    {
      state: 'celebrate' as const,
      title: "Coordinate Together",
      text: "Use comments to coordinate with your family. Plan dietary restrictions, serving sizes, and make sure everything is covered. Plan the perfect potluck together!",
      catchphrase: "Feast-astic!"
    },
  ]
  
  const current = sections[section] || sections[0]
  const isLastSection = section === sections.length - 1

  return (
    <Modal show={isOpen} onClose={close} size="lg" className="!bg-transparent">
      <div className="relative max-w-xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl px-8 py-10 sm:p-14 flex flex-col items-center text-center space-y-6 overflow-visible">
        {/* Close button only on last step */}
        {isLastSection && (
          <button
            onClick={close}
            aria-label="Close onboarding modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200/80 dark:bg-gray-800/80 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-colors"
          >
            <X size={24} />
          </button>
        )}
        {/* Spwoo stands out with a floating, offset effect - positioned lower for mobile visibility */}
        <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 z-20 drop-shadow-xl" style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.18))' }}>
          <Spwoo state={current.state} size={120} catchphrase={current.catchphrase} />
        </div>
        <div className="pt-32 sm:pt-40" />
        <h2 className="fun-heading text-3xl sm:text-4xl text-orange-600 dark:text-orange-400 mb-2">{current.title}</h2>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 font-medium mb-4">{current.text}</p>
        <div className="flex justify-between w-full mt-4 gap-4">
          <Button 
            color="light" 
            onClick={prev} 
            disabled={section === 0} 
            className="flex-1 py-3 rounded-xl font-semibold"
          >
            Back
          </Button>
          {isLastSection ? (
            <Button 
              color="light" 
              onClick={() => {
                complete()
                close()
              }} 
              className="flex-1 py-3 rounded-xl font-semibold bg-orange-500 hover:bg-orange-600 text-white"
            >
              Get Started!
            </Button>
          ) : (
            <Button 
              color="light" 
              onClick={next} 
              className="flex-1 py-3 rounded-xl font-semibold"
            >
              Next
            </Button>
          )}
        </div>
        {isLastSection && (
          <div className="mt-6 text-center text-gray-600 dark:text-gray-300 text-lg">
            Gobble-gobble! Thanks for learning about Potluck Planner. <br />You can always find Spwoo in the About menu!
          </div>
        )}
      </div>
    </Modal>
  )
}

