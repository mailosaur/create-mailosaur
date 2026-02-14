import type { Framework } from './frameworks';
import type { Language } from './languages';
import type { PackageManager } from './packageManager';

export type CreateOptions = {
  packageManager: PackageManager | null;
  projectName: string;
  projectPath: string;
  framework: Framework | null;
  language: Language | null;
  createExampleTests: boolean;
  provideApiKey?: boolean;
  apiKey?: string;
  serverId?: string;
  installDependencies: boolean;
};
