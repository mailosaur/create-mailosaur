import { Frameworks } from './frameworks';
import { Libraries } from './libraries';

export interface Language {
  name: string;
  value: Languages;
  installDependencies: boolean;
  defaultFramework?: Frameworks;
  requiredLibraries?: Libraries[];
}

export type Languages =
  | 'nodejs'
  | 'dotnet'
  | 'java'
  | 'python'
  | 'php'
  | 'ruby'
  | 'go';
