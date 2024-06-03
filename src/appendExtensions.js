export function appendExtensions(resolvedPaths, allFiles) {
  return resolvedPaths.map((resolvedPath) => {
    const matchedFile = allFiles.find((file) => file.startsWith(resolvedPath));

    return matchedFile;
  });
}
