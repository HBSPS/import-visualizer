import { readdirSync, statSync } from 'fs';
import { basename, join } from 'path';
import { getAbsolutePath } from './getAbsolutePath';

import type { absolutePath, relativePath } from './types';

export function getAllFiles(dirPath: relativePath, arrayOfFiles: absolutePath[] = []): absolutePath[] {
  const fileList = readdirSync(dirPath);

  fileList.forEach((file) => {
    const relativeFilePath = join(dirPath, file);
    const absoluteFilePath = getAbsolutePath(relativeFilePath);

    if (statSync(relativeFilePath).isDirectory() && relativeFilePath != 'node_modules') {
      arrayOfFiles = getAllFiles(relativeFilePath, arrayOfFiles);
    } else {
      if (basename(absoluteFilePath).split('.').includes('test')) return;
      if (basename(absoluteFilePath).split('.').includes('spec')) return;

      arrayOfFiles.push(absoluteFilePath);
    }
  });

  return arrayOfFiles;
}
