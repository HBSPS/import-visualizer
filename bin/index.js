#!/usr/bin/env node

import open from 'open';
import { resolve } from 'path';

import { appendExtensions } from '../src/appendExtensions.js';
import { cliConfig } from '../src/cliConfig.js';
import { getAllFiles } from '../src/getAllFiles.js';
import { getConfigFile } from '../src/getConfigFile.js';
import { getImportPaths } from '../src/getImportPaths.js';
import { resolveImportPaths } from '../src/resolveImportPaths.js';

const { root, targetDir } = cliConfig(process.argv.slice(2));

const {
  compilerOptions: { baseUrl, paths },
} = getConfigFile();

const imports = getImportPaths(root);
// console.log(imports);

const resolvedPath = resolveImportPaths(imports, baseUrl, paths);
// console.log(resolvedPath);

const allFiles = getAllFiles(targetDir);
// console.log(allFiles);

const resolvedPathWithExtensions = appendExtensions(resolvedPath, allFiles);
console.log(resolvedPathWithExtensions);

await open(resolve(process.argv[1], '../../index.html'));
