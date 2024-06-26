import path from 'path';
import fsExtra from 'fs-extra';

export async function modifyComposerJson(root: string, newName: string) {
  const composerJsonPath = path.join(root, 'composer.json');

  const composerJsonString = await fsExtra.readFile(composerJsonPath, 'utf8');
  const composerJson = JSON.parse(composerJsonString);

  composerJson.name = `mailosaur-example/${newName}`;

  await fsExtra.writeFile(
    composerJsonPath,
    JSON.stringify(composerJson, null, 2)
  );

  return composerJson;
}
