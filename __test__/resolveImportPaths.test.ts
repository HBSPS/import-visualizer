import { resolveImportPaths } from '../plugin/resolveImportPaths';

describe('resolveImportPaths', () => {
  test('resolve imports with baseUrl and paths (relative)', () => {
    expect(
      resolveImportPaths(['@/page/test', '@/test2'], './src', {
        '@/*': ['*'],
        '@/page': ['page/*'],
      })
    ).toStrictEqual(['src/page/test', 'src/test2']);
  });

  test('resolve imports with baseUrl and paths', () => {
    expect(
      resolveImportPaths(['@/page/test', '@/test2'], 'src', {
        '@/*': ['*'],
        '@/page': ['page/*'],
      })
    ).toStrictEqual(['src/page/test', 'src/test2']);
  });

  test('resolve imports with baseUrl and paths (other)', () => {
    expect(
      resolveImportPaths(['#page/test', '#/test2'], 'src', {
        '#/*': ['*'],
        '#page': ['page/*'],
      })
    ).toStrictEqual(['src/page/test', 'src/test2']);
  });

  test('resolve imports with baseUrl (relative baseUrl)', () => {
    expect(resolveImportPaths(['page/test', 'test2'], './src', {})).toStrictEqual(['src/page/test', 'src/test2']);
  });

  test('resolve imports with baseUrl', () => {
    expect(resolveImportPaths(['page/test', 'test2'], 'src', {})).toStrictEqual(['src/page/test', 'src/test2']);
  });

  test('resolve imports without any config', () => {
    expect(resolveImportPaths(['./src/page/test', './src/test2'], '', {})).toStrictEqual(['src/page/test', 'src/test2']);
  });
});
