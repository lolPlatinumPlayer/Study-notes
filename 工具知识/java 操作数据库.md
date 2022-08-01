- java连接数据库最底层的方法是jdbc



# JDBC

- 增删改要提交事务



# [mybatis](https://mybatis.org/mybatis-3/zh/index.html)



资料

- 狂神视频的周边工具版本  
  [视频](https://www.bilibili.com/video/BV1NE411Q7Nx?spm_id_from=333.1007.top_right_bar_window_history.content.click)1分30秒  
  - mybatis：3.5.2
  - maveb：3.6.1（本机用的是IDEA自带的3.8.1）
  - JDK：1.8
  - MySQL：5.7
- [github](https://github.com/mybatis/mybatis-3/releases)
- [官方做的相关工具](https://blog.mybatis.org/p/products.html)
- 官网配套代码  
  官方应该没有出配套代码，[像`BlogDataSourceFactory`这种类只是用来示例的](https://stackoverflow.com/questions/22517318/cant-find-some-mybatis-classes-to-import-in-getting-started-guide)
  - [github用户kenu的版本](https://github.com/kenu/mybatis-examples/)





### 起步



安装

- 2种方式

  1. 将 [mybatis-x.x.x.jar](https://github.com/mybatis/mybatis-3/releases) 文件置于类路径（classpath）中即可

  2. 如果使用 Maven 来构建项目，则需将下面的依赖代码置于 pom.xml 文件中：  

     ```xml
     <dependency>
       <groupId>org.mybatis</groupId>
       <artifactId>mybatis</artifactId>
       <version>x.x.x</version>
     </dependency>
     ```

     

程序流程

1. 获取sqlSessionFactory
2. 获取sqlSession
3. 通过sqlSession执行sql



[**狂神demo**](https://www.bilibili.com/video/BV1NE411Q7Nx?p=2)

（本笔记不会对代码记得很仔细。要查看完整代码的话在这里查看：`sandCodeTest`里的`狂神mybatis起步代码存档`）

- 按[7分50秒](https://www.bilibili.com/video/BV1NE411Q7Nx?p=2&spm_id_from=333.880.my_history.page.click)创建项目  
  - 直到13分37秒就算建好子工程了  
    （建好子工程后会自动开始下载依赖）<span style='opacity:.5'>（依赖未下好时`pom.xml`里会报红，并且IDEA下方会有这种报错：`Unresolved plugin: 'org.apache.maven.plugins:maven-xxxxx`）</span>
- 连接数据库  
  - 在本笔记的IDEA部分搜索“连接数据库”查看  
  - 最终在`mybatis-config.xml`里写的url就是`数据库地址/mybatis?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF8`  
    而数据库地址就是“配置数据库的面板”里的URL
- 写一个获取`SqlSession`实例的方法  
  
- 运行代码  
  1. 打开`UserDaoTest`文件
  2. 点`test`方法旁的小三角
  3. 点`Run 'test()'`或`Debug 'test()'`
- 报错：`1 字节的 UTF-8 序列的字节 1 无效`  
  解决办法：把所有的`UTF-8`都改成了`UTF8`<span style='opacity:.5'>（UserMapper.xml没改就会报）</span>
- 报错：`### Error querying database.  Cause: com.mysql.jdbc.exceptions.jdbc4.CommunicationsException: Communications link failure`  
  解决办法：把`useSSL=true`改为`useSSL=false`  
  原因：只找到一句比较靠谱的话：不建议『在没有服务器身份验证的情况下』建立SSL连接  
  b站评论说开发和测试没必要用SSL





### `sqlSessionFactory`与`SqlSessionFactoryBuilder`

- 获取`sqlSessionFactory`  
  要通过`SqlSessionFactoryBuilder`获取，可以分为2种方式

  - 2种方法

    - 第一种：依赖xml获得  

      ```java
      InputStream inputStream = Resources.getResourceAsStream("xml的路径");
      SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
      ```

      - 本笔记称这里要依赖的xml为『factory xml』
      - 指定sqlSessionFactory使用的数据库连接  
        方法：往`SqlSessionFactoryBuilder.build`方法的第二个参数里传入环境的id  
    
    - 第二种：仅用java代码获得  
      **不建议用这种方式**  
      官方示例都是不完整的<span style='opacity:.5'>（缺少`BlogDataSourceFactory`类）</span>  
      而且比xml复杂得多  
      如果仍想了解的话可以在[官网](https://mybatis.org/mybatis-3/zh/getting-started.html#)搜索`不使用 XML`查看
  
- `SqlSessionFactoryBuilder`的更多说明  
  在[官网](https://mybatis.org/mybatis-3/zh/java-api.html#sqlSessions)搜索`SqlSessionFactoryBuilder 有五个 build() 方法`查看

- 一个`sqlSessionFactory`只可能有一个连接

  



### [factory xml](https://mybatis.org/mybatis-3/zh/configuration.html)

『factory xml』是自己起的名字，官网仅仅称为xml，『factory xml』代表生成`sqlSessionFactory`所需的xml

我们需要在这个xml里做的有2件事：①写好连接数据库所需的信息 ②指定映射文件

- 写好连接数据库所需的信息  
  由[`environments`标签](https://mybatis.org/mybatis-3/zh/configuration.html#environments)负责  
  这个标签可以包含多个`environment`标签  
  常见写法如下：  
  
  ```xml
  <environments default="默认环境的id">
  	<environment id="环境的id">
  		<transactionManager type="JDBC" />
  		<dataSource type="POOLED">
  			多个property标签
  		</dataSource>
  	</environment>
      多个environment标签
  </environments>
  ```
  
  - 在官网里一个`environment`标签代表一个环境  
    这个环境按目前理解就是数据库的连接 
  
  - 数据库信息存在`environment`标签的`dataSource`标签中  
    `dataSource`标签下包含多个`property`标签  
  
  - 一个`property`标签代表一条信息  
    信息名为`name`属性，信息值为`value`属性  
    一般`dataSource`标签下都是4个`property`标签  
  
    ```xml
    <property name="driver" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://数据库的连接地址"/>
    <property name="username" value="数据库连接的用户名"/>
    <property name="password" value="数据库连接的密码"/>
    ```
  
    - 连接地址背后可以带上`/数据库名`  
      这样在映射文件里写sql时就可以不带数据库名了（这时候写sql时带不带数据库名都没区别）
  
- [指定映射文件的位置](https://mybatis.org/mybatis-3/zh/configuration.html#mappers)  
  <span style='opacity:.5'>（可指定多个映射文件）</span>



### 映射文件

官网对『映射文件』的称呼并不统一，除了『映射文件』外还有这些称呼：`XML 映射文件`、`XML 映射器`、`SQL 映射文件`

- 示例  

  ```xml
  <?xml version="1.0" encoding="UTF8" ?>
  <!DOCTYPE mapper
          PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
          "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
  <mapper namespace="com.kuang.AAA">
      <select id="getUserList" resultType="com.kuang.pojo.User">
          select * from user where id = 2
      </select>
  </mapper>
  ```

- 有2种方式写sql  
  - 在映射器接口里用注解来写  
    详见本笔记的『映射器接口』部分
  - 在映射文件的标签里写  
    详见本笔记的『在标签里写sql』部分

- sql里参数的类型  
  和数据库里的类型无关
  
- 命名空间  
  就是`mapper`标签的`namespace`属性  
  <span style='opacity:.5'>（查看官网描述的方法：在[官网](https://mybatis.org/mybatis-3/zh/getting-started.html#a.E6.8E.A2.E7.A9.B6.E5.B7.B2.E6.98.A0.E5.B0.84.E7.9A.84_SQL_.E8.AF.AD.E5.8F.A5)内搜索`对命名空间的一点补充`）</span>

  - 作用  
    有如下2个用处  

    1. 指定映射器接口  
       如果要用『映射器接口实例』执行sql  
       那命名空间就必须是『映射器接口』<span style='opacity:.5'>（文件）</span>所处的位置  

    2. 直接调用sqlSession的方法执行sql的话  
       那命名空间就相当于『映射文件』的id  

       - 调用sqlSession的方法的例子  
         比如『映射文件』中有如下代码  

         ```xml
         <mapper namespace="namespace值">
           <select id="标签的id" resultType="Blog">
             select * from Blog where id = #{id}
           </select>
         </mapper>
         ```

         那调用sqlSession的方法的代码就如下  
         `返回数据=sqlSession.selectList("命名空间.标签的id");`  
         <span style='opacity:.5'>（不知道是不是只有命名空间为全限定名时才可以，关于全限定名的解释见[官网](https://mybatis.org/mybatis-3/zh/getting-started.html#a.E6.8E.A2.E7.A9.B6.E5.B7.B2.E6.98.A0.E5.B0.84.E7.9A.84_SQL_.E8.AF.AD.E5.8F.A5)）</span>

       

    

##### 在标签里写sql

<span style='opacity:.5'>（楠哥视频里这种方式称为“Mapper代理实现自定义接口”）</span>    

- 示例  

  ```xml
  <select id="sql语句的id" resultType="返回数据类型">
      select * from 数据库名.数据表名 where 字段名 = #{参数名}
  </select>
  ```

- 增删改查的标签都是作为mapper标签的子标签存在  
  增删改查的标签名是不一样的

- 参数  
  放在`#{}`中或者`${}`中

  - [`#{}`和`${}`](https://mybatis.org/mybatis-3/zh/sqlmap-xml.html#a.E5.AD.97.E7.AC.A6.E4.B8.B2.E6.9B.BF.E6.8D.A2)
    
    - 多参数和HashMap单参数只能用`#{}`
    
    - 原始值单参数2个没差
    
    - >`${}`不会转义 —— 官网
    
    - >`${}`接受用户的输入会导致潜在的 SQL 注入攻击 —— 官网
    
  - 原始值单参数  
    sql里写什么都可以，代表的都是那个参数
  
  - HashMap单参数  
    sql里要写hashMap的键名  
    <span style='opacity:.5'>（HashMap多参数的懒得试了）</span>
  
  - 数组单参数  
    没成功过  
    sql里写`[array]`不会报错，其他写法怎么写都报错
  
  - 多参数  
    接口方法里要写成多参数  
    然后sql里用`[0]`、`[1]`访问第1第2个参数
  
    - <span style='opacity:.5'>有的项目无法成功</span>  
      <span style='opacity:.5'>kenu-mybatis-examples里可以成功，test_mybatis_anything里无法成功，具体报错如下</span>  
  
      ```cmd
      org.apache.ibatis.exceptions.PersistenceException: 
      ### Error querying database.  Cause: java.lang.ClassCastException: java.lang.Integer cannot be cast to java.lang.String
      ### Cause: java.lang.ClassCastException: java.lang.Integer cannot be cast to java.lang.String
      ```
  
      
  
- 查询标签  
  [`select `标签](https://mybatis.org/mybatis-3/zh/sqlmap-xml.html#select)

  - `id`  
    sql语句的id  
    这是一个自己起的名字  
    [官网](https://mybatis.org/mybatis-3/zh/sqlmap-xml.html#select)里仅仅称为`命名空间中唯一的标识符`  
  - `resultType`  
    用来声明执行这部分代码后返回数据的类型  
    有以下几种写法
    - 一个类的地址
    - 原始数据类型
  - `parameterType`  
    入参类型  
    <span style='opacity:.5'>（官网的描述有点晦涩难懂）</span>  
    - 不写的话会自动推断类型（甚至多参数时各参数类型不同都可以）  
    - 可以指定为`string`、`int`等类型
  - 如果`<property name="url" value="jdbc:mysql://连接地址/数据库名" />`的话  
    sql里的`数据库名.`就可以省略
  - 参数名其实不需要和『映射器接口』里的一样  
    单参数的时候甚至写什么名字都可以

- 增删改标签  
  [insert, update 和 delete标签](https://mybatis.org/mybatis-3/zh/sqlmap-xml.html#insert_update_and_delete)  
  属性和查询标签稍有不同，但是基本一致
  
  
  
  
  
  
  
  

### 映射器接口

官网对『映射器接口』的称呼并不统一，除了『映射器接口』外还有这些称呼：`映射器类`、`映射器`

- 是否需要『映射器接口』  
  取决于执行sql的方式  
  如果用『映射器接口实例』执行sql，那理所应当是需要『映射器接口』的，并且『映射器接口实例』的方法都来自于『映射器接口』

- 指定SQL映射语句  
  一个方法对应一个SQL映射语句  

  - 如果sql语句写在映射文件中的话  
    方法名要和映射文件中对应标签的id<span style='opacity:.5'>（sql语句的id）</span>保持一致
  
    - 入参类型  
      要和对应标签的parameterType保持一致
    
  - sql也可以只写在『映射器接口』中  
    在方法上加上注解即可  
  
    ```java
    @Select("SELECT * FROM blog WHERE subject = #{id}")
    Blog selectBlogA(int id);
    ```
  
    - 提醒  
      这种写法在直接调用sqlSession的方法执行sql时同样是可用的  
      <span style='opacity:.5'>（不是只有在用『映射器接口实例』执行sql时可用）</span>  
  
- 查单条或多条  
  这是接口的返回值类型决定的  
  - 单条和多条的sql语句没有区别  
  - 如果查询结果为多条而接口返回值是单条类型，那就会报错
  
  



### [sqlSession](https://mybatis.org/mybatis-3/zh/java-api.html#sqlSessions)

- 获取  
  `SqlSession sqlSession =sqlSessionFactory.openSession();`
  
- 2种执行sql的方式

  - 方式一：用『映射器接口实例』

     ```java
     接口 mapper= sqlSession.getMapper(接口.class);
     返回数据=mapper.方法名();
     ```

     <span style='opacity:.5'>（接口要import）</span>  

  - 方式二：直接调用sqlSession的方法执行  
     <span style='opacity:.5'>（狂神和官网都不推荐使用）</span>  
     例子：`返回数据=sqlSession.selectList("命名空间.sql语句的id", 参数);`  
     <span style='opacity:.5'>（sql语句的id就是对应标签的id）</span>  
     <span style='opacity:.5'>（这种方式不用写接口。不过这种方式也能调用到用接口定义的方法）</span>
     
     - 参数
        - 参数不传也可以
        - 多参数的没成功过
        - 参数类型要和映射文件对应标签的parameterType保持一致
     - 查单条  
        `session.selectOne`  
        如果查出多条数据会报错
     - 查多条  
        `session.selectList`
     - 增删改的返回值  
        会返回影响的行数  
        <span style='opacity:.5'>（感觉用返回值判断是否执行成功没有意义，目前看不成功的话其他地方都是会报错的）</span>

- 增删改的方法执行完后要提交事务  
  也就是执行这个语句：`sqlSession.commit()`

- `sqlSession.close()`  
  网上资料众说纷纭  
  有说[不关闭会导致性能问题的](https://blog.csdn.net/jeryjeryjery/article/details/79116735)  
  有说[不需要手动关闭的](https://www.cnblogs.com/sxx1228/p/7063177.html)  
  有说[`finally`里有`sqlSession`就要关闭的](https://class.imooc.com/course/qadetail/165146)  
  目前选择在`finally`里关闭





# [MyBatis Generator](http://mybatis.org/generator/index.html)

依据数据库生成mybatis代码的工具



# [MyBatis-Plus](https://baomidou.com/pages/24112f/#%E7%89%B9%E6%80%A7)

**可学习内容**

- 可以试试搜索关键字中携带`_`  
  文杰说这样的话是匹配一个字符



**描述**

基于mybatis，在 MyBatis 的基础上只做增强不做改变，可以自动生成mybatis代码，用MyBatis-Plus之后就不需要用mybatis了

- 基于spring boot去开发会更加方便
- 没有接入到spring的官方孵化器当中，所以在idea新建项目时选不到MyBatis-Plus

**资源**

- [官方例子](https://github.com/baomidou/mybatis-plus-samples)
- [官方推荐的入门视频](https://www.imooc.com/learn/1130)
- [尚硅谷视频](https://www.bilibili.com/video/BV12R4y157Be?spm_id_from=333.337.search-card.all.click)

**起步**

- 搭建项目  
  只知道[官方demo](https://github.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-quickstart)可以跑  
  自己并不会搭

  - 安装  
    官网说依赖只要加下面这一个就行  

    ```xml
    <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-boot-starter</artifactId>
      <version>latest-version</version>
    </dependency>
    ```

    



官网《快速开始》关键点
1. 在 Spring Boot 启动类中添加 `@MapperScan` 注解，扫描Mapper文件夹
2. 写实体类  
   ```java
   @Data
   public class User {
       private Long id;
       表里的其他字段
   }
   ```

3. 在Mapper文件夹中写一个接口  
   ```java
   public interface 接口名 extends BaseMapper<实体类> {
   }
   ```

4. 然后就可以通过接口的实例操作数据库了  
   比如`List<实体类> 变量名 = 实例.selectList(null);`



[尚硅谷搭建项目](https://www.bilibili.com/video/BV12R4y157Be?p=4&vd_source=ae01126b817131ef55ede61dd4709597)

1. [用Spring Initializr创建工程](https://www.bilibili.com/video/BV12R4y157Be?p=6&vd_source=ae01126b817131ef55ede61dd4709597)
   1. 界面上点点点
   2. 在pom.xml里加上几个依赖：mybatis-plus-boot-starter、lombok、mysql-connector-java
2. [配置application.yml](https://www.bilibili.com/video/BV12R4y157Be?p=7&vd_source=ae01126b817131ef55ede61dd4709597)
   1. application.properties写：`spring.datasource.type=com.zaxxer.hikari.HikariDataSource`
   2. application.properties写：`spring.datasource.drive-class-name=`  
      后面写的内容依据mysql驱动版本来<span style='opacity:.5'>（视频2分53秒开始有教怎么判断）</span>
      1. 5版本的话后面写`com.mysql.jdbc.Driver`  
      2. 8版本的话后面写`com.mysql.cj.jdbc.Driver`
   3. spring.datasource.url写`jdbc:mysql://localhost:mysql服务端口号/数据库名?characterEncoding=utf-8&userSSL=false`
      - 如果是jdbc8的驱动后面要加时区<span style='opacity:.5'>（spring boot 2.1及以上是用8）</span>  
        `serverTimezone=GMT%2B8`
3. 弄好数据库<span style='opacity:.5'>（这个其实是最早教的）</span>
4. 编写实体类
5. 创建mapper接口  
   写个接口继承`BaseMapper`  
   代码示例：`public interface 接口名 extends BaseMapper<要操作的实体类> {}`  
   这接口就叫mapper接口
6. 扫描mapper接口所在的包<span style='opacity:.5'>（所在的包就是所在的文件夹）</span>  
   在启动类上加上`@MapperScan("mapper接口所在的包")`<span style='opacity:.5'>（视频中的启动类上方就有`@SpringBootApplication`）</span>  
   加上该注解后就可以将指定包下所有的mapper接口所动态生成的代理类交给IOC容器来管理
7. 编写测试代码
   1. 建一个测试类  
      在类上方加上`@SpringBootTest`<span style='opacity:.5'>（然后就可以在测试类中对IOC容器所管理的一些组件进行自动装配了，比如mapper接口）</span>
   
   2. ```java
      @Autowired
      private mapper接口 mapper变量名;
      
      @Test
      public void 测试方法名(){
          List<实体类> 存储结果的变量名=mapper变量名.selectList(null);
      }
      ```
   
      - 这时候`mapper变量名`的位置会高亮错误，但是不影响程序运行  
        要解决这个错误就去mapper接口上加上`@Repository`  
      
        > `@Repository`的作用是将一个类或注解标注为持久层注解 —— [尚硅谷视频](https://www.bilibili.com/video/BV12R4y157Be?p=10&spm_id_from=333.1007.top_right_bar_window_history.content.click)5分14秒
      
        <span style='opacity:.5'>（mapper里可以调出`BaseMapper`里的各种增删改查方法）</span>
      
   3. 运行测试方法



### 配置

- 运行时在终端里打出sql语句  
  在`application.yml`中加入如下配置  

  ```yaml
  mybatis-plus:
    configuration:
      log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  ```

  打印的相关内容前会带`==>`或`<==`



### 特性

- 查询的表名和传入`BaseMapper`的实体类的名字一样
- 插入重复id的数据会阻塞报错，比如用BaseMapper的`insert`方法插入





### 操作



##### `BaseMapper`

可以用`BaseMapper`实例做单表的增删改查

- 增删改的返回值都是受影响的行数



增

- 加一条  
  `insert(实体类)`  
  - 实体类没设id的话这个方法会给实体类加上id  
    mybatis-plus会用雪花算法生成这个id



删

- 根据id删除  
  `deleteById(id)`
- 根据实体类的id删除  
  `deleteById(实体类)`
- 删除字段为指定值的行（可删多行）  
  - `deleteByMap`
  - `delete(QueryWrapper实例)`
  
- 根据多个id来删除  
  `deleteBatchIds(多个id组成的Collection集合)`  

  - demo  
    ```java
    List<Long> list= Arrays.asList(第一个id,第二个id);
    userMapper.deleteBatchIds(list);
    ```

    

改

- `updateById(实体类)`  
  会去修改id和实体类一致的那行  
  实体类中拥有的字段会更新到那一行里<span style='opacity:.5'>（不需要拥有所有字段）</span>
- `update(实体类,wrapper)`  
  会把符合wrapper条件的行改为实体类的字段<span style='opacity:.5'>（实体类不需要拥有所有字段）</span>
  - 不会更改数据表里的id字段
  - wrapper用queryWrapper也是可以的<span style='opacity:.5'>（源码里写的是updateWrapper不过用queryWrapper也可以）</span>
  - 返回值  
    返回值是符合wrapper条件的行数<span style='opacity:.5'>（和实体类里的值没关系，就算实体类的值和表里原来的值一样，返回值也不会是0）</span>



查

- 查单个

  - 按id查单个  
    `selectById(id)`  
    返回实体类
  - 按wrapper查单个  
    `selectOne(queryWrapper)`  
    （内部通过调用`selectList`实现）
    - 没查到返回null
    - 查到1个返回实体类
    - 查到多个会阻塞报错`One record is expected, but the query result is multiple records`
    

- 一次性返回多个id对应的实体类  
  `selectBatchIds(多个id组成的Collection集合)`  
  <span style='opacity:.5'>（当然，只会返回匹配到的数据，如果没有数据被匹配到也不会报错）</span>

- 按条件查列表  

  - `selectList`    
    待学习

    - 查所有  
      `selectList(null)`
    
  - `selectByMap`  
    例子如下  

    ```java
    Map<String,Object> filter = new HashMap<String, Object>();
    filter.put("age",20);
    List<User> aaa=userMapper.selectByMap( filter);
    aaa.forEach(System.out::println);
    ```

- 判断是否存在  
  待学习







##### [条件构造器](https://baomidou.com/pages/10c804/)

就是表达条件的一个方法，比如可以用来表达大于等于小于

- [AbstractWrapper](https://baomidou.com/pages/10c804/#abstractwrapper)  
  是QueryWrapper和UpdateWrapper的父类
  
  - 增加一个全等条件  
    [`eq`](https://baomidou.com/pages/10c804/#eq)
  - 增加一系列全等条件  
    [`allEq`](https://baomidou.com/pages/10c804/#alleq)  
    依据Map增加一系列全等条件
    - 原本已经用eq增加的条件不会被抹去  
      就算是键名重复的也不会被抹去
    - `null2IsNull`
      - 默认值：`true`
      - 为`true`时  
        会把Map中为null的值加进条件<span style='opacity:.5'>（条件就是该值全等于null）</span>
      - 为`false`时  
        会忽略Map中值为null的键
  - 如果没加任何条件的话，就会匹配所有数据<span style='opacity:.5'>（通过测试得来的结论）</span>
  
- QueryWrapper和UpdateWrapper基本是一致的  
  一般都可以互相替代  
  只有少量方法有差异
  
- QueryWrapper  

  - demo  
    ```java
    QueryWrapper<User> wrap=new QueryWrapper<>();
    wrap.eq("id",17L);
    userMapper.delete(wrap);
    ```

    
