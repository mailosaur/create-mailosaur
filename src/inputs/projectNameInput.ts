import path from 'path';

import prompts from 'prompts';
import validate from 'validate-npm-package-name';

import { exit } from '@/helpers';

export async function projectNameInput(): Promise<string> {
  console.log(); // Creates space

  const enteredProjectName = await prompts(
    {
      type: 'text',
      name: 'value',
      message: 'What is your project named?',
      initial: 'mailosaur-tests',
      validate: name => {
        const validation = validate(path.basename(path.resolve(name)));

        if (!validation.errors) {
          return true;
        }

        return 'Invalid project name: ' + validation.errors[0];
      },
    },
    {
      onCancel: () => {
        exit(0);
      },
    }
  );

  const projectPath = enteredProjectName.value;

  const resolvedProjectPath = path.resolve(projectPath);

  const projectName = path.basename(resolvedProjectPath);

  return projectName;
}
