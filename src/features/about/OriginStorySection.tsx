import React from "react";

export const OriginStorySection = () => (
  <section className="py-16 px-4 bg-gradient-to-b from-white to-yellow-50 dark:from-gray-800 dark:to-gray-900 transition-colors">
    <div className="max-w-2xl mx-auto rounded-3xl shadow-xl bg-white/95 dark:bg-gray-900/90 backdrop-blur p-8 sm:p-12 flex flex-col items-center text-center space-y-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 text-brand dark:text-yellow-300 leading-tight">
        🥣 Why Oatmeal?
      </h2>
      <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 font-medium">
        Oatmeal MVP was born out of late nights, cold coffee, and the realization that most side projects die in the “setup” phase.
      </p>
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
        We wanted a starter kit that felt like a warm bowl of oatmeal: simple, nourishing, and ready for whatever toppings you want to throw on. No more wrestling with boilerplate, just a solid base to build your next weirdly useful thing.
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        Built by makers, for makers. If you’re reading this, you’re already part of the club.
      </p>
    </div>
  </section>
);