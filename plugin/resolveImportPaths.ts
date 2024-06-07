import { join } from 'path';
import { configPath } from './getConfigFile';

function pathMapping(aliasPath: string, baseUrl: string, paths: configPath) {
  for (const [alias, targets] of Object.entries(paths)) {
    const aliasPrefix = alias.replace('*', '');

    if (aliasPath.startsWith(aliasPrefix)) {
      const targetPrefix = targets[0].replace('*', '');
      const resolvedPath = aliasPath.replace(aliasPrefix, targetPrefix);

      return join(baseUrl, resolvedPath).replace(/\\/g, '/');
    }
  }

  return aliasPath;
}

export function resolveImportPaths(imports: string[], baseUrl: string, paths: configPath) {
  return imports.map((importPath) => pathMapping(importPath, baseUrl, paths));
}
