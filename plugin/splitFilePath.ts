import type { absolutePath, relativePath } from './types';

export function splitFilePath(filePath: absolutePath | relativePath) {
  const splitPath = filePath.split('/');

  const fileName = splitPath.pop() as string;
  const path = splitPath.join('/');

  return [path, fileName];
}
