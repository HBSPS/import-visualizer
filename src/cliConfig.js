export function cliConfig(argv) {
  const options = {
    root: 'src/App.tsx',
    targetDir: 'src',
  };

  argv.forEach((arg) => {
    if (arg == '--root') options.root = argv[argv.indexOf(arg) + 1];
    if (arg == '--targetDir') options.targetDir = argv[argv.indexOf(arg) + 1];
  });

  return options;
}
