import React from "react";

export const CallToActionSection = () => (
  <section className="py-16 px-4 bg-gradient-to-t from-yellow-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
    <div className="max-w-xl mx-auto rounded-3xl shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur p-8 sm:p-12 flex flex-col items-center text-center space-y-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 text-brand dark:text-yellow-300 leading-tight">
        Ready to Build <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand via-yellow-500 to-brand-dark dark:from-yellow-400 dark:to-yellow-600">Something Weirdly Useful?</span>
      </h2>
      <p className="mb-2 text-gray-700 dark:text-gray-200 text-lg sm:text-xl font-medium">
        Oatmeal MVP gets you from idea to launch <span className="font-semibold text-brand dark:text-yellow-300">fast</span>.<br />
        Ship your next project with a beautiful, flexible starter kit.
      </p>
      <ul className="mb-4 text-left text-gray-600 dark:text-gray-300 text-base sm:text-lg space-y-2 w-full max-w-md mx-auto">
        <li className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand dark:bg-yellow-400" />
          <span>Modern UI, dark mode ready</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand dark:bg-yellow-400" />
          <span>Auth, theming, and layouts baked in</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand dark:bg-yellow-400" />
          <span>Perfect for hackathons, SaaS, or your next big thing</span>
        </li>
      </ul>
      <a
        href="https://github.com/YOUR_GITHUB_REPO_HERE"
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-2 bg-brand dark:bg-yellow-400 text-white dark:text-gray-900 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-brand-dark dark:hover:bg-yellow-500 transition"
      >
        <span>🚀 Visit the Repo</span>
      </a>
    </div>
  </section>
);