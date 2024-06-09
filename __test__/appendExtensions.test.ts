import { appendExtensions } from '../plugin/appendExtensions';

describe('appendExtensions', () => {
  test('append extension', () => {
    const resolvedPath = ['C:/dir/testProject/src/pages/test1', 'C:/dir/testProject/src/test2'];
    const allFiles = ['C:/dir/testProject/src/pages/test1.ts', 'C:/dir/testProject/src/test2.tsx'];

    expect(appendExtensions(resolvedPath, allFiles)).toStrictEqual([
      'C:/dir/testProject/src/pages/test1.ts',
      'C:/dir/testProject/src/test2.tsx',
    ]);
  });

  test('extension already exist', () => {
    const resolvedPath = ['C:/dir/testProject/src/pages/test1.ts', 'C:/dir/testProject/src/test2.tsx'];
    const allFiles = ['C:/dir/testProject/src/pages/test1.ts', 'C:/dir/testProject/src/test2.tsx'];

    expect(appendExtensions(resolvedPath, allFiles)).toStrictEqual([
      'C:/dir/testProject/src/pages/test1.ts',
      'C:/dir/testProject/src/test2.tsx',
    ]);
  });

  test('library import', () => {
    const resolvedPath = ['react', 'react-dom'];
    const allFiles = ['C:/dir/testProject/src/pages/test1.ts', 'C:/dir/testProject/src/test2.tsx'];

    expect(appendExtensions(resolvedPath, allFiles)).toStrictEqual([undefined, undefined]);
  });
});
