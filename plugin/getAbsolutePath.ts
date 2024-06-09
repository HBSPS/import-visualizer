import { resolve } from 'path';

export function getAbsolutePath(...relativePath: string[]) {
  return resolve(...relativePath).replace(/\\/g, '/');
}
