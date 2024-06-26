import fsExtra from 'fs-extra';

import pc from 'picocolors';
import { exit } from './exit';

interface IsFolderEmptyProps {
  root: string;
}

export async function isFolderEmpty({ root }: IsFolderEmptyProps) {
  const files = await fsExtra.readdir(root);

  if (files.length > 0) {
    console.error(`${pc.red(pc.bold('\nRoot folder must be empty'))}`);
    exit(1);
  }
}
