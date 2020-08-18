

### 综述
**Web Workers** 是js开多线程的方法  

- 参考材料：
  - [阮一峰博客](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)  
    博客里还有以下内容没有摘抄：
    - 载入与主线程在同一个网页的代码（同页面的 Web Worker）
    - Worker 新建 Worker
    - ...

##### 限制

在worker内，不能直接操作DOM节点，也不能使用window对象的默认方法和属性。  
可以用`console.log`  
更多Web Worker的限制看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker)

##### 有2种web worker

专用线程dedicated web worker，以及共享线程shared web worker  
专用线程用`Worker`构造函数创建，而共享线程用`SharedWorker`  
后文讨论的都是专用线程


### 创建 Web Worker 对象
`w=new Worker("某个js文件")`  
请求某个js文件，并在 **Worker线程** 执行其中代码。  
文件中可以执行`postMessage`函数 

### 关闭 Web Worker 线程

关闭并不是销毁worker实例

worker用完要手动关闭  
暂定习惯是：主线程`onmessage`事件内第一行进行关闭

【】单实例多次开启线程、关闭线程的操作还未详细实践过。『`onmessage`事件内代码能不能改变worker内其他变量』未测试

- 主线程中  
  `(Web Worker 对象).terminate()`
- worker线程中  
  `worker最外层this.close()`

### 主线程与worker线程的通信

**特性描述：**

- 通信是传值的（这意味着：Worker线程上对传来内容的修改不会影响主线程上的该内容）

- `Worker`实例与worker文件内都有`postMessage`方法与`onmessage`事件句柄  
  <span style='opacity:.5'>（“事件句柄”这个词引用自[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker#%E4%BA%8B%E4%BB%B6%E5%8F%A5%E6%9F%84)）</span>    
  （事件句柄的意思是：如果要对这个事件进行监听的话，那就要对句柄赋值监听函数）  
  主线程或worker线程向对方发送消息都是用`postMessage`方法  
  调用`postMessage`方法就会触发对方线程的`onmessage`事件  
  `onmessage`监听函数形参的`data`属性就是`postMessage`方法的第一个实参

**操作指导：**

主线程的`postMessage`方法与`onmessage`事件句柄存在于`Worker`实例上  
worker线程的存在于worker文件的`postMessage`、`onmessage`全局变量上  
*（这里`onmessage`估计用`addEventListener`、`removeEventListener`操作`'message'`也有同等效果）*

**注意：**

- 不能把`onmessage`的形参再传给`postMessage`
- 形参或者形参的后代不能是函数

### Worker 加载脚本

Worker 内部如果要加载其他脚本，有一个专门的方法`importScripts()`。

 ```javascript
importScripts('script1.js');
 ```

该方法可以同时加载多个脚本。

 ```javascript
importScripts('script1.js', 'script2.js');
 ```

### 2.4 错误处理

主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的`error`事件。

```javascript
worker.onerror(function (event) {
  console.log([
    'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
  ].join(''));
});

// 或者
worker.addEventListener('error', function (event) {
  // ...
});
```

Worker 内部也可以监听`error`事件。



### 未归类



