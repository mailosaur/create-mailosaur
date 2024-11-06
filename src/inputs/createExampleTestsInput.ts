import prompts from 'prompts';

import { exit } from '@/helpers';

export async function createExampleTestsInput() {
  console.log(); // Creates space

  const createExampleTests = await prompts(
    {
      type: 'toggle',
      name: 'value',
      message: 'Do you want to create example tests?',
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

  return createExampleTests.value;
}
