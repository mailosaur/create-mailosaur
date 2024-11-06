#!/usr/bin/env node

import { CreateOptions } from '@/types';
import { checkIfInstalled, getPackageManager } from '@/helpers';
import {
  apiKeyInput,
  createExampleTestsInput,
  frameworkInput,
  getProjectPath,
  installDependenciesInput,
  languageInput,
  projectNameInput,
  provideApiKeyInput,
  serverIdInput,
} from '@/inputs';

import { createTests } from './create-tests';

const handleSigTerm = () => process.exit(0);

process.on('SIGINT', handleSigTerm);
process.on('SIGTERM', handleSigTerm);

async function main() {
  let isServerApiKey = false;

  const createOptions: CreateOptions = {
    packageManager: null,
    projectName: '',
    projectPath: '',
    framework: null,
    language: null,
    createExampleTests: false,
    provideApiKey: false,
    apiKey: '',
    serverId: '',
    installDependencies: false,
  };

  createOptions.packageManager = getPackageManager();

  createOptions.projectName = await projectNameInput();

  createOptions.projectPath = await getProjectPath(createOptions.projectName);

  createOptions.framework = await frameworkInput();

  createOptions.language = await languageInput(createOptions.framework);

  createOptions.language.requiredLibraries?.forEach(library => {
    checkIfInstalled(library);
  });

  createOptions.createExampleTests = await createExampleTestsInput();

  if (createOptions.createExampleTests) {
    createOptions.provideApiKey = await provideApiKeyInput();

    if (createOptions.provideApiKey) {
      createOptions.apiKey = await apiKeyInput(isServerApiKey);
      createOptions.serverId = await serverIdInput();
    }
  }

  if (
    createOptions.createExampleTests &&
    createOptions.provideApiKey &&
    createOptions.language?.installDependencies
  ) {
    createOptions.installDependencies = await installDependenciesInput(
      createOptions.language
    );
  }

  await createTests(createOptions);
}

main();
