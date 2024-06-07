import { readFileSync } from 'node:fs';
import { parse } from 'json5';

export type configPath = Record<string, string[]>;
interface Config {
  compilerOptions: {
    baseUrl: string;
    paths: configPath;
  };
}

export function getConfigFile(): Config {
  try {
    const tsconfig = readFileSync('tsconfig.json', 'utf-8');
    const parsedConfig = parse(tsconfig);

    return {
      compilerOptions: {
        baseUrl: parsedConfig.baseUrl || '',
        paths: parsedConfig.paths || {},
      },
    };
  } catch {
    try {
      const jsconfig = readFileSync('jsconfig.json', 'utf-8');
      const parsedConfig = parse(jsconfig);

      return {
        compilerOptions: {
          baseUrl: parsedConfig.baseUrl || '',
          paths: parsedConfig.paths || {},
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
