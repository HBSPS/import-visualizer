import { join } from 'path';
import { configPath } from './getConfigFile';

function pathMapping(aliasPathWithAlias: string, baseUrl: string, paths: configPath) {
  for (const [aliasName, actualPath] of Object.entries(paths)) {
    const aliasPrefix = aliasName.replace('*', '');

    if (aliasPathWithAlias.startsWith(aliasPrefix)) {
      const targetPrefix = actualPath[0].replace('*', '');
      const resolvedPath = aliasPathWithAlias.replace(aliasPrefix, targetPrefix);

      return join(baseUrl, resolvedPath).replace(/\\/g, '/');
    }
  }

  return join(baseUrl, aliasPathWithAlias).replace(/\\/g, '/');
}

export function resolveImportPaths(imports: string[], baseUrl: string, paths: configPath) {
  return imports.map((importPathWithAlias) => pathMapping(importPathWithAlias, baseUrl, paths));
}
