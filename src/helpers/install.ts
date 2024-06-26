import spawn from 'cross-spawn';

import { PackageManager } from '@/types';

interface InstallProps {
  packageManager: PackageManager | null;
}

export async function install({ packageManager }: InstallProps): Promise<void> {
  if (!packageManager) {
    return;
  }

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

    child.on('close', (code: number) => {
      if (code !== 0) {
        reject({ command: `${packageManager} ${args.join(' ')}` });
        return;
      }

      resolve();
    });
  });
}
