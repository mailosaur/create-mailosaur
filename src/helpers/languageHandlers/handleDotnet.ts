import path from 'path';
import fsExtra from 'fs-extra';
import { CreateOptions } from '@/types';

interface HandleDotNetProps {
  createOptions: CreateOptions;
  root: string;
}

export async function handleDotnet({ createOptions, root }: HandleDotNetProps) {
  const { apiKey, serverId } = createOptions;

  const secrets = `{
  "Secrets": {
    "MailosaurApiKey": "${apiKey}",
    "MailosaurServerId": "${serverId}",
    "MailosaurPhoneNumber": ""
  }
}`;

  await fsExtra.writeFile(path.join(root, 'appsettings.Testing.json'), secrets);
}
