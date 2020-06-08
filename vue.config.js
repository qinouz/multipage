/*
* 主配置文件
*
 */
const utils = require('./build/newUtils');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

// var pages = utils.getEntry(['./src/module/*.html', './src/module/*/*.html', './src/module/*/*/*.html']);
var pages = utils.getEntry(['./src/module/**/*.html']);
var mpages = utils.getEntryPages(pages);
console.log("process.env.BASE_URL", process.env.BASE_URL,);
console.log("process.env.NODE_ENV", process.env.NODE_ENV,);
console.log("process.env.VUE_APP_SERVICE_URL", process.env.VUE_APP_SERVICE_URL,);
console.log("多页面路径-------------utils.getEntry")
console.log(pages)
console.log("多页面路径-------------utils.getEntryPages")
console.log(mpages);
const cssExtract = undefined;

module.exports = {
  publicPath: process.env.BASE_URL,

  pages: Object.assign(mpages, {
    index: './src/main.js'    // 配置主入口文件（会生成 app.html，vue cli3并没有提供直接配置入口文件的选项）
  }),
  css: {
    //vue 文件中修改css 不生效 注释掉  extract:true
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5, // 换算的基数
            selectorBlackList: [], // 忽略转换正则匹配项
            propList: ['*'],
          }),
        ]
      }
    }
  },
  chainWebpack: config => {
    /**
     * 覆盖 Webpack 配置
     */
    const isProd = process.env.NODE_ENV === 'production';
    const extract = cssExtract || isProd;
    const shadowMode = !!process.env.VUE_CLI_CSS_SHADOW_MODE;
    const shouldExtract = extract !== false && !shadowMode;
    if (shouldExtract) {
      [
        {lang: 'css', test: /\.css$/},
        {lang: 'postcss', test: /\.p(ost)?css$/},
        {lang: 'scss', test: /\.scss$/},
        {lang: 'sass', test: /\.sass$/},
        {lang: 'less', test: /\.less$/},
        {lang: 'stylus', test: /\.styl(us)?$/},
      ].forEach(({lang, test}) => {
        const baseRule = config.module.rule(lang).test(test);
        [
          // rules for <style lang="module">
          baseRule.oneOf('vue-modules').resourceQuery(/module/),
          // rules for <style>
          baseRule.oneOf('vue').resourceQuery(/\?vue/),
          // rules for *.module.* files
          baseRule.oneOf('normal-modules').test(/\.module\.\w+$/),
          // rules for normal CSS imports
          baseRule.oneOf('normal'),
        ].forEach(rule => {
          rule.use('extract-css-loader')
            .loader(require('mini-css-extract-plugin').loader)
            .options({
              hmr: !isProd,
            });
        });
      });
    }
    // 常用alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    config.performance
      .set('hints', false)

  },

  configureWebpack: {

    plugins: []
  },
  pluginOptions:
    {}
  ,
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/': {
        target: 'http://www.baidu.com', //shopsystem
        logLevel: 'debug',  // 日志等级，默认可以不配置用于调试时打印一些代理信息
        // pathRewrite: {"^/api": ''},
        changeOrigin:
          true,
        ws:
          true,
      },
    }
  }

}
;
