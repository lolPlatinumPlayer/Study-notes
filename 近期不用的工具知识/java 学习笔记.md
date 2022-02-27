

### 安装

- 参考教程  
  看[菜鸟教程](https://www.runoob.com/java/java-environment-setup.html)  
  （怡茹推荐了一个[博客](https://blog.csdn.net/qq_39154376/article/details/107857776)，还没仔细看过）

- jdk下载地址  
  见[知乎](https://zhuanlan.zhihu.com/p/111022749)（比如jdk8的地址是：[jdk8镜像](https://mirrors.tuna.tsinghua.edu.cn/AdoptOpenJDK/8/jdk/x64/windows/OpenJDK8U-jdk_x64_windows_hotspot_8u272b10.msi)）
- 环境变量  
  - 一次装jdk8时不用配也可以执行`java -version`和javac命令  
    安装包名为：`OpenJDK8U-jdk_x64_windows_hotspot_8u292b10.msi`  
    安装系统为win7  
    安装后自动在Path环境变量前加了`D:\devtools\jdk\8\software_body\bin;`  
    如果去掉，则不能运行`java -version`
  - [菜鸟教程](https://www.runoob.com/java/java-environment-setup.html)说Path里除了要配`%JAVA_HOME%\bin;`外还要配`%JAVA_HOME%\jre\bin;`  
    但是[b站视频](https://www.bilibili.com/video/BV18J411W7cE?p=6&spm_id_from=333.1007.top_right_bar_window_history.content.click)只配了`%JAVA_HOME%\bin;`



##### 确认安装成功

进到`java.exe`所在文件夹执行`java -version`命令

- jdk的bin文件夹里也有`java.exe`  
  也可以执行`java -version`命令
- 如果要在任意位置支持`java -version`命令的话  
  要配环境变量  
  一次经验是安装jdk8后自动在Path环境变量前加了`D:\devtools\jdk\8\software_body\bin;` ，然后就可以了



### 编译和运行

- 编译  
  javac 文件名.java
- 运行  
  java 类名
- 同时编译和运行  
  vscode里右键，然后选择Run Code



### 版本

- >我们可以理解为JAVA等价于JDK —— [博客A](https://blog.csdn.net/qq_44895681/article/details/105365655)



##### 版本号上的版本

- 入门版本  
  前几年开始就更新很频繁了，不过[知乎问题](https://www.zhihu.com/question/434436143)上大家都说学习的话学1.8，[这个博客](https://www.cnblogs.com/16ylw/p/15095598.html)也是推荐1.8

- > jdk1.8和jdk8是一个东西 —— [博客A](https://blog.csdn.net/qq_44895681/article/details/105365655)



##### “类型”上的版本

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





### Servlet

小服务程序
一个 Servlet 就是 Java 编程语言中的一个类

- > Servlet API是一个jar包，我们需要通过Maven来引入它 —— [廖雪峰](https://www.liaoxuefeng.com/wiki/1252599548343744/1304265949708322)

- Servlet似乎和http请求关系很大

- > JSP是一种servlet——[菜鸟教程](https://www.runoob.com/jsp/jsp-intro.html)



# 模块

- 包名不能出现数字（起码新建Spring Boot项目时是这样）



# 语言核心api

- 定义变量  
  `类型 变量名=变量值`
- 打印  
  `System.out.println(字符串)`



### 类型

- HashMap  
  例子如下  

  ```java
  Map<String,Object> 变量名 = new HashMap<String, Object>();
  变量名.push("键名","值")
  ```

  



# 请求相关api



### ip与主机名

java.net包下的InetAddress类

这里的主机名和系统属性里的计算机名是一致的（“计算机名”和“计算机全名”都可以）

- 实例化  
  InetAddress.getByName(ip地址或主机名)  
  - 如果输入主机名那getHostName返回的会是输入的主机名  
    （不存在输入“计算机名”结果返回“计算机全名”的情况）
- 获取主机名  
  getHostName方法
- 获取ip地址  
  getHostAddress方法





# 核心工具

> JRE = JVM + libraries to run Java Application
> JDK = JRE + tools to develop Java Application
>
> —— [博客](https://blog.csdn.net/weixin_38339025/article/details/90313695)

![知乎上的某图](https://pic1.zhimg.com/v2-80912941ecd23ca835f8ed9ab09e301c_r.jpg)



# [Spring Boot](https://spring.io/projects/spring-boot)

似乎包含了tomcat、Spring等东西，简化了很多配置

看[女毒](https://www.bilibili.com/video/BV1rv411k7RD?p=8&share_medium=android&share_plat=android&share_session_id=9b010040-9e7d-4f0c-9b0a-a8ea9f18b338&share_source=COPY&share_tag=s_i&timestamp=1644767748&unique_k=NZC6AtR)意思应该是spring boot只是简化搭建和配置用的，对写代码没有影响。但是文杰说有连接数据库等功能



**资源**

- [官方入门demo](https://docs.spring.io/spring-boot/docs/2.6.3/reference/htmlsingle/#getting-started.first-application)
- [官方构建RESTful服务的demo](https://spring.io/guides/gs/rest-service/)
- [官方使用Spring MVC创建网站的demo](https://spring.io/guides/gs/serving-web-content/)



**特性**

- > Spring Boot工程也是Maven工程 —— [女毒Spring Boot视频](https://www.bilibili.com/video/BV1rv411k7RD?p=5&spm_id_from=pageDriver)

- 一个项目下各个Module是互不相干的（通过观察得出）

  

### **操作**

- [创建项目](https://www.bilibili.com/video/BV1rv411k7RD?p=4)
- 集成Spring MVC  
  [new一个module即可](https://www.bilibili.com/video/BV1rv411k7RD?p=6&spm_id_from=pageDriver)（↖其实和上面这个“创建项目”的视频的操作一毛一样）
  - 写代码的位置  
    `Application`类的同级目录或更深的目录<span style='opacity:.5'>（一个同级目录的例子：src/main/java/com/bjpowernode/springboot）</span>
- 启动项目  
  在IDEA里点启动入口类旁的小三角（点该类main方法盘的小三角也行）  
  - Spring Boot项目启动入口类  
    示例：`src\main\java\com\bjpowernode\springboot\Application.java`的`Application`类



### **配置**  



##### 核心配置文件  

> src/main/resources/application.properties —— [b站Spring Boot视频](https://www.bilibili.com/video/BV1rv411k7RD?p=5&spm_id_from=pageDriver)

里边写一行一行的key=value即可

- 可进行的配置
  - 服务端口号（内嵌Tomcat端口号）  
    `server.port=8081`  
    默认8080
  - 设置服务的路径前缀（上下文根）  
    `server.servlet.context-path=/路径前缀`
  
- yml和yaml  
  - application文件的后缀名可以改成yml或yaml
  
  - yml和yaml是完全一致的
  
  - 语法  
  
    ```yaml
    # 每个值前面都要有空格
    server:
      port: 8081 # 对应properties文件的server.port。
      servlet:
        context-path: /path # 对应properties文件的server.servlet.context-path
    ```
  
- 若properties文件和yml文件或yaml文件同时存在  
  读的就是properties文件的



##### pom.xml  

<span style='opacity:.5'>（怀疑是配置入口）</span>  

```xml
<project>
    <!--固定值-->
    <modelVersion>4.0.0</modelVersion>
    
    <!--Spring Boot父工程GAV-->
    <parent>
    </parent>
    
    <!--当前项目的GAV-->
    <groupId></groupId>
    <artifactId></artifactId>
    <version></version>
    
    <!--名字。可有可无-->
    <name></name>
    <!--描述。可有可无-->
    <description></description>
    <properties>
        <!--指定编译的版本-->  
        <java.version>1.8</java.version>
    </properties>
    
    <!--依赖-->    
    <dependencies>
        <!--Spring Boot框架web项目起步依赖-->    
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <!--这里的版本号来源于祖先工程-->    
        </dependency>
        <!--Spring Boot框架测试起步依赖（可删除）--> 
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <!--Spring Boot项目编译打包的插件--> 
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```





### [请求相关api](https://docs.spring.io/spring-boot/docs/2.6.3/reference/htmlsingle/#web)

- 可以选择[Spring MVC](https://docs.spring.io/spring-boot/docs/2.6.3/reference/htmlsingle/#web.servlet.spring-mvc)或[Spring WebFlux](https://docs.spring.io/spring-boot/docs/2.6.3/reference/htmlsingle/#web.reactive)（hrt用的是MVC）

- [一个处理请求的demo](https://www.bilibili.com/video/BV1rv411k7RD?p=7)  

  1. 新建一个java类  

  2. 在类上加一行`@Controller`

  3. 在类里面加入如下内容  

     ```java
     @RequestMapping(value = "/请求路径")
     public @ResponseBody
     String say() {
       return "响应的字符串";
     }
     ```

     





### Spring MVC

> spring mvc是spring的子模块 —— 楠哥视频

【】楠哥视频第二集6分40秒记下（看到5分14秒）



概念

- > 要开发的只有view和handler（handler包括model） 。其他组件不需要开发者创建、管理，只需要通过配置文件的方式完成配置即可 —— 楠哥视频



api

- 可以连续2行2个注解  
  下面是一个例子  

  ```java
  @RequestMapping(value = "/路径")
  @ResponseBody 
  public 类型 方法名(){
      return 响应内容
  }
  ```

- 定义接收请求的路径  
  `@RequestMapping(value = "/路径")`  

  - 可以写在类上，也可以写在`public 类型 方法名()`上  
  - 如果类和方法上都有的话，那最终监听路径将是两者之和
  - 一个类可以给多个方法定上路径

- 接收get请求的参数  
  `public 类型 方法名(类型 参数名)`

- 返回数据  
  在方法上加上`@ResponseBody`，然后方法return的内容就会是请求的响应数据
  
  - 有2种写法
  
    - `public @ResponseBody 类型 方法名()`
  
    - ```java
      @ResponseBody 
      public 类型 方法名()
      ```
  
  - 想响应json的话  
    返回一个HashMap就行了



# 其他相关工具



### Maven

感觉就是构建工具（[楠哥Spring MVS视频](https://www.bilibili.com/video/BV1GE411d7KE?spm_id_from=333.1007.top_right_bar_window_history.content.click)就是用Maven构建的）

- [GAV坐标](https://blog.csdn.net/ywl470812087/article/details/102861635)  
  通过groupId、artifactId、version确定一个jar包在互联网的位置



### Tomcat

一个支持jsp和sevlet的web服务器

- > 在中小型系统和并发访问用户不是很多的场合下被普遍使用，是开发和调试JSP 程序的首选 —— [百度百科](https://baike.baidu.com/item/tomcat/255751?fr=aladdin)

- > Tomcat处理静态HTML的能力不如Apache服务器 —— [百度百科](https://baike.baidu.com/item/tomcat/255751?fr=aladdin)



### IDEA

- java项目会生成.iml文件（[一个提到这点的博客](https://blog.csdn.net/weixin_41699562/article/details/99552780)）  
  iml（infomation of module）
- 自动引入  
  - 效果  
    自动加上所需的`import`代码
  - 触发条件  
    - 编码时使用自动完成
    - 复制代码进来



### 无头浏览器

网上资料都是用Selenium做无头浏览器  
时不时会提到ChromeDriver，但搜不到ChromeDriver是什么





# 其他



### 经验

- 拼好数据返回给前端  
  可能是不好操作的  
  余泽鑫说了差不多的话（大泽科技也疑似给出了相同看法）
