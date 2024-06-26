import prompts from 'prompts';

import { exit } from '@/helpers';
import { Language } from '@/types';

export async function installDependenciesInput(language: Language) {
  console.log(); // Creates space

  let dependencyName = '';

  switch (language.value) {
    case 'nodejs':
      dependencyName = 'required dependencies';
      break;
    case 'python':
      dependencyName = 'requirements';
      break;
    case 'ruby':
      dependencyName = 'required gems';
      break;
    case 'php':
      dependencyName = 'requirements';
      break;
    default:
      break;
  }

  const enteredServerId = await prompts(
    {
      type: 'toggle',
      name: 'value',
      message: `Install ${dependencyName}?`,
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

  return enteredServerId.value;
}
