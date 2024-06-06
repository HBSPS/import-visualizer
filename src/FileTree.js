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
    this.tree = this.createNode(this.root);
    this.generateTree(this.tree);
  }

  createNode(filePath) {
    return {
      name: filePath,
      attributes: '',
      children: [],
    };
  }

  generateTree(node) {
    const imports = getImportPaths(node.name);
    const resolvedPath = resolveImportPaths(imports, this.baseUrl, this.paths);
    const resolvedPathWithExtensions = appendExtensions(resolvedPath, this.allFiles);

    resolvedPathWithExtensions.forEach((path) => {
      if (path === undefined) return;

      const newNode = this.createNode(path);
      node.children.push(newNode);
      this.generateTree(newNode);
    });
  }
}
