## 综述
dva很多东西是直接从三个库（redux、redux-saga、react-router）里引入的，有相关用法直接查这三个库就行  
本笔记里没有记录的内容可以上[官方教程](https://dvajs.com/guide/)找


## `dva()`的传参
完整内容见[官方教程](https://dvajs.com/api/#dva-api)（内容不多）
- **默认state**  
  ```
  const app = dva({
    initialState:{
      model的名字:{
        // 各个state
      }
    }
  })
  ```


## 不正常的样式问题
- **原因**：源自dva依赖的 **roadhog** ，roadhog默认开启 **css module** ,css module极大地改变了样式编写方式，就有了这个问题
- **解决办法**：在webpack的配置文件中加入一行`"disableCSSModules": true,`，没有这个文件的话在.roadhogrc里加应该也可以  


## 与redux不同部分
- 传给`dispatch`的对象的type属性为字符串：model的名字+'/'+reducer的名字  
- reducer是作为方法存放在model的`reducers`属性里（而不是像redux一样用switch来判断传入的type值，然后再则执行哪个reducer或者说哪段代码）
