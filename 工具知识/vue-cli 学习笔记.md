第三版+第四版的文档地址：https://cli.vuejs.org/zh/guide/



笔记本上全局装的是第四版



# 第四版

全局安装命令是：`npm install -g @vue/cli`











# 第三版


vue-cli含有模板：https://github.com/vuejs-templates



### 特性

- 未被使用的（css）class引用的图片也会被打包

- 打包后的`chunk-vendors.js`文件  

  > 这个文件打包了所有有`import`的`node_modules`里的内容 —— 郑涛







### 配置

`vue.config.js`的配置
地址为：[官方的配置文档](https://cli.vuejs.org/zh/config)  
里边内容是按照配置项来分的，比如`devServer`配置项的地址就是https://cli.vuejs.org/zh/config/#devserver

- 是否给文件名增加随机字符串  
  不加的话会导致使用同名图片时产生问题，因为多个同名图片只会有一个存在  
  不加并不会导致source map出现问题，不论在同名vue文件还是js文件里打断点，出现位置都是正确的  
  控制是否增加随机字符串的配置项是[filenameHashing](https://cli.vuejs.org/zh/config/#filenamehashing)



### 命令

- 命令进行中可以取消掉重新使用  
  这样能解决部分问题  
  比如这个命令：`vue init webpack-simple foo`
- 编译完成自动打开页面  
  在命令中加入` --open`即可达到该效果  
  （完整命令如：`vue-cli-service serve --open`）



### 综合性操作



##### 不同命令不同process.env.NODE_ENV的方法

官方说明的地址是：[环境变量和模式](https://cli.vuejs.org/zh/guide/mode-and-env.html)

1. 在项目最外层新建一个名为`.env.模式名`的文本文件
2. 在文本文件里加上如下文本：  
   `NODE_ENV=想要的NODE_ENV值`（`想要的NODE_ENV值`不需要加引号）
3. 运行`vue-cli-service serve --mode 模式名`就可以用指定的`process.env.NODE_ENV`了  
   打包时也用指定`process.env.NODE_ENV`的命令是`vue-cli-service build --mode 模式名`

除了`NODE_ENV`以外还可有其他“环境变量”（不知道是不是叫“环境变量”）

增加这些“环境变量”的方法和`NODE_ENV`的一致，不过“环境变量”名必须以`VUE_APP_`开头，不然不生效



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

  

