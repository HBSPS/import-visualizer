import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = dirname(fileURLToPath(import.meta.url))

const template = (data: string) => {
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
  <script>${script}</script>
</html>
`;
};

export function generateTemplate(data: any) {
  writeFileSync(resolve(__dirname, '../index.html'), template(JSON.stringify(data)));
}
