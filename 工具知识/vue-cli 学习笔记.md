

> 一、二版的包名是vue-cli，三、四版的是@vue/cli —— [官网](https://cli.vuejs.org/zh/guide/installation.html)

第三版+第四版的文档地址：https://cli.vuejs.org/zh/guide/



`vue -V`或`vue --version`查看cli版本



笔记本上全局装的是第四版



**升级**

> 如果装了1、2版，那要把之前装的版本卸载掉，然后再装3或4 —— [官网](https://cli.vuejs.org/zh/guide/installation.html)

[官网](https://cli.vuejs.org/zh/guide/installation.html#%E5%8D%87%E7%BA%A7)同样说了可以用`npm update -g @vue/cli`升级全局包，不过这指的应该是版本号不低于3的cli进行升级的方案

[升级项目依赖看这个链接](https://cli.vuejs.org/zh/guide/installation.html#%E9%A1%B9%E7%9B%AE%E4%BE%9D%E8%B5%96)



# 第四版

全局安装命令是：`npm install -g @vue/cli`

- [用命令行初始化项目](https://cli.vuejs.org/zh/guide/creating-a-project.html#%E6%8B%89%E5%8F%96-2-x-%E6%A8%A1%E6%9D%BF-%E6%97%A7%E7%89%88%E6%9C%AC)  
  `vue init`  
  - 默认没有这个命令  
    默认运行会提示：`Command vue init requires a global addon to be installed`  
    `npm install -g @vue/cli-init`后可以运行这个命令



### `vue ui`

第三版应该也有这个命令[ElementUI插件](https://github.com/ElementUI/vue-cli-plugin-element)里有提到

> 可以通过 `vue ui` 通过一套图形化界面管理你的所有项目 —— [官网](https://cli.vuejs.org/zh/guide/)

有一些简易功能

- 可以用来新建项目  
  可以图形化地控制选项  
- 可以配置依赖项  
  可能通过 `vue ui`下载依赖后会自动配置（有这个想法的依据是：一次下载less后，没有在vue.config.js里做配置也可以在单文件组件里使用，当然，有做一些其他所需的操作）
- 可以保存配置方便下次建项目时使用
- 可以运行npm script
- 可以分析项目  
  在优化体积时可以用上



特性

- 项目名取的是`package.json`里的



注意

- 创建的项目名是不能包含大写字母的  
  （输入的大写字母会自动转为小写字母）



### px转rem

- [一个接近可行的文章](https://www.cnblogs.com/yifeng555/p/12734032.html)  
  下面是需要修改的点
  - 安装postcss-pxtorem要安装第五版的  
    命令是`npm i postcss-pxtorem@5.1.1`  
    [这个文章](https://blog.csdn.net/k912120/article/details/114678251)里有说为什么
  - 没用autoprefixer的话相关代码去掉



注意

- pxtorem和px2rem是2个东西  
  感觉pxtorem更好  
  [这个文章](https://www.cnblogs.com/zhurong/p/14011857.html)里有进行对比



- [flexible](https://github.com/amfe/lib-flexible)（amfe-flexible或lib-flexible）  
  主要功能是在`html`标签上增加font-size  
  是做移动端的  
  几个版本都没几行代码



之前试了几个方法都不行，下面列出部分不行的文章

- [装lib-flexible和px2rem-loader](https://www.jianshu.com/p/79be33f2ce88)




### `--mode`

这里说说`vue-cli-service build`和`vue-cli-service build --mode xxx`的默认区别



**通过观察得到的结论**

- xxx的webpack配置的mode选项默认都是development  
  不过可以通过在`.env.模式名`文件里写`NODE_ENV='production'`来改为production
- xxx的js只有一个  
  而build的有4个：app.js、vendors.js及各自的map文件
- xxx没有css文件
- 默认`process.env.NODE_ENV`  
  （在`.env.模式名`文件里写`NODE_ENV=任意字符串`可以修改`process.env.NODE_ENV`）
  - xxx为test时`process.env.NODE_ENV`是`'test'`  
    这可能说明了test命令用的就是[模式](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)里的test模式
  - xxx为其他时`process.env.NODE_ENV`是`'development'`
- xxx的总体积比build稍小  
  但是build去掉map文件的话就比xxx小很多



**相关资料**

百度不到相关资料（2021.6.25）  
[模式文档](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)里并没有说这2者的区别  
不过提到了`test`模式和`production`模式，但是也没有讲这2个模式的区别  
webpack4里并没有test模式  



### 其他

- 打包依赖的文件名  
  例子：`chunk-vendors.2325ac3d.js`  
  - 背后的随机数是依据依赖确定的  
    如果依赖没变那随机数也不会变  
    （依赖变了随机数就会变）



##### 问题记录

- 使用ts+cz时无法打包  

  - 报错如下  

    ```cmd
    Syntax Error: Thread Loader (Worker 某个数字)
    Cannot read property 'length' of undefined
    ```

  - 解决方法  
    将配置的[`parallel`](https://cli.vuejs.org/zh/config/#parallel)设为false

  - 问题分析  

    - 将`parallel`设为false的作用应该是关掉[thread-loader](https://v4.webpack.js.org/loaders/thread-loader/#root)
    - webpack4本身没有`parallel`这个配置  
      不过[HtmlMinimizerWebpackPlugin](https://webpack.js.org/plugins/html-minimizer-webpack-plugin/#parallel)、[CssMinimizerWebpackPlugin](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/#parallel)、[TerserWebpackPlugin](https://webpack.js.org/plugins/terser-webpack-plugin/#parallel)里都有这个配置，而且作用都是“Use multi-process parallel running to improve the build speed”，这和[thread-loader](https://v4.webpack.js.org/loaders/thread-loader/#root)的作用是差不多的

    综上所述，估计是[thread-loader](https://v4.webpack.js.org/loaders/thread-loader/#root)出现了一个未知的问题导致无法打包

- （该问题无法复现）使用绝对路径引用文件结果报错“无法在node_modules里找到指定依赖”  
  <span style='opacity:.5'>（原因未知）</span>  
  在整理大屏项目模板时发现了这个情况（不仅是ts报错，js里也报错）  
  结果后面先解决其他问题，解决之后这个问题也消失了  
  - 后面试过还原以下内容，都没把问题复现出来
    - 去掉`shims-vue.d.ts`中的`declare module '@/auth'`
    - 在SFC的style标签里引用不存在的背景图
    - 还原有问题的`.babelrc`和`babel.config.js`





# 第三版


vue-cli含有模板：https://github.com/vuejs-templates



### 特性

- 未被使用的（css）class引用的图片也会被打包

- 打包后的`chunk-vendors.js`文件  

  > 这个文件打包了所有有`import`的`node_modules`里的内容 —— 郑涛
  
- > vue.config.js里的东西有修改的话需要重启，其他不用——锦侨







### 配置

`vue.config.js`的配置
地址为：[官方的配置文档](https://cli.vuejs.org/zh/config)  
里边内容是按照配置项来分的，比如`devServer`配置项的地址就是https://cli.vuejs.org/zh/config/#devserver

- `devServer`配置项  
  应该就是[webpack的`devServer`配置项](https://v4.webpack.js.org/configuration/dev-server/)  
  包括`devServer.proxy`

注意：

- 是否给文件名增加随机字符串  
  不加的话会导致使用同名图片时产生问题，因为多个同名图片只会有一个存在  
  不加并不会导致source map出现问题，不论在同名vue文件还是js文件里打断点，出现位置都是正确的  
  控制是否增加随机字符串的配置项是[filenameHashing](https://cli.vuejs.org/zh/config/#filenamehashing)
  
- [代理](https://cli.vuejs.org/zh/config/#devserver-proxy)
  
  > 使用[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#proxycontext-config)实现了代理 —— [官网](https://cli.vuejs.org/zh/config/#devserver-proxy)
  
  代理需要在配置和请求2个地方共同操作，才能实现代理
  
  - 代理全部内容的配置  
  
    - 最简写法  
  
      ```js
      devServer: {
        proxy:请求发往的地址,
      }
      ```
  
    - 如果要加其他配置的话这样写  
  
      ```js
      devServer: {
        proxy:{
          '/':{
            target: 请求发往的地址,
          }
        },
      }
      ```
  
      - [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#context-matching)说的`'**'`并不好使
  
  - 代理部分接口的配置  
  
    ```js
    proxy: {
      "/请求中包含的路径": { // 这个地址出现在请求任意位置都可以
        target: `${baseUrl}`, // 
        /* pathRewrite: { 这部分没意义
           "^/bigdata": "/bigdata",
        }, */
      },
    },
    ```
  
    - 最终请求地址  
      最终请求地址=`target`+`/请求中包含的路径`+其他内容
    - 配为接口地址的开头，而不是`请求中包含的路径`  
      方法：把`"/请求中包含的路径"`改为`"^/请求开头的路径"`
    - 注意：配`请求中包含的路径`时不要有重合  
      - 例子  
        比如说有2个地址：`'/a'`和`'/b/a'`  
        一次经验是`'/b/a'`会按`'/a'`里的来
    - 注释起来的部分没意义  
      就算"/请求中包含的路径"不是请求的开头  
      放开注释之后也可以正常运作
  
  - 需要走代理的请求的写法  
    只要是通往本地地址就会走代理（本地地址具体来说就是前端项目启起来的地址）  
    如果没有特殊情况，直接用相对路径即可完成代理  
    <span style='opacity:.5'>（axios走相对路径的方法：`baseURL`设为`'./'`或者空串或者不设）</span>
  
  - 提醒：走本地地址并不代表被代理  
    要启起来代理服务，并且走本地地址，这样才算代理
  



### 命令

- 开发项目  
  [`vue-cli-service serve`](https://cli.vuejs.org/zh/guide/cli-service.html#vue-cli-service-serve)  
  进一步介绍看上面的链接
  - 在手机上调试应用  
    方法：手机浏览器访问PC端ip  
    特性：有热更新，而且不用刷新手机页面
- 打包项目  
  [`vue-cli-service build`](https://cli.vuejs.org/zh/guide/cli-service.html#vue-cli-service-build)



经验

- 命令进行中可以取消掉重新使用  
  这样能解决部分问题  
  比如这个命令：`vue init webpack-simple foo`
  
  



### webpack

- [调整webpack配置](https://cli.vuejs.org/zh/guide/webpack.html)  
  方法如下：

  - 给`configureWebpack`赋值对象  
    确实可以调整，不过容易出错（目前没有符合预期地运行过）  

  - 给`configureWebpack`赋值函数

    - 改变config形参  
      这个形参代表的就是最终的配置

      ```js
      var HtmlWebpackPlugin = require('html-webpack-plugin');
      
      module.exports = {
          configureWebpack:  config => {
              config.plugins.forEach((val) => {
                  if (val instanceof HtmlWebpackPlugin) {
                      val.options.title='aaaa' // 修改语句
                  }
              })
          }
      }
      ```
  
  - [链式修改](https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7)
  
- 查看最终使用的webpack配置  

  - 使用[`vue-cli-service inspect`](https://cli.vuejs.org/zh/guide/cli-service.html#vue-cli-service-inspect)命令  
    （这个命令要通过package.json里才能执行）  
    直接执行这个命令可以在终端输出webpack配置  
    该命令的其他操作详见[官网](https://cli.vuejs.org/zh/guide/webpack.html#%E4%BF%AE%E6%94%B9%E6%8F%92%E4%BB%B6%E9%80%89%E9%A1%B9)（比如将配置直接存在js里的方法）

    - `vue inspect`  

      > `vue inspect`和`vue-cli-service inspect`是相等的 —— [官网](https://cli.vuejs.org/zh/guide/webpack.html#%E4%BF%AE%E6%94%B9%E6%8F%92%E4%BB%B6%E9%80%89%E9%A1%B9)

      不过这个`vue inspect`可以直接在终端使用
  
    - 执行这2个命令会输出vue.config.js里打印的东西
    
  - 打印configureWebpack函数里的形参  
    （不推荐）  
    默认情况下深层级的内容不可见  
    也没找到使用node调试的方法
  
    



### 综合性操作



##### process.env

在代码里都能获取到，但并没有挂在`window`下

`process.env`默认有2个属性：`NODE_ENV`和`BASE_URL`（[cli文档的环境变量部分](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)提到了这点）

- 如果使用了未定义的环境变量  
  有可能导致编译出问题  
  但是不会报错（终端和浏览器都不会报错）





##### 不同命令不同process.env.NODE_ENV的方法

**关于该方法的描述**

- 官方说明的地址是：[环境变量和模式](https://cli.vuejs.org/zh/guide/mode-and-env.html)

- 这种方法除了可以设置`NODE_ENV`以外还可以设置其他“环境变量”（不知道是不是叫“环境变量”）

- 给人感觉就是设置`process.env`的值  
  用代码表达就是如下效果：  

  ```js
  process.env={
    ...process.env,
    ...你文本文件里生成的对象,
  }
  ```

  



**方法**

1. 在项目最外层新建一个名为`.env.模式名`的文本文件
2. 在文本文件里加上如下文本：  
   `NODE_ENV=想要的NODE_ENV值`（`想要的NODE_ENV值`不需要加引号）
3. 在`vue-cli-service serve xxx`或者`vue-cli-service build xxx`命令后加上` --mode 模式名`
4. 执行命令

vue-cli实现这个方法的技术应该是[dotenv](https://github.com/motdotla/dotenv)（[官网](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)有提到）



**该方法的特性**

- 增加“环境变量”的方法和`NODE_ENV`的一致  
- 不过用`vue-cli-service serve xxx`命令时“环境变量”名必须以`VUE_APP_`开头（这里说的“环境变量”不包括`NODE_ENV`，`NODE_ENV`是可以写在名为`.env.模式名`的文本文件里的）  
  不然不生效
- 用`vue-cli-service build xxx`命令时“环境变量”名不需要以`VUE_APP_`开头  
  不过用这种方法打出来的包会比不用该方法大的包体积更大，而且html代码没有被压缩  
  【】原因未知
- 遇到文件内同名的情况，后面的会覆盖前面的



##### 给打包后的文件加上可读的名称的办法

- **背景**
  使用vue-router的话打包后的文件应该会按路由进行区分  
  而我们可以给这些文件加上特定的名称

- **方法**

  在定义路由时加上如下注释  

  ```js
  {
    path: '/demo',
    name: 'demo',
    meta: {title: 'title'},
    component: () => import(
      /* webpackChunkName: "你要的名称" */
      '@/view/example/demo/dvIndex.vue'
    )
  },
  ```

  

##### 查看使用的webpack的版本

在package.json里看不到，要到node_modules里看  
应该是第四版的webpack



# 第二版

之前个人PC上装的是第二版



