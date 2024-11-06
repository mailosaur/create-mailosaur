import prompts from 'prompts';

import { exit } from '@/helpers';

export async function provideApiKeyInput() {
  console.log(); // Creates space

  const provideApiKey = await prompts(
    {
      type: 'toggle',
      name: 'value',
      message: 'Do you want to provide an API key?',
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

  return provideApiKey.value;
}
