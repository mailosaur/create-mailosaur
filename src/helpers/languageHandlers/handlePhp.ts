import path from 'path';
import fsExtra from 'fs-extra';

import pc from 'picocolors';

import { CreateOptions } from '@/types';

import { install } from '../install';
import { modifyComposerJson } from '../modifyComposerJson';

interface HandlePhpProps {
  createOptions: CreateOptions;
  root: string;
}

export async function handlePhp({ createOptions, root }: HandlePhpProps) {
  const { apiKey, serverId, projectName, installDependencies } = createOptions;

  const envContent = `MAILOSAUR_API_KEY=${apiKey}
MAILOSAUR_SERVER_ID=${serverId}
MAILOSAUR_PHONE_NUMBER=
`;

  await fsExtra.writeFile(path.join(root, '.env'), envContent);

  const composerJson = await modifyComposerJson(root, projectName);

  if (!installDependencies) return;

  console.log(pc.cyan(pc.bold('\nUsing composer')));
  console.log('\nInstalling requires:\n');

  for (const require in composerJson.require) {
    console.log(`   - ${pc.cyan(require)}`);
  }

  await install({ packageManager: 'composer' });
}
