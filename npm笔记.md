
## 下载源
- 查看：`npm config get registry`
- 修改：`npm config set registry 需要的下载源`
- 官方原版下载源：`http://registry.npmjs.org/`或`https://registry.npmjs.org/`
- 淘宝镜像下载源：`https://registry.npm.taobao.org`


## npm script
可在package.json的script项下添加脚本（当前目录的node_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径）  
写npm run xx这种脚本也是能完全执行的。  


## npm script 钩子
可在npm script的脚本前加入前缀，可加前缀有pre和post。  
如package.json中写为：  
"preb": "echo 1",  
"b": "echo 2",  
"postb": "echo 3"  
在npm run b后执行顺序就是preb && b && postb。（&&代表继发执行，即只有前一个任务成功，才执行下一个任务，这个符号是 Bash 的功能）  


## 安装依赖
npm install <package_name>将依赖装到本地，后面加上-g则装在全局  
有package.json情况下npm install安装package.json中依赖  


## --save
（-g）后面加上--save会向package.json的dependencies字段中增加准备安装的依赖  
【测试】如果已添加至devDependencies再--save安装是否会从devDependencies转移至dependencies  
dependencies中的代表生产时使用，如vue、vuex等  


## --save-dev
缩写为`-D`  
--save-dev则是加在devDependencies中  
devDependencies代表开发时使用，而生产不使用，如gulp、babel等  


## 查看依赖版本
1. 局部依赖：    
   在package.json里查看    
   （如果安装时没有--save的话就只能去文件夹里面看了）
2. 全局依赖    
   去文件夹里面看，路径是
   C:\Users\Administrator\AppData\Roaming\npm\node_modules
   
   
## npm list
查看本地安装所有依赖以及，该装未装的依赖  


# ------------以下为各种BUG解决方案------------


## Error: EBUSY: resource busy or locked
很有可能是网络问题，过一两分钟再装【测试于cnpm环境下】  


## 有一些操作有可能导致npm依赖包残缺，因此会导致BUG
重新装一下BUG的包基本能解决（直接install那个包就行）  


##   
有的时候包不起作用，而且各种npm操作都会提示一串文件（或目录）不存在，并且这些操作都无法达到理想效果  
经历x1：查了一晚上解决不了，把项目里的node_modules文件夹删了，重新npm install就好了  


- 有时npm run dev失败可以通过关闭node进程再输入命令解决（一次例子中用了rollup  







