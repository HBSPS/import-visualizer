import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';

export default [
  {
    input: './bin/cli.ts',
    output: {
      format: 'esm',
      file: `./dist/bin/cli.js`,
      name: 'import-visualizer',
      exports: 'named',
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
      }),
      json(),
      resolve(),
      commonjs({
        include: 'node_modules/**',
      }),
      terser(),
    ],
  },
  {
    input: './bin/cli.ts',
    output: [{ file: './dist/bin/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
