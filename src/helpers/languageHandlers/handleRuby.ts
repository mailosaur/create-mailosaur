import path from 'path';
import fsExtra from 'fs-extra';

import pc from 'picocolors';

import { CreateOptions } from '@/types';

import { install } from '../install';

interface HandleRubyProps {
  createOptions: CreateOptions;
  root: string;
}

export async function handleRuby({ createOptions, root }: HandleRubyProps) {
  const { apiKey, installDependencies, serverId } = createOptions;

  const envContent = `MAILOSAUR_API_KEY=${apiKey}
MAILOSAUR_SERVER_ID=${serverId}
MAILOSAUR_PHONE_NUMBER=
`;

  await fsExtra.writeFile(path.join(root, '.env'), envContent);

  if (!installDependencies) {
    return;
  }

  console.log(pc.cyan(pc.bold(`\nUsing bundler`)));
  console.log('\nInstalling gems:\n');

  const gemFilePath = path.join(root, 'Gemfile');

  const gems = fsExtra
    .readFileSync(gemFilePath, 'utf-8')
    .split('\n')
    .filter(Boolean);

  const gemRegex = /^gem ['"]([^'"]+)['"],\s*['"]([^'"]+)['"]/;

  for (const gem of gems) {
    const match = gemRegex.exec(gem);

    if (match) {
      const gemName = match[1];
      console.log(`   - ${pc.cyan(gemName)}`);
    }
  }

  await install({ packageManager: 'bundle' });
}
