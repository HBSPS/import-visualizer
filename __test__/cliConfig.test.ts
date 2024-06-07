import { cliConfig } from '../plugin/cliConfig';

describe('cliConfig', () => {
  test('config with --root and --targetDir', () => {
    expect(cliConfig(['--root', 'src/App1.tsx', '--targetDir', 'src1'])).toStrictEqual({
      root: 'src/App1.tsx',
      targetDir: 'src1',
    });
  });
  test('config with --root', () => {
    expect(cliConfig(['--root', 'src/App1.tsx'])).toStrictEqual({ root: 'src/App1.tsx', targetDir: 'src' });
  });
  test('config with --targetDir', () => {
    expect(cliConfig(['--targetDir', 'src1'])).toStrictEqual({ root: 'src/App.tsx', targetDir: 'src1' });
  });
  test('config without args', () => {
    expect(cliConfig([])).toStrictEqual({ root: 'src/App.tsx', targetDir: 'src' });
  });
});
