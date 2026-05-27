import path from 'path';
import fsExtra from 'fs-extra';
import prompts from 'prompts';

import type { CreateOptions } from '@/types';

import { installPlaywright } from '../installPlaywright';
import { exit } from '../exit';

interface HandleDotNetProps {
  createOptions: CreateOptions;
  root: string;
}

export async function handleDotnet({ createOptions, root }: HandleDotNetProps) {
  const { apiKey, framework, language, serverId, createExampleTests } =
    createOptions;

  const envContent = `MAILOSAUR_API_KEY=${apiKey}
MAILOSAUR_SERVER_ID=${serverId}
MAILOSAUR_PHONE_NUMBER=
`;

  await fsExtra.writeFile(path.join(root, '.env'), envContent);

  console.log(); // Create space

  if (framework?.value === 'playwright' && createExampleTests) {
    const installBrowsers = await prompts(
      {
        type: 'toggle',
        name: 'value',
        message: `Install Playwright browsers?`,
        initial: true,
        active: 'Yes',
        inactive: 'No',
      },
      {
        onCancel: () => {
          exit(0);
        },
      }
    );

    if (!installBrowsers.value) {
      return;
    }

    await installPlaywright({ language });
  }
}
