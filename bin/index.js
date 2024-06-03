#!/usr/bin/env node

import path from 'path';
import { getAllFiles } from '../src/getAllFiles.js';
import { getConfigFile } from '../src/getConfigFile.js';
import { getImportPaths } from '../src/getImportPaths.js';

const {
  compilerOptions: { baseUrl, paths },
} = getConfigFile();

const extryFile = process.argv[2];
const imports = getImportPaths(extryFile);

console.log(imports);
