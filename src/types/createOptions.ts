import { Framework } from './frameworks';
import { Language } from './languages';
import { PackageManager } from './packageManager';

export type CreateOptions = {
  packageManager: PackageManager | null;
  projectName: string;
  projectPath: string;
  framework: Framework | null;
  language: Language | null;
  apiKey: string;
  serverId: string;
  installDependencies: boolean;
};
