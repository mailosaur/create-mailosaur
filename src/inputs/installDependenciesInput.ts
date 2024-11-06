import prompts from 'prompts';

import { exit } from '@/helpers';
import { Language } from '@/types';

export async function installDependenciesInput(language: Language) {
  console.log(); // Creates space

  let dependencyName = '';

  switch (language.value) {
    case 'nodejs':
      dependencyName = 'required test dependencies';
      break;
    case 'python':
      dependencyName = 'test requirements';
      break;
    case 'ruby':
      dependencyName = 'required test gems';
      break;
    case 'php':
      dependencyName = 'test requirements';
      break;
    default:
      break;
  }

  const enteredServerId = await prompts(
    {
      type: 'toggle',
      name: 'value',
      message: `Install all ${dependencyName}?`,
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
