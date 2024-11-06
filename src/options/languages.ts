import { Language, Languages } from '@/types';

const nodejs: Language = {
  name: 'Node.js',
  value: 'nodejs',
  installDependencies: true,
  defaultFramework: 'playwright',
  requiredLibraries: ['node'],
  ext: 'js',
};

const dotnet: Language = {
  name: '.NET',
  value: 'dotnet',
  installDependencies: false,
  defaultFramework: 'selenium',
  ext: 'cs',
};

const java: Language = {
  name: 'Java',
  value: 'java',
  installDependencies: false,
  defaultFramework: 'selenium',
  ext: 'java',
};

const python: Language = {
  name: 'Python',
  value: 'python',
  installDependencies: true,
  defaultFramework: 'selenium',
  requiredLibraries: ['python', 'pip'],
  ext: 'py',
};

const php: Language = {
  name: 'PHP',
  value: 'php',
  installDependencies: true,
  requiredLibraries: ['php', 'composer'],
  ext: 'php',
};

const ruby: Language = {
  name: 'Ruby',
  value: 'ruby',
  installDependencies: true,
  defaultFramework: 'selenium',
  requiredLibraries: ['ruby'],
  ext: 'rb',
};

const go: Language = {
  name: 'Go',
  value: 'go',
  installDependencies: false,
  requiredLibraries: ['go'],
  ext: 'go',
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
