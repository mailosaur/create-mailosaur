import path from 'path';

import { CreateOptions, Frameworks } from '@/types';
import { copy, handleFilesByLanguage } from '@/helpers';
import { frameworks } from '@/options';

interface ScaffoldSampleProps {
  createOptions: CreateOptions;
  root: string;
}

const examplesFolderName = 'examples';

export async function scaffoldSample({
  createOptions,
  root,
}: ScaffoldSampleProps) {
  const { framework, language } = createOptions;

  let examplePath = '';

  if (!framework?.value) {
    examplePath = path.join(
      __dirname,
      examplesFolderName,
      language?.defaultFramework || '',
      frameworks[language?.defaultFramework as Frameworks]?.languages.length >
        1 || true
        ? language?.value || ''
        : ''
    );
  } else if (framework.languages.length === 1) {
    examplePath = path.join(
      __dirname,
      examplesFolderName,
      framework?.value || ''
    );
  } else {
    examplePath = path.join(
      __dirname,
      examplesFolderName,
      framework?.value || '',
      language?.value || ''
    );
  }

  await copy(examplePath, root);

  await handleFilesByLanguage({ createOptions, root });
}
