import prompts from 'prompts';

import { exit } from '@/helpers';
import { languages } from '@/options';
import { Framework, Language, Languages } from '@/types';

export async function languageInput(
  framework: Framework | null
): Promise<Language> {
  if (framework?.value && framework?.languages.length === 1) {
    return framework.languages[0];
  }

  console.log(); // Creates space

  const enteredFramework = await prompts(
    {
      type: 'select',
      name: 'value',
      message: 'Select a language',
      choices: framework?.languages.map(language => ({
        title: language.name,
        value: language.value,
      })),
      initial: 0,
    },
    {
      onCancel: () => {
        exit(0);
      },
    }
  );

  return languages[enteredFramework.value as Languages];
}
