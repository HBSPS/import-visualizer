import path from 'node:path';

function pathMapping(aliasPath, baseUrl, paths) {
  for (const [alias, targets] of Object.entries(paths)) {
    const aliasPrefix = alias.replace('*', '');

    if (aliasPath.startsWith(aliasPrefix)) {
      const targetPrefix = targets[0].replace('*', '');
      const resolvedPath = aliasPath.replace(aliasPrefix, targetPrefix);
      return path.join(baseUrl, resolvedPath);
    }
  }
  return aliasPath;
}

export function resolveImportPaths(imports, baseUrl, paths) {
  return imports.map((importPath) => pathMapping(importPath, baseUrl, paths));
}
