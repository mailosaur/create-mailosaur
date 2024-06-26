import prompts from 'prompts';
import pc from 'picocolors';

import { exit } from '@/helpers';

export async function apiKeyInput(isServerApiKey: boolean): Promise<string> {
  console.log(); // Creates space

  const enteredApiKey = await prompts(
    {
      type: 'password',
      name: 'value',
      message: `Please enter your Mailosaur API key (see ${pc.blue(
        'https://mailosaur.com/app/account/keys'
      )}):`,
      validate: async value => {
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

        return 'This is not a valid Mailosaur API key';
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
      pc.yellow(
        pc.bold(
          'WARNING: This API key only supports email/SMS testing for a specific inbox (server). Some examples will not work with this API key.'
        )
      )
    );
  }

  return enteredApiKey.value;
}
