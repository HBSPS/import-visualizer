#!/usr/bin/env node

import open from 'open';
import { resolve } from 'path';
import { unlink } from 'fs/promises';

import { cliConfig } from '../plugin/cliConfig';
import { getConfigFile } from '../plugin/getConfigFile';
import { FileTree } from '../plugin/FileTree';
import { generateTemplate } from '../plugin/generateTemplate';

export default async function cli() {
  const { root, targetDir } = cliConfig(process.argv.slice(2));

  const { compilerOptions } = getConfigFile();
  const { baseUrl, paths } = compilerOptions;

  const fileTree = new FileTree(root, targetDir, baseUrl, paths);
  generateTemplate(fileTree.tree);

  const resultFilePath = resolve(process.argv[1], '../../index.html');
  await open(resultFilePath, { wait: true });

  console.log('Tree has been created. Check your browser.');

  await unlink(resultFilePath);
}
