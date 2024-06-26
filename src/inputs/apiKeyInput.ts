import prompts from 'prompts';
import pc from 'picocolors';

import { exit } from '@/helpers';

export async function apiKeyInput(isServerApiKey: boolean): Promise<string> {
  console.log(); // Creates space

  const enteredApiKey = await prompts(
    {
      type: 'password',
      name: 'value',
      message: 'Please enter your api key:',
      validate: async (value) => {
        const encodedApiKey = Buffer.from(`key:${value}`).toString('base64');

        const res = await fetch('https://mailosaur.com/api/servers', {
          method: 'GET',
          headers: {
            Authorization: `Basic ${encodedApiKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (res.status === 200) {
          return true;
        }

        if (res.status === 403) {
          isServerApiKey = true;
          return true;
        }

        return 'Invalid api key';
      },
    },
    {
      onCancel: () => {
        exit(0);
      },
    }
  );

  if (isServerApiKey) {
    console.log(
      pc.yellow(pc.bold('\nApi key is a server api key (some tests wont work)'))
    );
  }

  return enteredApiKey.value;
}
