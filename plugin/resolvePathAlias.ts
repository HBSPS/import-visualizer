import { join } from 'path';

import type { absolutePath, aliasPath, configPath, relativePath } from './types';

function pathMapping(
  aliasPathWithAlias: aliasPath,
  currentFileAbsoluteDir: absolutePath,
  baseUrl: relativePath,
  paths: configPath
): absolutePath {
  // e.g. ./test/TestFile
  if (aliasPathWithAlias.startsWith('./')) return join(currentFileAbsoluteDir, aliasPathWithAlias).replace(/\\/g, '/');
  // e.g. ../test/TestFile
  if (aliasPathWithAlias.startsWith('../')) return join(currentFileAbsoluteDir, aliasPathWithAlias).replace(/\\/g, '/');

  /*
   * baseUrl: "src"
   * paths: { "@/*": ["*"] }
   * aliasPathWithAlias = @/TestFile
   */
  for (const [aliasName, actualPath] of Object.entries(paths)) {
    const aliasPrefix = aliasName.replace('*', ''); // e.g. "@/"

    if (aliasPathWithAlias.startsWith(aliasPrefix)) {
      const targetPrefix = actualPath[0].replace('*', ''); // e.g. ""
      const resolvedPath = aliasPathWithAlias.replace(aliasPrefix, targetPrefix); // e.g. TestFile

      // e.g. join('C:/.../<project>', 'src', "TestFile") => C:/.../<project>/src/TestFile
      return join(process.cwd(), baseUrl, resolvedPath).replace(/\\/g, '/');
    }
  }

  /*
   * baseUrl: "src"
   * aliasPathWithAlias = TestFile
   * join('C:/.../<project>', 'src', "TestFile") => C:/.../<project>/src/TestFile
   */
  return join(process.cwd(), baseUrl, aliasPathWithAlias).replace(/\\/g, '/');
}

export function resolvePathAlias(
  imports: aliasPath[],
  currentFileAbsoluteDir: absolutePath,
  baseUrl: relativePath,
  paths: configPath
): absolutePath[] {
  return imports.map((importPathWithAlias) => pathMapping(importPathWithAlias, currentFileAbsoluteDir, baseUrl, paths));
}
