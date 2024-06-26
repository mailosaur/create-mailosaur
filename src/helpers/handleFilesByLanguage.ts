import { CreateOptions } from '@/types';

import {
  handleDotnet,
  handleGo,
  handleJava,
  handleNodeJs,
  handlePhp,
  handlePython,
  handleRuby,
} from './languageHandlers';

interface HandleFilesByLanguageProps {
  createOptions: CreateOptions;
  root: string;
}

export async function handleFilesByLanguage({
  createOptions,
  root,
}: HandleFilesByLanguageProps) {
  const { language } = createOptions;

  switch (language?.value) {
    case 'nodejs':
      return handleNodeJs({ createOptions, root });
    case 'java':
      return handleJava({ createOptions, root });
    case 'python':
      return handlePython({ createOptions, root });
    case 'dotnet':
      return handleDotnet({ createOptions, root });
    case 'php':
      return handlePhp({ createOptions, root });
    case 'ruby':
      return handleRuby({ createOptions, root });
    case 'go':
      return handleGo({ createOptions, root });
    default:
      return;
  }
}
