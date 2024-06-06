import { resolve } from 'node:path';
import { appendExtensions } from './appendExtensions.js';
import { getAllFiles } from './getAllFiles.js';
import { getImportPaths } from './getImportPaths.js';
import { resolveImportPaths } from './resolveImportPaths.js';

export class FileTree {
  constructor(root, targetDir, baseUrl, paths) {
    this.root = root;
    this.baseUrl = baseUrl;
    this.paths = paths;
    this.allFiles = getAllFiles(targetDir);

    this.tree = {};
    this.init();
  }

  init() {
    const [rootFilePath, rootFileName] = this.splitFilePath(this.root);
    this.tree = this.createNode(rootFileName, rootFilePath);
    this.generateTree(this.tree);
  }

  createNode(fileName, filePath) {
    return {
      name: fileName,
      attributes: {
        dir: filePath,
      },
      children: [],
    };
  }

  generateTree(node) {
    const filePath = `${node.attributes.dir}/${node.name}`;
    const imports = getImportPaths(filePath);
    const resolvedPath = resolveImportPaths(imports, this.baseUrl, this.paths);
    const resolvedPathWithExtensions = appendExtensions(resolvedPath, this.allFiles);

    resolvedPathWithExtensions.forEach((path) => {
      if (path === undefined) return;

      const [newFilePath, newFileName] = this.splitFilePath(path);
      const newNode = this.createNode(newFileName, newFilePath);
      node.children.push(newNode);
      this.generateTree(newNode);
    });
  }

  splitFilePath(filePath) {
    const splitPath = filePath.split('/');
    const fileName = splitPath.pop();
    const path = splitPath.join('/');

    return [path, fileName];
  }
}
