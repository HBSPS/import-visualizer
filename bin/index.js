#!/usr/bin/env node

import open from 'open';
import { resolve } from 'node:path';
import fs from 'node:fs/promises';

import { cliConfig } from '../src/cliConfig.js';
import { getConfigFile } from '../src/getConfigFile.js';
import { FileTree } from '../src/FileTree.js';
import { generateTemplate } from '../src/generateTemplate.js';

const { root, targetDir } = cliConfig(process.argv.slice(2));

const { compilerOptions } = getConfigFile();
const { baseUrl, paths } = compilerOptions;

const fileTree = new FileTree(root, targetDir, baseUrl, paths);
generateTemplate(fileTree.tree);

const resultFilePath = resolve(process.argv[1], '../../index.html');
await open(resultFilePath, { wait: true });

console.log('Tree has been created. Check your browser.');

await fs.unlink(resultFilePath);
