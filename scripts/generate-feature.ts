#!/usr/bin/env ts-node

// @ts-ignore - because chalk is ESM by default, we're using dynamic import
import('chalk').then((chalkModule) => {
  const chalk = chalkModule.default;
  const fs = require('fs');
  const path = require('path');
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(query, resolve);
    });
  };

  const args = process.argv.slice(2);
  const [nameArg] = args;

  if (!nameArg) {
    console.error(chalk.red(`\n🥣 Oops! You forgot the feature name!\n`));
    console.error(chalk.yellow(`Usage: npm run gen:feature <FeatureName>\n`));
    console.error(chalk.blue(`Example: npm run gen:feature Chat\n`));
    process.exit(1);
  }

  const pascalCase = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const kebabCase = (str: string): string =>
    str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  const featureName: string = pascalCase(nameArg);
  const featureNameKebab: string = kebabCase(nameArg);
  const dirPath: string = path.join('src', 'features', featureNameKebab);

  if (fs.existsSync(dirPath)) {
    console.error(chalk.red(`\n🚫 Whoops! Feature "${featureName}" already exists at ${dirPath}\n`));
    console.error(chalk.yellow(`Like trying to add oats to a bowl that's already full!\n`));
    process.exit(1);
  }

  // 🥣 Interactive feature generation
  const generateFeature = async () => {
    console.log(chalk.blue(`\n🥣 Welcome to the Feature Factory!\n`));
    console.log(chalk.green(`Creating: ${featureName} feature\n`));

    // Ask for feature description
    const description = await question(chalk.cyan(`📝 What does this feature do? (e.g., "A chat system for real-time messaging"): `));
    
    // Ask for feature type
    console.log(chalk.cyan(`\n🎯 What type of feature is this?`));
    console.log(chalk.blue(`1. CRUD (Create, Read, Update, Delete)`));
    console.log(chalk.blue(`2. Social (likes, comments, sharing)`));
    console.log(chalk.blue(`3. Dashboard (analytics, charts)`));
    console.log(chalk.blue(`4. Custom (something else)`));
    const featureType = await question(chalk.cyan(`Choose (1-4): `));
    
    // Ask for components needed
    const componentsInput = await question(chalk.cyan(`🔧 What components do you need? (comma-separated, e.g., "Form, List, Card"): `));
    const components = componentsInput.split(',').map(c => c.trim()).filter(c => c);
    
    // Ask for services needed
    const servicesInput = await question(chalk.cyan(`⚙️ What services do you need? (comma-separated, e.g., "apiService, authService"): `));
    const services = servicesInput.split(',').map(s => s.trim()).filter(s => s);
    
    // Ask for hooks needed
    const hooksInput = await question(chalk.cyan(`🎣 What hooks do you need? (comma-separated, e.g., "useData, useActions"): `));
    const hooks = hooksInput.split(',').map(h => h.trim()).filter(h => h);

    // Create directory structure
    fs.mkdirSync(dirPath, { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'components'), { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'components/molecules'), { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'components/organisms'), { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'services'), { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'hooks'), { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'pages'), { recursive: true });

    // Generate types file
    const typesFile = `// features/${featureNameKebab}/types.ts
import { Timestamp } from 'firebase/firestore'

/**
 * 🥣 TypeScript Types for ${featureName}
 * 
 * Think of types like the recipe ingredients list - you need to know
 * exactly what goes into your data structures before you start cooking.
 */

export interface ${featureName}Item {
  id?: string
  title: string
  description?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  // TODO: Add your specific fields here
}

export interface Create${featureName}Data {
  title: string
  description?: string
  // TODO: Add your creation fields here
}

export interface Update${featureName}Data {
  title?: string
  description?: string
  // TODO: Add your update fields here
}

// 🥣 Pro tip: Always export your types so other parts of your app
// can use them. It's like sharing your recipe with friends.
`;

    // Generate service file
    const serviceFile = `// features/${featureNameKebab}/services/${featureNameKebab}Service.ts
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
} from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import type { ${featureName}Item, Create${featureName}Data, Update${featureName}Data }

/**
 * 🥣 ${featureName} Service
 * 
 * This is where all the business logic lives. Think of it as your
 * recipe book - all the cooking methods in one organized place.
 * 
 * Pro tips:
 * - Keep services focused on one domain
 * - Handle errors gracefully
 * - Use TypeScript for type safety
 * - Add proper JSDoc comments
 */

const COLLECTION_NAME = '${featureNameKebab}s'

// 🥣 Helper function to clean data before saving
const cleanData = (data: any): any => {
  const cleaned: any = {}
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      cleaned[key] = data[key]
    }
  })
  return cleaned
}

export const get${featureName}Items = async (): Promise<${featureName}Item[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ${featureName}Item[]
  } catch (error) {
    console.error('Error fetching ${featureNameKebab}s:', error)
    throw error
  }
}

export const get${featureName}Item = async (id: string): Promise<${featureName}Item | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as ${featureName}Item
    }
    return null
  } catch (error) {
    console.error('Error fetching ${featureNameKebab}:', error)
    throw error
  }
}

export const create${featureName}Item = async (data: Create${featureName}Data): Promise<string> => {
  try {
    const cleanedData = cleanData({
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), cleanedData)
    return docRef.id
  } catch (error) {
    console.error('Error creating ${featureNameKebab}:', error)
    throw error
  }
}

export const update${featureName}Item = async (id: string, data: Update${featureName}Data): Promise<void> => {
  try {
    const cleanedData = cleanData({
      ...data,
      updatedAt: serverTimestamp(),
    })
    
    const docRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(docRef, cleanedData)
  } catch (error) {
    console.error('Error updating ${featureNameKebab}:', error)
    throw error
  }
}

export const delete${featureName}Item = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting ${featureNameKebab}:', error)
    throw error
  }
}
`;

    // Generate hook file
    const hookFile = `// features/${featureNameKebab}/hooks/use${featureName}.ts
import { useState, useEffect } from 'react'
import { useAuthStore } from '../../../store/authStore'
import {
  get${featureName}Items,
  get${featureName}Item,
  create${featureName}Item,
  update${featureName}Item,
  delete${featureName}Item,
} from '../services/${featureNameKebab}Service'
import type { ${featureName}Item, Create${featureName}Data, Update${featureName}Data }

/**
 * 🥣 ${featureName} Hook
 * 
 * This is like having a sous chef - they handle all the prep work
 * and state management so your components can focus on presentation.
 * 
 * Pro tips:
 * - Keep hooks focused on one concern
 * - Handle loading and error states
 * - Provide clean, simple APIs
 * - Use TypeScript for type safety
 */

export const use${featureName}Items = () => {
  const [items, setItems] = useState<${featureName}Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await get${featureName}Items()
      setItems(data)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch items')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const createItem = async (data: Create${featureName}Data) => {
    try {
      const id = await create${featureName}Item(data)
      await fetchItems() // Refresh the list
      return id
    } catch (err: any) {
      setError(err.message || 'Failed to create item')
      throw err
    }
  }

  const updateItem = async (id: string, data: Update${featureName}Data) => {
    try {
      await update${featureName}Item(id, data)
      await fetchItems() // Refresh the list
    } catch (err: any) {
      setError(err.message || 'Failed to update item')
      throw err
    }
  }

  const deleteItem = async (id: string) => {
    try {
      await delete${featureName}Item(id)
      await fetchItems() // Refresh the list
    } catch (err: any) {
      setError(err.message || 'Failed to delete item')
      throw err
    }
  }

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    refetch: fetchItems,
  }
}

export const use${featureName}Item = (id: string) => {
  const [item, setItem] = useState<${featureName}Item | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await get${featureName}Item(id)
        setItem(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch item')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchItem()
    }
  }, [id])

  return { item, loading, error }
}
`;

    // Generate README file
    const readmeFile = `# 🥣 ${featureName} Feature

Welcome to the ${featureName} feature! This is a teaching example that demonstrates how to build a complete feature using modern React patterns.

## 🎯 What This Feature Teaches

### **The Basics: CRUD Operations**
This feature demonstrates:
- **Create**: Add new ${featureNameKebab} items
- **Read**: Display ${featureNameKebab} items
- **Update**: Modify existing ${featureNameKebab} items
- **Delete**: Remove ${featureNameKebab} items

### **The Architecture: Service Pattern**
We're using the Service Pattern - it's like having a recipe book where all your cooking methods are organized in one place.

## 🏗️ Architecture Overview

\`\`\`
features/${featureNameKebab}/
├── components/          # UI components (molecules & organisms)
├── services/           # Business logic (the recipe book)
├── hooks/              # Data management (state handling)
├── types.ts           # TypeScript definitions
└── README.md          # This file (you're reading it!)
\`\`\`

## 📚 Learning Objectives

### **1. Service Layer Pattern**
\`\`\`typescript
// services/${featureNameKebab}Service.ts
export const create${featureName}Item = async (data: Create${featureName}Data) => {
  // This is where the magic happens
  // Like following a recipe step by step
}
\`\`\`

**What you'll learn:**
- How to separate business logic from UI
- Error handling patterns
- Async/await best practices
- TypeScript interfaces

### **2. Custom Hooks**
\`\`\`typescript
// hooks/use${featureName}.ts
export const use${featureName}Items = () => {
  // This is like having a sous chef
  // They handle all the prep work for you
}
\`\`\`

**What you'll learn:**
- React hooks patterns
- State management
- Data fetching
- Loading states

### **3. Component Composition**
\`\`\`typescript
// components/molecules/${featureName}Form.tsx
export const ${featureName}Form = () => {
  // This is like the cooking instructions
  // Clear, step-by-step, easy to follow
}
\`\`\`

**What you'll learn:**
- Form handling
- Validation
- User experience
- Accessibility

## 🚀 Getting Started

### **1. Create a New Item**
\`\`\`typescript
import { create${featureName}Item } from '@features/${featureNameKebab}/services/${featureNameKebab}Service'

const newItem = await create${featureName}Item({
  title: 'My First Item',
  description: 'This is my first item!'
})
\`\`\`

### **2. Display Your Items**
\`\`\`typescript
import { use${featureName}Items } from '@features/${featureNameKebab}/hooks/use${featureName}'

const { items, loading } = use${featureName}Items()
\`\`\`

### **3. Update an Item**
\`\`\`typescript
import { update${featureName}Item } from '@features/${featureNameKebab}/services/${featureNameKebab}Service'

await update${featureName}Item(itemId, {
  title: 'Updated Title'
})
\`\`\`

## 🧪 Testing Your Knowledge

Try these exercises:

1. **Add a new field** to the ${featureNameKebab} item
2. **Create a rating system** for items
3. **Add search functionality** 
4. **Implement filtering** by different criteria

## 🎓 Next Steps

Once you've mastered this feature, you'll understand:
- ✅ Service layer architecture
- ✅ Custom hooks patterns
- ✅ Component composition
- ✅ TypeScript best practices
- ✅ Testing strategies

Ready to cook up some code? Let's get started! 🥣✨

---

*Remember: Like oatmeal, good code is simple, nourishing, and endlessly customizable. Don't overcomplicate things - sometimes the simplest solution is the best one.*
`;

    // Generate index file
    const indexFile = `// features/${featureNameKebab}/index.tsx
/**
 * 🥣 ${featureName} Feature Index
 * 
 * This is the main entry point for the ${featureName} feature.
 * Think of it as the table of contents for your feature.
 */

// Export your components here
// export { ${featureName}Form } from './components/molecules/${featureName}Form'
// export { ${featureName}List } from './components/organisms/${featureName}List'

// Export your hooks here
export { use${featureName}Items, use${featureName}Item } from './hooks/use${featureName}'

// Export your services here
export * from './services/${featureNameKebab}Service'

// Export your types here
export * from './types'
`;

    // Generate meta.json file
    const metaFile = `{
  "name": "${featureName}",
  "description": "${description}",
  "type": "${featureType === '1' ? 'crud' : featureType === '2' ? 'social' : featureType === '3' ? 'dashboard' : 'custom'}",
  "dependsOn": [
    "Button",
    "Input",
    "Card",
    "Avatar"
  ],
  "provides": [
    "${components.join('", "')}"
  ],
  "services": [
    "${services.join('", "')}"
  ],
  "hooks": [
    "${hooks.join('", "')}"
  ]
}`;

    // Write all files
    fs.writeFileSync(path.join(dirPath, 'types.ts'), typesFile);
    fs.writeFileSync(path.join(dirPath, 'services', `${featureNameKebab}Service.ts`), serviceFile);
    fs.writeFileSync(path.join(dirPath, 'hooks', `use${featureName}.ts`), hookFile);
    fs.writeFileSync(path.join(dirPath, 'README.md'), readmeFile);
    fs.writeFileSync(path.join(dirPath, 'index.tsx'), indexFile);
    fs.writeFileSync(path.join(dirPath, 'meta.json'), metaFile);

    console.log(chalk.green(`\n✅ ${featureName} feature created successfully in ${dirPath}`));
    console.log(chalk.blue(`\n📁 Files created:`));
    console.log(chalk.blue(`  - types.ts (TypeScript definitions)`));
    console.log(chalk.blue(`  - services/${featureNameKebab}Service.ts (business logic)`));
    console.log(chalk.blue(`  - hooks/use${featureName}.ts (data management)`));
    console.log(chalk.blue(`  - README.md (documentation)`));
    console.log(chalk.blue(`  - index.tsx (exports)`));
    console.log(chalk.blue(`  - meta.json (feature metadata)`));
    
    console.log(chalk.yellow(`\n🥣 Next steps:`));
    console.log(chalk.yellow(`  1. Implement your components in components/`));
    console.log(chalk.yellow(`  2. Add your pages in pages/`));
    console.log(chalk.yellow(`  3. Customize the types in types.ts`));
    console.log(chalk.yellow(`  4. Add tests for your components`));
    console.log(chalk.yellow(`  5. Update the README with your specific use case`));
    
    console.log(chalk.green(`\n🎉 Happy coding! Remember: Good features are like good recipes - they solve real problems and bring joy to users.\n`));

    rl.close();
  };

  generateFeature().catch(console.error);
}); 