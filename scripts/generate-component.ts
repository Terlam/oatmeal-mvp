#!/usr/bin/env ts-node

// @ts-ignore - because chalk is ESM by default, we're using dynamic import
import('chalk').then((chalkModule) => {
  const chalk = chalkModule.default;
  const fs = require('fs');
  const path = require('path');

  const args = process.argv.slice(2);
  const [nameArg, typeArg] = args;

  if (!nameArg || !typeArg) {
    console.error(chalk.red(`\nUsage: ts-node scripts/generate-component.ts <ComponentName> <atom|molecule|organism>\n`));
    process.exit(1);
  }

  const validTypes = ['atom', 'molecule', 'organism'];
  if (!validTypes.includes(typeArg.toLowerCase())) {
    console.error(chalk.red(`\nInvalid type "${typeArg}". Choose from: atom, molecule, organism\n`));
    process.exit(1);
  }

  const pascalCase = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const componentName: string = pascalCase(nameArg);
  const componentTypeFolder: string = typeArg.toLowerCase() + 's'; // 'atoms', etc.
  const dirPath: string = path.join('src', 'components', componentTypeFolder, componentName);

  if (fs.existsSync(dirPath)) {
    console.error(chalk.red(`\nComponent "${componentName}" already exists at ${dirPath}\n`));
    process.exit(1);
  }

  fs.mkdirSync(dirPath, { recursive: true });

  const componentComment =
    typeArg === 'atom'
      ? 'A simple UI element. Pure, reusable, innocent.'
      : typeArg === 'molecule'
      ? 'Composed of atoms. Slightly more complex. May include logic or layout.'
      : 'A big, bold UI block. Uses molecules and atoms like a boss.';

  const componentFile = `import React from "react";

/**
 * ${componentName} (${typeArg})
 * ${componentComment}
 */

export interface ${componentName}Props {
  // TODO: define your props
}

export const ${componentName}: React.FC<${componentName}Props> = (props) => {
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

describe('${componentName}', () => {
  it('renders with placeholder text', () => {
    render(<${componentName} />);
    expect(screen.getByText('${componentName} placeholder')).toBeInTheDocument();
  });
});
`;

  const storyFile = `import React from 'react';
import { ${componentName} } from './${componentName}';

export default {
  title: '${pascalCase(componentTypeFolder)}/${componentName}',
  component: ${componentName},
};

export const Default = () => <${componentName} />;
`;

  fs.writeFileSync(path.join(dirPath, `${componentName}.tsx`), componentFile);
  fs.writeFileSync(path.join(dirPath, `index.ts`), indexFile);
  fs.writeFileSync(path.join(dirPath, `${componentName}.test.tsx`), testFile);
  fs.writeFileSync(path.join(dirPath, `${componentName}.stories.tsx`), storyFile);

  console.log(chalk.green(`✅ ${componentName} component created successfully in ${dirPath}`));
});
