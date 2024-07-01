import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import type { FileNode } from './types';

export const __dirname = dirname(fileURLToPath(import.meta.url));

const template = (data: string, collapse: boolean) => {
  const script = readFileSync(resolve(__dirname, '../lib/tree.js'));

  return `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Import-Visualizer</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script>const data = ${data}</script>
  <script>const collapse = ${collapse}</script>
  <script>${script}</script>
</html>
`;
};

export function generateTemplate(data: FileNode, collapse: boolean) {
  writeFileSync(resolve(__dirname, '../index.html'), template(JSON.stringify(data), collapse));
}
