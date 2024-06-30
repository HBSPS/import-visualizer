import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import type { FileNode } from './types';

export const __dirname = dirname(fileURLToPath(import.meta.url));

const template = (data: string) => {
  const script = readFileSync(resolve(__dirname, '../lib/tree.js'));

  return `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Import-Visualizer</title>
    <style>
      .node__root > g > .rd3t-label__title {
        font-size: 25px;
      }

      .node__branch > g > .rd3t-label__title {
        font-size: 25px;
      }

      .node__leaf > g > .rd3t-label__title {
        font-size: 25px;
      }

      .node__root > g > .rd3t-label__attributes {
        font-size: 20px;
      }

      .node__branch > g > .rd3t-label__attributes {
        font-size: 20px;
      }

      .node__leaf > g > .rd3t-label__attributes {
        font-size: 20px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script>const data = ${data}</script>
  <script>${script}</script>
</html>
`;
};

export function generateTemplate(data: FileNode) {
  writeFileSync(resolve(__dirname, '../index.html'), template(JSON.stringify(data)));
}
