# 🥣 Oatmeal MVP

Welcome to your new favorite flavor of MVP — warm, reliable, and outrageously useful out of the box.

This isn’t your average boilerplate. This is **Oatmeal MVP**: a starter kit that believes in good defaults, great structure, and helping you build your next big idea without crying over CSS or authentication logic. We tossed in Next.js, Tailwind, Flowbite-React, Firebase Auth, and an atomic design system — all served hot and ready.

---

## 📚 Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
- [Firebase Setup](#firebase-setup)
- [Flowbite Integration](#flowbite-integration)
- [Project Structure](#project-structure)
- [Scripts & Commands](#scripts--commands)
- [Theming & Dark Mode](#theming--dark-mode)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 About

Oatmeal MVP is a deliciously prepared dev environment for makers, designers, and late-night tinkerers who want to build fast and smart. With Firebase Auth, a layout system that won’t quit, and UI pieces you’ll actually reuse, this starter kit gets out of your way and lets your product shine.

_Think of it as oatmeal: a solid base for whatever you want to sprinkle on top — whether it’s LMS modules, event planning features, or a dashboard for your pet hamster’s crypto wallet._

---

## ⚙️ Features

- 🛡 **Authentication**: Firebase Auth with Google + Email/Password.
- 🧱 **Atomic Components**: Structured and reusable: `atoms`, `molecules`, `organisms`.
- 🧠 **State Management**: Choose between Zustand or Context (we stay chill either way).
- 🧩 **Layout System**: Header, Footer, Theme toggle — baked in.
- 🌐 **Routing**: SSR + protected routes with Firebase session cookies.
- 🎨 **Tailwind + Flowbite**: Beautiful, responsive components that respect dark mode and your brain.
- 🧪 **Testing Stack**: Vitest, Testing Library, MSW — because real devs test things.
- 📚 **Storybook**: Component playground, dark mode included.

---

## 🏁 Getting Started

1. **Clone this thing**
   ```bash
   git clone <repo-url>
   cd oatmeal-mvp
   npm install
   ```

2. **Prep your .env file**
   - Copy `.env.example` → `.env.local`
   - Fill it in with your Firebase secrets (don’t worry, we won’t peek)

3. **(Optional, but recommended) Set up the Firebase Emulator for local auth**
   - Install the Firebase CLI if you haven't:
     ```bash
     npm install -g firebase-tools
     ```
   - Initialize emulators (first time only):
     ```bash
     firebase init emulators
     ```
     - Select "Authentication" (and any other services you want).
   - Start the emulator suite:
     ```bash
     firebase emulators:start
     ```
   - In your `.env.local`, set:
     ```
     NEXT_PUBLIC_FIREBASE_USE_EMULATOR=true
     ```
   - Your app will now use the local Firebase Auth emulator for login/signup/session cookies.

4. **Run it**
   ```bash
   npm run dev
   ```

Then go to [http://localhost:3000](http://localhost:3000) and bask in your creation.

---

## 🔐 Firebase Setup

You’ll need:
- A Firebase project
- Auth methods enabled
- A service account JSON

Here’s your five-step recipe:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Enable Email/Password and Google auth
3. Generate a service account private key
4. Copy it into `.env.local` like:
   ```env
   FIREBASE_SERVICE_ACCOUNT="{...}"
   ```
5. Set your `NEXT_PUBLIC_FIREBASE_*` vars from your Firebase config

Need more help? Hit up the `pages/api/session.ts` for cookie management and auth context.

---

## 🍃 Flowbite Integration

We use Flowbite-React for styled, accessible components. Tailwind drives it all. You can:

- Use built-in `<Button>`, `<Input>`, `<Card>`, etc.
- Wrap or extend in `atoms/`, `molecules/`, and beyond
- Use their docs for inspiration or shameful copy/paste

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/flowbite-react/**/*.{ts,tsx}',
    './node_modules/flowbite/**/*.{ts,tsx}',
  ],
  plugins: [require('flowbite/plugin')],
};
```

---

## 🗂 Project Structure

```bash
src/
├── components/
│   ├── atoms/          # Button, Input, Label, Avatar
│   ├── molecules/      # LoginForm, ContactForm
│   └── organisms/      # Header, Footer, Layout
├── contexts/           # ThemeContext, AuthContext
├── firebase/           # clientApp.ts and admin.ts
├── hooks/              # useAuth, useTheme
├── pages/              # login, dashboard, index, api/session
├── styles/             # Tailwind setup
```

---

## ⚙️ Scripts & Commands

| Command                   | Description                             |
|---------------------------|-----------------------------------------|
| `npm run dev`             | Start local dev server                  |
| `npm run build`           | Build app for production                |
| `npm run start`           | Start production server                 |
| `npm run lint`            | Run ESLint                              |
| `npm run storybook`       | Run Storybook component explorer        |
| `npm run build-storybook` | Build static Storybook docs             |
| `npm run gen:component`   | Scaffold an atomic design component     |

---

## 🌈 Theming & Dark Mode

We support:
- `ThemeContext` with toggle + persisted state
- Tailwind `dark:` tokens
- Flowbite components that *just work*

Want your app to follow system preferences or sunset times? You can extend the context and we won't stop you.

---

## 🛣 Roadmap

- 🔜 AI-assisted feature generators
- 🔌 Preset kits: `lms`, `event-app`, `chatbot-ui`
- 📦 Feature registry for smart reuse
- 🧠 One-command MVP spinups
- 🧪 CI + snapshot testing for UI diffing

---

## 🤝 Contributing

We’d love your help! File an issue, PR a feature, or write a sarcastic `README` edit.

---

## 📄 License

MIT — use it, remix it, rename it to CreamOfWheat if you want. Just don’t charge people for it unless you added something amazing.
