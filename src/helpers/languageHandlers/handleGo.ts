import path from 'path';
import fsExtra from 'fs-extra';

import { CreateOptions } from '@/types';

interface HandleGoProps {
  createOptions: CreateOptions;
  root: string;
}

export async function handleGo({ createOptions, root }: HandleGoProps) {
  const { apiKey, serverId } = createOptions;

  const envContent = `MAILOSAUR_API_KEY=${apiKey}
MAILOSAUR_SERVER_ID=${serverId}
MAILOSAUR_PHONE_NUMBER=
`;

  await fsExtra.writeFile(path.join(root, '.env'), envContent);
}
