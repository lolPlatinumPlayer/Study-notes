# 待学习

- 接收请求
  - node接收各种请求
- 后端路由
- （端口转发）
- 直接搞项目
- 数据库







# node

学习版本：10.16.3（工作电脑）、10.22.0（老婆电脑）、6.11.2卸载后安装了10.22.0（私人电脑）

> 10、12、14版分别起始与18年、19年、20年的4月，服务终止于21年、22年、23年的4月30日 —— [node官网](https://nodejs.org/zh-cn/about/releases/)

> 你可以使用 [n](https://github.com/tj/n)，[nvm](https://github.com/creationix/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows) 在同一台电脑中管理多个 Node 版本 —— [vue-cli](https://cli.vuejs.org/zh/guide/installation.html)

### 入门

```js
const http = require('http');

const hostname = '127.0.0.1'; // 这个可以改成任意以'127.'开头的ip（必须以127开头的原因未知）
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```





### 编写响应http请求的代码

（也就是建立http服务器）

最基本要做的2件事如下（要按顺序做）

1. 创建`http.Server`实例

2. 启动TCP服务器并监听连接



##### 创建`http.Server`实例

调用`http`模块的`createServer`方法即可创建并返回`http.Server`实例

`http.createServer([options][, requestListener])`  
<span style='opacity:.5'>这个方法目前只用过`requestListener`</span>

- `requestListener`

  这是一个回调，会被添加到（`http.Server`实例的）[request事件](https://nodejs.org/docs/latest-v10.x/api/http.html#http_event_request)（也就是会在收到请求后被调用）  
  <span style='opacity:.5'>（要注意这个请求是包含页面自动请求的图标的，所以开启指向服务的页面时这个回调至少会被执行2次）</span>

  - 参数

    （[request事件的文档](https://nodejs.org/docs/latest-v10.x/api/http.html#http_event_request)里写了）
  
    有2个，大家都命名为`request`（`req`）和`response`（`res`），分别是[`http.IncomingMessage`](https://nodejs.org/docs/latest-v10.x/api/http.html#http_class_http_incomingmessage)和[`http.ServerResponse`](https://nodejs.org/docs/latest-v10.x/api/http.html#http_class_http_serverresponse)的实例
    
    > `request`提供请求的详细信息。通过它，我们访问请求头和请求数据。
    > `response` 用于填充我们要返回给客户端的数据。
    > —— [一个忘记来由的网站](https://nodejs.dev/learn/build-an-http-server)
    
    [智能社教程](https://study.163.com/course/courseLearn.htm?courseId=1003664007#/learn/video?lessonId=1004194111&courseId=1003664007)称这2个参数为：请求和响应





##### 启动TCP服务器并监听连接

使用的是`Server`实例的`listen`方法  
详见[官网](https://nodejs.org/docs/latest-v10.x/api/net.html#net_server_listen)  
有几种传参，目前用过的是`server.listen([port[, host]][, callback])`<span style='opacity:.5'>（这种传参的描述在[这里](https://nodejs.org/docs/latest-v10.x/api/net.html#net_server_listen_port_host_backlog_callback)）</span>  

- `port`   
  端口号

- `host`  
  暂未查到该参数具体是什么

  - 可以省略  
    省略的话以`127.`开头的ipv4地址都会被监听（`127.0.0.0`不会）  
    和[官网](https://nodejs.org/docs/latest-v10.x/api/net.html#net_server_listen_port_host_backlog_callback)说的监听`0.0.0.0`的说法不一致，`0.0.0.0`这时候是无法访问的
  - 官方例子用`hostname`作变量名，不过个人测试中感觉就是ip地址。  
    而且ipv4的话必须以`127.`开头，原因未知（`127.0.0.0`地址不行，ipv6未测试）

  （上面提到`127.0.0.0`的情况并没有发现这个ip被占用。判断没被占用的依据是`netstat -ano`DOS命令）

- `callback`  
  应该是监听成功的时候会调用  
  <span style='opacity:.5'>（也就是说`listen`方法成功执行后这个回调只会被调用一次）</span>





##### 获取请求中的内容

`req`  【】搞req、res以及那几个示例，过到了这里
可以通过这个参数获取到接收的请求的信息  

- `req.url`  
  一个字符串  
应该只是[百度百科“URL格式”词条](https://baike.baidu.com/item/URL%E6%A0%BC%E5%BC%8F/10056474?fr=aladdin)里说的“路径”（而不是百科里说的“URL”的全部内容）
  
  - [智能社教程](https://study.163.com/course/courseLearn.htm?courseId=1003664007#/learn/video?lessonId=1004194111&courseId=1003664007)里直接访问这个属性就ok了（16年10月31日）  
  教程说这是一个绝对路径，演示时`req.url`就是URL中的路径（端口号后面的所有内容）
  
  - node有提供方法来将url字符串解析为对象  
  目前应该有2套方案来实现解析，其中`url`模块的`parse`方法会在未来被废弃
  
    - WHATWG API  
    还未深入研究，详细文档有：
  
      1. http://caibaojian.com/nodejs/s/kqg3Ut.html#url_url_strings_and_url_objects
      2. [WHATWG官网](https://url.spec.whatwg.org/)
  
      还可以研究下w3c背后控制人是谁
  
    - `url`模块的`parse`方法  
      部分详细内容可以看这个文档：[parse方法](https://nodejs.org/docs/latest-v10.x/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost)
      
    - `querystring`模块可以解析get请求`?`后的内容







##### 响应请求

（这里记的内容都是`http.createServer`的回调里的`res`参数）



###### 响应请求的方法

响应内容直接写json字符串前端就能收到json（未验证）

- 增加要响应的内容  
  `res.write(响应内容)`  

- 响应内容  
  `res.end(响应内容)`  
  
  > `res.end(响应内容)` 是`res.write(响应内容);res.end();`的简写 —— [MiloPeng教程“http模块”篇](https://www.imooc.com/video/20560)

  （可能响应完了就结束了对前端关于这个请求的所有操作）

- 设置头部  
  下面是一个设置跨域头部的例子  

  ```js
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  ```

  

- `res.writeHead(200, { 'Content-Type': 'text/plain' })`

- `res.end('okay')`  
  可以不传参数

- `res.send`和`res.end`有着类似的功能（环境：有用express）



非方法成员

- `res.socket.remoteAddress`
- `res.socket.remotePort`



### 发起请求

（这部分内容整理自官方文档并辅以查阅博客后的理解，并没有实操过）

`http.request(options,callback)`方法发起请求并返回[`http.ClientRequest`](https://nodejs.org/docs/latest-v10.x/api/http.html#http_class_http_clientrequest)实例

> callback将添加到（[`http.ClientRequest`](https://nodejs.org/docs/latest-v10.x/api/http.html#http_class_http_clientrequest)实例的）[response事件](https://nodejs.org/docs/latest-v10.x/api/http.html#http_event_response)的一次性监听器 —— [官网](https://nodejs.org/docs/latest-v10.x/api/http.html#http_http_request_url_options_callback)

> [`http.ClientRequest`](https://nodejs.org/docs/latest-v10.x/api/http.html#http_class_http_clientrequest)实例的[response事件](https://nodejs.org/docs/latest-v10.x/api/http.html#http_event_response)将会传递一个参数，这个参数就是[`http.IncomingMessage`实例](https://nodejs.org/docs/latest-v10.x/api/http.html#http_class_http_incomingmessage) —— [官网](https://nodejs.org/docs/latest-v10.x/api/http.html#http_class_http_incomingmessage)

- 关于“`http.IncomingMessage`实例”在『response事件』和『request事件』中的不同  
  在『response事件』中代表http响应而在『request事件』中代表http请求  
  在『response事件』中一般被命名为`response`



【】令人好奇的是：怎么`http.IncomingMessage`实例既可以代表“响应”又可以代表“请求”，而且除了`http.IncomingMessage`实例外，好像没有别的东西可以表示“请求”了



### 文件系统

**读取文件**

```javascript
const fs = require("fs");
const json内容=JSON.parse(fs.readFileSync("./package.json"))
```

- 同步读取文件用`fs`的`readFileSync`方法
- 读json的话，还要再用`JSON.parse`方法





### 模块



##### CommonJS 

> 在 Node.js 模块系统中，每个文件都被视为一个独立的模块 —— [nodejs.cn](http://nodejs.cn/api/modules.html)

一些未做的测试：

- `export`与`module.exports`是否能一起使用
- `export`与`module.exports`是否能导出原始类型值
- 打印`export`导出的内容，查看有什么结果

**导出**

- `exports`方式  
  执行一次`export`会往导出模块的根部添加一次内容

  ```js
  const { PI } = Math;
  exports.area = (r) => PI * r ** 2;
  exports.circumference = (r) => 2 * PI * r;
  ```

- `module.exports`方式  
  一个模块只有一个唯一值  

  ```js
  module.exports = class Square {
    constructor(width) {
      this.width = width;
    }
    area() {
      return this.width ** 2;
    }
  };
  ```

**引入**（或叫：加载）

`require(地址)`  
同级目录的地址写法是：`./文件名`

**其他**

- 判断一个文件是否被直接运行  
  通过这个表达式就可以判断：`require.main === module`  
  - `require.main`应该就是『主模块』  
    直接被运行的文件就是主模块
  - `module`应该就是当前模块 







**1.创建个hello.js文件代码如下**

```js
exports.world = function() {  
    console.log('Hello World');
}
```

**2.创建文件test.js引入（或叫加载）模块 hello.js**

```js
var hello = require('./hello');
hello.world();
```

`require(‘./hello’) `引入了当前目录下的` hello.js `文件（`./` 为当前目录，`node.js 默认后缀为 js`）





##### es6模块

应该是支持的，`mjs`后缀名的文件应该就是node es6模块专用的

目前只粗略看了[这篇博文](https://www.jianshu.com/p/fa54a2e6e168)以及[阮一峰文章](http://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html)







### 调试

不能同时使用webstorm调试与chrome调试

**[webstorm调试](其它工具 学习笔记.md##### node相关)**

进↑这个链接查看

**chrome调试**

用如下命令启动js文件  
`node --inspect js文件地址`

2种进入调试页面的方式

- 这时候新开的页面按F12后都会看到这样一个node图标![node图标](../图片/node图标.png)  
  点开就到调试页面了
- 或者在[chrome://inspect](chrome://inspect)页面，点“Open dedicated DevTools for Node”链接

<span style='opacity:.5'>（官网说要在[chrome://inspect](chrome://inspect)页面配置一些url之类的东西，但是实践来看是不需要的，甚至全都删了也可以）</span>

（还有更多调试操作没有探索）  

- 可以参考[慕课教程](https://www.imooc.com/learn/1093)



### 更新与卸载

要更新只能卸了重装

**卸载**

- 会连着npm一起卸载  
  但是全局npm包会留着，并且装了新版node后是可用的  
  不过可能有点问题？  
  （下面这2个例子都是官方不再支持的）
  - 比如『vue-cli 2』初始化项目初始化半天都没一个文件出来
  - 比如『create-react-app 1.5.2』可以初始化项目，但是报错“有的依赖没装”，并且package.json里没有`script`





# express



### 设置头部

用node的`res.setHeader`设置头部是无效的，要用下面的方法设置

```js
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
```



### 拦截

以下2种方式目前没发现区别

1. `app.use(callback)`
2. `app.all('*',callback)`

**`callback`**

形参

| 序号 | 通用形参命名 | 描述                               |
| ---- | ------------ | ---------------------------------- |
| 0    | req          | 请求                               |
| 1    | res          | 应该是响应                         |
| 2    | next         | 调用这个函数来进行后续对请求的响应 |

**请求参数**

和`router.post(path,callback)`回调里的请求不同，拦截里请求的参数是异步生成的  
直接获取会是`undefined`，放`setTimeout(callback,0)`里就可以获取到





### 接收post3种格式

https://www.cnblogs.com/whybxy/p/8690246.html

**请求的参数**

存放于`req.body`内





# 热更新

### 使用`nodemon`包

郑涛给的无锡项目模拟服务器代码里有用

- 运行服务  
  `nodemon main.js`
- 带调试功能地运行  
  `nodemon --inspect main.js`

bug

- webstorm终端带调试地运行后没有用命令行结束就关闭webstorm  
  会导致node程序无法关闭  
  （后期也会因为端口占用而无法再次开启）
  - 解决方式  
    打开`package.json`，用里面的“小三角”运行  
    （运行一次后就会被添加到右上角的列表里，以后在列表里就可以直接运行了）
  - 当时出现bug的一些情况：  
    处于webstorm第二个终端窗口  
    这个窗口的地址是二级的  
    使用二级地址里的`package.json`里的`scripts`运行



# 未归类

- post的接收看起来有点诡异，要分别监听data和end，【】高并发或者网络错误不会有问题吗
- node升级版本  
  不同操作系统的方案是不同的  
  - windows下的方案  
    先看这个博文：https://blog.csdn.net/weixin_43254676/article/details/95469937  
    不行的话再搜索
  
- > express的`res.send`可以响应各种格式的数据，而`res.json`只能响应json格式数据 —— 林先
