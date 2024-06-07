import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default [
  {
    input: './bin/cli.ts',
    output: {
      format: 'es',
      dir: 'dist',
      preserveModules: true,
    },
    external: ['open', 'json5', '@babel/parser', '@babel/traverse', 'fs', 'path', 'fs/promises'],
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
      }),
      json(),
    ],
  },
];
