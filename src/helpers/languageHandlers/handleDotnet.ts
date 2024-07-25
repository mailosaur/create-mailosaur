import path from 'path';
import fsExtra from 'fs-extra';

import { CreateOptions } from '@/types';
import { installPlaywright } from '../installPlaywright';

interface HandleDotNetProps {
  createOptions: CreateOptions;
  root: string;
}

export async function handleDotnet({ createOptions, root }: HandleDotNetProps) {
  const { apiKey, framework, language, serverId } = createOptions;

  const secrets = `{
  "Secrets": {
    "MailosaurApiKey": "${apiKey}",
    "MailosaurServerId": "${serverId}",
    "MailosaurPhoneNumber": ""
  }
}`;

  await fsExtra.writeFile(path.join(root, 'appsettings.Testing.json'), secrets);

  if (framework?.value === 'playwright') {
    await installPlaywright({language});
  }
}
