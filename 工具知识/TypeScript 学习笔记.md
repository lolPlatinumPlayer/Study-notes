### 学习目标

- 了解用ts写出的程序是否能在运行时有类型检查  
  答案：默认情况下是没有的
  - 如果没有的话  
    了解项目中用了ts写出的库后，编译项目阶段，输入该库的内容能否拥有类型检查（应该是有的）
- [使用第三方库的ts功能](https://v4.webpack.docschina.org/guides/typescript/#%E4%BD%BF%E7%94%A8-third-party-library)
- [ts与资源](https://v4.webpack.docschina.org/guides/typescript/#%E5%AF%BC%E5%85%A5%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)  
  前置学习内容
  - 用webpack导入资源





### ts的功能

- 用ts的话在编程阶段ide就会给出校验结果
  - 不同文件也会被视为处于相同作用域  
    比如说不能在不同文件中用`let`声明同样的变量、比如不同文件的同名接口也会进行合并  
    默认情况是这样的，[这里](https://www.jianshu.com/p/78268bd9af0a?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)略微有提到修改默认配置以取消这个特性的方法
- 编译阶段就会给出错误提示  
  并且webpack4默认拒绝编译有错误的生产环境包  
  不过`typescript`npm包是允许编译有错误的文件的



### 命令行

**`typescript`npm包**

装完后就可以用`tsc ts文件`编译ts了

可以局部安装



**`ts-node`npm包**

安装ts-node后就可以在node上直接运行ts，命令是`ts-node ts文件`

可以局部安装



### 类型注解

**用代码来解释『类型注解』**

```js
function greeter(person: string) {
    return "Hello, " + person;
}
```

这段代码中的`: string`就是类型注解

**『类型注解』的功能**

添加了类型注解的参数会被要求为必传，且数据类型加了限制

类型注解在会产生参数、变量、属性的地方都可以使用



### [接口](https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html#interfaces)

也就是对对象结构的定义

用处：用来做类型注解

- 如果设置了接口没有定义的属性  
  一样属于错误  
  不过面对用类创建的对象时，是允许拥有未定义的属性的
- [可继承](https://www.typescriptlang.org/docs/handbook/interfaces.html#extending-interfaces)
- 同名接口  
  （[官方文档](https://www.typescriptlang.org/docs/handbook/interfaces.html)里没看到相关说明）  
  可以写同名接口  
  最终发挥作用的接口是多个同名接口的合并  
  不允许在同名接口中把不同属性定义为不同类型







### 指定一些形参作为实例的属性

使用方法：在类的构造函数的形参前加`public`（普通的构造函数不能用`public`）

效果：可以让加了`public`的形参作为实例的属性