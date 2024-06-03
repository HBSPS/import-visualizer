#!/usr/bin/env node

import { getAllFiles } from '../src/getAllFiles.js';
import { getConfigFile } from '../src/getConfigFile.js';
import { getImportPaths } from '../src/getImportPaths.js';
import { resolveImportPaths } from '../src/resolveImportPaths.js';

const {
  compilerOptions: { baseUrl, paths },
} = getConfigFile();

const extryFile = process.argv[2];
const imports = getImportPaths(extryFile);
console.log(imports);

const resolvedPath = resolveImportPaths(imports, baseUrl, paths);
console.log(resolvedPath);

const allFiles = getAllFiles('src');
console.log(allFiles);
