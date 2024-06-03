import fs from 'node:fs';
import parser from '@babel/parser';
import _traverse from '@babel/traverse';
const traverse = _traverse.default;

export function getImportPaths(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const babelOptions = {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  };

  const ast = parser.parse(fileContent, babelOptions);

  const importPaths = [];

  traverse(ast, {
    ImportDeclaration({ node }) {
      importPaths.push(node.source.value);
    },
  });

  return importPaths;
}
