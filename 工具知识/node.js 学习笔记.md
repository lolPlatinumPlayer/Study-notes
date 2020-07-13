

### 建立服务

### `http.createServer(回调)`

req是前端发来的请求，res是对前端请求的响应

req.url可以获取到url
url模块的parse方法可以解析这个url为对象

post的接收看起来有点诡异，要分别监听data和end，高并发或者网络错误不会有问题吗



### 接收post3种格式

https://www.cnblogs.com/whybxy/p/8690246.html

### 返回内容

内容会插进html  
内容直接写json字符串前端就能收到json（未验证）

##### api

- `res.end(内容)`  
  返回内容
- `res.write(内容)`  
  增加要返回的内容

### 未归类

- `res.send`和`res.end`有着类似的功能（环境：有用express）





### 文件系统

**读取文件**

```javascript
const fs = require("fs");
const json内容=JSON.parse(fs.readFileSync("./package.json"))
```

- 同步读取文件用`fs`的`readFileSync`方法
- 读json的话，还要再用`JSON.parse`方法

