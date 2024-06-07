import { join } from 'path';
import { configPath } from './getConfigFile';

function pathMapping(aliasPathWithAlias: string, baseUrl: string, paths: configPath) {
  let resolvedPath = aliasPathWithAlias;

  for (const [aliasName, actualPath] of Object.entries(paths)) {
    const aliasPrefix = aliasName.replace('*', '');

    if (aliasPathWithAlias.startsWith(aliasPrefix)) {
      resolvedPath = aliasPathWithAlias.replace(aliasPrefix, actualPath[0].replace('*', ''));
      break;
    }
  }

  return join(baseUrl, resolvedPath).replace(/\\/g, '/');
}

export function resolveImportPaths(imports: string[], baseUrl: string, paths: configPath) {
  return imports.map((importPathWithAlias) => pathMapping(importPathWithAlias, baseUrl, paths));
}
