import fs from 'fs';
import path, { dirname } from 'path';

import pc from 'picocolors';

import { CreateOptions } from '@/types';
import { howToRunTests } from '@/helpers';

import { scaffoldSample } from './scaffolding';

export async function createTests(createOptions: CreateOptions) {
  const {
    packageManager,
    projectPath,
    projectName,
    framework,
    language,
    installDependencies,
  } = createOptions;

  const root = path.resolve(projectPath);

  fs.mkdirSync(root, { recursive: true });

  const originalDirectory = process.cwd();

  console.log(
    `\nCreating ${pc.magenta(pc.bold(projectName))} at ${pc.magenta(
      pc.bold(dirname(root))
    )}`
  );

  process.chdir(root);

  await scaffoldSample({ createOptions, root });

  let cdpath: string;

  if (path.join(originalDirectory, projectName) === projectPath) {
    cdpath = projectName;
  } else {
    cdpath = projectPath;
  }

  console.log(`${pc.green(pc.bold('\nSuccess!'))}`);

  howToRunTests({
    cdpath,
    framework,
    language,
    packageManager,
    installDependencies,
  });
}
