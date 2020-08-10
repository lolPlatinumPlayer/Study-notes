# 待学习

- 确认requestListener的req和res的文档
- 接收请求
  - node接收各种请求
  - express接收各种请求





# node

学习版本：10.16.3（工作电脑）、10.22.0（其他电脑）

第10版在2018-04-24有了第一个commit  
而12版在2019-04-23有了第一个commit



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







### `http.createServer`

功能：创建服务器  
代码：`http.createServer([options][, requestListener])`  
<span style='opacity:.5'>这个方法目前只用过`requestListener`</span>

**`requestListener`**

这是一个回调，会在收到请求后被调用<span style='opacity:.5'>（[nodejs.cn](http://nodejs.cn/api/http.html#http_http_createserver_options_requestlistener)里的说法是：`requestListener`会被自动添加到 [`'request'`](http://nodejs.cn/s/2qCn57) 事件）</span>  

- 执行时机  
  服务器接收到请求后就会执行  
  （要注意这个请求是包含页面自动请求的图标的，所以开启指向服务的页面时这个回调至少会被执行2次）

有2个参数：`req`和`res`



<span style='opacity:.5'>这2个参数没有找到详细说明资料，下面是一些自己收集的内容</span>  

1. 从官方api例子里研究这2个参数  
   结果：`req`应该对应文档里的“request”，而`res`应该对应文档里的“response”
2. 继续研究“请求处理”





- `req`  
  可以通过这个参数获取到接收的请求的信息

  - url模块的`parse`方法可以解析这个`req.url`为`Url`实例
    - `Url`实例包含请求的一些信息  
      【】  
      其中`query`属性是请求的参数

- `res`  
  有很多响应请求的方法  
  方法如下：
  
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
  
  非方法成员如下：
  
  - `res.socket.remoteAddress`
  - `res.socket.remotePort`



### `Server`实例

可以由`http.createServer`返回

**`listen`方法**
详见[官网](https://nodejs.org/docs/latest-v10.x/api/net.html#net_server_listen)  
作用：为连接启动一个服务器监听  
有几种传参，目前用过的是`server.listen([port[, host]][, callback])`  

- `port`   
  端口号
- `host`  
  - 可以省略  
    省略的话以`127.`开头的ipv4地址都会被监听（`127.0.0.0`不会）  
    和[官网](https://nodejs.org/docs/latest-v10.x/api/net.html#net_server_listen_port_host_backlog_callback)说的监听`0.0.0.0`的说法不一致，`0.0.0.0`这时候是无法访问的
  - 官方例子用`hostname`作变量名，不过个人测试中感觉就是ip地址。  
    而且ipv4的话必须以`127.`开头，原因未知（`127.0.0.0`地址不行，ipv6未测试）
  
  （上面提到`127.0.0.0`的情况并没有发现这个ip被占用。判断没被占用的依据是`netstat -ano`DOS命令）
- `callback`  
  应该是监听成功的时候会调用（也就是说`listen`方法成功执行后这个回调只会被调用一次）







### 返回内容

【】内容会插进html  
内容直接写json字符串前端就能收到json（未验证）

**api**

- `res.end(内容)`  
  返回内容
- `res.write(内容)`  
  增加要返回的内容



### 文件系统

**读取文件**

```javascript
const fs = require("fs");
const json内容=JSON.parse(fs.readFileSync("./package.json"))
```

- 同步读取文件用`fs`的`readFileSync`方法
- 读json的话，还要再用`JSON.parse`方法





### 模块

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





# express





### 接收post3种格式

https://www.cnblogs.com/whybxy/p/8690246.html







# 未归类

- post的接收看起来有点诡异，要分别监听data和end，【】高并发或者网络错误不会有问题吗
- node升级版本  
  不同操作系统的方案是不同的  
  - windows下的方案  
    先看这个博文：https://blog.csdn.net/weixin_43254676/article/details/95469937  
    不行的话再搜索