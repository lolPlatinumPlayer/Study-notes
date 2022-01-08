就看next分支（第6版）（基础代码和第5版没什么差别）





### 待做事项

- 当前在看`packages\shell-dev\src\devtools.js  `



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



代码备注

- 代码里的`target`指的都是模拟出来的被调试页面
- packages\shell-dev\src\devtools.js  
  - 18行的`targetWindow.parent`是全等于`window`的





##### vue devtools