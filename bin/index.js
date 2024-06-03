#!/usr/bin/env node

import { appendExtensions } from '../src/appendExtensions.js';
import { getAllFiles } from '../src/getAllFiles.js';
import { getConfigFile } from '../src/getConfigFile.js';
import { getImportPaths } from '../src/getImportPaths.js';
import { resolveImportPaths } from '../src/resolveImportPaths.js';

const {
  compilerOptions: { baseUrl, paths },
} = getConfigFile();

const entryFile = process.argv[2];
const imports = getImportPaths(entryFile);
console.log(imports);

const resolvedPath = resolveImportPaths(imports, baseUrl, paths);
console.log(resolvedPath);

const allFiles = getAllFiles('src');
console.log(allFiles);

const resolvedPathWithExtensions = appendExtensions(resolvedPath, allFiles);
console.log(resolvedPathWithExtensions);
