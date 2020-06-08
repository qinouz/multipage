# multipage

基于 vue-cli4.0 构建 多页面 模板脚手架!


### 启动项目

```bash

git clone https://github.com/qinouz/multipage.git

cd multipage

npm install

npm run dev
```

<span id="top">目录</span>

- √ Vue-cli4
- [√ 根据目录结构生成多页面配置](#page)
- [√ 配置多环境变量](#env)
- [√ rem 适配方案](#rem)
- [√ Vuex 状态管理](#vuex)
- [√ Vue-router](#router)
- [√ 配置 alias 别名](#alias)
- [√ 配置 proxy 跨域](#proxy)
- [√ 配置 打包分析](#bundle)

### <span id="page">✅ 生成多页面配置 </span>
`build/newUtils.js` 里的 `getEntry`方法 根据目录下的 所有html文件生成页面路径以及对应html的对象。<br/>
`var pages = utils.getEntry(['./src/module/**/*.html']);`<br/>

返回结果为：</br>
```javascript
{ 'aa/as/dd/fd/ddd': './src/module/aa/as/dd/fd/ddd/ddd.html',
   'aa/ddd': './src/module/aa/ddd/ddd.html',
   'ss': './src/module/ss/ss.html' 
 }
```
 
`getEntryPages` 方法 `var mpages = utils.getEntryPages(pages);` 生成最终多页面配置，目录结构需要按照一定规则，
文件夹名与主文件名以及模板html 文件名 必须要一致，层级结构不限制。
```html
  ├── module
  │   └── ss
  |   |   └── ss.html
  |   |   └── ss.js
```
返回结果为：</br>
```javascript
{ 'aa/as/dd/fd/ddd':{ entry: './src/module/aa/as/dd/fd/ddd/ddd.js',
     template: './src/module/aa/as/dd/fd/ddd/ddd.html' },
  'aa/ddd':{ entry: './src/module/aa/ddd/ddd.js',
     template: './src/module/aa/ddd/ddd.html' },
  ss:{ entry: './src/module/ss/ss.js',
     template: './src/module/ss/ss.html' } }
```
### <span id="env">✅ 配置多环境变量 </span>

`package.json` 里的 `scripts` 配置 `dev` `qa` `prd`，通过 `--mode xxx` 来执行不同环境

- 通过 `npm run dev` 启动本地 , 执行 `development`
- 通过 `npm run qa` 打包测试 , 执行 `staging`
- 通过 `npm run prd` 打包正式 , 执行 `production`

```javascript
"scripts": {
  "dev": "vue-cli-service serve --open",
  "stage": "vue-cli-service build --mode staging",
  "build": "vue-cli-service build",
}
```

##### 配置介绍

&emsp;&emsp;以 `VUE_APP_` 开头的变量，在代码中可以通过 `process.env.VUE_APP_` 访问。
&emsp;&emsp;比如,`VUE_APP_ENV = 'development'` 通过`process.env.VUE_APP_ENV` 访问。
&emsp;&emsp;除了 `VUE_APP_*` 变量之外，在你的应用代码中始终可用的还有两个特殊的变量`NODE_ENV` 和`BASE_URL`

在项目根目录中新建`.env.*`

- .env 本地开发环境配置

```bash
NODE_ENV = development
VUE_APP_SERVICE_URL =
BASE_URL = ./

```

- .env.qa 测试环境配置

```bash
NODE_ENV = production
VUE_APP_SERVICE_URL = http://www.baidu.com
BASE_URL = /shopsystem/static/weixin/dist/
```

- .env.prd 正式环境配置

```bash
 NODE_ENV = production
 VUE_APP_SERVICE_URL = http://www.baidu.com
 BASE_URL = /shopsystem/static/weixin/dist/
```

配置对应环境的变量，拿本地环境文件 `.env` 举例，用户可以根据需求修改

```bash
// 本地环境配置
NODE_ENV = development
VUE_APP_SERVICE_URL =
VUE_APP_TEST=test
BASE_URL = ./

```

根据环境不同，变量就会不同了

```javascript
// 根据环境不同引入不同baseApi地址
const instance = axios.create();
var path = process.env.VUE_APP_SERVICE_URL;
instance.defaults.baseURL = path;
```

[▲ 回顶部](#top)

### <span id="rem">✅ rem 适配方案 </span>

不用担心，项目已经配置好了 `rem` 适配, 下面仅做介绍：

Vant 中的样式默认使用`px`作为单位，如果需要使用`rem`单位，推荐使用以下两个工具:

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 `postcss` 插件，用于将单位转化为 `rem`
- [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 `rem` 基准值

##### PostCSS 配置

下面提供了一份基本的 `postcss` 配置，可以在此配置的基础上根据项目需求进行修改

```javascript
// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
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
}
```

[▲ 回顶部](#top)


#### 父组件改变子组件样式 深度选择器

当你子组件使用了 `scoped` 但在父组件又想修改子组件的样式可以 通过 `>>>` 来实现：

```css
<style scoped>
.a >>> .b { /* ... */ }
.a {
    /deep/ .b {
        ...
    }
}
</style>
```

[▲ 回顶部](#top)

### <span id="vuex">✅ Vuex 状态管理</span>

目录结构

```bash
├── store
│   ├── modules
│   │   └── app.js
│   ├── index.js
│   ├── getters.js
```

`main.js` 引入

```javascript
import Vue from 'vue'
import App from './App.vue'
import store from './store'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```

使用

```html
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters(['userName'])
    },

    methods: {
      // Action 通过 store.dispatch 方法触发
      doDispatch() {
        this.$store.dispatch('setUserName', '真乖，赶紧关注公众号，组织都在等你~')
      }
    }
  }
</script>
```

[▲ 回顶部](#top)

### <span id="router">✅ Vue-router </span>

本案例采用 `hash` 模式，开发者根据需求修改 `mode` `base`

**注意**：如果你使用了 `history` 模式，`vue.config.js` 中的 `publicPath` 要做对应的**修改**


```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const router = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/home/index'), // 路由懒加载
    meta: {
      title: '首页', // 页面标题
      keepAlive: false // keep-alive 标识
    }
  }
]
const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置 vue.config.js publicPath
    // base: '/app/',
    scrollBehavior: () => ({y: 0}),
    routes: router
  })

export default createRouter()
```

更多:[Vue Router](https://router.vuejs.org/zh/)



[▲ 回顶部](#top)

### <span id="alias">✅ 配置 alias 别名 </span>

```javascript
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
  }
}
```

[▲ 回顶部](#top)

### <span id="proxy">✅ 配置 proxy 跨域 </span>

如果你的项目需要跨域设置，你需要打来 `vue.config.js` `proxy` 注释 并且配置相应参数

```javascript
module.exports = {
  devServer: {
    // ....
    proxy: {
      //配置跨域
      '/api': {
        target: 'https://test.xxx.com', // 接口的域名
        // ws: true, // 是否启用websockets
        changOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
```

[▲ 回顶部](#top)


### <span id="bundle">✅ 配置 打包分析 </span>

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  chainWebpack: config => {
    // 打包分析
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
  }
}
```
