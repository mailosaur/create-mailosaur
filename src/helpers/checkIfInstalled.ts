import os from 'os';

import pc from 'picocolors';
import spawn from 'cross-spawn';

import { Libraries } from '@/types';

import { exit } from './exit';

export function checkIfInstalled(library: Libraries) {
  const args: string[] = [];
  const checkCommand = os.platform() === 'win32' ? 'where' : 'command';

  if (os.platform() !== 'win32') {
    args.push('-v');
  }

  const child = spawn(checkCommand, [...args, library], {
    stdio: 'ignore',
  });

  child.on('close', code => {
    if (code !== 0) {
      console.log(
        pc.red(
          `${library} is not installed. Please install ${library} to proceed.`
        )
      );

      handleSpecificLibraryError({ library });
    }
  });

  child.on('error', () => {
    console.log(
      pc.red(
        `${library} is not installed. Please install ${library} to proceed.`
      )
    );

    handleSpecificLibraryError({ library });
  });
}

interface HandleSpecificLibraryErrorProps {
  library: Libraries;
}

function handleSpecificLibraryError({
  library,
}: HandleSpecificLibraryErrorProps) {
  switch (library) {
    case 'pip':
      console.log(
        'Installation instructions: https://pip.pypa.io/en/stable/installation/'
      );
      break;
    case 'php':
      console.log(
        'Installation instructions: https://www.php.net/manual/en/install.php'
      );
      break;
    case 'composer':
      console.log(
        'Installation instructions: https://getcomposer.org/download/'
      );
      break;
    case 'python':
      console.log(
        'Installation instructions: https://www.python.org/downloads/'
      );
      break;
    case 'ruby':
      console.log(
        'Installation instructions: https://www.ruby-lang.org/en/documentation/installation/'
      );
      break;
    default:
      break;
  }

  return exit(0);
}
