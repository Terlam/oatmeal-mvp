# 🥣 Oatmeal MVP - The Teaching Template

Welcome to your new favorite flavor of MVP — warm, reliable, and outrageously useful out of the box. This isn't your average boilerplate. This is **Oatmeal MVP**: a teaching template that believes in good defaults, great structure, and helping you build your next big idea without crying over CSS or authentication logic.

Think of it as a cooking show for developers - we show you how to make the perfect bowl of code, step by step, with plenty of personality along the way.

---

## 📚 Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
- [Scripts & Commands](#scripts--commands)
- [Teaching Examples](#teaching-examples)
- [Firebase Setup](#firebase-setup)
- [Flowbite Integration](#flowbite-integration)
- [Project Structure](#project-structure)
- [Theming & Dark Mode](#theming--dark-mode)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 About

Oatmeal MVP is a deliciously prepared dev environment for makers, designers, and late-night tinkerers who want to build fast and smart. With Firebase Auth, a layout system that won't quit, and UI pieces you'll actually reuse, this starter kit gets out of your way and lets your product shine.

_Think of it as oatmeal: a solid base for whatever you want to sprinkle on top — whether it's LMS modules, event planning features, or a dashboard for your pet hamster's crypto wallet._

### 🎯 **Teaching Philosophy**

We believe in learning through doing, with a side of humor. Every component, every script, every comment is designed to teach you something new while keeping you entertained. It's like having a coding mentor who's also a stand-up comedian.

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
- 🥣 **Interactive Scripts**: Generate components and features with personality.

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
   - Fill it in with your Firebase secrets (don't worry, we won't peek)

3. **(Optional, but recommended) Set up the Firebase Emulator for local development**
   - Install the Firebase CLI if you haven't:
     ```bash
     npm install -g firebase-tools
     ```
   - The emulator configuration is already set up in `firebase.json` with:
     - **Auth** emulator on port `9099`
     - **Firestore** emulator on port `8080`
     - **Storage** emulator on port `9199`
     - **Emulator UI** on port `9100`
   - Start the emulator suite:
     ```bash
     firebase emulators:start
     ```
     Or start specific emulators:
     ```bash
     firebase emulators:start --only auth,firestore,storage
     ```
   - Access the Emulator UI at [http://localhost:9100](http://localhost:9100)
   - In your `.env.local`, set:
     ```
     NEXT_PUBLIC_FIREBASE_USE_EMULATOR=true
     ```
   - Your app will now use the local Firebase emulators for Auth, Firestore, and Storage.

4. **Run it**
   ```bash
   npm run dev
   ```

Then go to [http://localhost:3000](http://localhost:3000) and bask in your creation.

---

## ⚙️ Scripts & Commands

| Command                   | Description                             |
|---------------------------|-----------------------------------------|
| `npm run dev`             | Start local dev server                  |
| `npm run build`           | Build app for production                |
| `npm run start`           | Start production server                 |
| `npm run lint`            | Run ESLint                              |
| `npm run lint:fix`        | Fix ESLint errors automatically         |
| `npm run storybook`       | Run Storybook component explorer        |
| `npm run build-storybook` | Build static Storybook docs             |
| `npm run gen:component`   | 🥣 Interactive component generator      |
| `npm run gen:feature`     | 🥣 Interactive feature generator        |

### 🥣 **Interactive Generators**

Our generators are like having a sous chef who asks the right questions:

```bash
# Generate a component with interactive prompts
npm run gen:component Button atom

# Generate a complete feature with full scaffolding
npm run gen:feature Chat
```

Each generator will ask you questions about what you're building and create a complete, well-documented structure with that signature oatmeal personality.

---

## 📚 Teaching Examples

### **OatmealBowl Feature**
Located in `src/features/oatmealBowl/`, this is our flagship teaching example. It demonstrates:

- **Service Layer Pattern**: Clean separation of business logic
- **Custom Hooks**: State management and data fetching
- **Component Composition**: Building complex UIs from simple parts
- **TypeScript Best Practices**: Type safety and interfaces
- **Testing Strategies**: Comprehensive test coverage

### **UserCard Component**
Located in `src/components/molecules/UserCard/`, this shows:

- **Props Interface Design**: How to structure component APIs
- **Conditional Rendering**: Dynamic UI based on data
- **Component Composition**: Using atoms to build molecules
- **TypeScript Patterns**: Proper typing and interfaces

---

## 🔐 Firebase Setup

You'll need:
- A Firebase project
- Auth methods enabled
- A service account JSON

Here's your five-step recipe:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Enable Email/Password and Google auth
3. Generate a service account private key
4. Copy it into `.env.local` like:
   ```env
   FIREBASE_SERVICE_ACCOUNT="{...}"
   ```
5. Set your `NEXT_PUBLIC_FIREBASE_*` vars from your Firebase config, including:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` (required for Storage functionality)
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

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
│   ├── molecules/      # UserCard, LoginForm
│   └── organisms/      # Header, Footer, Layout
├── features/           # Domain-driven feature slices
│   ├── oatmealBowl/   # Teaching example feature
│   ├── auth/          # Authentication
│   └── profile/       # User profiles
├── store/             # Zustand state management
├── firebase/          # clientApp.ts and admin.ts
├── hooks/             # Custom React hooks
├── pages/             # Next.js pages
├── styles/            # Tailwind setup
└── scripts/           # Generation scripts
```

---

## 🌈 Theming & Dark Mode

We support:
- `ThemeContext` with toggle + persisted state
- Tailwind `dark:` tokens
- Flowbite components that *just work*

Want your app to follow system preferences or sunset times? You can extend the context and we won't stop you.

---

## 🛣 Roadmap

- 🔜 AI-assisted feature generators with personality
- 🔌 Preset kits: `lms`, `event-app`, `chatbot-ui`
- 📦 Feature registry for smart reuse
- 🧠 One-command MVP spinups
- 🧪 CI + snapshot testing for UI diffing
- 🎭 Enhanced character voice throughout codebase

---

## 🤝 Contributing

We'd love your help! File an issue, PR a feature, or write a sarcastic `README` edit. Just remember to keep that oatmeal personality - we're here to teach and entertain.

---

## 📄 License

MIT — use it, remix it, rename it to CreamOfWheat if you want. Just don't charge people for it unless you added something amazing.

---

*Remember: Like oatmeal, good code is simple, nourishing, and endlessly customizable. Don't overcomplicate things - sometimes the simplest solution is the best one.* 🥣✨
