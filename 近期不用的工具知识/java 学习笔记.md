- java后端接口返回拼合数据可能是不好操作的  
  余泽鑫说了差不多的话（大泽科技也疑似给出了相同看法）



### 安装

- 参考教程  
  看[菜鸟教程](https://www.runoob.com/java/java-environment-setup.html)  
  （怡茹推荐了一个[博客](https://blog.csdn.net/qq_39154376/article/details/107857776)，还没仔细看过）

- jdk下载地址  
  见[知乎](https://zhuanlan.zhihu.com/p/111022749)（比如jdk8的地址是：[jdk8镜像](https://mirrors.tuna.tsinghua.edu.cn/AdoptOpenJDK/8/jdk/x64/windows/OpenJDK8U-jdk_x64_windows_hotspot_8u272b10.msi)）
- 环境变量  
  - 一次装jdk8时不用配也可以执行`java -version`  
    安装包名为：`OpenJDK8U-jdk_x64_windows_hotspot_8u292b10.msi`  
    安装系统为win7  
    安装后自动在Path环境变量前加了`D:\devtools\jdk\8\software_body\bin;`  
    如果去掉，则不能运行`java -version`

##### 确认安装成功

进到`java.exe`所在文件夹执行`java -version`命令

- jdk的bin文件夹里也有`java.exe`  
  也可以执行`java -version`命令
- 如果要在任意位置支持`java -version`命令的话  
  要配环境变量  
  一次经验是安装jdk8后自动在Path环境变量前加了`D:\devtools\jdk\8\software_body\bin;` ，然后就可以了



### Servlet

小服务程序
一个 Servlet 就是 Java 编程语言中的一个类

- > Servlet API是一个jar包，我们需要通过Maven来引入它 —— [廖雪峰](https://www.liaoxuefeng.com/wiki/1252599548343744/1304265949708322)

- Servlet似乎和http请求关系很大



# 核心工具

> JRE = JVM + libraries to run Java Application
> JDK = JRE + tools to develop Java Application
>
> —— [博客](https://blog.csdn.net/weixin_38339025/article/details/90313695)

![知乎上的某图](https://pic1.zhimg.com/v2-80912941ecd23ca835f8ed9ab09e301c_r.jpg)



- > jdk1.8和jdk8是一个东西 —— [博客A](https://blog.csdn.net/qq_44895681/article/details/105365655)

- >我们可以理解为JAVA等价于JDK —— [博客A](https://blog.csdn.net/qq_44895681/article/details/105365655)

- Java版本  
  Java有3个版本
  
  - JavaEE包含JavaSE，JavaSE包含JavaME
  - JavaEE（Java Platform Enterprise Edition）
  - JavaSE（Java Platform Standard Edition）
  - JavaME（Java Platform Micro Edition）  
    JavaME不太常用
  
- JavaEE  

  - 最早的JavaEE的名称是J2EE：Java 2 Platform Enterprise Edition
  - 和JavaSE的区别  
    多了一大堆服务器相关的库以及API接口



# 相关工具



### Tomcat

一个支持jsp和sevlet的web服务器

- > 在中小型系统和并发访问用户不是很多的场合下被普遍使用，是开发和调试JSP 程序的首选 —— [百度百科](https://baike.baidu.com/item/tomcat/255751?fr=aladdin)

- > Tomcat处理静态HTML的能力不如Apache服务器 —— [百度百科](https://baike.baidu.com/item/tomcat/255751?fr=aladdin)



### 无头浏览器

网上资料都是用Selenium做无头浏览器  
时不时会提到ChromeDriver，但搜不到ChromeDriver是什么
