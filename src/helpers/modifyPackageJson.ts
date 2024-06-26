import path from 'path';
import fsExtra from 'fs-extra';

export async function modifyPackageJson(root: string, newName: string) {
  const packageJsonPath = path.join(root, 'package.json');

  const packageJsonString = await fsExtra.readFile(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonString);

  packageJson.name = newName;

  await fsExtra.writeFile(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2)
  );

  return packageJson;
}
