import { join } from 'path';
import fsExtra from 'fs-extra';
import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],
  entry: ['./src/index.ts'],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  onSuccess: async () => {
    const sourceDir = './src/examples';
    const targetDir = './dist/examples';

    await fsExtra.copy(sourceDir, targetDir);

    const indexPath = join(targetDir, 'index.ts');
    const binPath = join(targetDir, 'xunit/bin');
    const objPath = join(targetDir, 'xunit/obj');

    await fsExtra.remove(indexPath);
    await fsExtra.remove(binPath);
    await fsExtra.remove(objPath);
  },
});
