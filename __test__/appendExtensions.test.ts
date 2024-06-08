import { appendExtensions } from '../plugin/appendExtensions';

describe('appendExtensions', () => {
  test('append extension', () => {
    const resolvedPath = ['src/pages/test1', 'src/test2'];
    const allFiles = ['src/pages/test1.ts', 'src/test2.tsx'];

    expect(appendExtensions(resolvedPath, allFiles)).toStrictEqual(['src/pages/test1.ts', 'src/test2.tsx']);
  });

  test('extension already exist', () => {
    const resolvedPath = ['src/pages/test1.ts', 'src/test2.tsx'];
    const allFiles = ['src/pages/test1.ts', 'src/test2.tsx'];

    expect(appendExtensions(resolvedPath, allFiles)).toStrictEqual(['src/pages/test1.ts', 'src/test2.tsx']);
  });

  test('library import', () => {
    const resolvedPath = ['react', 'react-dom'];
    const allFiles = ['src/pages/test1.ts', 'src/test2.tsx'];

    expect(appendExtensions(resolvedPath, allFiles)).toStrictEqual([undefined, undefined]);
  });
});
