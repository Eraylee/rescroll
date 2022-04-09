import { defineConfig } from 'dumi';

export default defineConfig({
  locales: [['zh-CN', '中文']],
  title: 'rescroll',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  extraBabelPresets: [
    [
      '@umijs/deps/compiled/babel/preset-react',
      { runtime: 'automatic', importSource: '@emotion/react' },
    ],
  ],
  extraBabelPlugins: ['@emotion/babel-plugin'],
  themeConfig: {
    carrier: 'dumi', // 设备状态栏左侧的文本内容
    hd: {
      // 禁用高清方案
      rules: [],
      // 更多 rule 配置访问 https://github.com/umijs/dumi/blob/master/packages/theme-mobile/src/typings/config.d.ts#L7
    },
  },
  esbuild: {},
});
