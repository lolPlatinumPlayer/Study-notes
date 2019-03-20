
if语句块内似乎如果红色报错，则会进入下一个语句块


# 【JS】ES5
		   
		   
## undefined
用undefined赋值可以把原有内容覆盖掉  
但是对对象的某个属性赋值undefined并不会将这个属性删除


## delete
`delete obj.attr`
1. 删除对象的属性
2. 删除对象
   以下两种对象可以用delete删除
    1. `window.obj='attr'`用这种方法声明的对象
    2. 不声明直接赋值的对象
3. delete后直接跟变量名的话就相当于对这个变量本身进行操作
   但如果是`delete 变量名.属性`的话，却可以通过引用传递删到代理的某个属性
   

## 与、或
- `&&`与前为true 时解析与后
- `||`或前为false时解析或后
- 与或后是表达式或者语句的话可以执行
  - 打印语句直接写就能执行
  - 赋值语句的话外面要加括号
  - 括号中可以写多个语句，语句用逗号分开，语句间也可以换行


## 字符串
`'abc'[1]`的结果是`'b'`


## 字面量
对象字面量：｛a:1,b:'aa'｝  
数组字面量：[1,4,3,2]  
函数字面量：function(){.. }  
以上这些方式直接出现的都叫字面量  


## 数组
```javascript
let a=[11,22]
a[6]='ss'
console.log('a',a) // [11, 22, empty × 4, "ss"]
console.log('a.length',a.length) // 7
console.log('a[3]',a[3]) // undefined
```
数组可以拥有属性（但是属性只能存在在原型链上）（只有数组和对象类型的数据可以拥有属性）


## 函数编写方法
函数有三种编写方法：
1. 函数声明：`function fnName () {…}`
   唯一一个会函数提升的编写方法
   相当于给window的原型加一个叫fnName的方法
2. 函数表达式
   通过在函数（命名或匿名皆可）前加运算符来让函数变成函数表达式，
   可加运算符有：`！`、`+`、`-`、`=`、`(`
   其中加`(`的话，后半个括号要补上，如第三点的写法。加`(`的写法在括号之中会形成独立作用域
   运算符的计算效果同样会生效
   函数表达式可以通过在后面加`()`来立即执行而函数声明不行
3. 立即执行函数
   立即执行函数不会给window的原型增加方法
    1. `(function(){... }())`
    2. `(function(){... })()`
		   
## 函数的其他内容
- 形参与实参的关系相当于`形参=实参`，所以是会发生引用传递的
- 函数都有一个name属性，值为函数名（es5中如果把函数表达式赋值给变量，这个函数的name属性将是空字符串）


## this
（要注意对象都会发生引用传递）
1. 非箭头函数
   谁调用就是谁
   比如`a.b()`调用者就是a
   `c=a.b;c()`如果在最外层的话调用者就是window
2. 箭头函数
   在哪产生就指向哪的上下文（如果是对象的某一层属性，那指向的就是对象所在的上下文）
   （所以如果一个函数的this不是window，那么在产生这个函数的过程中一定用了非箭头函数或者改变this的方法）
   例子：
    1. `let a={b:()=>this}`a.b不管怎么调用返回都是window
    2. ```javascript
          var obj={
            bar:function () {
              return ()=>this
            }
          }
          console.log(obj.bar()()) // 箭头函数是在obj.bar()产生的，所以this与obj.bar()一致
          let c=obj.bar
          console.log(c()()) // 结果：window。因为箭头函数产生于c()，上下文是window
       ```
3. 使用new的构造函数中
   this代表这个构造函数创建的对象，初始值是`{}`
4. bind方法
   `函数.bind(x)`返回一个this是x的函数
   不过bind似乎无法改变箭头函数的this
   （mdn上还有 传参、new等内容）


## 回调函数
作为函数实参的函数即为回调函数


## 高阶函数
1. 执行：
   函数返回结果是一个函数的话，这个返回的函数默认是不会执行的，除非用加括号或者其他方法去执行这个返回的函数
2. 作用域：
   如果一个函数return了另一个函数，return的函数会处于return它的函数的作用域中（就算return它的函数已经执行结束也是如此，作用域的关系会延续下去）
   如果函数接收另一个函数作为参数，则这两个函数的作用域将是同级的


## 在 javascript 中数据类型可以分为两类： （犀牛书中称为原始值和对象）
1. 原始数据类型值 primitive type，有五种：Undefined,Null,Boolean,Number,String。
2. 引用类型值，也就是对象类型 Object type，除了5种原始值外一切皆对象，比如Object,Array,Function,Date等。
声明变量时不同的内存分配：
1. 原始值：
   存储在栈（stack）中的不可变数据，每个原始值在栈中都有独立的空间来存储。
   除了字符串外，不可能有两个全等的原始值；就算两次用相同的字符串字面量给变量赋值，js也会在栈中开辟两个位子存放这两个字符串（个人猜想）
2. 引用值：
   存储在堆（heap）中，引用的结果是栈中的值或另一个引用
   引用分两种：
    1. 映射的引用：比如数组和狭义上的对象。数组的子项通过序号映射到一个原始值，而狭义对象通过字符串映射到原始值
	2. 非映射的引用，比如`=`。
	   `let a=1`后a获得的就是一个非映射引用，引用的指向是原始值——1。
	   之后把a赋值给任何变量，这些变量的引用都是相同的。
	   如果赋值给a的是广义对象，那就有可能发生下文说的引用传递
这么设计的原因：
引用值的大小会改变，所以不能把它放在栈中，否则会降低变量查寻的速度。相反，放在变量的栈空间中的值是该对象存储在堆中的地址。地址的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响。


## instanceof
`对象 instanceof 构造函数`  
mdn的说明是判断构造函数的prototype属性是否出现在对象的原型链中，不过粗略测试后感觉是构造函数或类是否出现在对象的原型链中  
`instanceof Object`的话数组、日期也会判断为true，但是`String instanceof String`这种情况都是返回false


## 对象（下文的对象都指广义对象）
在`let a={a:1}`中发生的几件事：
1. 栈中开辟空间存放原始值——1
2. 堆中创建一个引用（犀牛中称为基对象），这个引用是映射引用的集合，这个集合里包含一个映射引用——通过字符串`a`引用到原始值1
3. 变量a通过非映射引用引用基对象
==或===对比变量都是对比变量背后引用的结果（或者说引用指向的内容），而用==比较任何引用的结果都是false，所以就算用一样的字面量给不同变量赋值，最终用==或===得到的结果都是false
属性名：可以是任意字符串
方法：对象的属性值是函数时这个属性被称为方法


## 引用传递（有时也被称为“引用传值”）
- 定义：将一个变量赋值给另一个变量后，使其中一个变量的一部分发生改变， 这个变化会同步到另一个变量上，那就说发生了引用传递
- 触发条件：赋值变量的值是广义对象，操作变量的子项就会发生引用传递
- 规避方法：
    1. 浅拷贝：规避操作第一层子项时的引用传递
    2. 深拷贝：规避操作所有层子项时的引用传递

	
## 浅拷贝方法
- `...`（最优方案）
- 被赋值变量=Object.assign(x,赋值变量) 
  x处根据赋值变量的值是数组还是对象来选择是输入空数组还是空对象
- objectA = { a: objectB.a, b: objectB.b, c: objectB.c }
- `b=[].concat(a)`
  

## 深拷贝方法
- $.extend(objectA, objectB )//等待重新测试
   （使用这种方法的前提是：objectA是空对象，对象类型是对象。这是一个jq方法）
- A=JSON.parse(JSON.stringify(B))
- 自己写函数一层一层赋值


## 制造对象
最原始的方法如下（基本不会用这种方法，这种方法创建的对象.constructor不会显示函数中的代码，只会显示`? Object() { [native code] }`）
```javascript
function createObj(){
  let obj = {}
  obj.name = 11111
  return obj
}
let obj1 = createObj()
```
其中用来创建对象的函数被称为 构造函数
使用new关键字可以简化一些代码
```javascript
function createObj(){
  this.name = 11111
}
let obj1 = new createObj()
```


## 在原型上增加属性
方法：在构造函数外给`构造函数名.prototype.属性名`赋值 【】语言整理下就行
- 这种方法会给这条语句后所有由该构造函数创建的对象的__proto__属性增加属性（__proto__属性应该就是原型）
- 这条语句后的对象可以用访问普通属性的方法访问这些属性（前提是普通属性中没有和这些属性同名的）
- 上面两条的限定条件为：
  - 在这个语句后生效
  - 这个语句前新建的对象在这语句后也能生效
- 对Array、Object、Date等原生构造函数也能进行这样的操作（就算在某个作用域内也会对所有目标生效，要注意`{}`字面量无法使用`.`运算符）
- 这种方法增加的方法互相之间是全等的，比在构造函数里增加更节省资源（构造函数里增加的方法在不同对象间是独立的）


## 原型链
原型也可以拥有原型，这样一直往后追溯的原型的链条就称为原型链  
- 原型链上的属性或方法对象都可以直接调用


constructor（译文：构造函数）
prototype（译文：原型）
打印 构造函数名.prototype.constructor 则会显示函数内容（与直接打印一致）
打印 对象名.constructor 则会显示其构造函数



## 对象属性
有2个判断不同的依据：
1. 是否可枚举
2. 是否处于原型中
详见：https://www.cnblogs.com/kongxy/p/4618173.html
没有顺序，如果chrome打印的话是按照首字母排序


## 对象其他内容
- 数字字符串键名的话，`对象[数字]`也能访问到键值（已测试了各浏览器）


## Object.keys(obj)
返回一个数组，数组包含了对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名
数组的子项都是字符串
如果属性名中不含数字的话，则这个数组会按赋值先后排序
包含数字则按数字大小排序
es5中对非对象使用会报错，而es6会返回内容（如：对字符串使用则会返回一个从0开始的数组，数组长度与字符串长度一致）


## sessionStorage和localStorage
这两个都属于web存储，都限定在同文档源（协议、主机名、端口号）（根据https://segmentfault.com/a/1190000004121465 描述，应该也限定于同域名下，且子域名无法继承父域名localStorage）
sessionStorage除以上限定外，还限定与窗口，窗口关闭则数据销毁
正式存、取方法应该用setItem和getItem来，（稍微看了书和博客还是没研究清楚多级对象的存储）


## for(const 变量 in 对象) （变量前面最好加上声明关键字，不然编译后chrome会报错且js无法运行）
- 遍历一个对象的可枚举属性，在每次迭代时会将本次循环到的属性名分配给变量
- 对于数组也可以使用`for(const 序号 in 数组)`
    - 所有被赋值的子项都会进入循环
    - 如果遇到数组元素为空时，不会执行本次循环
    - 序号是字符串
    - 对数组并不会一定按顺序遍历
- 对象或数组.hasOwnProperty(attr)判断对象或者数组自身(不包括原型链)是否具有指定名称的属性或序号，返回布尔值（该方法属于Object对象，由于所有的对象都"继承"了Object的对象实例，因此几乎所有的实例对象都可以使用该方法）


## forEach遍历数组
array.forEach(function(currentValue, index, arr) {
},this)
花括号间可使用变量如下：（需先在函数参数中或者forEach第二个参数中写下，否则花括号内无法使用）
    currentValue代表当前循环的值，对这个值的操作不会返回到原数组上。除了这个参数外其他参数都是可选的
    index代表当前循环索引值
    arr代表整个数组
    this处可以传入一个值，最好用对象或数组，数字或字符串不好处理


## .map()
arr.map(fun)
将arr的每一项经过fun处理（return）后形成这一项新的内容，这些新的项集合成一个新的数组，最终返回这个新的数组 （注意是每一项，不管是否return，每一项的处理都会返回一个子项，就是说处理后的数组长度一定与调用map的数组长度一致）【】测试一下在回调中删掉this末尾项会如何  
map面对空子项时不会执行回调，但是还是会返回一个空子项（这里指的是真正的“空”，没有任何内容，控制台打印也是empty，null、undefined这种不算空子项）  
四个参数与forEach一致，但是this经过多次测试都没成功  
this不会指向返回的数组  
map似乎全面领先forEach。map可以return，而forEach不行，而且forEach似乎有兼容性问题 


## break
break可以跳出for循环、switch（其他没测试）


## filter
`var XX = arr.filter(callback)`
callback中返回的是布尔值，为真的子项会进入新数组
单参数代表前面的arr


## typeof a
返回a的数据类型，返回值是字符串，优先级第二级，测试表如下：
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof
注意：对于数组返回的是和对象一样的'object'


## push
`arr.push(xx)`
没输入xx则不执行这个方法
只要有输入xx，不管值是什么都会向arr末尾增加一个值为xx的子项
可以输入多个xx
不可用于对象


## join
arr.join(xx)返回一个字符串，这个字符串包含arr数组所有子项，子项间用xx分隔
如果不填xx，则用英文逗号分隔
子项是数组的话，也会按顺序打印，并用逗号分隔，层级再深都能打印
子项是对象则会转为字符串'[object Object]'
（以上两行规则和直接输入到html的规则相同）


## split
返回一个数组，这个数组是输入字符串按separator分割后组成的
格式：字符串.split(separator,howmany)
      separator是用来分割的字符串（结果不会包含separator）
      howmany指定分割出来的数组长度的最大值
若 用来分割的字符 在头或者在尾，则头或者尾一侧的子项为空字符串


## concat
arrayObject.concat(arrayX,arrayX,......,arrayX)
该方法返回一个数组，这个数组连接了调用它的内容和传进去的内容，如果传进去的不是数组则会作为元素连接
只有字符串或数组能调用这个方法，如果是字符串调用这个方法的话，字符串将会拼接在第一个元素前


## slice
`arr.slice(begin,end)`
返回一个数组，其元素从arr[begin]开始到arr[end]结尾（不包含arr[end]）
可以不输入end，end不大于begin的话返回空数组
输入负数则代表从末尾开始数（-1代表最后一个）
返回数组子项顺序与原数组一致


## splice
`arr.splice(index,howmany,item1,.....,itemX)`
从数组中添加/删除项目，然后返回被删除的项目
1. index	添加/删除项目的位置（包含），使用负数可从数组结尾处规定位置
1. howmany	要删除的项目数量。如果设置为 0，则不会删除项目
1. item1, ..., itemX	（可选）向数组添加的新项目


## JSON.stringify()
返回 转为JSON格式字符串 的 传入js对象或数组
第三个参数可输入数字或者字符串，这个参数生效的话就会对结果进行格式整理
1. 输入数字代表缩进（缩进个数为0到10）
2. 输入字符串则代表缩进用字符串进行填充（也是0到10个字符，可输入转义字符）
这个方法不能直接对有循环引用的内容使用，否则阻塞报错“Converting circular structure to JSON”
遇到这情况在第二个参数传入如下函数后即可正常返回
```javascript
//（这个例子不行）
function(key, value) {
  if (typeof value === 'object' && value !== null) {
	if (cache.indexOf(value) !== -1) {
	  // Duplicate reference found
	  try {
		// If this value does not reference a parent it can be deduped
		return JSON.parse(JSON.stringify(value));
	  } catch (error) {
		// discard key if value cannot be deduped
		return;
	  }
	}
	// Store value in our collection
	cache.push(value);
  }
  return value;
}
```


## 正则
- 写法基本都用`/表达式/`这种方法写，虽然`new RegExp(字符串格式表达式)`效果基本一致，不过后者操作起来有点麻烦
- 判断字符串中是否有内容被匹配到
  `表达式.test(字符串)`返回布尔值
  test是这些方法中唯一一个不能用纯字符串当表达式的
- 返回被匹配内容的序号
  `字符串.search(表达式)`
  第一个字符就匹配到的话就是0，都没匹配到就是-1
- 返回匹配内容
  `字符串.match(正则)`
  - 正则后不加g只会匹配一次，匹配不到返回null，匹配到则返回一个有一个子项的数组，以及一些相关数据。
  - 正则后加g的话会匹配多次，匹配不到返回null，匹配到则返回数组，没有相关数据
  （这里记录的方法中只有replace和match可以用）
- 替换匹配内容
  `要被替换的字符串.replace(正则,替换的字符串)`
  - 正则后不加g则将第一个匹配到的内容替换为第二个参数
  - 正则后加g的话则将所有匹配到的内容替换为第二个参数
- 正则的[]几乎可以把中间所有原来有功能的符号转为无功能的（包括空格）


## 定时器
setInterval和setTimeout  
- 定时器获取的变量值都是其执行时的变量值
- 清除定时器循环的例子：  
  ```javascript
  let sss=1
  const aa=setInterval(function () {
  sss++
  console.log(sss)
  if(sss>11){
      clearInterval(aa)
    }
  },111)
  ```


## 选择器
- 单个元素
  `document.querySelector(字符串格式的css选择器)`   
  详见https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector
- 多个元素
  `document.querySelectorAll(字符串格式的css选择器)`
  

## 事件
这里列出最正规的方法
以下事件名不加on
第三个参数可以传入布尔值选择是否冒泡
- 增加事件
  `元素.addEventListener(字符串事件名, 函数名)`
- 移除事件
  `元素.removeEventListener(字符串事件名, 函数名)`


## 数字操作
四舍五入 Math.round(7.25)
取出大的值 Math.max(2,4)


## 下载文件
- 不用打开新页面的方法： 给`window.location.href`赋值下载的网址
- 要打开新页面的方法： `window.open(下载的网址)`


## throw exception
抛出一个自定义错误，exception为错误内容，可以是对象、数组、字符串、错误对象等


## <<、>>、<<<、>>>
按位移动运算符。
在二进制位移，返回十进制。
向左的即为左移，在右侧加上位移数个数的0，反之同理
a<<b在数学中相当于a=a*2^b，反之类似




#  【JS】ES6
	   
	   
	   

· 模块
import和export
大部分浏览器无法实现，不过webpack中可用
以下提到的 变量 包括 函数（函数名后不应加括号）


· 模块的地址表示
1、../xx代表上一级目录中的文件
2、若地址中只写到文件夹而没有写到具体文件，则代表该文件夹中的index.js文件（各处文档均未提及，不过确实可用）


· export负责输出
两种格式：
    1、export{a,b}
    就算只export一个变量也要用括号，之后import也要带括号
    2、export var a='xx'
    这种格式不能用as在输出时重命名变量
两种格式 变量在export前或export时都必须定义，且不可重复定义
export可以位于模块顶层任何位置（即不能放在块级作用域内），import命令也是如此


· 动态绑定
例子：export var foo = 'bar';
      setTimeout(() => foo = 'baz', 500);
用webpack【测试失败】，原因可能是其遵循的是来自nodeJS的CommonJS规范
可能加babel或者vue-cli后可以成功


· as负责重命名
不管在export还是import中，as前的都是原变量名，as后的都是重命名后变量名
as可以将一个变量重命名为多个变量


· import负责输入
语法：
    1、import {a} from './s2'
    这种语法针对export的输出，可以引入多个变量
    2、import b from './s3'
    这种语法针对export default的输出，意思为 导入./s3模块并命名为b
    3、import {a} from 'util';
    这种语法需配置，配置方法与nodeJS自定义模块一致
    4、import * as a from './b';
    针对export输出，将./b中的变量都重命名为a.x1、a.x2等
import from的地址可以省略.js，（慕课react实战里说是脚手架的功能）
import在静态解析阶段执行，所以它是一个模块之中最早执行的。
由于import是静态执行，所以不能使用 表达式、变量 这种只有在运行时才能得到结果的语法结构。
而export可以用export var i = k这种语句


· export default
与nodeJS的module.exports类似，不过不同的是export default可以与export共同使用，在引入时还有简写import a, {b,c as d} from 'only_name';
export default本质是输出一个叫default的变量，所以不能使用export default var a = 1这种写法，而可以使用export default 1这种写法
export default可以输出类【未测试export行不行】


· export 与 import 的复合写法
1、import { foo, bar } from 'my_module';
   export { foo, bar };
   可以简写为export { foo, bar } from 'my_module';
可以用as，甚至可以用as让具体接口和默认接口互相转换
和*
默认接口的写法为：export { default } from 'foo';

关于模块还有更多内容在http://es6.ruanyifeng.com/#docs/module
暂时研究到这


· “:function(a)” 可缩写为 “(a)”


· 箭头函数
简化 “function(){return(函数内容)}” 的写法
无参数：  ()=>函数内容  相当于  function(){return(函数内容)}
单参数：  x=>函数内容  相当于  function(x){return(函数内容)}
多参数：  (x,y)=>函数内容  相当于  function(x,y){return(函数内容)}
多行值：()=>(值)  相当于  function(){return(值)}
多行语句：()=>{函数内容}  相当于  function(){函数内容}
bug写法：`()=>对象字面量`  估计是因为这里的花括号会被解析成语句块的花括号


· 属性名简写
属性名与属性值变量名相同时可以只写一个
属性名与属性值的函数名相同时可以直接写 “函数名(xxx){.. }”
如果属性值是匿名函数好像也可以直接写“属性名(){.. }”


· 声明与作用域
var：若在块内声明，则与块外同名变量为两个不同变量；若块内没有声明，不管块外声明与否，块内外同名变量都为同一个变量
函数嵌套：规则如上，块为声明函数处的闭包。详细说就是：若A函数中使用了B函数，则这两个函数中变量的作用域都遵从以下准则：有声明的在函数内自成作用域，没声明的与声明该函数处外部作用域一致。
let/const与var区别：
1. let/const在声明语句前使用会直接报错“is not defined”，而var会返回undefined，因为var的声明会提升至作用域顶部，而赋值不会提升
2. var可以重复声明，而let/const会报错“has already been declared”
3. var不会在在花括号形成独立作用域，而let/const会（这个花括号包括条件语句、循环语句中的花括号以及直接写的花括号）
4. var声明变量会给window的原型加属性，而let、const不会
let与var仅有以上区别，const除了以上区别外，const在声明时必须赋值，而且其声明的变量不能在其他地方赋值。
但是有两种情况可以让声明后的const看起来像被改变：（其实对常量赋值的引用并没有被改变，被改变的是引用另一头的内容）
   1. 常量依赖的变量改变
   2. 常量是个数组或对象，其子项可以被改变或增删


· 解构赋值
1、
var a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20
2、
[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]
3、
({ a, b } = { b: 10, c:111,a: 20 }); //这个语法等号前不能用数组形式
console.log(a); // 10
console.log(b); // 20
4、
({a, b, ...rest} = {a: 10, d: 30,  b: 20,c: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); //{d: 40 , c: 30}
以上测试数组都可以用变量代理【数组中的变量名要不要用字符串格式？】
5、函数（对象式、有默认值）传参
function move({x = 1, y = 1} = {}) {
    console.log('x:',x);
    console.log('y:',y);
}//用这个语法就可以跳出按顺序传参的限制，可以只传想要的参数
使用时函数参数应为对象形式，如下：
move({ y: 8});
若无传参，或传参格式不正确，都会使用默认值，会使用默认值的情况如下：
move({});
move();
move(11,22);
move(11);
move([11,22]);
move([11]);
6、解构实参（以下是自己测试的结果，在《ECMAScript6入门-阮一峰》里没找到相关内容）
`function Fn({x}){函数内容}`
函数内x就直接代表实参（对象）的x属性


## 类
``` javascript
class 类名 {
  constructor(x, y) { // 构造函数可以不写，js会自动生成
    // 这里写原来写在es5构造函数中的内容 
    // 构造函数的形参指向new类时传入的实参，这点和es5构造函数一样
    // 这里如果return的话，制造的对象就和普通函数没多大区别了（比如方法不会加上去）
  }
  方法名() {
    // 这个方法会加在（类及其产生的对象的）原型链上（与给`es5构造函数名.prototype.方法名`赋值函数效果一致）
  }
}
```


## 类的静态方法
```javascript
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}

Foo.bar() // hello
```
- 类中非静态的内容都是给实例用的，而静态的内容都是给类用的，包括静态方法里的this的指向也是类而不是实例
- 静态方法可以在静态方法中用super调用
- 静态方法可以与非静态方法重名


## 类的继承
子类会继承父类的方法，并执行父类的构造函数
- super  
  子类要写构造函数的话，里面一定要放super()，不然会阻塞报错  
  执行super意味着执行父类的构造函数，并添加父类属性、方法，最终创建this  
  所以super前不能用this  
  （super()只能写在构造函数里，而且只能写一次；不能用`super`这种形式直接存在；在构造函数里`super.静态方法`只会返回undefined）
- 子类new出来的对象，同时是父类与子类的示例，instanceof 父类或子类都是true


## 类的存值函数和取值函数
```javascript
  class MyClass {
      set prop(value) {
          console.log('setter: ' + value);
      }
      get prop() {
          return 123
      }
  }
```
用存值函数和取值函数可以创建一些特殊的属性
在chrome控制台这些属性是半透明显示，而且是点击“(...)”后获取其值，对这些属性用hasOwnProperty结果也为false
目前不知道如何让这样创建的属性拥有正常的读写功能
- 存值函数
  在给属性赋值时会运行的函数，形参是赋给属性的值，这个函数的return没有意义
  不设存值函数的话除了没这个函数的功能外似乎没有其他影响
- 取值函数
  在读取属性值时运行的函数，这个读取行为包括在chrome控制台点开“(...)”
  return的值是最终读取到的值
  如果不写取值函数，实例就不会拥有这个属性，不过还是可以给这个属性赋值
  

## Promise
（内容很多，这里只写非常小的一部分）
Promise对象是一个构造函数，用来生成Promise实例。
下面代码创造了一个Promise实例。
    const promise = new Promise(function(resolve, reject) {
        // ... some code
        if (/* 异步操作成功 */){
            resolve(value);
        } else {
            reject(error);
        }
    });
- then（来源于Promise，以下都是个人猜测，未经验证）
  then解决了两个问题
  - 如果要一个函数运行后获取其计算出的值，再对这个值进行操作。
    - 无then的情况：就要多一层嵌套，而且代码也要多一行以上
    - 可以让**计算出这个值后的语句**对**再之后的语句**行成异步，可以缩短部分运算时间
  - 语法
    promise.then(onCompleted, onRejected);
    - promise
      必需。Promise 对象。
    - onCompleted
      必需。承诺成功完成时要运行的履行处理程序函数。
    - onRejected
      可选。承诺被拒绝时要运行的错误处理程序函数。
   

## Promise相关可行的例子
1.
	```javascript
	const go= new Promise((resolve, reject) => {
	    setTimeout(resolve, 555, 'done')
	})
	go.then((value) => {
	    alert(value)
	})
	```
2.
	```javascript
	async function drawBuilding() { // 要用await，其所在函数体外一定要加async
	    const result = await timeout(1100).then((value) => { // 在函数前加await可以让函数在完成前让语句保持阻塞
		return value
	    })
	    console.log(result); // done
	    return result;
	}
	const aa= drawBuilding()
	console.log(aa); // Promise对象
	```
3.
	```javascript
        async function getBorderCanvas({width,height,lineWidth,color}) {
            // ......
            const afterLoading= new Promise((resolve) => {
                let img = new Image()
                img.src ='resource/border-img.png'
                img.onload = function(){
                    ctx.drawImage(img,0,0,canvasWidth,canvasHeight)
                    resolve()
                }
            })

            return await afterLoading.then(() => {
                return canvas
            })
        }
	```
        如果要获取加了async的函数return值，必须用await


## catch
等于then处理承诺被拒绝的功能
	
	
## fetch
```javascript
    fetch(一个请求或者一个php文件)
        .then((请求返回的内容)=>{
            return 请求返回的内容.对于这个内容的方法()//这里可选的方法详见https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#Body
        })
        .then((上一个then return出来的东西)=>{
        //一些操作
    })
```


## new request（未测试不用new request是否能成功）
```javascript
    let myImage = document.querySelector('img');
    var myRequest = new Request('flowers.gif');
    fetch(myRequest) // 返回一个Promise对象
        .then((res)=>{
            console.log('res:',res);
            return res.blob() // res.text()是一个Promise对象，但是个人测试发现是php echo出来的文本
        })//return的东西会给下一个then用
        .then((res)=>{
            var objectURL = URL.createObjectURL(res);
            myImage.src = objectURL;
            console.log(res) // res是最终的结果
        })
```


## Object.assign(object1,object2,object3等等)
参数要求是对象或数组
把除第一个参数外的参数的属性添加到第一个参数上,同时返回处理后的第一个参数的值
遇到同名的属性后面的会覆盖前面的
要把数组加到对象里的话，数组就会化为属性名为其序号的对象参与到assign中 
第一个参数写空对象或空数组可以实现浅拷贝


## 参数默认值语法（default parameter）
```javascript
function a(p0,p1='p1'){
    // 按顺序给参数赋予默认值（目前js用原生api给真正的函数参数默认值的话也只能按顺序给）
}
```


#  【JS】ES7


## 对象展开运算符（或称扩展运算符）（Object rest spread）
（ES6的stage-3、ES7）
...后的内容可用变量代理
- 使用条件：
  1. cnpm install --save-dev babel-plugin-transform-object-rest-spread
  2. .babelrc中加"plugins": ["transform-object-rest-spread"]
- 运用于对象 
  1. 代码：（序号后不写点东西就变成行内代码了）
     ```javascript
     let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
     console.log(x); // 1
     console.log(y); // 2
     console.log(z); // { a: 3, b: 4 }
     ```
  2. 代码：
     ```javascript
     let n = { x, y, ...z };
     console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
     ```
  3. vuex的辅助函数
- 运用于数组
  ...array可以把数组的各子项变成各参数，console.log、运行函数时传入参数中都可用，array与[...array]相等
    1. 在document.write中，加不加...输出都是用英文逗号隔开
    2. 定义函数传入参数前加上...，如function a(...x)
       则函数中x代表所有传入参数组成的数组
       ...x代表所有传入参数，可以再传入其他函数，直接document.write会将参数连着打出，console.log则会在参数间加入空格打出
    3. 函数编写时形参中的运用，可在最后一个参数前加上...
       意思是把最后几个实参合成一个数组，例子：
       ```javascript
          function a(first,...aaa){
            console.log('first',first); // 11
            console.log('aaa',aaa); // [22,33]
            console.log('...aaa',...aaa); // 22,33
          }
          a(11,22,33)
       ```
    4. 可以使用三元运算符，如...(x > 0 ? ['a'] : [])
    5. arr1.push(...arr2)意为把arr2每个子项都加到arr1数组后面（前面有push的介绍）
- 运用于字符串
    1. 将字符串转为数组
    `[...'hello']` // [ "h", "e", "l", "l", "o" ]
（更多内容见http://es6.ruanyifeng.com/#docs/array#扩展运算符）


# 【算法】


## 取余（%）
- a、b都是正数时
  a%b=c 意味着 a=b的整数倍+c 且 0<=c<=(b-1)
- a是负数b是正数时
a%b=c 意味着 a=b的整数倍+(-c) 且 0>=c>=-(b-1) 也就是 c为用a绝对值取余b的结果的相反数


## 递归
- 不引入函数外变量，不用引用传递的话，单次递归返回全部处理后的树的方法
    ```
    const 模拟数据=[
        [
            112,
            213,
            [
                334,
                544
            ]
        ],
        772,
        [
            888
        ]
    ]
    console.log('结果',kk(模拟数据))
    
    function kk(arr) {
        let resultOfThisLevel=[]
        if(isArr(arr)){
            for (let i=0;i<arr.length;i++){
                resultOfThisLevel=[...resultOfThisLevel,...kk(arr[i])]
            }
            return resultOfThisLevel
        }else {
            return [arr]
        }
    }
    function isArr (o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }
    ```


# 其他


## chrome控制台
- debugger后控制台就属于debugger的环境，chrome的source里点击行首也有相同效果
- 谷歌控制台...的属性似乎都是点击时获取的，有时候打印结果是异步的


## MVC与MVP
MVC中V（视图）需承担显示以外的功能
MVP中V（视图）无需承担显示以外的功能
两个模式中M与P、M与C分界都比较模糊，但存放数据的功能都是由M完成


