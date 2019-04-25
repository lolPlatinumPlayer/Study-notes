## dva()
见[这里](https://dvajs.com/api/#dva-api)（挺简单的）


## 不正常的样式问题
- **原因**：源自dva依赖的 **roadhog** ，roadhog默认开启 **css module** ,css module极大地改变了样式编写方式，就有了这个问题
- **解决办法**：在webpack的配置文件中加入一行`"disableCSSModules": true,`，没有这个文件的话在.roadhogrc里加应该也可以  
