interface CliOptions {
  root: string;
  targetDir: string;
}

type cliArgType = '--root' | '--targetDir';

export function cliConfig(argv: NodeJS.Process['argv']): CliOptions {
  const options = {
    root: 'src/App.tsx',
    targetDir: 'src',
  };

  argv.forEach((arg: cliArgType) => {
    if (arg == '--root') options.root = argv[argv.indexOf(arg) + 1];
    if (arg == '--targetDir') options.targetDir = argv[argv.indexOf(arg) + 1];
  });

  return options;
}
