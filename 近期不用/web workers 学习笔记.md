

## 综述
**Web Workers** 是js开多线程的方法  
在worker内，不能直接操作DOM节点，也不能使用window对象的默认方法和属性。  


## 创建 Web Worker 对象
`w=new Worker("某个js文件")`  
请求某个js文件，并在 **Worker线程** 执行其中代码。  
文件中可以执行`postMessage`函数 


## 关闭 Web Worker 线程
- 主线程中  
  `(Web Worker 对象).terminate()`
- worker线程中  
  `worker最外层this.close()`


## 主线程与worker线程的通信
通信是传值的（这意味着：Worker线程上对传来内容的修改不会影响主线程上的该内容）


## worker中执行主线程的函数
主线程中`w.onmessage=一个函数(形参)`  
worker中用`postMessage(实参的data属性)`函数的执行就是执行赋值给`onmessage`的函数  
