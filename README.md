# 🍽️ Potluck Planner

**Plan Perfect Potluck Meals, Together**

Potluck Planner is a family-friendly event planning app that makes organizing potluck gatherings effortless. Create events, coordinate dishes, track RSVPs with guest counts, and ensure everyone has a great time!

Built with Next.js, Firebase, and a mobile-first approach, Potluck Planner helps families and friends coordinate delicious meals together without the hassle.

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

Potluck Planner simplifies event coordination for families and friends. Whether you're planning a Thanksgiving feast, a summer BBQ, or any family gathering, Potluck Planner helps you:

- **Create Events**: Set dates, times, locations, and share with your family
- **Manage Menus**: Add dishes to your menu - both hosts and guests can contribute
- **Track RSVPs**: See who's coming and how many guests they're bringing
- **Coordinate Dishes**: Claim items you want to bring, upload photos, and track dietary restrictions
- **Stay Organized**: Everything in one place, accessible from any device

### 🎯 **Features**

- Mobile-first responsive design that works beautifully on phones and tablets
- Real-time updates with Firebase Firestore
- Google Sign-In for easy access
- Photo uploads for menu items
- Guest count tracking with automatic attendee calculations
- Dietary restriction tracking (vegetarian, vegan, gluten-free, etc.)

---

## ⚙️ Technical Features

- 🛡 **Authentication**: Firebase Auth with Google Sign-In
- 🧱 **Component Architecture**: Atomic Design with `atoms`, `molecules`, `organisms`
- 🧠 **State Management**: Zustand for global state
- 🧩 **Layout System**: Responsive header, footer, and navigation
- 🌐 **Routing**: Next.js static export with Firebase Hosting
- 🎨 **Styling**: Tailwind CSS + Flowbite with dark mode support
- 📱 **Mobile-First**: Fully responsive design optimized for phones and tablets
- 🔥 **Firebase Integration**: Firestore, Storage, and Authentication
- 🧪 **Testing**: Vitest and React Testing Library
- 📚 **Storybook**: Component documentation and testing

---

## 🏁 Getting Started

1. **Clone this thing**
   ```bash
   git clone <repo-url>
   cd oatmeal-mvp
   npm install
   ```

2. **Set up Firebase Configuration**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Google Sign-In)
   - Enable Firestore Database
   - Enable Storage
   - Create `.env.local` and add your Firebase configuration (see [Firebase Setup](#firebase-setup) below)

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

## 🚀 Deployment

Potluck Planner is configured for deployment to Firebase Hosting.

### Deploy to Firebase:

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Deploy everything**:
   ```bash
   firebase deploy
   ```

3. **Deploy specific services**:
   ```bash
   firebase deploy --only hosting
   firebase deploy --only firestore:rules
   firebase deploy --only storage:rules
   ```

Your app will be live at `https://your-project.web.app`

For detailed setup instructions, see `GRANTFAMILYFUNC_SETUP.md`.

---

## 🔐 Firebase Setup

Potluck Planner requires Firebase for authentication, database, and file storage.

### Quick Setup:

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project (e.g., "Potluck Planner")

2. **Enable Services**
   - **Authentication**: Enable Google Sign-In provider
   - **Firestore Database**: Create database in production mode
   - **Storage**: Enable Firebase Storage

3. **Get Configuration Values**
   - Go to Project Settings > Your apps > Web app
   - Copy your Firebase config values

4. **Set Up Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   # For production, set to false
   NEXT_PUBLIC_FIREBASE_USE_EMULATOR=false
   
   # Service Account (for server-side operations)
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

5. **Deploy Firestore Rules**
   - The Firestore security rules are in `firestore.rules`
   - Deploy with: `firebase deploy --only firestore:rules`

6. **Deploy Storage Rules**
   - The Storage security rules are in `storage.rules`
   - Deploy with: `firebase deploy --only storage:rules`

For detailed deployment instructions, see `GRANTFAMILYFUNC_SETUP.md` (or create a similar guide for your project).

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
│   ├── atoms/          # Button, Input, Label, Avatar, Card
│   ├── molecules/      # UserCard, LoginForm, RSVPForm
│   └── organisms/      # Layout, LandingPage, EventDetails
├── features/           # Domain-driven feature slices
│   ├── events/        # Event management (create, view, RSVP)
│   ├── auth/          # Authentication
│   ├── social/        # Social features
│   └── oats/          # Oatmeal bowl feature
├── store/             # Zustand state management
├── firebase/          # clientApp.ts and admin.ts
├── hooks/             # Custom React hooks
├── pages/             # Next.js pages
├── styles/            # Tailwind CSS setup
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

Potential future features:
- 📧 Email notifications for RSVP updates
- 📅 Calendar integration (Google Calendar, iCal)
- 🎨 Custom event themes and colors
- 👥 Event co-hosts and permissions
- 💬 In-app messaging between attendees
- 📊 Event analytics and attendance tracking
- 🔗 Social media sharing
- 📱 Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Whether you're fixing bugs, adding features, or improving documentation, your help makes Potluck Planner better for everyone.

---

## 📄 License

MIT — Feel free to use, modify, and distribute as needed.

---

**Potluck Planner** — Making family gatherings easier, one potluck at a time! 🍽️✨
