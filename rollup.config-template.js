import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';

export default [
  {
    input: './src/App.jsx',
    output: {
      format: 'iife',
      file: './lib/tree.js',
      name: 'tree',
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom/client': 'ReactDOM',
        'react-d3-tree': 'Tree',
      },
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env', '@babel/preset-react'],
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs({
        include: 'node_modules/**',
      }),
      terser(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
    ],
  },
];
