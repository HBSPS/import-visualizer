import { readFileSync } from 'fs';
import JSON5 from 'json5';

import type { Config } from './types';

export function getConfigFile(): Config {
  try {
    const tsconfig = readFileSync('tsconfig.json', 'utf-8');
    const parsedConfig = JSON5.parse(tsconfig);

    return {
      compilerOptions: {
        baseUrl: parsedConfig.compilerOptions.baseUrl || '',
        paths: parsedConfig.compilerOptions.paths || {},
      },
    };
  } catch {
    try {
      const jsconfig = readFileSync('jsconfig.json', 'utf-8');
      const parsedConfig = JSON5.parse(jsconfig);

      return {
        compilerOptions: {
          baseUrl: parsedConfig.compilerOptions.baseUrl || '',
          paths: parsedConfig.compilerOptions.paths || {},
        },
      };
    } catch {
      return {
        compilerOptions: {
          baseUrl: '',
          paths: {},
        },
      };
    }
  }
}
