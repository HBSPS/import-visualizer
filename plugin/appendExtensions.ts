export function appendExtensions(resolvedPaths: string[], allFiles: string[]) {
  return resolvedPaths.map((resolvedPath) => {
    const matchedFile = allFiles.find((file) => file.startsWith(resolvedPath));

    return matchedFile;
  });
}
