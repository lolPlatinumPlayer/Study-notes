
## 综述
- php是单线程脚本
- 每行语句必须用;结尾（脚本最后一行除外）
- 词语间可以空多行，以此来拆行。
- 所有用户定义的函数、类和关键词（例如 if、else、echo 等等）都对大小写不敏感
- 变量名对大小写敏感，常量可以选择是否对大小写敏感
- 可以用两个echo来输出一个标签
- echo输出普通字符串会变成文本节点
- 可以用switch(true)语法


## 报错
- Warning报错所有代码都能执行
- Notice报错只是代表报错那一句无法执行，情况有：（使用未赋值变量、写出未定义常量等）
- Fatal error（致命错误）会阻塞后续脚本运行，情况有：（连接数据库服务器失败、使用未定义函数等）
- try catch可以避免Fatal error的阻塞
- Parse error（解析错误）会导致整个php脚本失效，情况有：（不加 ; 、使用类似 1=1+1; 语句等）
- 自定义错误处理器无法处理Parse error和Fatal error
## 头部

这些代码写在最外层就行（已测php7.3）

- **跨域**

  ```php
  header("Access-Control-Allow-Origin: http://127.0.0.1:8080");
  // 星号代表所有↑
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
  header('Access-Control-Allow-Headers:x-requested-with,content-type');
  header('Access-Control-Allow-Credentials:true');
  ```

- **让php支持中文**
  `header("content-type:text/html;charset=utf-8");`

## 引号
- 单引号内部 变量、/n换行符 不解析，而双引号会解析（就算变量被单引号包围也会解析）
- 单、双引号中要打出单、双引号字符串要使用 /' 或 /" 


## 变量的操作
- var_dump(xx)用来判断数据类型并打印
- 变量可以写进字符串内输出，写在字符串外的话要加`.`来连接，无需空格
- 变量前可以不加空格【已测试打印情况】
- +=对字符串无效，要用 $a=$a .$new 代替


## 变量作用域
- 函数之外声明的变量拥有 Global 作用域，只能在函数以外进行访问
- 函数内部声明的变量拥有 LOCAL 作用域，只能在函数内部进行访问
- 函数内加上global $x,$y;就能访问到函数外的$x,$y
- LOCAL 作用域下的变量在函数执行后就会销毁，如果不希望被销毁，则需要在第一次使用前加上static 关键词
- 函数一定要放在最外层，放在if内也不行，不然整个脚本不执行也不报错


## 数组
- 一组值叫索引数组,一组键值对叫关联数组
- 数组无法直接打印,要用json_encode()包起来后才能打印
存“有中文的数组”，方法1：
`serialize(数组)`转成字符串存进数据库，读取的时候再`unserialize(数组)`就能变成php数组
【】之前也写过不用这个方法结果成功的，需要研究


## foreach(array as $x) 
遍历关联数组
- 循环内$x代表该次循环的array[$x]
- 遍历关联数组用foreach(array as $x=>$x_value)
- 循环内$x代表该次循环的键名
- 循环内$x_value代表该次循环的键值


## 类与对象
```
class class_name{
    var $cons;//声明成员变量（或叫类属性）
    var $a=11;//声明时可以赋值
    function get(){//成员函数（或叫成员方法）
        echo $this->a;//方法内操作成员变量前要加上$this->，无需再加$。调用成员方法同理
        echo $this->cons;
    }
    function set($set){//调用时可以传参
        $this->a=$set;//方法内操作成员变量前要加上$this->
    }
    /*
    __construct、__destruct分别为构造函数、解析函数
    无需调用也会执行
    新建对象时参数会传进构造函数并执行
    当对象结束其生命周期时执行解析函数（测试中基本是php脚本结束时执行）
    */
    function __construct($a){
        $this->cons = $a;
    }
}
$object_name=new class_name('str');//新建对象，如无构造函数可不加括号
$object_name->get();//调用对象内方法
$object_name->a++;//调用对象内公有变量
```
继承语法：class Child extends Parent { ..}
可以增加自己的属性、方法，也可对来自父类的属性、方法进行重写


## 类与对象中的访问控制
- var或public声明的属性为公有，能通过$object_name->a的方法调用
- protected的为受保护
- private的为私有。在继承链中形成作用域，范围是定义时所在的类，外部无法影响
- 方法前没有定义的话为公有，能通过$object_name->a()的方法调用
- 私有方法，在继承链中无法被 非 定义时所在类 用$this->fn()调用


## Ajax
php接收字段中有数组的话，接收后赋值给变量的都会变成php数组（而不是字符串或者json）
- $_REQUEST['属性名']可以获得接收对象的某个属性的值（通过input的name属性捕获到填写的数据也会存为一个属性值，属性名为name值）
- $_POST['']和$_GET['']也可以，不过各自只能对应一种提交方法。$_POST['']只能获取到form格式的内容。$_GET['']也可以直接根据url来捕获
- 提交表单后留在原页面的话，actoion的php写htmlspecialchars($_SERVER["PHP_SELF"]);
- empty()判断数据是否为空
- 用test_input封装修正提交数据的脚本
- preg_match("/^[a-zA-Z ]*$/",$name)检测name是否符合正则中要求，该正则意思为只允许空格和字母


## 文件操作
- include 'filename';在请求文件失败后会继续php脚本，而require不会

- readfile("")可以读取txt文件并将其中内容作为字符串打印出来，并返回文件中字节数，不阻断

- fopen(文件路径字符串,mode,等等)  

  - 常用mode值：  
    - `'w'`  
      如果后期要写入文本的话会覆盖原有内容
    - `'a'`  
      如果后期要写入文本的话会增加在原有内容背后

  - 赋值给变量，只会让变量在赋值时取值一次，不会实时更新  
  - 同时拥有读取与创建的功能，如果文件不存在，则会进行创建
- fread 一定要echo才会打印出来

- fwrite()第一个参数是要修改的文件，只能是变量，第二个参数是要写入的内容，格式任意

- 操作cookie要大约一秒后才会生效



## 数据库操作

- PDO  
  一个api，有一定防注入的能力  
  下面介绍PDO实例的方法
  - 执行一条SQL语句并返回受影响的行数  
    [`exec`](https://www.runoob.com/php/pdo-exec.html)
  - 执行一条SQL语句并返回受影响的行<span style='opacity:.5'>（感觉是用数组形式返回的）</span>  
    [`query`](https://www.runoob.com/php/pdo-query.html)
  

### MySQL

- 向mysql插入字符串数据时，变量周围要加引号
- 增加时间格式字段  
  （下面是测试结果，真实情况应该有更多操作空间）
  php向mysql创建时间格式只能选date、datetime、time
  php只能向mysql中插入当前时间，这三个函数都是属于sql的，方法如下：
  - NOW()函数以'YYYY-MM-DD HH:MM:SS'返回当前的日期时间，可以直接存到DATETIME字段中。 
  - CURDATE()以'YYYY-MM-DD'的格式返回今天的日期，可以直接存到DATE字段中。 
  - CURTIME()以'HH:MM:SS'的格式返回当前的时间，可以直接存到TIME字段中。 
- 部分存在godaddy数据库里的中文不能查看到正确文字，但是不影响读取

## 猜测

- 前后端传输数据其实都只能单级，并且每个字段只能是数字或者字符串


## 未归纳

- 请求同级文件的写法
  - `'qshydl.json'`
  - `'./qshydl.json'`



# phpstudy

- phpstudy默认不能获取中文名文件



### 原理

监听127.0.0.1:80，再修改hosts文件把你输入的域名定向到127.0.0.1