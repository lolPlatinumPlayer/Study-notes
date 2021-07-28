# 起步

1. [下载与安装](https://www.runoob.com/mysql/mysql-install.html)  
   - win7下跟着操作zip版本  
     zip有2个下载地址，2个都进行了尝试
     - `Windows (x86, 64-bit), ZIP Archive
       Debug Binaries & Test Suite`  
       不好使  
       配了环境变量也不行  
       都是报`'mysqld'不是内部或外部命令`或者`'mysql'不是内部或外部命令`
       - 这个压缩包是什么  
         百度资料很少，目前只看到2个网页：[慕课](https://www.imooc.com/qadetail/262209)、[百度知道](https://zhidao.baidu.com/question/922301942703503939.html)
     - `Windows (x86, 64-bit), ZIP Archive`  
       1. 输入`mysqld --initialize --console`命令后出现了一个报错，报错截图为“mysql截图a”
       2. 把**my.ini**里basedir改成bin文件夹的上上级地址后再敲这个命令，输出了“mysql截图b”
       3. 教程后续内容都可以走完
   - [下载与安装](https://www.runoob.com/mysql/mysql-install.html)页面还给了个[win的专用教程](https://www.runoob.com/w3cnote/windows10-mysql-installer.html)  
     是win10装mysql5.7.19的教程  
     跟着走完还是不行，用各种方式配完环境变量也不行，应该是电脑本身有问题

# 性能优化

### 数据库设计对性能的影响

（所有优化的重点，其它的所有优化加起来都未必有数据库设计优化对性能的影响大）

> - 过分的反范式话为表建立太多的列
> - 过多的范式话造成太多表的关联（最多只允许61个表关联）
> - 在OLTP中使用不恰当的分区表
> - 使用外键保证数据的完整性（性能很低，建议不要使用外键约束）

### 优化建议

性能优化顺序

> - 数据库结构和sql语句优化
> - 数据库引擎的选择和参数配置（不要混合使用存储引擎）