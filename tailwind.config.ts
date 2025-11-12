/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './features/**/*.{js,ts,jsx,tsx}',
      './.storybook/**/*.{js,ts,jsx,tsx}',
      './stories/**/*.{js,ts,jsx,tsx}',
      './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
      './node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    ],
    // Toggle dark-mode based on .dark class or data-mode="dark"
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // Example custom colors
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          brand: '#F97316',       // Orange - Light mode default
          'brand-dark': '#DC2626',// Red - Dark mode equivalent
          // Potluck/Thanksgiving colors
          'potluck-orange': '#F97316',
          'potluck-red': '#DC2626',
          'potluck-brown': '#92400E',
          'potluck-gold': '#FBBF24',
          'potluck-green': '#16A34A',
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