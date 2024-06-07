import { readFileSync } from 'fs';
import { ParserOptions, parse } from '@babel/parser';
import traverse from '@babel/traverse';

interface ImportDeclarationNode {
  source: {
    value: string;
  };
}

export function getImportPathsInFile(filePath: string) {
  const fileContent = readFileSync(filePath, 'utf8');

  const babelOptions = {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  } as ParserOptions;

  const ast = parse(fileContent, babelOptions);

  const importPaths: string[] = [];

  traverse(ast, {
    ImportDeclaration({ node }: { node: ImportDeclarationNode }) {
      importPaths.push(node.source.value);
    },
  });

  return importPaths;
}
