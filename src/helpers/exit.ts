import pc from 'picocolors';

export const exit = (code: 1 | 0) => {
  if (code === 1) {
    console.log();
    process.exit(code);
  }

  console.error(`${pc.red(pc.bold('\nExiting'))}`);
  process.exit(code);
};
