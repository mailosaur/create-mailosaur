import { Language } from './languages';

export interface Framework {
  name: string;
  value: string | null;
  languages: Language[];
}

export type Frameworks =
  | 'cypress'
  | 'playwright'
  | 'robotframework'
  | 'selenium'
  | 'webdriverio'
  | 'other';
