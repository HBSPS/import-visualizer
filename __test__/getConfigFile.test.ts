import fs from 'fs';
import { getConfigFile } from '../plugin/getConfigFile';

describe('getConfigFile', () => {
  test('config with baseUrl and paths', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => '{ compilerOptions: { baseUrl: "./src", paths: { "@/page/*": ["page/*"] } } }');

    expect(getConfigFile()).toStrictEqual({
      compilerOptions: {
        baseUrl: './src',
        paths: {
          '@/page/*': ['page/*'],
        },
      },
    });
  });

  test('config with baseUrl', () => {
    jest.spyOn(fs, 'readFileSync').mockImplementationOnce(() => '{ compilerOptions: { baseUrl: "./src" } }');

    expect(getConfigFile()).toStrictEqual({
      compilerOptions: {
        baseUrl: './src',
        paths: {},
      },
    });
  });

  test('config without alias', () => {
    jest.spyOn(fs, 'readFileSync').mockImplementationOnce(() => '{ compilerOptions: {} }');

    expect(getConfigFile()).toStrictEqual({
      compilerOptions: {
        baseUrl: '',
        paths: {},
      },
    });
  });

  test('without config file', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => {
        throw new Error();
      })
      .mockImplementationOnce(() => {
        throw new Error();
      });

    expect(getConfigFile()).toStrictEqual({
      compilerOptions: {
        baseUrl: '',
        paths: {},
      },
    });
  });
});

describe('getConfigFile (JS)', () => {
  test('config with baseUrl and paths', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => {
        throw new Error();
      })
      .mockImplementationOnce(() => '{ compilerOptions: { baseUrl: "./src", paths: { "@/page/*": ["page/*"] } } }');

    expect(getConfigFile()).toStrictEqual({
      compilerOptions: {
        baseUrl: './src',
        paths: {
          '@/page/*': ['page/*'],
        },
      },
    });
  });

  test('config with baseUrl', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => {
        throw new Error();
      })
      .mockImplementationOnce(() => '{ compilerOptions: { baseUrl: "./src" } }');

    expect(getConfigFile()).toStrictEqual({
      compilerOptions: {
        baseUrl: './src',
        paths: {},
      },
    });
  });

  test('config without alias', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => {
        throw new Error();
      })
      .mockImplementationOnce(() => '{ compilerOptions: {} }');

    expect(getConfigFile()).toStrictEqual({
      compilerOptions: {
        baseUrl: '',
        paths: {},
      },
    });
  });

  test('without config file', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementationOnce(() => {
        throw new Error();
      })
      .mockImplementationOnce(() => {
        throw new Error();
      });

    expect(getConfigFile()).toStrictEqual({
      compilerOptions: {
        baseUrl: '',
        paths: {},
      },
    });
  });
});
