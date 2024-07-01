#!/usr/bin/env node

import open from 'open';
import { resolve } from 'path';
import { unlink } from 'fs/promises';

import { cliConfig } from '../plugin/cliConfig';
import { getConfigFile } from '../plugin/getConfigFile';
import { FileTree } from '../plugin/FileTree';
import { __dirname, generateTemplate } from '../plugin/generateTemplate';

const { root, targetDir, collapse } = cliConfig(process.argv.slice(2));

const { compilerOptions } = getConfigFile();
const { baseUrl, paths } = compilerOptions;

const fileTree = new FileTree(root, targetDir, baseUrl, paths);
generateTemplate(fileTree.tree, collapse);

const resultFilePath = resolve(__dirname, '../index.html');
await open(resultFilePath, { wait: true });

console.log('Tree has been created. Check your browser.');

await unlink(resultFilePath);
