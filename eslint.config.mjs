import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 🥣 TypeScript strictness - because we're not savages
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/prefer-const": "error",
      "@typescript-eslint/no-var-requires": "error",
      
      // 🥣 Import organization - keep it clean like a well-organized kitchen
      "import/order": ["error", {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "pathGroups": [
          { "pattern": "@/**", "group": "internal" }
        ],
        "newlines-between": "always",
        "alphabetize": { "order": "asc" }
      }],
      
      // 🥣 React best practices - because good components are like good recipes
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/no-array-index-key": "warn",
      "react/no-unescaped-entities": "error",
      
      // 🥣 General code quality - because clean code is like clean cooking
      "no-console": "warn",
      "no-debugger": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-var": "error",
      
      // 🥣 Comments and documentation - because good code tells a story
      "spaced-comment": ["error", "always", { "markers": ["🥣"] }],
    },
  },
];

export default eslintConfig;
