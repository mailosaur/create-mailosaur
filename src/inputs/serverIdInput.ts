import prompts from 'prompts';

import { exit } from '@/helpers';

export async function serverIdInput(): Promise<string> {
  console.log(); // Creates space

  const enteredServerId = await prompts(
    {
      type: 'text',
      name: 'value',
      message: `Enter the ID of your Mailosaur server/inbox (see https://mailosaur.com/app/servers)`,
      validate: async (value: string) => {
        if (value.length === 8) {
          return true;
        }

        return 'Could not find inbox (server) with this ID. Please check and try again.';
      },
    },
    {
      onCancel: () => {
        exit(0);
      },
    }
  );

  return enteredServerId.value;
}
