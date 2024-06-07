import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = join(dirPath, file).replace(/\\/g, '/');

    if (statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}
