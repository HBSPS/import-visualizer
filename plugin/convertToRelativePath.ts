export function convertToRelativePath(projectAbsolutePath: string, fileAbsolutePath: string) {
  const relativePath = fileAbsolutePath.replace(projectAbsolutePath, '').replace('/', '');

  return relativePath || '.';
}
