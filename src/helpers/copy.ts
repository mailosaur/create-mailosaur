import path from 'path';
import glob from 'fast-glob';
import fsExtra from 'fs-extra';

export async function copy(sourceDir: string, targetDir: string) {
  try {
    const files = await glob(['**/*'], { cwd: sourceDir, dot: true });

    await Promise.all(
      files.map(async (file) => {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);
        await fsExtra.copy(sourcePath, targetPath);
      })
    );
  } catch (err) {
    console.error('Error copying files');
  }
}
