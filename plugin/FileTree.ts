import { dirname } from 'path';
import { appendExtensions } from './appendExtensions';
import { getAbsolutePath } from './getAbsolutePath';
import { getAllFiles } from './getAllFiles';
import { configPath } from './getConfigFile';
import { getImportPathsInFile } from './getImportPathsInFile';
import { resolvePathAlias } from './resolvePathAlias';
import { splitFilePath } from './splitFilePath';
import { convertToRelativePath } from './convertToRelativePath';

interface FileNode {
  name: string;
  attributes: {
    dir: string;
  };
  children: FileNode[];
}

export class FileTree {
  private root: string;
  private targetDir: string;
  private baseUrl: string;
  private paths: configPath;
  private allFiles: string[];
  private projectDir: string;

  public tree: FileNode;

  constructor(root: string, targetDir: string, baseUrl: string, paths: configPath) {
    this.root = root;
    this.targetDir = targetDir;
    this.baseUrl = baseUrl;
    this.paths = paths;
    this.allFiles = getAllFiles(targetDir);
    this.projectDir = process.cwd().replace(/\\/g, '/');

    this.tree = { name: '', attributes: { dir: '' }, children: [] };
    this.init();
  }

  private init() {
    const [rootFilePath, rootFileName] = splitFilePath(this.root);
    this.tree = this.createNode(rootFileName, rootFilePath);
    this.generateTree(this.tree);
  }

  private createNode(fileName: string, filePath: string): FileNode {
    return {
      name: fileName,
      attributes: {
        dir: filePath,
      },
      children: [],
    };
  }

  private generateTree(node: FileNode) {
    if (node.name.split('.').pop() === 'css') return;

    const filePath = `${node.attributes.dir || this.projectDir}/${node.name}`;
    const currentFileAbsolutePath = getAbsolutePath(filePath);
    const currentFileAbsoluteDir = dirname(currentFileAbsolutePath);

    const imports = getImportPathsInFile(currentFileAbsolutePath);

    const resolvedPath = resolvePathAlias(imports, currentFileAbsoluteDir, this.baseUrl, this.paths);
    const resolvedPathWithExtensions = appendExtensions(resolvedPath, this.allFiles);

    resolvedPathWithExtensions.forEach((path) => {
      if (path === undefined) return;

      const [newFilePath, newFileName] = splitFilePath(path);
      const newNode = this.createNode(newFileName, convertToRelativePath(this.projectDir, newFilePath));

      node.children.push(newNode);
      this.generateTree(newNode);
    });
  }
}
