import { Language, Languages } from '@/types';

const nodejs: Language = {
  name: 'Node.js',
  value: 'nodejs',
  installDependencies: true,
  defaultFramework: 'playwright',
  requiredLibraries: ['node'],
};

const dotnet: Language = {
  name: '.NET',
  value: 'dotnet',
  installDependencies: false,
  defaultFramework: 'selenium',
};

const java: Language = {
  name: 'Java',
  value: 'java',
  installDependencies: false,
  defaultFramework: 'selenium',
};

const python: Language = {
  name: 'Python',
  value: 'python',
  installDependencies: true,
  defaultFramework: 'selenium',
  requiredLibraries: ['python', 'pip'],
};

const php: Language = {
  name: 'PHP',
  value: 'php',
  installDependencies: true,
  requiredLibraries: ['php', 'composer'],
};

const ruby: Language = {
  name: 'Ruby',
  value: 'ruby',
  installDependencies: true,
  defaultFramework: 'selenium',
  requiredLibraries: ['ruby'],
};

const go: Language = {
  name: 'Go',
  value: 'go',
  installDependencies: false,
  requiredLibraries: ['go'],
};

export const languages: Record<Languages, Language> = {
  nodejs,
  dotnet,
  java,
  python,
  php,
  ruby,
  go,
};
