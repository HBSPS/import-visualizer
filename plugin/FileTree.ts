import { appendExtensions } from './appendExtensions';
import { getAllFiles } from './getAllFiles';
import { configPath } from './getConfigFile';
import { getImportPaths } from './getImportPaths';
import { resolveImportPaths } from './resolveImportPaths';

interface FileNode {
  name: string;
  attributes: {
    dir: string;
  };
  children: FileNode[];
}

export class FileTree {
  root: string;
  baseUrl: string;
  paths: configPath;
  allFiles: string[];

  tree: FileNode;

  constructor(root: string, targetDir: string, baseUrl: string, paths: configPath) {
    this.root = root;
    this.baseUrl = baseUrl;
    this.paths = paths;
    this.allFiles = getAllFiles(targetDir);

    this.tree = { name: '', attributes: { dir: '' }, children: [] };
    this.init();
  }

  init() {
    const [rootFilePath, rootFileName] = this.splitFilePath(this.root);
    this.tree = this.createNode(rootFileName, rootFilePath);
    this.generateTree(this.tree);
  }

  createNode(fileName: string, filePath: string): FileNode {
    return {
      name: fileName,
      attributes: {
        dir: filePath,
      },
      children: [],
    };
  }

  generateTree(node: FileNode) {
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

  splitFilePath(filePath: string) {
    const splitPath = filePath.split('/');
    const fileName = splitPath.pop() as string;
    const path = splitPath.join('/');

    return [path, fileName];
  }
}
