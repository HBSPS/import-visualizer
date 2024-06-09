import type { absolutePath } from './types';

export function appendExtensions(resolvedPaths: absolutePath[], allFiles: absolutePath[]): (absolutePath | undefined)[] {
  return resolvedPaths.map((resolvedPath: absolutePath) => {
    const matchedFile = allFiles.find((file) => file.startsWith(resolvedPath));

    return matchedFile;
  });
}
