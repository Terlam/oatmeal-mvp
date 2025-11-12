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
  const [nameArg, typeArg] = args;

  if (!nameArg || !typeArg) {
    console.error(chalk.red(`\n🥣 Oops! You forgot the ingredients!\n`));
    console.error(chalk.yellow(`Usage: npm run gen:component <ComponentName> <atom|molecule|organism>\n`));
    console.error(chalk.blue(`Example: npm run gen:component Button atom\n`));
    process.exit(1);
  }

  const validTypes = ['atom', 'molecule', 'organism'];
  if (!validTypes.includes(typeArg.toLowerCase())) {
    console.error(chalk.red(`\n🤔 That's not a valid component type, chef!\n`));
    console.error(chalk.yellow(`Choose from: atom, molecule, organism\n`));
    console.error(chalk.blue(`Think of it like cooking:\n`));
    console.error(chalk.blue(`  atom = single ingredient (Button, Input)\n`));
    console.error(chalk.blue(`  molecule = simple recipe (LoginForm, UserCard)\n`));
    console.error(chalk.blue(`  organism = full meal (Dashboard, Layout)\n`));
    process.exit(1);
  }

  const pascalCase = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const componentName: string = pascalCase(nameArg);
  const componentTypeFolder: string = typeArg.toLowerCase() + 's'; // 'atoms', etc.
  const dirPath: string = path.join('src', 'components', componentTypeFolder, componentName);

  if (fs.existsSync(dirPath)) {
    console.error(chalk.red(`\n🚫 Whoops! Component "${componentName}" already exists at ${dirPath}\n`));
    console.error(chalk.yellow(`Like trying to add oats to a bowl that's already full!\n`));
    process.exit(1);
  }

  // 🥣 Interactive component generation
  const generateComponent = async () => {
    console.log(chalk.blue(`\n🥣 Welcome to the Component Kitchen!\n`));
    console.log(chalk.green(`Creating: ${componentName} (${typeArg})\n`));

    // Ask for component description
    const description = await question(chalk.cyan(`📝 What does this ${typeArg} do? (e.g., "A button that can be customized with different colors"): `));
    
    // Ask for props
    const propsInput = await question(chalk.cyan(`🔧 What props should it accept? (comma-separated, e.g., "color, size, onClick"): `));
    const props = propsInput.split(',').map(p => p.trim()).filter(p => p);
    
    // Ask for Flowbite dependency
    const useFlowbite = await question(chalk.cyan(`🎨 Should it extend a Flowbite component? (y/n): `));
    const flowbiteComponent = useFlowbite.toLowerCase() === 'y' 
      ? await question(chalk.cyan(`🎨 Which Flowbite component? (e.g., "Button", "Card"): `))
      : null;

    // Create directory
    fs.mkdirSync(dirPath, { recursive: true });

    // Generate component file with character voice
    const componentComment = typeArg === 'atom'
      ? `A simple UI element. Pure, reusable, innocent. Like a single oat - simple but essential.`
      : typeArg === 'molecule'
      ? `Composed of atoms. Slightly more complex. May include logic or layout. Like a recipe with a few ingredients.`
      : `A big, bold UI block. Uses molecules and atoms like a boss. Like a full breakfast spread.`;

    const propsInterface = props.length > 0 
      ? props.map(prop => `  ${prop}?: string;`).join('\n')
      : '  // TODO: Add your props here';

    const flowbiteImport = flowbiteComponent 
      ? `import { ${flowbiteComponent} as Flowbite${flowbiteComponent} } from 'flowbite-react';`
      : '';

    const componentFile = `import React from "react";
${flowbiteImport}

/**
 * ${componentName} (${typeArg})
 * 
 * ${description}
 * 
 * ${componentComment}
 * 
 * 🥣 Pro Tips:
 * - Keep it simple, like a good bowl of oatmeal
 * - Make it reusable, like a favorite recipe
 * - Add proper TypeScript types, because we're not savages
 * - Test it thoroughly, because bugs are like burnt oatmeal - nobody likes them
 */

export interface ${componentName}Props {
${propsInterface}
}

export const ${componentName}: React.FC<${componentName}Props> = (props) => {
  // 🥣 Pro tip: Always destructure your props at the top
  // It's like organizing your ingredients before cooking
  const { ${props.join(', ')} } = props;

  return (
    <div className="${typeArg}-component p-4 border rounded">
      {/* TODO: Flesh out ${componentName} component */}
      <p className="text-sm text-gray-500">${componentName} placeholder</p>
    </div>
  );
};
`;

    const indexFile = `export * from './${componentName}';`;

    const testFile = `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

/**
 * 🧪 Testing Time!
 * 
 * Welcome to the wonderful world of component testing. Think of tests like
 * quality control for your oatmeal - you want to make sure every bowl
 * tastes the same, every time.
 */

describe('${componentName}', () => {
  it('renders with placeholder text', () => {
    render(<${componentName} />);
    expect(screen.getByText('${componentName} placeholder')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    render(<${componentName} />);
    expect(screen.getByText('${componentName} placeholder')).toBeInTheDocument();
  });
});
`;

    const storyFile = `import React from 'react';
import { ${componentName} } from './${componentName}';

/**
 * 📚 Storybook Story
 * 
 * This is where you can play with your component in isolation.
 * Like having a test kitchen where you can experiment with recipes
 * without messing up the main kitchen.
 */

export default {
  title: '${pascalCase(componentTypeFolder)}/${componentName}',
  component: ${componentName},
  parameters: {
    docs: {
      description: {
        component: '${description}'
      }
    }
  }
};

export const Default = () => <${componentName} />;

export const WithProps = () => (
  <${componentName} 
    // Add your props here for testing
  />
);
`;

    fs.writeFileSync(path.join(dirPath, `${componentName}.tsx`), componentFile);
    fs.writeFileSync(path.join(dirPath, `index.ts`), indexFile);
    fs.writeFileSync(path.join(dirPath, `${componentName}.test.tsx`), testFile);
    fs.writeFileSync(path.join(dirPath, `${componentName}.stories.tsx`), storyFile);

    console.log(chalk.green(`\n✅ ${componentName} component created successfully in ${dirPath}`));
    console.log(chalk.blue(`\n📁 Files created:`));
    console.log(chalk.blue(`  - ${componentName}.tsx (main component)`));
    console.log(chalk.blue(`  - index.ts (exports)`));
    console.log(chalk.blue(`  - ${componentName}.test.tsx (tests)`));
    console.log(chalk.blue(`  - ${componentName}.stories.tsx (Storybook)`));
    
    console.log(chalk.yellow(`\n🥣 Next steps:`));
    console.log(chalk.yellow(`  1. Open ${componentName}.tsx and implement your component`));
    console.log(chalk.yellow(`  2. Add proper TypeScript types for your props`));
    console.log(chalk.yellow(`  3. Write meaningful tests`));
    console.log(chalk.yellow(`  4. Add it to your Storybook for documentation`));
    
    console.log(chalk.green(`\n🎉 Happy coding! Remember: Good components are like good oatmeal - simple, nourishing, and endlessly customizable.\n`));

    rl.close();
  };

  generateComponent().catch(console.error);
});
