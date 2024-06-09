import { join } from 'path';

import type { absolutePath, aliasPath, configPath, relativePath } from './types';

function pathMapping(
  aliasPathWithAlias: aliasPath,
  currentFileAbsoluteDir: absolutePath,
  baseUrl: relativePath,
  paths: configPath
): absolutePath {
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

export function resolvePathAlias(
  imports: aliasPath[],
  currentFileAbsoluteDir: absolutePath,
  baseUrl: relativePath,
  paths: configPath
): absolutePath[] {
  return imports.map((importPathWithAlias) => pathMapping(importPathWithAlias, currentFileAbsoluteDir, baseUrl, paths));
}
