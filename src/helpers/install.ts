import spawn from 'cross-spawn';
import loading from 'loading-cli';

import { PackageManager } from '@/types';
import { exit } from './exit';

interface InstallProps {
  packageManager: PackageManager | null;
  dependencyName: string;
}

export async function install({ packageManager, dependencyName }: InstallProps): Promise<void> {
  if (!packageManager) {
    return;
  }

  const load = loading(`Installing ${dependencyName}`);

  const args: string[] = [];

  switch (packageManager) {
    case 'bun':
    case 'npm':
    case 'pnpm':
    case 'yarn':
    case 'bundle':
      args.push('install');
      break;
    case 'pip':
      args.push('install', '-r', 'requirements.txt');
      break;
    case 'composer':
      args.push('update');
      break;
    default:
      break;
  }

  return new Promise((resolve, reject) => {
    const child = spawn(packageManager, args, {
      stdio: 'ignore',
    });

    child.on('spawn', () => {
      console.log();
      load.start();
    })

    child.on('close', (code: number) => {
      if (code !== 0) {
        reject({ command: `${packageManager} ${args.join(' ')}` });
        load.fail();
        exit(0);
      }

      resolve();
    });

    child.on('exit', () => {
      load.succeed();
    })
  });
}
