import prompts from 'prompts';

import { exit } from '@/helpers';
import { frameworks } from '@/options';
import { Framework, Frameworks } from '@/types';

export async function frameworkInput(): Promise<Framework> {
  console.log(); // Creates space

  const frameworkKeys = Object.keys(frameworks).map((framework) => framework);

  const enteredFramework = await prompts(
    {
      type: 'select',
      name: 'value',
      message: 'Choose your framework',
      choices: frameworkKeys.map((framework) => ({
        title: frameworks[framework as Frameworks].name,
        value: frameworks[framework as Frameworks].value,
      })),
      initial: 0,
    },
    {
      onCancel: () => {
        exit(0);
      },
    }
  );

  if (!enteredFramework.value) {
    return frameworks.other;
  }

  return frameworks[enteredFramework.value as Frameworks];
}
