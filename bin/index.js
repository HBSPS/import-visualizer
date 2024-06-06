#!/usr/bin/env node

import { cliConfig } from '../src/cliConfig.js';
import { getConfigFile } from '../src/getConfigFile.js';
import { FileTree } from '../src/FileTree.js';

const { root, targetDir } = cliConfig(process.argv.slice(2));

const { compilerOptions } = getConfigFile();
const { baseUrl, paths } = compilerOptions;

// await open(resolve(process.argv[1], '../../index.html'));
const fileTree = new FileTree(root, targetDir, baseUrl, paths);
console.log(JSON.stringify(fileTree.tree, null, 2));
