import React from "react";

export const PhilosophySection = () => (
  <section className="py-16 px-4 bg-gradient-to-b from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
    <div className="max-w-3xl mx-auto rounded-3xl shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur p-8 sm:p-12 flex flex-col items-center text-center space-y-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 text-brand dark:text-yellow-300 leading-tight">
        🥄 The Philosophy
      </h2>
      <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 font-medium">
        Postmeal MVP is for makers who want to <span className="font-semibold text-brand dark:text-yellow-300">ship fast</span> and have fun doing it.
      </p>
      <ul className="mb-4 text-left text-gray-600 dark:text-gray-300 text-base sm:text-lg space-y-2 w-full max-w-md mx-auto">
        <li className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand dark:bg-yellow-400" />
          Prototype boldly and beautifully — even when sleep-deprived.
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand dark:bg-yellow-400" />
          Components should feel like LEGO, not IKEA.
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand dark:bg-yellow-400" />
          Design systems should guide, not gatekeep.
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand dark:bg-yellow-400" />
          Your MVP doesn’t need a CMS, blockchain, or AI... unless that’s the bit.
        </li>
      </ul>
      <p className="italic text-accent dark:text-yellow-200">We’re not “enterprise-ready.” We’re “side-project-excited.”</p>
      <p className="text-center text-sm text-gray-400 dark:text-gray-500">Scale this thing to the moon? Great. But don’t forget us at IPO brunch.</p>
    </div>
  </section>
);