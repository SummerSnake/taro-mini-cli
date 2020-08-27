const path = require('path');

console.warn('\u001b[38;5;6m დღ♡❣❤❥❦❧♥ 写代码前敬请阅读 README.md \u001b[0m');
console.log('');

const config = {
  projectName: 'taro-mini-cli',
  date: '2020-04-17',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  alias: {
    '@/src': path.resolve(__dirname, '..', 'src'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
  },
  copy: {
    patterns: [
      // 指定需要 copy 的文件
      {
        from: 'src/pages/basicLayout/components/Home/move.wxs',
        to: 'dist/pages/basicLayout/components/Home/move.wxs',
      },
    ],
  },
  babel: {
    sourceMap: true,
    presets: [
      [
        'env',
        {
          modules: false,
        },
      ],
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      [
        'transform-runtime',
        {
          helpers: false,
          polyfill: false,
          regenerator: true,
          moduleName: 'babel-runtime',
        },
      ],
    ],
  },
  defineConstants: {},
  mini: {
    imageUrlLoaderOption: {
      limit: 10240, // 默认值，可以按需调小
    },
    // 可视化打包分析
    // webpackChain(chain) {
    //   chain.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, []);
    // },
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 10240, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  // 可以删掉很多小配置
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

module.exports = function (merge) {
  return merge({}, config, require(`./${process.env.ENV}`));
};
