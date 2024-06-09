import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { getAbsolutePath } from './getAbsolutePath';

export function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const fileList = readdirSync(dirPath);

  fileList.forEach((file) => {
    const relativeFilePath = join(dirPath, file);
    const absoluteFilePath = getAbsolutePath(relativeFilePath);

    if (statSync(relativeFilePath).isDirectory() && relativeFilePath != 'node_modules') {
      arrayOfFiles = getAllFiles(relativeFilePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(absoluteFilePath);
    }
  });

  return arrayOfFiles;
}
