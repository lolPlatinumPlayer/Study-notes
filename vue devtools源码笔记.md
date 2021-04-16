



### yarn run dev

目录在shell-dev

##### 给vue devtools调试的代码



代码结构

- packages\shell-dev\index.html  
  - packages\app-backend\src\hook.js
  - packages\shell-dev\target\index.js  
    这文件主要是用来在window对象上增加事件系统的



代码流程

- 上面2个js在初始化时都会运行2次  
  - 不过有一点比较特殊  
    hook这个文件里的函数2次执行时，对于所在环境来说似乎都是第一次执行  
    2个console可以作证





##### vue devtools