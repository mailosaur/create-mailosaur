import prompts from 'prompts';

import { exit } from '@/helpers';

export async function serverIdInput(): Promise<string> {
  console.log(); // Creates space

  const enteredServerId = await prompts(
    {
      type: 'text',
      name: 'value',
      message: 'Please enter your server id:',
      validate: async (value: string) => {
        if (value.length === 8) {
          return true;
        }

        return 'Invalid server id';
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
