import React from "react";

export const ToolListSection = () => (
  <section className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors">
    <div className="max-w-4xl mx-auto rounded-3xl shadow-xl bg-white/95 dark:bg-gray-900/90 backdrop-blur p-8 sm:p-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-brand dark:text-yellow-300">🔗 The Tools</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg text-gray-800 dark:text-gray-200">
        <li>
          <a href="https://nextjs.org" target="_blank" rel="noopener" className="text-blue-600 dark:text-yellow-300 underline font-semibold">Next.js</a>
          <span className="ml-2 text-gray-600 dark:text-gray-400">– for routing, SSR, and probably your future job interview</span>
        </li>
        <li>
          <a href="https://tailwindcss.com" target="_blank" rel="noopener" className="text-blue-600 dark:text-yellow-300 underline font-semibold">Tailwind CSS</a>
          <span className="ml-2 text-gray-600 dark:text-gray-400">– utility classes so good it feels like cheating</span>
        </li>
        <li>
          <a href="https://flowbite-react.com" target="_blank" rel="noopener" className="text-blue-600 dark:text-yellow-300 underline font-semibold">Flowbite React</a>
          <span className="ml-2 text-gray-600 dark:text-gray-400">– pretty buttons without the 90-minute setup</span>
        </li>
        <li>
          <a href="https://firebase.google.com/docs/auth" target="_blank" rel="noopener" className="text-blue-600 dark:text-yellow-300 underline font-semibold">Firebase Auth</a>
          <span className="ml-2 text-gray-600 dark:text-gray-400">– get login flows working before rage-quitting</span>
        </li>
        <li>
          <a href="https://storybook.js.org" target="_blank" rel="noopener" className="text-blue-600 dark:text-yellow-300 underline font-semibold">Storybook</a>
          <span className="ml-2 text-gray-600 dark:text-gray-400">– inspect your UI like a curious raccoon</span>
        </li>
        <li>
          <a href="https://mswjs.io" target="_blank" rel="noopener" className="text-blue-600 dark:text-yellow-300 underline font-semibold">MSW</a>
          <span className="ml-2 text-gray-600 dark:text-gray-400">– fake those APIs like a pro</span>
        </li>
      </ul>
    </div>
  </section>
);