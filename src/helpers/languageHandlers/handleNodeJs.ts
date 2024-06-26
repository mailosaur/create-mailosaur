import path from 'path';
import fsExtra from 'fs-extra';

import pc from 'picocolors';

import { CreateOptions } from '@/types';

import { install } from '../install';
import { modifyPackageJson } from '../modifyPackageJson';

interface HandleNodeJsProps {
  createOptions: CreateOptions;
  root: string;
}

export async function handleNodeJs({ createOptions, root }: HandleNodeJsProps) {
  const { apiKey, serverId, projectName, installDependencies, packageManager } =
    createOptions;

  const envContent = `MAILOSAUR_API_KEY=${apiKey}
MAILOSAUR_SERVER_ID=${serverId}
MAILOSAUR_PHONE_NUMBER=
`;

  await fsExtra.writeFile(path.join(root, '.env'), envContent);

  const packageJson = await modifyPackageJson(root, projectName);

  if (!installDependencies) {
    return;
  }

  console.log(pc.cyan(pc.bold(`\nUsing ${packageManager}`)));
  console.log('\nInstalling dependencies:\n');

  for (const dependency in packageJson.dependencies) {
    console.log(`   - ${pc.cyan(dependency)}`);
  }

  await install({ packageManager });
}
