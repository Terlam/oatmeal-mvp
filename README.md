![# 🥣 Oatmeal MVP](/src/stories/assets/oatmeal_mvp.png "a title")

Because starting from scratch should be deliciously unnecessary.

This project isn't just a boilerplate — it's a **launchpad for ideas**, a **thoughtful system for building**, and a space where code meets clarity. Designed for speed, elegance, and repeatability, this template helps you go from zero to prototype without crying into your terminal.

---

## 📚 Table of Contents

- [Why This Exists](#-why-this-exists)
- [Quick Start](#-quick-start)
- [Project Commands](#-project-commands)
- [Component Generator](#-component-generator)
- [Theming & Dark Mode](#-theming--dark-mode)
- [Roadmap](#-roadmap)
- [Philosophy](#-philosophy)
- [Tech Stack](#-tech-stack)
- [Contributing](#-contributing)

---

## 💡 Why This Exists

Oatmeal MVP is built for:

- Designers learning to code.
- Developers trying to move faster.
- Founders prototyping at midnight.
- Anyone who’s sick of wiring up the same layout for the tenth time.

This project favors **clarity over complexity**, **defaults over decisions**, and **usefulness over perfection**. If you're building something new, this template should feel like a warm bowl of productivity.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 🔧 Project Commands

| Command | What It Does |
|--------|---------------|
| `npm run dev` | Start the dev server with Turbopack |
| `npm run build` | Build the project for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run storybook` | Launch Storybook UI component explorer |
| `npm run build-storybook` | Build static Storybook |
| `npm run gen:component` | Generate a new atomic component via script |

---

## 🧱 Component Generator

This project includes a script to scaffold **atomic design components**. But we don’t just create files — we create context.

Coming soon: prompt-based generation to help you describe what you're building before you build it.

```bash
npm run gen:component -- AlertBox molecule
```

Creates:

```
src/components/molecules/AlertBox/
├── AlertBox.tsx
├── index.ts
├── AlertBox.test.tsx
├── AlertBox.stories.tsx
```

You’ll be able to define props like `variant`, add stories, and even document intent — because good components start with good clarity.

---

## 🎨 Theming & Dark Mode

Built with Tailwind tokens and awareness of modern preferences:

- `darkMode` supported via props (and soon via context)
- Future-ready for `ThemeProvider` setup
- Design system consistent across mobile + desktop
- Class composition via `clsx` for clean flexibility

Designers and developers should both feel at home here.

---

## 📦 Roadmap

- [x] Atomic component generator
- [ ] Interactive prompts for component generation
- [ ] `generate-feature` script (e.g., `auth`, `layout`, `dashboard`)
- [ ] Full layout with responsive Header, Footer, MobileNav
- [ ] Theme and style switching via top-level prop
- [ ] Design system tokens
- [ ] Storybook docs mode + visual test coverage
- [ ] App presets: LMS, Event Planner, etc.

---

## 🧘‍♀️ Philosophy

We believe in:

- 🧩 Modularity over monoliths
- 🏎 Speed over perfection
- ✍️ Naming things well
- 🧑‍🎨 Building for developers *and* designers
- 📦 Packing only what you need, and nothing you don’t

Your components should feel like they belong together. Your files should feel like they were written by a thoughtful person. Your MVP should feel like it’s already halfway there the moment you clone this repo.

---

## 🧪 Tech Stack

- [Next.js 15](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [Storybook 8](https://storybook.js.org/)
- [Vitest](https://vitest.dev/)
- [MSW](https://mswjs.io/)
- [Chalk](https://www.npmjs.com/package/chalk)

---

## 🤝 Contributing

This project’s greatest feature is its potential. If you have ideas — for features, styles, structure, or interactivity — drop them in. Open a PR. Fork it. Remix it. Rename it. Make it yours.

And if you rename it to `CreamOfWheat-MVP`, that’s cool too.

---

## 📄 License

MIT. Use it, share it, build on it. Just don’t claim you invented oatmeal.
