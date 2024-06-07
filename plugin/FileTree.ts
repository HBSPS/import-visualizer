import { appendExtensions } from './appendExtensions';
import { getAllFiles } from './getAllFiles';
import { configPath } from './getConfigFile';
import { getImportPathsInFile } from './getImportPathsInFile';
import { resolveImportPaths } from './resolveImportPaths';
import { splitFilePath } from './splitFilePath';

interface FileNode {
  name: string;
  attributes: {
    dir: string;
  };
  children: FileNode[];
}

export class FileTree {
  private root: string;
  private baseUrl: string;
  private paths: configPath;
  private allFiles: string[];

  public tree: FileNode;

  constructor(root: string, targetDir: string, baseUrl: string, paths: configPath) {
    this.root = root;
    this.baseUrl = baseUrl;
    this.paths = paths;
    this.allFiles = getAllFiles(targetDir);

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
    const filePath = `${node.attributes.dir}/${node.name}`;

    const imports = getImportPathsInFile(filePath);
    const resolvedPath = resolveImportPaths(imports, this.baseUrl, this.paths);
    const resolvedPathWithExtensions = appendExtensions(resolvedPath, this.allFiles);

    resolvedPathWithExtensions.forEach((path) => {
      if (path === undefined) return;

      const [newFilePath, newFileName] = splitFilePath(path);
      const newNode = this.createNode(newFileName, newFilePath);

      node.children.push(newNode);
      this.generateTree(newNode);
    });
  }
}
