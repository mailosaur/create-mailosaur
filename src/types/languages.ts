import type { Frameworks } from './frameworks';
import type { Libraries } from './libraries';

export interface Language {
  name: string;
  value: Languages;
  installDependencies: boolean;
  defaultFramework?: Frameworks;
  requiredLibraries?: Libraries[];
  ext: string;
}

export type Languages =
  | 'nodejs'
  | 'dotnet'
  | 'java'
  | 'python'
  | 'php'
  | 'ruby'
  | 'go';
