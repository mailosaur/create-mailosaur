import spawn from "cross-spawn";
import loading from 'loading-cli';

import { Language } from "@/types";

import { exit } from "./exit";

interface InstallPlaywrightProps {
  language: Language | null;
}

export function installPlaywright({ language }: InstallPlaywrightProps): Promise<void> | void {
  const checkPlaywright = spawn('npx', ['playwright', '--version']);
  
  checkPlaywright.on('close', (code: number) => {
    if (code === 0) {
      return;
    }
  });

  const load = loading("Installing Playwright browsers");

  switch (language?.value) {
    case 'nodejs': 
      return new Promise((resolve, reject) => {
        const child = spawn('npx', ['playwright', 'install']);

        child.on('spawn', () => {
          console.log();
          load.start();
        });

        child.on('close', (code: number) => {
          if (code !== 0) {
            reject({ command: 'npx playwright install' });
            load.fail();
            exit(0);
          }

          resolve();
        });

        child.on('exit', () => {
          load.stop();
        });
      });
    case 'dotnet':
      return new Promise((resolve, reject) => {
        const child = spawn('dotnet build && pwsh bin/Debug/net8.0/playwright.ps1 install', {
          shell: true,
        });

        child.on('spawn', () => {
          console.log();
          load.start();
        });

        child.on('close', (code: number) => {
            if (code !== 0) {
              reject({ command: 'dotnet build && pwsh bin/Debug/net8.0/playwright.ps1 install' });
              load.fail();
              exit(0);
            }

            resolve();
        });

        child.on('exit', () => {
          load.stop();
        });
      }); 
  }

  return;
}