#!/usr/bin/env ts-node

// AI-powered feature generator for Oatmeal MVP
// 🥣 Spwoo says: "Let's cook up something smart!"

import('chalk').then(async (chalkModule) => {
  const chalk = chalkModule.default;
  const fs = require('fs');
  const path = require('path');
  const readline = require('readline');
  const axios = require('axios');

  // --- ENV SETUP ---
  const ENV_PATH = path.join(process.cwd(), '.env.local');
  const ENV_EXAMPLE_PATH = path.join(process.cwd(), '.env.ai.example');
  const OPENAI_KEY_VAR = 'OPENAI_API_KEY';
  const SAMPLE_KEY = 'sk-REPLACE_ME_WITH_YOUR_KEY';

  // Write .env.ai.example
  if (!fs.existsSync(ENV_EXAMPLE_PATH)) {
    fs.writeFileSync(
      ENV_EXAMPLE_PATH,
      `# 🥣 Spwoo says: This is a sample OpenAI key. You must update your .env.local with a real key to use AI features.\n${OPENAI_KEY_VAR}=${SAMPLE_KEY}\n`
    );
  }

  // Write .env.local if missing
  if (!fs.existsSync(ENV_PATH)) {
    fs.writeFileSync(
      ENV_PATH,
      `# 🥣 Spwoo says: This is a placeholder OpenAI key. You must update this with your real key!\n${OPENAI_KEY_VAR}=${SAMPLE_KEY}\n`
    );
    console.log(chalk.yellow(`\n🥄 Spwoo: I created a .env.local for you! Be sure to update your OpenAI key before using AI features.\n`));
  }

  // Read OpenAI key
  let openaiKey = process.env[OPENAI_KEY_VAR];
  if (!openaiKey) {
    // Try to read from .env.local
    const envContent = fs.readFileSync(ENV_PATH, 'utf-8');
    const match = envContent.match(new RegExp(`${OPENAI_KEY_VAR}=(.*)`));
    openaiKey = match ? match[1].trim() : '';
  }
  if (!openaiKey || openaiKey === SAMPLE_KEY) {
    console.log(chalk.red(`\n❌ Spwoo: No valid OpenAI API key found. Please update .env.local with your real key!\n`));
    process.exit(1);
  }

  // --- PROMPT SETUP ---
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const question = (query: string): Promise<string> => new Promise((resolve) => rl.question(query, resolve));

  // --- USER QUESTIONS ---
  console.log(chalk.blue(`\n🥄 Spwoo: Let's build a new feature with a little help from my AI friends!\n`));

  const featureName = (await question(chalk.cyan('Feature name (e.g., Social, Dashboard, Shop): '))).trim();
  const featureDesc = (await question(chalk.cyan('Describe what this feature should do: '))).trim();
  const featureType = (await question(chalk.cyan('Type (crud, social, dashboard, ecommerce): '))).trim().toLowerCase();
  const components = (await question(chalk.cyan('List main components (comma-separated, e.g., PostCard, FeedGrid): '))).split(',').map((c) => c.trim()).filter(Boolean);
  const extra = (await question(chalk.cyan('Any special requirements or integrations? (or leave blank): '))).trim();

  rl.close();

  // --- AI PROMPT ---
  const aiPrompt = `
You are Spwoo, a friendly and slightly quirky spoon mascot for a teaching codebase. Generate a complete feature for a modern React/Next.js app using atomic design (atoms, molecules, organisms), TypeScript, and Flowbite-React. 

Feature name: ${featureName}
Description: ${featureDesc}
Type: ${featureType}
Main components: ${components.join(', ')}
Special requirements: ${extra}

Instructions:
- Generate a folder structure with components (atoms/molecules/organisms as needed), services, hooks, types, tests, and Storybook stories (with fake/mock data).
- Use existing atomic components if possible, otherwise create new ones.
- Include a README.md and meta.json for the feature.
- Add a Spwoo mascot placeholder in the About modal/story, with a short story in Spwoo's character voice.
- All code should have a touch of character in comments (think Spwoo: helpful, a little silly, but clear).
- All files should be valid, working TypeScript/React code.
- Tests should use Testing Library and Vitest.
- Storybook stories should use fake/mock data.
- Output each file as:
  --- filename ---\n<file content>\n
Example output:
--- components/organisms/PostCard.tsx ---
<code here>
--- hooks/usePosts.ts ---
<code here>
...etc.
`;

  // --- AI REQUEST ---
  console.log(chalk.yellow(`\n🥄 Spwoo: Cooking up your feature with OpenAI...\n`));
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful AI code generator.' },
          { role: 'user', content: aiPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4096
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const aiText = response.data.choices[0].message.content;
    if (!aiText) throw new Error('No response from OpenAI');

    // --- PARSE AND WRITE FILES ---
    const featureDir = path.join('src', 'features', featureName.toLowerCase());
    if (!fs.existsSync(featureDir)) fs.mkdirSync(featureDir, { recursive: true });
    const fileBlocks = aiText.split(/--- ([^\n]+) ---/g).slice(1);
    for (let i = 0; i < fileBlocks.length; i += 2) {
      const relPath = fileBlocks[i].trim();
      const content = fileBlocks[i + 1].replace(/^\n+/, '');
      const absPath = path.join(featureDir, relPath);
      const absDir = path.dirname(absPath);
      if (!fs.existsSync(absDir)) fs.mkdirSync(absDir, { recursive: true });
      fs.writeFileSync(absPath, content);
      console.log(chalk.green(`\n🥄 Spwoo: Created ${absPath}`));
    }
    console.log(chalk.blue(`\n🥄 Spwoo: All done! Your new feature is ready in src/features/${featureName.toLowerCase()}`));
    console.log(chalk.yellow(`\n🥄 Spwoo: Don't forget to update your .env.local with a real OpenAI key if you haven't already!`));
  } catch (err) {
    const error = err as any;
    console.error(chalk.red(`\n❌ Spwoo: Something went wrong with the AI request!`));
    if (error.response) {
      console.error(chalk.red(JSON.stringify(error.response.data, null, 2)));
    } else {
      console.error(chalk.red(error.message));
    }
    process.exit(1);
  }
}); 