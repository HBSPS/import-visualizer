type relativePath = string;
type absolutePath = string;
type aliasPath = string;

interface FileNode {
  name: string;
  attributes: {
    dir: string;
  };
  children: FileNode[];
}

type cliArgType = '--root' | '--targetDir' | '--collapse';
interface CliOptions {
  root: string;
  targetDir: string;
  collapse: boolean;
}

type configPath = Record<string, string[]>;
interface Config {
  compilerOptions: {
    baseUrl: string;
    paths: configPath;
  };
}

export type { aliasPath, relativePath, absolutePath, FileNode, CliOptions, cliArgType, configPath, Config };
