除非有说明，不然都是描述java8的



### 待学习内容



- 可以看下垃圾回收机制，JVM内存结构。这块基础用到的比较多  
  还有JDK的api 大致熟悉下基本类



# 起步

- 一个java文件中可以定义多个类  
  但是最多只有一个类被`public`修饰  
  且`.java`文件的文件名要和这个`public`的类名一致



### 成分

> JRE = JVM + libraries to run Java Application
> JDK = JRE + tools to develop Java Application
>
> —— [博客](https://blog.csdn.net/weixin_38339025/article/details/90313695)

![知乎上的某图](https://pic1.zhimg.com/v2-80912941ecd23ca835f8ed9ab09e301c_r.jpg)

- JVM（Java虚拟机）  

  - 唯一功能可能就是运行`.class`文件<span style='opacity:.5'>（它只认识 xxx.class 这种类型的文件 —— [腾讯云](https://cloud.tencent.com/developer/article/1061234)）</span>

- JRE（Java Runtime Environment）  

  > 只包含运行Java应用程序所需的工具。无法使用JRE编译代码 —— [官网](https://dev.java/learn/getting-started-with-java/#anchor_4)

  jre比jvm多的就是一些类库（`.class`文件）

- JDK  

  > 它集成了 jre 和一些好用的小工具。例如：javac.exe，java.exe，jar.exe 等。 —— [腾讯云](https://cloud.tencent.com/developer/article/1061234)





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
  - JavaFX  
    应该是用来做桌面端应用的
  
    > 一个比较老的框架 —— [郭郭wg](https://www.bilibili.com/video/BV1GV411H7dq?spm_id_from=333.337.search-card.all.click&vd_source=ae01126b817131ef55ede61dd4709597)
- JavaEE  

  - 最早的JavaEE的名称是J2EE：Java 2 Platform Enterprise Edition
  - 和JavaSE的区别  
    多了一大堆服务器相关的库以及API接口



### [安装](https://dev.java/learn/getting-started-with-java/#anchor_5)

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



用命令

- 编译  
  `javac 文件名.java`  
  得到一个`文件名.class`文件（16进制字节码文件）
  - 用`javac`指令编译有多个类的Java文件时，它会给每一个类生成一个对应的`.class`文件
  
- 运行  
  `java 文件名`

  - 运行的程序  
    `public`的类的`public static 返回值类型 main`方法



用IDE

- 同时编译和运行  
  vscode里右键，然后选择Run Code

- 在IDEA里运行  
  已知有2种方法

  - 用junit的`@Test`注解<span style='opacity:.5'>（本笔记有记录JUnit4）</span>
  - 将main方法改成如下写法  
    `public static void main(String[] args)`

  



# 概念



### Servlet

小服务程序
一个 Servlet 就是 Java 编程语言中的一个类

- > Servlet API是一个jar包，我们需要通过Maven来引入它 —— [廖雪峰](https://www.liaoxuefeng.com/wiki/1252599548343744/1304265949708322)

- Servlet似乎和http请求关系很大

- > JSP是一种servlet——[菜鸟教程](https://www.runoob.com/jsp/jsp-intro.html)



### Applet

> Applet是一个软件组件（程序代码），由您的浏览器下载以在网页中提供功能。Java applets使用 JVM 在浏览器中提供交互式功能。 —— [官网](https://www.java.com/en/download/help/helpful_concepts.html)



# 模块化

- 包名不能出现数字（起码新建Spring Boot项目时是这样）

- 导入  
  `import 路径;`  
  示例：`import com.kuang.pojo.User;`  

  - 路径每级用`.`隔开
  - 路径具体规则还没研究（比如我想导入某个位置的文件时该怎么写）

- 导出一个类  
  步骤如下

  1. 新建一个java文件，文件名与类名保持一致

  2. 第一行写`package 路径a;`

  3. ```java
     public class或interface 类名 {
         代码
     }
     ```

  4. 到这里就导出成功了

  5. 导入的话写`import 路径a.类名`





# [语言核心](https://docs.oracle.com/javase/8/docs/api/index.html)



### 基础

- 变量
  
  - 定义  
    `类型 变量名=变量值`（这里的类型包括类和接口）  
    - 这个类型不一定要是最具体的  
      （比如可以用Map声明HashMap）
  - 变量名要求  
    由数字、字母、`_`、`$`组成
  
- 打印  
  `System.out.println(内容)`  
  <span style='opacity:.5'>（不需要导入东西就可以用）</span>  
  <span style='opacity:.5'>（内容都会被转为字符串输出）</span>

  - 无法`System.out.println(类或接口);`，但是可以`System.out.println(类或接口.class);`
  
- > 所有代码都要放在类里 —— [官网](https://dev.java/learn/getting-started-with-java/#creating-a-first-java-class)

- 函数  
  没查到java有单独的函数的说法

- [强转](https://baijiahao.baidu.com/s?id=1715952014732622718&wfr=spider&for=pc)  
  例子：`Blog blog = (Blog) session.selectOne("org.mybatis.example.BlogMapper.selectBlog", 101);`里边的`(Blog)`
  
- [泛型](https://baijiahao.baidu.com/s?id=1700376763358126465&wfr=spider&for=pc)  
  T，E，K，V这种对程序来说都是一样的，但是有不同的语义  
  这些字母用来指代任何类型  

  - `List<String> templates = new ArrayList<String>();`中  
    `ArrayList`就是泛型类  
    `T`可以是具体的某个类



### 特性

- 作用域  
  花括号内会产生作用域，比如如下的写法就是合法的  

  ```java
  long x = 10L;
  while( x < 20L ) {
      User oneRow=new User();
      x++;
  }
  ```

  



### 类

- 基础写法  

  ```java
  class 类名 {
      类型 字段名 = 初始值;
      返回数据类型 方法名(入参类型 入参名) {
      }
  }
  ```

- > 对类名的唯一要求是不能以数字开头 —— [官网](https://dev.java/learn/getting-started-with-java/#anchor_3)

- 继承  

  ```java
  class 子类名 extends 父类 {
  }
  ```

- 可以没有main方法



方法

- 方法同名不同参数即为不同方法
- 方法中必须使用所有参数  
  不然无法执行并报错`No ParameterResolver registered for parameter [参数] in method [方法].`
- 给方法的参数设置默认值  
  没有这种api，不过可以手动实现这个功能，比如[这个文章](https://wenku.baidu.com/view/b717793a954bcf84b9d528ea81c758f5f61f292c.html)的做法





### 接口

- 可继承



### 类型



##### [基本数据类型](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)

- 隐式转换  
  - 只有数值类型可以隐式转换
  - 整形都可以转浮点型
  - 除非整型转浮点，否则都只能高字节向低字节转
- 数值精度丢失时都是向下取整
- 强转  
  在赋值前加个小括号表明要转到的类型  
  比如`int a=(int) 1.11`
- `char`  
  单个字符  
  字面量示例：`'a'`
- long  
  长整型<span style='opacity:.5'>（数据库里用bigint的话java最好用long）</span>  
  数字背后加`L`或`l`代表长整型  
  比如`11L`



##### 其他

- [HashMap](https://www.runoob.com/java/java-hashmap.html?ivk_sa=1024320u)  
  例子如下  

  ```java
  import java.util.HashMap;
  Map<String,Object> 变量名 = new HashMap<String, Object>();
  变量名.put("键名","值");
  ```

- Collection集合

  - `List<Long> 变量= Arrays.asList(1L,2L);`  
    这个`变量`就是一个Collection集合  

- 字符串  
  `String`  
  示例：`"abc"`  

  - `String`是一个类  
    但是不需要`import`

- `void`  
  放方法前面表示该方法没有返回值







### 注解  

- 注解背后不用加分号

- 可以传参也可以不传参  
  比如  

  ```java
  @TableName("sys_user")
  public class User {
      @TableId
      private Long id;
      @TableField("nickname")
      private String name;
  }
  ```

- 可以连续多行写注解  
  下面是一个例子  

  ```java
  @RequestMapping(value = "/路径")
  @ResponseBody 
  public 类型 方法名(){
      return 响应内容
  }
  ```

- 有“内置注解”

- 有“元注解”  
  用来注解其他注解



### 数组

最简demo

- 创建  
  `String[] 变量名 = {"a","b","c"};`
- 读取  
  `变量名[0]`



**创建**

- 声明  
  `int 变量名[]`  
  - 声明时赋不赋值都可以

- 开辟空间
  - 数组长度开辟空间后不可变
- 开辟空间的具体语法  
  有如下几种写法  
  - `变量名 = new int[3]`
    - 似乎必须指定长度
  - `变量名={1,2,3}`  
    只有声明时可以用这种写法
  - `变量名=new int[] {1,2,3}`  
    【】应该只有声明时可以用这种写法



### 循环

- [W3Cschool](https://www.w3cschool.cn/java/java-loop.html)



### 数学

随机数

- 生成0到1间的随机数  
  `Math.random()`
- `import java.util.Random;`  
  [`Random`](http://www.51gjie.com/java/605.html)
  - 生成随机整数  
    `Random`实例的[`nextInt`方法](http://www.51gjie.com/java/607.html)或者nextLong方法



### 未归类

- `::`  
  语法糖<span style='opacity:.5'>（还没在[官网](https://docs.oracle.com/javase/8/docs/api/index.html)找到对应文档）</span>  
  比如`numbers.forEach(x -> System.out.println(x));`可以缩写为`numbers.forEach(System.out::println);`
  - 可以自动判断参数的数量  
    上面这个例子只有1个参数  
    但是[这个例子](https://stackoverflow.com/a/20001866/17924072)就有2个参数




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





# [Spring Boot](https://spring.io/projects/spring-boot)

似乎包含了tomcat、Spring等东西，简化了很多配置

看[女毒](https://www.bilibili.com/video/BV1rv411k7RD?p=8&share_medium=android&share_plat=android&share_session_id=9b010040-9e7d-4f0c-9b0a-a8ea9f18b338&share_source=COPY&share_tag=s_i&timestamp=1644767748&unique_k=NZC6AtR)意思应该是spring boot只是简化搭建和配置用的，对写代码没有影响。但是文杰说有连接数据库等功能

[Springboot和SSM](http://blog.itpub.net/69942977/viewspace-2653797/)



**资源**

- [官方入门demo](https://docs.spring.io/spring-boot/docs/2.6.3/reference/htmlsingle/#getting-started.first-application)
- [官方构建RESTful服务的demo](https://spring.io/guides/gs/rest-service/)
- [官方使用Spring MVC创建网站的demo](https://spring.io/guides/gs/serving-web-content/)



**特性**

- > Spring Boot工程也是Maven工程 —— [女毒Spring Boot视频](https://www.bilibili.com/video/BV1rv411k7RD?p=5&spm_id_from=pageDriver)

- 一个项目下各个Module是互不相干的（通过观察得出）

- > springBoot把mybatis的配置封装成注解了，就不需要用配置了 —— 马宇翔

  

### **操作**

- [通过IDEA创建项目](https://www.bilibili.com/video/BV1rv411k7RD?p=4)  
  1. 新建空项目<span style='opacity:.5'>（File -> New -> Project）</span>
  2. 点new  
     点Module  
     点`Spring Initializr`
  3. 写好本项目的信息
     - 包名里不能出现数字<span style='opacity:.5'>（包名指的应该是Package name）</span>
  4. 选依赖  
     - 在`Web`里选`Spring Web`
     - 选Spring Boot的版本
- 通过在线网站创建项目  
  也就是[Spring Initializr](https://start.spring.io/)
- 集成Spring MVC  
  [new一个module即可](https://www.bilibili.com/video/BV1rv411k7RD?p=6&spm_id_from=pageDriver)（↖其实和上面这个“创建项目”的视频的操作一毛一样）
  - 写代码的位置  
    SpringBoot项目启动入口类<span style='opacity:.5'>（应该都挂有`@SpringBootApplication`注解）</span>的同级目录或更深的目录<span style='opacity:.5'>（一个同级目录的例子：src/main/java/com/bjpowernode/springboot）</span>
- 启动项目  
  在IDEA里点启动入口类旁的小三角（点该类main方法盘的小三角也行）  
  - Spring Boot项目启动入口类  
    示例：`src\main\java\com\bjpowernode\springboot\Application.java`的`Application`类



### **配置**  



##### 核心配置文件  

> src/main/resources/application.properties —— [女毒Spring Boot视频](https://www.bilibili.com/video/BV1rv411k7RD?p=5&spm_id_from=pageDriver)

里边写一行一行的key=value即可

- 可进行的配置
  - 服务端口号（内嵌Tomcat端口号）  
    `server.port=8081`  
    默认8080
  - 设置服务的路径前缀（上下文根）  
    `server.servlet.context-path=/路径前缀`  
    - 默认值：`''`<span style='opacity:.5'>（空串）</span>
  
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

  

### Spring MVC

> spring mvc是spring的子模块 —— [楠哥Spring MVC视频](https://www.bilibili.com/video/BV1GE411d7KE?p=1&vd_source=ae01126b817131ef55ede61dd4709597)



##### 概念

- > 要开发的只有view和handler（handler包括model） 。其他组件不需要开发者创建、管理，只需要通过配置文件的方式完成配置即可 —— [楠哥Spring MVC视频](https://www.bilibili.com/video/BV1GE411d7KE?p=1&vd_source=ae01126b817131ef55ede61dd4709597)

  楠哥说的handler应该就是加了`@Controller`的类



##### 起步

- [一个处理请求的demo（女毒视频）](https://www.bilibili.com/video/BV1rv411k7RD?p=7)    
  这里不记录项目搭建的过程

  1. 新建一个java类  

  2. 在类的上方加一行代码：`@Controller`

  3. 在类里面加入如下内容  

     ```java
     @RequestMapping(value = "/请求路径")
     public @ResponseBody
     String say() {
       return "响应的字符串";
     }
     ```

  4. 启动加了`@SpringBootApplication`的类  
     然后终端显示的众多内容中就有一行：`Tomcat started on port(s): 8081 (http) with context path '/path`  
     意思就是服务的端口是8081，基础路径是`/path`<span style='opacity:.5'>（这个基础路径源自`server.servlet.context-path`配置）</span>



##### api

- 定义接收请求的路径  
  `@RequestMapping(value = "/路径")`  

  - `value=`可以省略
  - 可以写在类上，也可以写在`public 类型 方法名()`上  
  - 如果类和方法上都有的话，那最终监听路径将是`类上的路径`+`方法上的路径`
  - 一个类可以给多个方法设置路径
  
- 接收请求来的数据
  
  - query参数参数  
    `public 返回数据类型 方法名(类型 参数名)`
  
- 响应数据  
  在方法上加上`@ResponseBody`，然后方法return的内容就会是请求的响应数据

  - 有2种写法

    - `public @ResponseBody 返回数据类型 方法名()`

    - ```java
      @ResponseBody 
      public 返回数据类型 方法名()
      ```

  - 想响应json的话  
    返回一个HashMap就行了





# 其他相关工具



### Maven

感觉就是构建工具（[楠哥Spring MVS视频](https://www.bilibili.com/video/BV1GE411d7KE?spm_id_from=333.1007.top_right_bar_window_history.content.click)就是用Maven构建的）

- [maven仓库](https://mvnrepository.com/)<span style='opacity:.5'>（源自[狂神视频](https://www.bilibili.com/video/BV1NE411Q7Nx?spm_id_from=333.1007.top_right_bar_window_history.content.click)1分55秒）</span>

- [GAV坐标](https://blog.csdn.net/ywl470812087/article/details/102861635)  
  通过groupId、artifactId、version确定一个jar包在互联网的位置
  
- 配置文件无法被导出或生效的问题  
  配置文件默认放在`resources`文件夹下，放同级的`src`下默认不生效  
  解决办法：在项目最外层的`pom.xml`里加上如下代码  

  ```xml
  <!--在build中配置resources，来防止我们资源导出失败的问题-->
  <build>
      <resources>
          <resource>
              <directory>src/main/resources</directory>
              <includes>
                  <include>**/*.properties</include>
                  <include>**/*.xml</include>
              </includes>
              <filtering>true</filtering>
          </resource>
          <resource>
              <directory>src/main/java</directory>
              <includes>
                  <include>**/*.properties</include>
                  <include>**/*.xml</include>
              </includes>
              <filtering>true</filtering>
          </resource>
      </resources>
  </build>
  ```

  





### JetBrains



##### [2021.3.3永久激活法](https://www.exception.site/essay/how-to-free-use-intellij-idea-2019-3)

1. 下载2021.3.3软件

2. 卸载老版软件<span style='opacity:.5'>（比如破解IDEA就卸载IDEA，不用动WebStorm）</span>

3. 清空之前的激活方式<span style='opacity:.5'>（比如hosts、补丁等）</span>

4. 安装软件，并运行一次，然后关闭

5. 下载破解补丁<span style='opacity:.5'>（网盘已备份）</span>

6. 找个合适的地方放补丁  
   未来不能移动补丁，否则破解失效

7. 双击运行`破解补丁\ja-netfilter-all\scripts\install-current-user.vbs`  
   等待弹窗出现Done字样  

8. 打开IDEA，用如下激活码激活<span style='opacity:.5'>（其他如WebStorm等软件要用别的激活码）</span>  

   ```
   4W9NP3KV9E-eyJsaWNlbnNlSWQiOiI0VzlOUDNLVjlFIiwibGljZW5zZWVOYW1lIjoic2NyaXAgd2FuZSIsImFzc2lnbmVlTmFtZSI6IiIsImFzc2lnbmVlRW1haWwiOiIiLCJsaWNlbnNlUmVzdHJpY3Rpb24iOiIiLCJjaGVja0NvbmN1cnJlbnRVc2UiOmZhbHNlLCJwcm9kdWN0cyI6W3siY29kZSI6IklJIiwiZmFsbGJhY2tEYXRlIjoiMjAyMy0wMS0yNCIsInBhaWRVcFRvIjoiMjAyMy0wMS0yNCIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiUERCIiwiZmFsbGJhY2tEYXRlIjoiMjAyMy0wMS0yNCIsInBhaWRVcFRvIjoiMjAyMy0wMS0yNCIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQV1MiLCJmYWxsYmFja0RhdGUiOiIyMDIzLTAxLTI0IiwicGFpZFVwVG8iOiIyMDIzLTAxLTI0IiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBHTyIsImZhbGxiYWNrRGF0ZSI6IjIwMjMtMDEtMjQiLCJwYWlkVXBUbyI6IjIwMjMtMDEtMjQiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiUFBTIiwiZmFsbGJhY2tEYXRlIjoiMjAyMy0wMS0yNCIsInBhaWRVcFRvIjoiMjAyMy0wMS0yNCIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQUEMiLCJmYWxsYmFja0RhdGUiOiIyMDIzLTAxLTI0IiwicGFpZFVwVG8iOiIyMDIzLTAxLTI0IiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBSQiIsImZhbGxiYWNrRGF0ZSI6IjIwMjMtMDEtMjQiLCJwYWlkVXBUbyI6IjIwMjMtMDEtMjQiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiUFNXIiwiZmFsbGJhY2tEYXRlIjoiMjAyMy0wMS0yNCIsInBhaWRVcFRvIjoiMjAyMy0wMS0yNCIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQU0kiLCJmYWxsYmFja0RhdGUiOiIyMDIzLTAxLTI0IiwicGFpZFVwVG8iOiIyMDIzLTAxLTI0IiwiZXh0ZW5kZWQiOnRydWV9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
   ```

   



##### [无限试用法](http://www.intellij.vip/)

↑这里的『在线教程』已经失效了，以下内容是自己对DataGrip的操作  
<span style='opacity:.5'>（百度网盘有备份从这网站上下载的内容（一个zip文件））</span>

1. 从官网上下载2021.2.2版exe
2. 断网安装
3. 从压缩包里解压出`ide-eval-resetter-2.1.14.zip`<span style='opacity:.5'>（注意解压出的zip不要再解压了）</span>
4. 打开软件选择免费试用，建一个项目，然后关闭软件
5. 开启软件，把`ide-eval-resetter-2.1.14.zip`拖入软件界面内
6. <span style='opacity:.5'>（这里可能重启了下）</span>点上方“help”，点最下面的“Eval Reset”，勾起“Auto reset before per restart”，点“Reset”重启  
   <span style='opacity:.5'>（（注意：这里写的是restart而不是start））</span>
7. 确认免费试用时间是否被重置  
   上方工具栏的help → Register



用脚本重置试用时间  
[这个博客](https://www.cnblogs.com/gentlescholar/p/15145771.html)有提到



经验

- 按照『在线教程』操作的IDEA2021.2.2打不开了  
  不知道是因为更改`ide-eval-resetter-2.1.14.zip`所在文件夹导致的，还是因为IDEA太久没开了，还是这个方案本就不生效





### IDEA

- java项目会生成.iml文件（[一个提到这点的博客](https://blog.csdn.net/weixin_41699562/article/details/99552780)）<span style='opacity:.5'>（其实webstorm也会生成）</span>  
  iml（infomation of module）



特性

- 会自动引入  
  - 效果  
    自动加上所需的`import`代码
  - 触发条件  
    - 编码时使用自动完成
    - 复制代码进来
- 没装好的依赖会显示为红色
- 依赖没装好的时候“无法识别为java项目”，表现和本笔记记录的“项目文件夹更名”表现一致
- 项目文件夹更名  
  - 会产生的问题  
    个人称为“无法识别为java项目”，具体有如下表现  
    1. 右键new没有Java Class
    2. java文件没有语法高亮
    3. 文件夹名不会连在一起显示<span style='opacity:.5'>（`文件夹A.文件夹B.文件夹C`这种）</span>
  - 解决步骤  
    1. 把`原项目名.iml`更名为`新项目名.iml`
    2. 把`.idea`文件夹里所有文件的原项目名都改为新项目名
  - 正确的更名方法应该是  
    在IDEA里右键根目录，然后点Refactor，然后点Rename



操作

- 连接数据库<span style='opacity:.5'>（以mysql为例）</span>  
  1. 点右侧“Database”选项卡
  2. 点呼出面板左上角的加号
  3. 鼠标放到“Data Source”上
  4. 选“MySQL”
  5. 后面就很好操作了  
     写好用户名密码端口号，点左下角的“Test Connection”  
     连接成功后点“OK”就行
- 呼出“generate”面板  
  快捷键：ALT+Insert
- 有时候装依赖会失败  
  解决方法：重启idea<span style='opacity:.5'>（目前为止重启都能装好）</span>
- 对于在pom.xml里新增的依赖，不会立即下载  
  要重启才会下载，或者在增加依赖后会出现一个按钮，鼠标划过显示“Load Maven Changes”  
  点击该按钮会进行下载



### Tomcat

一个支持jsp和sevlet的web服务器

- > 在中小型系统和并发访问用户不是很多的场合下被普遍使用，是开发和调试JSP 程序的首选 —— [百度百科](https://baike.baidu.com/item/tomcat/255751?fr=aladdin)

- > Tomcat处理静态HTML的能力不如Apache服务器 —— [百度百科](https://baike.baidu.com/item/tomcat/255751?fr=aladdin)



### [Lombok](https://projectlombok.org/)

> 用于简化实体类开发 —— [尚硅谷视频4分51秒](https://www.bilibili.com/video/BV12R4y157Be?p=6)

一个自动补全java代码的工具  
一般就用一个[`@Data`](https://projectlombok.org/features/Data)

- [`@Data`](https://projectlombok.org/features/Data)  

  > @Data=无参构造+@Setter+@Getter+toString方法+@EquaIsAndHashCode —— [尚硅谷视频5分29秒](https://www.bilibili.com/video/BV12R4y157Be?p=8&vd_source=ae01126b817131ef55ede61dd4709597)

- `@AllArgsConstructor`  

  > 所有参数的有参构造 —— [尚硅谷视频3分8秒](https://www.bilibili.com/video/BV12R4y157Be?p=8)

- `@Getter`

- `@Setter`

- `@EqualsAndHashCode`  
  重写equals和hashCode方法



### [JUnit4](https://junit.org/junit4/)

一个测试框架

- 会隐式导入对应文件夹下的所有类和接口  
  隐式的意思是不会出现导入（`import`）代码  
  - 什么叫“对应文件夹”  
    比如说真正的代码放在src/main文件夹下  
    而测试代码放在src/test文件夹下  
    那么`src/test/路径`和`src/main/路径`就是对应的
- 把方法变为可直接执行<span style='opacity:.5'>（不需要通过被调用才能执行）</span>  
  在方法上方加上`@Test`注解



### 在终端执行代码



**BeanShell**

可以支持java早期版本  

双击[`bsh-2.1.0.jar`](https://github.com/beanshell/beanshell/releases)即可打开GUI界面

- 打印  
  要用`print`方法  
  <span style='opacity:.5'>（`System.out.println(字符串)`和直接敲一个字符串是不会打印出来的）</span>



**jshell**

java9开始内置的工具

[java11的jshell文档](https://docs.oracle.com/en/java/javase/11/tools/jshell.html)

[java16的jshell文档](https://docs.oracle.com/en/java/javase/16/docs/specs/man/jshell.html)



### 无头浏览器

网上资料都是用Selenium做无头浏览器  
时不时会提到ChromeDriver，但搜不到ChromeDriver是什么





# 其他

- [运行单文件](https://dev.java/learn/launching-single-file-source-code-programs/)  
  java11开始内置这个功能
  
- [Java Bean](https://docs.oracle.com/javase/tutorial/javabeans/index.html)  
  一种类  

  - [具有以下特征：](https://zhuanlan.zhihu.com/p/410730923)

    - 提供一个默认的无参构造函数
    - 需要被序列化并且实现了 Serializable 接口
    - 可能有一系列可读写属性，并且一般是 private 的
    - 可能有一系列的 getter 或 setter 方法

    根据封装的思想，我们使用 get 和 set 方法封装 private 的属性，并且根据属性是否可读写来选择封装方法。

- IoC  
  控制反转或依赖注入

- Spring Framework  
  就是Spring
- [jar文件](https://baike.baidu.com/item/JAR/919533?fr=aladdin)  
  包含.class文件、元数据、资源（图片文本等）  
  以zip格式构建（可使用zip压缩工具创建或提取）

- 流程图  

  - > activity —— 文杰

  - 微同也有给后端用的流程图
