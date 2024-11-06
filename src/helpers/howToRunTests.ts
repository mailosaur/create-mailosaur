import pc from 'picocolors';

import { Framework, Language, PackageManager } from '@/types';

interface HowToRunTestsProps {
  cdpath: string;
  framework: Framework | null;
  language: Language | null;
  packageManager: PackageManager | null;
  installDependencies: boolean;
  createExampleTests: boolean;
}

export function howToRunTests({
  cdpath,
  framework,
  language,
  packageManager,
  installDependencies,
  createExampleTests,
}: HowToRunTestsProps) {
  console.log(
    `\nTo ${!createExampleTests ? 'access' : 'run'} your tests, type:`
  );
  console.log(pc.cyan(`\n   cd`), cdpath);

  if (createExampleTests) {
    switch (language?.value) {
      case 'nodejs':
        const useYarn = packageManager === 'yarn';

        if (!installDependencies) {
          console.log(pc.cyan(`   ${packageManager} install`));
        }

        console.log(
          pc.cyan(`   ${packageManager} ${useYarn ? '' : 'run '}test`)
        );
        break;
      case 'dotnet':
        console.log(pc.cyan(`   dotnet test`));
        break;
      case 'java':
        console.log(pc.cyan(`   mvn clean test`));
        break;
      case 'python':
        if (!installDependencies) {
          console.log(pc.cyan(`   pip install -r requirements.txt`));
        }

        switch (framework?.value) {
          case 'robotframework':
            console.log(pc.cyan(`   robot tests`));
            break;
          case 'selenium':
            console.log(pc.cyan(`   python -m unittest discover`));
            break;
        }

        break;
      case 'php':
        if (!installDependencies) {
          console.log(pc.cyan(`   composer update`));
        }

        console.log(pc.cyan(`   composer run test`));
        break;
      case 'ruby':
        if (!installDependencies) {
          console.log(pc.cyan(`   bundle install`));
        }

        console.log(pc.cyan(`   rake`));
        break;
      case 'go':
        console.log(pc.cyan(`   go test -v`));
        break;
      default:
        break;
    }
  }
}
