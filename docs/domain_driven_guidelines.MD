# Domain-Driven & Feature-First Architecture Guidelines

This document lays out the high-level principles and patterns for organizing the MVP Template Builder repository in a scalable, domain-driven way. It is the central reference for all feature teams building on this template.

---

## 1. Project Overview

1. **Purpose**: Provide a clear, consistent structure that scales with new features (auth, dashboard, settings, billing, messaging, etc.).
2. **Goals**:

   * Enforce separation of concerns by domain (feature) boundaries.
   * Promote reusability of atomic UI components.
   * Enable safe, isolated development and testing of individual features.
   * Keep top-level directories minimal and meaningful.

---

## 2. Top-Level Directory Layout

```
/ (root)
├── .github/               # CI, actions, issue/pr templates
├── docs/                  # High-level docs, guidelines (including this file)
│   └── DOMAIN_DRIVEN_GUIDELINES.md
├── features/              # Feature slices (auth, dashboard, settings, …)
├── components/            # Shared UI primitives (atoms, utilities)
├── services/              # Shared business logic, API clients
├── pages/                 # Next.js page entries (thin wrappers)
├── public/                # Static assets
├── styles/                # Global styles, Tailwind config
├── tests/                 # End-to-end & integration tests
└── package.json
```

> **Note**: Only Next.js page-level files live in `pages/`. All feature-specific pages are co-located under `features/<feature>/pages/` and re-exported at the top level.

---

## 3. Feature Slices (`features/`)

Each feature represents a bounded context/domain. Example:

```
features/
└── auth/
    ├── components/       # Molecules & organisms only for auth
    ├── pages/            # Sign-in, sign-up, reset-password
    ├── services/         # Firebase client & admin setup
    ├── api/              # Next.js API routes (login, logout)
    └── types.ts          # Domain-specific models (User, Session)
```

**Principles**:

* **Co-location**: UI, data-fetching, types, and tests stay within the same domain.
* **Isolation**: No cross-imports between sibling `features/*` domains. Shared logic goes under `services/` or `components/`.

---

## 4. Shared Components (`components/`)

Reserved for truly generic UI building blocks:

```
components/
├── atoms/
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Avatar.tsx
├── molecules/          # Composed from atoms but feature-agnostic
│   └── Modal.tsx
└── hooks/              # UI hooks (e.g., useTheme, useMediaQuery)
```

* **When to extract**: After at least two features need the same component.
* **Naming**: Use clear, generic names (e.g. `Checkbox`, not `LoginCheckbox`).

---

## 5. Services & API Clients (`services/`)

Place cross-cutting business logic here:

```
services/
├── apiClient.ts        # Axios/Fetch wrapper, error handling
├── authService.ts      # High-level auth operations (login, logout)
└── featureFlags.ts     # Remote config or flags logic
```

* **Domain logic** (e.g. parsing user roles) remains in `features/auth/types.ts`.
* **Transport concerns** (e.g. HTTP retries) live here.

---

## 6. Types & Interfaces

* Features define their own domain types in `features/<feature>/types.ts`.
* Shared or global interfaces (e.g., `ApiResponse<T>`) go in `types/` at the root.

---

## 7. Testing Structure

```
tests/
├── unit/               # Jest unit tests for services and utils
├── integration/        # API route tests
└── e2e/                # Cypress tests for critical user flows
```

* **Feature tests** can live alongside code in `features/<feature>/__tests__/`.
* **Shared logic tests** go under `tests/unit/` or `tests/integration/`.

---

## 8. Coding & Review Guidelines

1. **Single Responsibility**: Each file should have one clear purpose.
2. **Import paths**: Use absolute imports (`@/features/auth`) configured in `tsconfig.json`.
3. **Typescript Strictness**: Enable `strict: true` and enforce `noImplicitAny`.
4. **Code Reviews**: PRs should verify:

   * No feature code added outside of its own slice.
   * Shared components are truly generic.
   * Sufficient tests accompany new logic.

---

## 9. CI/CD & Deployment

* **Linting & Formatting**: Run ESLint and Prettier checks on PRs.
* **Type Checking**: Enforce `tsc --noEmit` in pipeline.
* **Tests**: Run unit, integration, and E2E tests on every merge.
* **Preview Deployments**: Use Vercel/GitHub Actions for feature-branch previews.

---

## 10. Scaling Tips

* **Modularization**: Consider splitting very large features into sub-packages if they grow too big.
* **Monorepo Option**: For future micro-frontends, move `features/` into separate workspaces.
* **Design System**: Extract `components/atoms/` into an NPM package once stable.

---

*Keep this document updated as the codebase evolves. It is the single source of truth for our project’s architecture.*
