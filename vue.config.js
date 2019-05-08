const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  echarts: 'echarts',
  'tinymce/tinymce': 'tinyMCE',
  xlsx: 'XLSX',
  'element-ui': 'ELEMENT'
};
// CDN外链，会插入到index.html中
const cdn = {
  css: [],
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
    'https://cdn.bootcss.com/echarts/4.1.0/echarts.min.js',
    'https://cdn.bootcss.com/tinymce/5.0.4/tinymce.min.js',
    'https://cdn.bootcss.com/tinymce/5.0.4/themes/silver/theme.min.js',
    'https://cdn.bootcss.com/tinymce/5.0.4/plugins/image/plugin.min.js',
    'https://cdn.bootcss.com/tinymce/5.0.4/plugins/link/plugin.min.js',
    'https://cdn.bootcss.com/tinymce/5.0.4/plugins/code/plugin.min.js',
    'https://cdn.bootcss.com/tinymce/5.0.4/plugins/noneditable/plugin.min.js',
    'https://cdn.bootcss.com/tinymce/5.0.4/plugins/lists/plugin.min.js',
    'https://cdn.bootcss.com/tinymce/5.0.4/plugins/contextmenu/plugin.min.js',
    'https://cdn.bootcss.com/tinymce/5.0.4/plugins/colorpicker/plugin.min.js',
    'https://cdn.bootcss.com/tinymce/5.0.4/plugins/textcolor/plugin.min.js',
    'https://cdn.bootcss.com/xlsx/0.14.0/xlsx.full.min.js',
    'https://cdn.bootcss.com/element-ui/2.6.1/index.js'
  ]
};

function _resolve (dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        _resolve('src/styles/mixins.scss'),
        _resolve('src/styles/element-variables.scss')
      ]
    }
  },
  css: {},
  configureWebpack: config => {
    const productionPlugins = [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          sourceMap: false,
          parallel: true,
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    ];
    //
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...productionPlugins];
      //
      // splitChunks
      //
      // config.optimization = {
      //   splitChunks: {
      //     chunks: 'all'
      //   }
      // };
    }
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': _resolve('src')
      }
    };
    if (process.env.NODE_ENV === 'production') {
      config.externals = externals;
    }
  },
  chainWebpack: config => {
    /**
     * 删除懒加载模块的prefetch，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
     */
    config.plugins.delete('prefetch');
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn;
        return args;
      });
    }
  }
};
