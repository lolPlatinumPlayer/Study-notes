

## 综述
**Web Workers** 是js开多线程的方法  
在worker内，不能直接操作DOM节点，也不能使用window对象的默认方法和属性。  
可以用`console.log`


## 创建 Web Worker 对象
`w=new Worker("某个js文件")`  
请求某个js文件，并在 **Worker线程** 执行其中代码。  
文件中可以执行`postMessage`函数 

## 关闭 Web Worker 线程

这个关闭应该只是关闭一次，并不是销毁worker实例（未测试）

- 主线程中  
  `(Web Worker 对象).terminate()`
- worker线程中  
  `worker最外层this.close()`


## 主线程与worker线程的通信
通信是传值的（这意味着：Worker线程上对传来内容的修改不会影响主线程上的该内容）


## worker中执行主线程的函数
主线程中`w.onmessage=一个函数(形参)`  
worker中用`postMessage(实参)`函数的执行就是执行赋值给`onmessage`的函数  
postMessage的实参会放进onmessage形参的`data`属性里  
*（这里`onmessage`估计用`addEventListener`、`removeEventListener`操作`'message'`也有同等效果）*

注意：

- 不能把`onmessage`的形参再传给`postMessage`
- 形参或者形参的后代不能是函数

## 主线程执行worker中函数

与上一条一样，就是反过来  
worker中不管是`onmessage`还是`postMessage`，都是直接用，而在主线程中是作为`Worker`实例的方法来调用的  