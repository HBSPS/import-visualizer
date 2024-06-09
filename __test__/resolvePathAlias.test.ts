import { resolvePathAlias } from '../plugin/resolvePathAlias';

jest.spyOn(process, 'cwd').mockImplementation(() => 'C:/dir/testProject');

describe('resolvePathAlias', () => {
  test('relative paths', () => {
    const imports = [
      './TestFile1',
      '../TestFile2',
      './test/TestFile3',
      '../test/TestFile4',
      './TestFile1.ts',
      '../TestFile2.ts',
      './test/TestFile3.ts',
      '../test/TestFile4.ts',
    ];
    const currentFileAbsoluteDir = 'C:/dir/testProject/src';
    const baseUrl = '';
    const paths = {};

    const expectedResults = [
      'C:/dir/testProject/src/TestFile1',
      'C:/dir/testProject/TestFile2',
      'C:/dir/testProject/src/test/TestFile3',
      'C:/dir/testProject/test/TestFile4',
      'C:/dir/testProject/src/TestFile1.ts',
      'C:/dir/testProject/TestFile2.ts',
      'C:/dir/testProject/src/test/TestFile3.ts',
      'C:/dir/testProject/test/TestFile4.ts',
    ];

    expect(resolvePathAlias(imports, currentFileAbsoluteDir, baseUrl, paths)).toStrictEqual(expectedResults);
  });

  test('imports with baseUrl (without paths opeion)', () => {
    const imports = [
      'TestFile1',
      'TestFile2',
      'test/TestFile3',
      'test/TestFile4',
      'TestFile1.ts',
      'TestFile2.ts',
      'test/TestFile3.ts',
      'test/TestFile4.ts',
    ];
    const currentFileAbsoluteDir = 'C:/dir/testProject/src';
    const baseUrl = 'src';
    const paths = {};

    const expectedResults = [
      'C:/dir/testProject/src/TestFile1',
      'C:/dir/testProject/src/TestFile2',
      'C:/dir/testProject/src/test/TestFile3',
      'C:/dir/testProject/src/test/TestFile4',
      'C:/dir/testProject/src/TestFile1.ts',
      'C:/dir/testProject/src/TestFile2.ts',
      'C:/dir/testProject/src/test/TestFile3.ts',
      'C:/dir/testProject/src/test/TestFile4.ts',
    ];

    expect(resolvePathAlias(imports, currentFileAbsoluteDir, baseUrl, paths)).toStrictEqual(expectedResults);
  });

  test('imports with baseUrl and paths option', () => {
    const imports = [
      '@/TestFile1',
      '@/TestFile2',
      '@/test/TestFile3',
      '@/test/TestFile4',
      '@/TestFile1.ts',
      '@/TestFile2.ts',
      '@/test/TestFile3.ts',
      '@/test/TestFile4.ts',
      '@component/TestFile5',
      '@component/TestFile5.tsx',
    ];
    const currentFileAbsoluteDir = 'C:/dir/testProject/src';
    const baseUrl = 'src';
    const paths = {
      '@/*': ['*'],
      '@component/*': ['component/*'],
    };

    const expectedResults = [
      'C:/dir/testProject/src/TestFile1',
      'C:/dir/testProject/src/TestFile2',
      'C:/dir/testProject/src/test/TestFile3',
      'C:/dir/testProject/src/test/TestFile4',
      'C:/dir/testProject/src/TestFile1.ts',
      'C:/dir/testProject/src/TestFile2.ts',
      'C:/dir/testProject/src/test/TestFile3.ts',
      'C:/dir/testProject/src/test/TestFile4.ts',
      'C:/dir/testProject/src/component/TestFile5',
      'C:/dir/testProject/src/component/TestFile5.tsx',
    ];

    expect(resolvePathAlias(imports, currentFileAbsoluteDir, baseUrl, paths)).toStrictEqual(expectedResults);
  });
});
