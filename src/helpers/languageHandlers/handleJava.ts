import path from 'path';
import fsExtra from 'fs-extra';

import { CreateOptions } from '@/types';

interface HandleJavaProps {
  createOptions: CreateOptions;
  root: string;
}

export async function handleJava({ createOptions, root }: HandleJavaProps) {
  const { apiKey, serverId } = createOptions;

  const envContent = `mailosaurApiKey=${apiKey}
mailosaurServerId=${serverId}
mailosaurPhoneNumber=
`;

  await fsExtra.writeFile(path.join(root, '.env'), envContent);
}
