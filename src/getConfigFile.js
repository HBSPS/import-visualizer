import fs from 'node:fs';
import JSON5 from 'json5';

export function getConfigFile() {
  try {
    const tsconfig = fs.readFileSync('tsconfig.json', 'utf-8');
    return JSON5.parse(tsconfig);
  } catch {
    try {
      const jsconfig = fs.readFileSync('jsconfig.json', 'utf-8');
      return JSON5.parse(jsconfig);
    } catch {
      return undefined;
    }
  }
}
