import { resolve } from 'path';

import type { absolutePath, relativePath } from './types';

export function getAbsolutePath(...relativePath: relativePath[]): absolutePath {
  return resolve(...relativePath).replace(/\\/g, '/');
}
