# Cursor Rules for Oatmeal MVP

This directory contains detailed rules for AI-assisted development in the Oatmeal MVP codebase. These rules use Cursor's modern **Project Rules** system with `.mdc` files that include metadata for precise rule application.

## Modern Project Rules Format

Each `.mdc` file includes metadata frontmatter that specifies:
- `description`: What the rule covers
- `globs`: File patterns when the rule applies (e.g., `["**/*.ts", "**/*.tsx"]`)
- `alwaysApply`: Whether the rule always applies (true/false)

This allows Cursor to apply rules contextually based on the files you're working with.

## Rule Files

### `main.mdc`
Main overview and quick reference for all rules. Always applies.

### `architecture.mdc`
Domain-driven design principles, feature-first architecture, and isolation rules.
- Applies to: All TypeScript/JavaScript files
- Feature structure and organization
- Isolation rules (no cross-feature imports)
- State management patterns
- Common architectural mistakes

### `components.mdc`
Atomic design component hierarchy and creation patterns.
- Applies to: Component files (`**/components/**/*.tsx`)
- Atoms, molecules, and organisms
- Component requirements (tests, stories, index files)
- Flowbite integration patterns
- Dark mode support
- Component generation

### `typescript.mdc`
TypeScript conventions and type safety rules.
- Applies to: All TypeScript files (`**/*.ts`, `**/*.tsx`)
- Strict mode requirements
- Type definitions and patterns
- Path aliases usage
- Import organization
- Firebase type patterns

### `testing.mdc`
Testing standards and patterns.
- Applies to: Test and story files (`**/*.test.tsx`, `**/*.stories.tsx`)
- Vitest + React Testing Library
- MSW (Mock Service Worker) patterns
- Storybook stories
- Test organization
- Dark mode testing

### `styling.mdc`
Tailwind CSS and Flowbite styling guidelines.
- Applies to: All component and style files
- Utility class usage
- Dark mode support
- Flowbite integration
- Oatmeal theme colors
- Responsive design patterns

### `services.mdc`
Service layer patterns and Firebase operations.
- Applies to: Service files (`**/services/**/*.ts`)
- Service structure
- Firebase/Firestore patterns
- Error handling
- Query patterns
- Common service operations

### `imports.mdc`
Import path conventions and organization.
- Applies to: All TypeScript/JavaScript files
- Path alias usage
- Import order
- Type-only imports
- Feature imports
- Common import mistakes

## Usage

These rules are automatically loaded by Cursor when working in this codebase. Rules are applied based on:
1. **Metadata**: The `globs` patterns determine when rules apply
2. **Always Apply**: Rules with `alwaysApply: true` are always active
3. **Context**: Cursor intelligently applies rules based on file location and patterns

## Adding New Rules

When adding new rules:
1. Create a new `.mdc` file in this directory
2. Add metadata frontmatter with `description`, `globs`, and `alwaysApply`
3. Follow the same structure and format as existing rules
4. Include examples and common mistakes to avoid

### Example Rule File

```mdc
---
description: Your rule description
globs: ["**/*.ts", "**/*.tsx"]
alwaysApply: false
---

# Your Rule Title

Your rule content here...
```

## Migration from `.cursorrules`

The old `.cursorrules` file has been removed in favor of the modern Project Rules system. This provides:
- **Better organization**: Rules are separated by concern
- **Contextual application**: Rules apply based on file patterns
- **Easier maintenance**: Each rule is in its own file
- **Better performance**: Cursor only loads relevant rules

## References

- Architecture docs: `docs/domain_driven_guidelines.MD`
- Component library: `docs/Universal_Component_Library.md`
- Cursor Rules docs: https://docs.cursor.com/en/context/rules
