import { Framework, Frameworks } from '@/types';

import { languages } from './languages';

const cypress: Framework = {
  name: 'Cypress',
  value: 'cypress',
  languages: [languages.nodejs],
};

const playwright: Framework = {
  name: 'Playwright',
  value: 'playwright',
  languages: [languages.nodejs, languages.dotnet],
};

const robotframework: Framework = {
  name: 'Robot Framework',
  value: 'robotframework',
  languages: [languages.python],
};

const selenium: Framework = {
  name: 'Selenium',
  value: 'selenium',
  languages: [
    languages.dotnet,
    languages.java,
    languages.python,
    languages.ruby,
  ],
};

const webdriverio: Framework = {
  name: 'WebdriverIO',
  value: 'webdriverio',
  languages: [languages.nodejs],
};

const other: Framework = {
  name: 'Other (Select language)',
  value: null,
  languages: [
    languages.nodejs,
    languages.dotnet,
    languages.java,
    languages.python,
    languages.php,
    languages.ruby,
    languages.go,
  ],
};

export const frameworks: Record<Frameworks, Framework> = {
  cypress,
  playwright,
  robotframework,
  selenium,
  webdriverio,
  other,
};
