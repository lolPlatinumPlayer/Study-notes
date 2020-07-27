

### 综述
**Web Workers** 是js开多线程的方法  
在worker内，不能直接操作DOM节点，也不能使用window对象的默认方法和属性。  
可以用`console.log`

- 参考材料：
  - [阮一峰博客](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)  
    博客里还有以下内容没有摘抄：
    - 载入与主线程在同一个网页的代码（同页面的 Web Worker）
    - Worker 新建 Worker
    - ...

##### 有2种web worker

专用线程dedicated web worker，以及共享线程shared web worker  
专用线程用`Worker`构造函数创建，而共享线程用`SharedWorker`  
后文讨论的都是专用线程


### 创建 Web Worker 对象
`w=new Worker("某个js文件")`  
请求某个js文件，并在 **Worker线程** 执行其中代码。  
文件中可以执行`postMessage`函数 

### 关闭 Web Worker 线程

这个关闭应该只是关闭一次，并不是销毁worker实例（未测试）

- 主线程中  
  `(Web Worker 对象).terminate()`
- worker线程中  
  `worker最外层this.close()`


### 主线程与worker线程的通信
通信是传值的（这意味着：Worker线程上对传来内容的修改不会影响主线程上的该内容）


### worker中执行主线程的函数
主线程中`w.onmessage=一个函数(形参)`  
worker中用`postMessage(实参)`函数的执行就是执行赋值给`onmessage`的函数  
postMessage的实参会放进onmessage形参的`data`属性里  
*（这里`onmessage`估计用`addEventListener`、`removeEventListener`操作`'message'`也有同等效果）*

注意：

- 不能把`onmessage`的形参再传给`postMessage`
- 形参或者形参的后代不能是函数

### 主线程执行worker中函数

与上一条一样，就是反过来  
worker中不管是`onmessage`还是`postMessage`，都是直接用，而在主线程中是作为`Worker`实例的方法来调用的  

身。

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



