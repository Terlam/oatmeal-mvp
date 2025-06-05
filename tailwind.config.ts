/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './.storybook/**/*.{js,ts,jsx,tsx}',
      './stories/**/*.{js,ts,jsx,tsx}',
      './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
      './node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    ],
    // Toggle dark-mode based on .dark class or data-mode="dark"
    darkMode: ['class', '[data-mode="dark"]'],
    theme: {
      extend: {
        colors: {
          // Example custom colors
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          brand: '#6366f1',       // Light mode default
          'brand-dark': '#4f46e5',// Dark mode equivalent
        },
        fontFamily: {
          sans: 'var(--font-sans)',
          mono: 'var(--font-mono)',
        },
      },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('flowbite/plugin'),
      ],
  }