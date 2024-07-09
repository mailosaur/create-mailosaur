import fsExtra from 'fs-extra';

import pc from 'picocolors';

import { exit } from './exit';

interface IsWriteableProps {
  root: string;
}

export async function isWriteable({ root }: IsWriteableProps) {
  try {
    await fsExtra.access(root, fsExtra.constants.W_OK);
  } catch (err) {
    console.error(
      `${pc.red(pc.bold('\nYou dont have permission to write to this folder'))}`
    );
    exit(0);
  }
}
