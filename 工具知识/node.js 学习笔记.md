# 学习进度

搜索接口怎么分

### 建立服务

### `http.createServer(回调)`

req是前端发来的请求，res是对前端请求的响应

req.url可以获取到url
url模块的parse方法可以解析这个url为对象

post的接收看起来有点诡异，要分别监听data和end，高并发或者网络错误不会有问题吗

### 返回内容

内容会插进html  
内容直接写json字符串前端就能收到json（未验证）

##### api

- `res.end(内容)`  
  返回内容
- `res.write(内容)`  
  增加要返回的内容