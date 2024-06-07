export function splitFilePath(filePath: string) {
  const splitPath = filePath.split('/');
  const fileName = splitPath.pop() as string;
  const path = splitPath.join('/');

  return [path, fileName];
}
