import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var theme = localStorage.getItem('postmeal-theme');
    if (
      theme === '"dark"' ||
      theme === 'dark' ||
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
            `,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&family=Nunito:wght@400;700&family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/potluck_favicon.png" />
        <link rel="apple-touch-icon" href="/potluck_favicon.png" />
        <meta name="theme-color" content="#F97316" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Potluck Planner - Plan Perfect Potluck Meals, Together" />
        <meta property="og:description" content="Potluck Planner makes it easy to organize family gatherings and potluck events. Plan menus, coordinate dishes, track RSVPs, and ensure everyone has a great time!" />
        <meta property="og:image" content="https://grantfamilyfunc.web.app/potluck_img.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://grantfamilyfunc.web.app" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Potluck Planner - Plan Perfect Potluck Meals, Together" />
        <meta name="twitter:description" content="Potluck Planner makes it easy to organize family gatherings and potluck events. Plan menus, coordinate dishes, track RSVPs, and ensure everyone has a great time!" />
        <meta name="twitter:image" content="https://grantfamilyfunc.web.app/potluck_img.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}