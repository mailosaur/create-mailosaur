import path from 'path';
import glob from 'fast-glob';
import fsExtra from 'fs-extra';
import { Framework, Language } from '@/types';

export async function copy(
  sourceDir: string,
  targetDir: string,
  language: Language | null,
  framework: Framework | null,
  createExampleTests: boolean
) {
  try {
    const files = await glob(['**/*'], { cwd: sourceDir, dot: true });

    await Promise.all(
      files.map(async file => {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);
        await fsExtra.copy(sourcePath, targetPath);
      })
    );

    let fileExtension;

    switch (framework?.value) {
      case 'cypress':
        fileExtension = '.cy.js';
        break;
      case 'playwright':
        switch (language?.value) {
          case 'nodejs':
            fileExtension = '.spec.js';
            break;
          case 'dotnet':
            fileExtension = '.cs';
            break;
        }
        break;
      case 'robotframework':
        fileExtension = '.robot';
        break;
      case 'webdriverio':
        fileExtension = '.cs';
        break;
      case 'selenium':
        switch (language?.value) {
          case 'dotnet':
            fileExtension = '.cs';
            break;
          case 'java':
            fileExtension = '.java';
            break;
          case 'python':
            fileExtension = '.py';
            break;
          case 'ruby':
            fileExtension = '.rb';
            break;
        }
        break;
      default:
        fileExtension = language ? `.${language.ext}` : '';
        break;
    }

    if (!createExampleTests) {
      let testDir: string = '';
      const testFiles = await glob(`**/*${fileExtension}`, { cwd: targetDir });

      if (framework?.value === 'robotframework') {
        const keywordFiles = await glob(`**/*.py`, {
          cwd: targetDir,
        });

        await Promise.all(
          keywordFiles.map(
            async file => await fsExtra.remove(path.join(targetDir, file))
          )
        );
      }

      await Promise.all(
        testFiles.map(async testFile => {
          const testFilePath = path.join(targetDir, testFile);
          testDir = path.dirname(testFilePath);
          await fsExtra.remove(testFilePath);
        })
      );

      const blankTestFilePath = path.join(
        testDir || targetDir,
        `test${fileExtension}`
      );
      await fsExtra.writeFile(blankTestFilePath, '');
    }
  } catch (err) {
    console.error('Error copying files');
  }
}
