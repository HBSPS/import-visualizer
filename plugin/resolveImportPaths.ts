import { join } from 'path';
import { configPath } from './getConfigFile';

function pathMapping(aliasPathWithAlias: string, baseUrl: string, paths: configPath) {
  for (const [aliasName, actualPath] of Object.entries(paths)) {
    const aliasPrefix = aliasName.replace('*', '');

    if (aliasPathWithAlias.startsWith(aliasPrefix)) {
      const resolvedPath = aliasPathWithAlias.replace(aliasPrefix, actualPath[0].replace('*', ''));

      return join(baseUrl, resolvedPath).replace(/\\/g, '/');
    }
  }

  return aliasPathWithAlias;
}

export function resolveImportPaths(imports: string[], baseUrl: string, paths: configPath) {
  return imports.map((importPathWithAlias) => pathMapping(importPathWithAlias, baseUrl, paths));
}
