# 待学习

- 接收请求
  - node接收各种请求
  - express接收各种请求
- 调试  
  （目前webstorm打断点、写debugger都不好使）  
  学的时候先看：https://nodejs.org/zh-cn/docs/guides/debugging-getting-started/





# node

学习版本：10.16.3



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







### 创建服务器

更多内容详见：[Node.js中文网](http://nodejs.cn/api/http.html#http_http_createserver_options_requestlistener)

`http.createServer([options][, requestListener])`  
<span style='opacity:.5'>这个方法一般只用`requestListener`就行了</span>  
`requestListener`是一个回调，会在收到请求后被调用<span style='opacity:.5'>（[Node.js中文网](http://nodejs.cn/api/http.html#http_http_createserver_options_requestlistener)里的说法是：`requestListener`会被自动添加到 [`'request'`](http://nodejs.cn/s/2qCn57) 事件）</span>  
`requestListener`有2个参数：`req`和`res`  
`req`是前端发来的请求，`res`是对前端请求的响应  【】继续研究“请求处理”

- `req`  
  - url模块的`parse`方法可以解析这个`req.url`为`Url`实例  
    `Url`实例包含请求的一些信息，详见http://nodejs.cn/api/url.html  
    其中`query`属性是请求的参数
- `res.send`和`res.end`有着类似的功能（环境：有用express）











### 返回内容

【】内容会插进html  
内容直接写json字符串前端就能收到json（未验证）

##### api

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

> 在 Node.js 模块系统中，每个文件都被视为一个独立的模块 —— [Node.js中文网](http://nodejs.cn/api/modules.html)

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





# express





### 接收post3种格式

https://www.cnblogs.com/whybxy/p/8690246.html







# 未归类

- post的接收看起来有点诡异，要分别监听data和end，【】高并发或者网络错误不会有问题吗