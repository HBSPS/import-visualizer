import { join } from 'path';
import { configPath } from './getConfigFile';

function pathMapping(aliasPathWithAlias: string, currentFileAbsoluteDir: string, baseUrl: string, paths: configPath) {
  if (!baseUrl) return join(currentFileAbsoluteDir, aliasPathWithAlias).replace(/\\/g, '/');

  for (const [aliasName, actualPath] of Object.entries(paths)) {
    const aliasPrefix = aliasName.replace('*', '');

    if (aliasPathWithAlias.startsWith(aliasPrefix)) {
      const targetPrefix = actualPath[0].replace('*', '');
      const resolvedPath = aliasPathWithAlias.replace(aliasPrefix, targetPrefix);

      return join(currentFileAbsoluteDir, baseUrl, resolvedPath).replace(/\\/g, '/');
    }
  }

  return join(currentFileAbsoluteDir, baseUrl, aliasPathWithAlias).replace(/\\/g, '/');
}

export function resolvePathAlias(imports: string[], currentFileAbsoluteDir: string, baseUrl: string, paths: configPath) {
  return imports.map((importPathWithAlias) => pathMapping(importPathWithAlias, currentFileAbsoluteDir, baseUrl, paths));
}
