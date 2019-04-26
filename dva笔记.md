## 综述
dva很多东西是直接从三个库（redux、redux-saga、react-router）里引入的，有相关用法直接查这三个库就行  
本笔记里没有记录的内容可以上[官方教程](https://dvajs.com/guide/)找


## `dva()`的传参
见[这里](https://dvajs.com/api/#dva-api)（挺简单的）


## 不正常的样式问题
- **原因**：源自dva依赖的 **roadhog** ，roadhog默认开启 **css module** ,css module极大地改变了样式编写方式，就有了这个问题
- **解决办法**：在webpack的配置文件中加入一行`"disableCSSModules": true,`，没有这个文件的话在.roadhogrc里加应该也可以  
