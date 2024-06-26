import fs from 'fs';
import path, { dirname } from 'path';

import pc from 'picocolors';
import validate from 'validate-npm-package-name';

import { exit, isFolderEmpty, isWriteable } from '@/helpers';

export async function getProjectPath(projectName: string): Promise<string> {
  const validation = validate(projectName);

  if (validation.errors) {
    console.error(
      `Could not create a project called ${pc.red(
        `"${projectName}"`
      )} because of npm naming restrictions:`
    );

    validation.errors.forEach((p) =>
      console.error(`${pc.red(pc.bold('*'))} ${p}`)
    );

    exit(1);
  }

  const resolvedProjectPath = path.resolve(projectName);

  const root = path.resolve(resolvedProjectPath);

  const folderExists = fs.existsSync(root);

  if (folderExists) {
    console.error(`${pc.red(pc.bold('\nFolder already exists'))}`);
    exit(1);
  }

  //! ADD THIS BACK WHEN NOT LOCALLY TESTING
  //! await isFolderEmpty({ root: dirname(root) });

  await isWriteable({ root: dirname(root) });

  return root;
}
