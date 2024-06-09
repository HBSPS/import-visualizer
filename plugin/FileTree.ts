import { dirname } from 'path';
import { appendExtensions } from './appendExtensions';
import { getAbsolutePath } from './getAbsolutePath';
import { getAllFiles } from './getAllFiles';
import { getImportPathsInFile } from './getImportPathsInFile';
import { resolvePathAlias } from './resolvePathAlias';
import { splitFilePath } from './splitFilePath';
import { convertToRelativePath } from './convertToRelativePath';

import type { FileNode, absolutePath, configPath, relativePath } from './types';

export class FileTree {
  private root: relativePath;
  private baseUrl: relativePath;

  private paths: configPath;

  private allFiles: absolutePath[];
  private projectDir: absolutePath;

  public tree: FileNode;

  constructor(root: relativePath, targetDir: relativePath, baseUrl: relativePath, paths: configPath) {
    this.root = root;
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

  private createNode(fileName: string, filePath: relativePath): FileNode {
    return {
      name: fileName,
      attributes: {
        dir: filePath,
      },
      children: [],
    };
  }

  private generateTree(node: FileNode) {
    // @babel/parser can't parse css file.
    if (node.name.split('.').pop() === 'css') return;

    // If the node has dir attributes, filePath will be relativePath.
    // If the node does not dir attributes, filePath will be alsolutePath. (e.g. If the file is in the project root.)
    const filePath = `${node.attributes.dir || this.projectDir}/${node.name}`;

    const currentFileAbsolutePath = getAbsolutePath(filePath);
    const currentFileAbsoluteDir = dirname(currentFileAbsolutePath);

    // relativePaths or paths with alias
    const importsWithAlias = getImportPathsInFile(currentFileAbsolutePath);

    const resolvedAbsolutePath = resolvePathAlias(importsWithAlias, currentFileAbsoluteDir, this.baseUrl, this.paths);
    const importedFileAbsolutePaths = appendExtensions(resolvedAbsolutePath, this.allFiles);

    importedFileAbsolutePaths.forEach((importedFileAbsolutePath) => {
      if (importedFileAbsolutePath === undefined) return; // e.g. import npm libraries.

      const [newFileAbsolutePath, newFileName] = splitFilePath(importedFileAbsolutePath);
      const newFileRelativePath = convertToRelativePath(this.projectDir, newFileAbsolutePath);

      const newNode = this.createNode(newFileName, newFileRelativePath);
      node.children.push(newNode);
      this.generateTree(newNode);
    });
  }
}
