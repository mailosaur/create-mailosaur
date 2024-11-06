import path from 'path';
import fsExtra from 'fs-extra';

import pc from 'picocolors';

import { CreateOptions } from '@/types';

import { install } from '../install';
import { installPlaywright } from '../installPlaywright';

interface HandleNodeJsProps {
  createOptions: CreateOptions;
  root: string;
}

export async function handleNodeJs({ createOptions, root }: HandleNodeJsProps) {
  const {
    apiKey,
    framework,
    serverId,
    installDependencies,
    language,
    packageManager,
    createExampleTests,
  } = createOptions;

  const envContent = `MAILOSAUR_API_KEY=${apiKey}
MAILOSAUR_SERVER_ID=${serverId}
MAILOSAUR_PHONE_NUMBER=
`;

  await fsExtra.writeFile(path.join(root, '.env'), envContent);

  if (!installDependencies) {
    return;
  }

  console.log(pc.cyan(pc.bold(`\nUsing ${packageManager}`)));

  await install({ packageManager, dependencyName: 'dependencies' });

  if (framework?.value === 'playwright' && createExampleTests) {
    await installPlaywright({ language });
  }
}
