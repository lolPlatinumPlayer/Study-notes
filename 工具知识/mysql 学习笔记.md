【】看看官方教程

视频学习进度：下次看：https://www.bilibili.com/video/BV1Vt411z7wy?p=5



# 综述

- 版本  

  > 要么5.7要么8.0 —— 狂神

  hrt也是hulan5其他8

- 大小写是否敏感

  - 操作系统的大小写敏感性决定了数据库名和表名的大小写敏感性
  - 语句大小写不敏感  
    只有传参是大小写敏感的<span style='opacity:.5'>（理所当然）</span>




# 起步

- [下载与安装（菜鸟教程）](https://www.runoob.com/mysql/mysql-install.html)
  
   - win7下跟着操作zip版本<span style='opacity:.5'>（可以用，但是不少地方有问题）</span>  
   
     1. 下载  
        在[官网](https://downloads.mysql.com/archives/community/)下载`Windows (x86, 64-bit), ZIP Archive`  
   
        - 非重点内容：`Windows (x86, 64-bit), ZIP Archive
          Debug Binaries & Test Suite`  
          这是[官网](https://downloads.mysql.com/archives/community/)提供的另一个包  
          用这个装mysql不好使，配了环境变量也不好使  
          都是报`'mysqld'不是内部或外部命令`或者`'mysql'不是内部或外部命令`
          - 这个压缩包是什么  
            百度资料很少，目前只看到2个网页：[慕课](https://www.imooc.com/qadetail/262209)、[百度知道](https://zhidao.baidu.com/question/922301942703503939.html)
   
     2. 复制教程的`my.ini`后把`my.ini`里的`basedir`赋值为bin文件夹的上级地址，然后输入`mysqld --initialize --console`命令可以正常输出，输出内容如下  
   
        ```cmd
        2022-04-01T14:03:46.184302Z 0 [System] [MY-013169] [Server] D:\learning_materials\back_end\mysql\mysql-8.0.26-winx64\mysql-8.0.26-winx64\bin\mysqld.exe (mysqld 8.0.26) initializing of server in progress as process 1136
        2022-04-01T14:03:46.184303Z 0 [Warning] [MY-013242] [Server] --character-set-server: 'utf8' is currently an alias for the character set UTF8MB3, but will be an alias for UTF8MB4 in a future release. Please consider using UTF8MB4 in order to be unambiguous.
        2022-04-01T14:03:46.214303Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
        2022-04-01T14:03:47.294302Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
        2022-04-01T14:03:48.954305Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1 is enabled for channel mysql_main
        2022-04-01T14:03:48.954306Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1.1 is enabled for channel mysql_main
        2022-04-01T14:03:49.726324Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: ZtSuy3RG3h/m
        ```
   
        - 用户名、主机名、密码  
          在打印内容的最末尾：`用户名@主机名: 密码`<span style='opacity:.5'>（比如`root@localhost: ZtSuy3RG3h/m`）</span>  
        - 端口号  
          重启电脑后用navicat连1136<span style='opacity:.5'>（这个命令中输出了1136）</span>是连不上的  
          3306可以连上，`my.ini`里`port`值就是这个<span style='opacity:.5'>（navicat中的默认端口号也是这个）</span><span style='opacity:.5'>（一般大家mysql的端口号都是3306）</span>
        - 如果把`basedir`赋值为bin文件夹的上上级，教程后续内容也能走完  
          但是输`mysqld --initialize --console`命令时会报错，报错如下  
          ![mysql截图b](https://img.wenhairu.com/images/2021/07/31/9Le7u.md.png)
        - 如果直接复制教程的`my.ini`而没有修改`basedir`的话，输入`mysqld --initialize --console`命令会报错  
          报错截图如下  
          ![mysql截图a](https://img.wenhairu.com/images/2021/08/01/9h8XG.md.png)
   
     3. 教程后续内容都可以走完  
        <span style='opacity:.5'>（全程没配环境变量。走这个路线前已经把环境变量都清了）</span>
   
   - [下载与安装（菜鸟教程）](https://www.runoob.com/mysql/mysql-install.html)页面还给了个[win的专用教程](https://www.runoob.com/w3cnote/windows10-mysql-installer.html)  
     是win10装mysql5.7.19的教程  
     跟着走完还是不行，用各种方式配完环境变量也不行，应该是电脑本身有问题
   
- 安装多个版本的mysql<span style='opacity:.5'>（灵感来自该[博客](https://blog.csdn.net/qq_44628595/article/details/110222992)）</span>  
  <span style='opacity:.5'>（以5.7为例）</span>  
  1. 把`bin`文件夹下的`mysql.exe`和`mysqld.exe`更名为`mysql57.exe`和`mysqld57.exe`
  2. 把`my.ini`里的`port`设置为`3357`
  3. 用`mysqld57 -install MYSQL57`命令代替`mysqld install`命令  
     用`net start mysql57`命令代替`net start mysql`命令





# 命令行

- 某个安装  
  `mysqld install`  
  
  - 按本笔记的『安装多个版本的mysql』操作后  
    可以用`mysqld57 -install MYSQL57`进行安装  
    这时的卸载命令是`mysqld57 -remove MYSQL57`  
    （`MYSQL57`应该是随便起啥名都可以，和文件名无关）
  
- 登录数据库服务器  
  `mysql -h 主机名 -u 用户名 -p`  
  （`mysql -u 用户名 -p`和`mysql -u用户名 -p密码`也有相同效果）  
  然后会要求输入密码
  
  - >登录成功后你将会看到 Welcome to the MySQL monitor... 的提示语。
    >
    >然后命令提示符会一直以 mysql> 加一个闪烁的光标等待命令的输入, 输入 exit 或 quit 退出登录
    >
    >—— [菜鸟教程](https://www.runoob.com/mysql/mysql-install.html)
  
  - 进入这种状态后命令都要以`;`结尾
    
  - 登录时密码不正确的表现  
    报错如下  
  
    ```
    ERROR 1045 (28000): Access denied for user '用户名'@'主机名' (using password: 有输密码就是YES没输就是NO)
    ```
  
- 查看版本  
  `mysql -v`  
  <span style='opacity:.5'>（目前都是报错：`ERROR 1045 (28000): Access denied for user 'ODBC'@'localhost' (using password: NO)`）</span>

- `net start mysql`某个启动命令

- `net stop mysql`某个关闭命令

- `mysqld --initialize 其他内容`  

  > 初始化mysql自己的数据库<span style='opacity:.5'>（不是业务用的那种数据库）</span> —— 真真





# 登录后才能用的命令

- 查看所有数据库  
  `show databases;`
- 选中一个数据库  
  `use 数据库名;`
- 创建数据库  
  `create database 数据库名称;`



### 选中数据库后才能用的命令

- 查看数据库里所有表  
  连接数据库后`show tables;`

- 创建数据表  

  - 例子  

    ```sql
    CREATE TABLE 表名(
    字段名 数据类型,
    字段名 数据类型,
    字段名 数据类型
    );
    ```

- 查看指定表的设计  
  `describe 表名;`



##### sql语句

应该就是其他语言中要写的代码

- 在数据库中查询  
  `select * from 表名;`





# 写在其他语言中的代码

- 占位符  
  <span style='opacity:.5'>（以下内容来自宏青）</span>
  - 可以完全防止sql注入
  - 性能比拼接的好，因为第二次查的时候就不用分析了



完整语句

- 插入一行  

  ```sql
  INSERT INTO 表名 (第1个字段名,第2个字段名,第3个字段名)
  	VALUES (第1个字段值,第2个字段值,第3个字段值)
  ```

- 删除符合条件的所有行<span style='opacity:.5'>（应该是所有行）</span>  
  `DELETE FROM 表名 WHERE 条件`

- 修改  
  `update user set name=#{name},pwd=#{pwd} where id=#{id}`  

  - 没有行数限制
  - 没有字段数量限制，想改几个字段都可以

- 获得符合条件的所有行<span style='opacity:.5'>（意思是返回的是数组）</span>  
  `SELECT * from 表名 WHERE 条件`  

  - 这时可以选择只取出个别字段  
    比如：`SELECT 字段1,字段2,字段3 from 表名`





语句截取

- 条件  
  写在`where`后面
  - `字段名=字段值`  
  - 且  
    `字段名1=字段值 AND 字段名2=字段值`  



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



# 相关工具

- [MySQL Shell](https://dev.mysql.com/doc/mysql-shell/8.0/en/)  

  > 是 MySQL 的高级客户端和代码编辑器 —— 官网

- MySQL Community Server  

  - 和MySQL Server应该是同一个东西  
    下面几篇博客都称为MySQL Server（都是mysql的起步教程）
    - [A](https://blog.csdn.net/epyingxue/article/details/86085942)
    - [B](https://www.cnblogs.com/tianhaichao/p/10215616.html)
    - [C](https://blog.csdn.net/zhangzhetaojj/article/details/80684306)

  - [菜鸟教程《MySQL安装》](https://www.runoob.com/mysql/mysql-install.html)里给的[MySQL下载地址](https://dev.mysql.com/downloads/mysql/)实际上就是MySQL Community Server

- MySQL Database Service  
  并不是mysql  

  - [这里有整体介绍](https://www.oracle.com/mysql/)
  - [这里有文档](https://docs.oracle.com/en-us/iaas/mysql-database/doc/getting-started.html)



### navicat 

一个数据库GUI工具

- [b站破解方法](https://www.bilibili.com/video/BV1H44y1W7F9?spm_id_from=333.337.search-card.all.click)  
  <span style='opacity:.5'>（网盘已备份）</span>

**使用**

- 执行sql语句  
  先右键，然后选择“运行 SQL 文件”  
  运行结果要刷新才会看到





### [MySQL Workbench](https://www.oschina.net/p/mysql+workbench?hmsr=aladdin1e1)

一个数据库GUI工具  

> 可以直接将一个数据库转换为一个关系图表 —— [一个热门博客](https://blog.csdn.net/u010429286/article/details/79022484)

似乎也可以把关系图转为数据库



### DataGrip

一个数据库GUI工具

- [要装Docker](https://www.jetbrains.com/help/datagrip/2021.2/quick-start-with-datagrip.html)  
  且版本不能低于18.09.0



# 其他

- 字段的“自动递增”  
  意思就是该字段可以不传，不传时的值为`表里该字段最大值+1`
- 服务相关
  - 查看<span style='opacity:.5'>（win7win10都是这样）</span>  
    1. 右键“计算机”图标
    2. 点“管理”
    3. 点左侧的“服务和应用程序”下的“服务”  
       然后在右侧就可以找到mysql了
  - 右键服务可以做“启动”、“重启”、“停止”等操作
  - 更改“启动类型”  
    在双击服务呼出的面板中就可以更改  
    - 各类型  
      自动（延迟启动）  
      自动：代表开启电脑后就自动开启服务  
      手动  
      禁用




非重点内容

- `taskeng.exe`弹窗  
  百度资料都是给出禁用方法，搜不到出现原因  
  宇翔说是[mysql更新出错](https://blog.csdn.net/u014587769/article/details/68116269)导致的
