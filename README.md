![NPM Version](https://img.shields.io/npm/v/import-visualizer?style=flat&color=blue)
![NPM Downloads](https://img.shields.io/npm/dm/import-visualizer?style=flat&color=brightgreen)

# import-visualizer

You can visualize the import information of js, ts, and react projects in a tree structure.

It can be used even if the baseUrl and paths options are set in jsconfig.json or tsconfig.json of the project.

Because the goal is to represent the hierarchy for imports from the project root file, duplicate files are intended.

## Example

![Example](https://raw.githubusercontent.com/HBSPS/import-visualizer/main/screenshots/exmaple2.png)

## Installation

```sh
npm i --save-dev import-visualizer
```

Add the script to package.json.

```json
"scripts": {
  "import-visualizer": "import-visualizer --root src/index.ts --targetDir src",
}
```

You can run visualizer as follows.

```sh
npm run import-visualizer
```

To use the library without installation, enter the command as follows.

```sh
npx import-visualizer --root <rootFilePath> --targetDir <dir> --collapse
```

## Options

`--root <filePath>` (default `src/App.tsx`) - Path to the file that will be the root of the tree.

`--targetDir <dir>` (default `src`) - Directory path to be included in the tree. If you want to include the entire project file, set it to `.`

`--collapse` - Collapse the tree and render it

## Generation Mechanism

```sh
        +---------------------------+
        |                           |
+------->       generateTree        | { name: 'App.tsx', attributes: { dir: 'src' }, children: [] }
|       |                           |
|       +-------------+-------------+
|                     |
|                     |
|       +-------------v-------------+ [
|       |                           |   'react',
|       |   getImportPathsInFile    |   '.TestComponent1',
|       |                           |   '@testDir/TestComponent2'
|       +-------------+-------------+ ]
|                     |
|                     |
|       +-------------v-------------+ [
|       |                           |   'react',
|       |     resolvePathAlias      |   'C:/(dir)/<project>/src/TestComponent1',
|       |                           |   'C:/(dir)/<project>/src/testDir/TestComponent2'
|       +-------------+-------------+ ]
|                     |
|                     |
|       +-------------v-------------+ [
|       |                           |   undefined,
|       |     appendExtensions      |   'C:/(dir)/<project>/src/TestComponent1.tsx',
|       |                           |   'C:/(dir)/<project>/src/test/TestComponent2.tsx'
|       +-------------+-------------+ ]
|                     |
|                     |
|       +-------------v-------------+
|       |                           | { name: 'TestComponent1.tsx', attributes: { dir: 'src' }, children: [] }
+-------+        createNode         | { name: 'TestComponent2.tsx', attributes: { dir: 'src/test' }, childrend: [] }
        |                           |
        +---------------------------+
```
