import type { CliOptions, cliArgType } from './types';

export function cliConfig(argv: NodeJS.Process['argv']): CliOptions {
  const options: CliOptions = {
    root: 'src/App.tsx',
    targetDir: 'src',
    collapse: false,
  };

  argv.forEach((arg: cliArgType) => {
    if (arg === '--root') options.root = argv[argv.indexOf(arg) + 1];
    if (arg === '--targetDir') options.targetDir = argv[argv.indexOf(arg) + 1];
    if (arg === '--collapse') options.collapse = true;
  });

  return options;
}
