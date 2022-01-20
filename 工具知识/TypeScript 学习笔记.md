- [某个中文教程](https://ts.xcatliu.com/introduction/index.html)



### 学习目标

- 了解用ts写出的程序是否能在运行时有类型检查  
  答案：默认情况下是没有的
  - 如果没有的话  
    了解项目中用了ts写出的库后，编译项目阶段，输入该库的内容能否拥有类型检查（应该是有的）
- [ts与资源](https://v4.webpack.docschina.org/guides/typescript/#%E5%AF%BC%E5%85%A5%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)  

不着急了解的功能

- `as`  
  例子：const myUserAccount = jsonParserUnknown(\`{ "name": "Samuel" }\`) as User
- string[]
- `&`  
  例子：`type Owl = { nocturnal: true } & BirdType`
- `namespace`
- [source map](https://v4.webpack.js.org/guides/typescript/#source-maps)



### ts的功能

- 用ts的话在编程阶段ide就会给出校验结果
  - 不同文件也会被视为处于相同作用域  
    比如说不能在不同文件中用`let`声明同样的变量、比如不同文件的同名接口也会进行合并  
    默认情况是这样的，[这里](https://www.jianshu.com/p/78268bd9af0a?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)略微有提到修改默认配置以取消这个特性的方法
  
- ide可以获得悬停提示（比如某个变量有哪些成员）
  
  - 如果是jsdoc的话还可以获得额外说明
  
- 编译阶段就会给出错误提示  
  并且webpack4默认拒绝编译有错误的生产环境包  
  不过`typescript`npm包是允许编译有错误的文件的

  



##### 特性

- ts文件可以从普通js文件中获得类型

  

##### 严格等级

一个看https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html一个看https://article.itxueyuan.com/2dBmKl

- 忽略下一行的校验  
  `// @ts-ignore`
- [让js拥有ts的校验](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check)  
  在第一行加上`// @ts-check`  
  <span style='opacity:.5'>（ts文件除了类型校验外还会要求大部分能声明类型的地方都做上声明）</span>



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

类型注解在会产生这些内容的地方都可以使用：参数、变量、属性、返回值

- 在返回值处使用类型注释的写法  

  ```js
  function 函数名(): string {
      return '返回值'
  }
  ```


- 在解构赋值时使用类型注解  

  ```ts
  function 函数名({
    属性名,
  }:{属性名?: Boolean} = {}) {
  }
  ```

  也就是说注解要写在参数后面而不能写在属性后面  
  （写属性后面的话和解构赋值重命名语法相同，因此会被识别为重命名）





### 基本类型

[官网](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#defining-types)称为“primitive types”



**js也有的类型**

列表

- string
- number
- 其他

特性

- 首字母小写  
  除了函数外首字母都可以小写，函数必须大写



**ts比js多的基本类型**

- [tuple](https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple)  
  也就是更具体的数组  

  - 例子  
    `let x: [string, number]`  
    这就限定里x的长度必须是2，且每一个子项的类型都做了限制

- [enum](https://www.typescriptlang.org/docs/handbook/basic-types.html#enum)  
  赋予一组数字意义  
  （vue3里似乎赋予了字符串？）
  
  - 例子  
    
      ```ts
      enum Color {
        Red,
        Green,
        Blue,
      }
    ```
    
    这段代码的作用
    
      - 定义了`Color`类型  
      - 可以通过`Color.Red`、`Color.Green`调出`0`和`1`
    - 可以通过`Color[0]`、`Color[1]`调出`'Red'`和`'Green'`
    
    - 控制数字  
    生成的数字默认从0开始
    
    - 指定开始的数字  
    
        ```ts
        enum Color {
          Red = 4,
          Green,
          Blue,
        }
      ```
    
      这种写法指定了从4开始
    
    - 指定每一位的数字  
    
        ```ts
        enum Color {
          Red = -1,
          Green = 2,
          Blue = 4,
        }
      ```
    
      
  
- any  
  不指定类型的话ts默认就会给你分配any类型  
  ts面对any类型基本什么限制都没有

- [unkown](https://mariusschulz.com/blog/the-unknown-type-in-typescript)  
  还有一个说明unkown的地方是[ts3发布说明](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)

  - 允许给unkown类型的值赋任何值

  - unkown类型的值只能赋给unkown类型和any类型

  - 不允许对unkown类型的值做任何操作  
    下面是示例  

    ```ts
    let value: unknown;
    
    value.foo.bar;  // Error
    value.trim();   // Error
    value();        // Error
    new value();    // Error
    value[0][1];    // Error
    ```

  - unkown类型的代码提示有时比any更好  
    （实验版本：ts4.1.3）  
    示例如下  

    ```ts
    function stringifyForLogging(value: unknown): string {
      if (typeof value === "function") {
        // value指定为unkown的话这里能判断出value是函数
        // value指定为any的话则不行
        const functionName = value.name || "(anonymous)";
        return `[function ${functionName}]`;
      }
    
      if (value instanceof Date) {
        // value指定为unkown或any这里都能判断出value是Data实例
        return value.toISOString();
      }
    
      return String(value);
    }
    ```

    

- [never](https://www.typescriptlang.org/docs/handbook/basic-types.html#never)与[void](https://www.typescriptlang.org/docs/handbook/basic-types.html#void)  
  never的语义是一个不存在的值，void的语义是没有任何类型  
  但是2者的差别是极其细微且难以归类的  
  下面列出一些差别：

  - 面对没有return的函数，提示返回void
    （把返回值赋值给变量，变量类型也是void）

  - 面对在抛出错误前没有return语句的函数时webstorm返回void，但官网说返回never
    但是如果把返回值赋值给变量，变量类型都是never

  - 可接受值  

    - void  

      > 拿void做类型注解没什么用 —— [官网](https://www.typescriptlang.org/docs/handbook/basic-types.html#void)

      - undefined
      - null  
        （未指定 `--strictNullChecks` 时可接受）

    - never  
      官网的[这个例子](https://www.typescriptlang.org/play?#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-aogBZVH1Eukq3GW2iboLQb0YGlrAObP+-KoD3I-qMTBn4sTfDoDyEViqijgS+N+rkRdtnFF-plDqXwogmD6vUIUxK+rtZBG4AgI9ZsDl0OqWiPIAA+ey-6ndraUQ6H8l7jlddAIoAKmDJCDaATb9htu7bm9oYBPZQEFSiPOfro1QAXfKmse4TsFWfjWKoR2qDRQrDOyCMukzHv2M1Y42HTbyCYvbp4OC5RNwxGEK1qHn5gQ8EjZ+DKugTBmDnOoOuxR5ikANNKTlQochk3YIFVAQA)用never做了类型注解

      - 用never作类型注解在[Playground](https://www.typescriptlang.org/play)
        - 不能赋值
        - 不能++
        - 不能打印
      - 用never作类型注解的变量在webstorm  
        - 不能赋值  
        - 可以`++`  
        - 可以打印



### [字面量类型](https://www.typescriptlang.org/docs/handbook/literal-types.html)

ts4.1.3为止只提供了3种类型的字面量类型：字符串、数字、布尔值



### 自动推断

这是一个自己起的名词  
意思是不需要手动添加任何类型，ts也会自动加上类型

- 比如`let a=1`就会自动给`a`加上number类型

- 比如  

  ```ts
  let a={
    a:1,
    b:{
      a:1,
    }
  }
  ```

  会自动给a加上一个类型（具体是type还是接口不清楚）  
  每个属性也会加上对应类型



**面对for in**

- 默认情况下for in中取数据会报错  
  （原因可能是因为不会将对象的键自动识别为字符串类型）

  - 解决方法  

    ```ts
    const obj = {
      a: {
        b:1,
        c:2,
      },
    } as { [index:string] : /*这里有个类型就行了*/{
      b:number;
      c:number;
    }; }
    for (const key in obj) {
      obj[key]
    }
    ```

    



### 组合类型

即用`|`连接多种类型或值（[字面量类型](https://www.typescriptlang.org/docs/handbook/literal-types.html)）  
示例如下：

- `true | 'true'`
- `string | Date`

可以直接作为类型注解，也可以用`type`关键字生成一个新的类型

- `type`关键字的用例  

  ```ts
  type combineTypeA = string | Date
  let combineTypeAVar:combineTypeA
  combineTypeAVar='11'
  ```



### [接口](https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html#interfaces)

也就是对对象结构的定义

用处：用来做类型注解

- 如果设置了接口没有定义的属性  
  一样属于错误  
  不过面对用类创建的对象时，是允许拥有未定义的属性的
- [可继承](https://www.typescriptlang.org/docs/handbook/interfaces.html#extending-interfaces)
- 同名接口  
  （官网上有相关说明的页面，目前看到的有[声明合并](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)和[这个例子](https://www.typescriptlang.org/play?#code/PTAEBUAsFMCdtAQ3qALgdwPagLaIJYB2ammANgM4mgAm0AxmcgqjKBZIgA4KYBmSQgFgAUCFCYARgCsGqAFygiqOH0T1oVRIRpoAnjyRl8iCpoB0okFbBRoepCgBucBxXw58TWABpBuvkxYNDYcTApUUHpMHDDielNNGyR6SNYECkQcaEsRUVQDBAAhfFgacELQAF5QAG9RUFB0IgBzCkUAJgBuUQBfHryRZVV1YtKaAElCFVg1DTqGptb20G6+0VFowgjQSXGARkUSsorDGtqlwjbO0H7NzG3IvbKOo-GpmbmEc8vr1duBskigxEABXMwQQoAZXosHwXEi+C07FQsFBqVBsEQZH0hgoegi0BwPmS+FQAHIqFxwu5JGQWNhhrBPAAPELQUqgcEMzC5e6PXbjADMbzKHxG8xqzxo+0BYlsMAckkwrHYoK41NgkWgLJUOlaEnSwSZXy0OlxFmSpwQ2JMZioNGwrCRoCcJiU0zgZlS+AeFoofnQkC80FJntmoyonBcSFAAGt7FgynyRAVDAB5dA4n6ETAY2CEbGKVGghC9UAAMlAx3KhQGaYQACUpERqnVQLn84WyIo1JQy5Xq+9w185SbRqAAArQdR5uOgHV6mhUGvWhYiRrRMiYTF8UE9tBo6ADRp8YyaXvYswDXqicfzADCwfoCeIi+gOhXw8+E-qG6i5A7rM+6Xv2J6gGe+AXhBV7Husgz0pEmBZoombZu2zRXCsHR+J2qCYt2xZHgCoiIVEz6vooT74C+H5thcmF-DhAHbruIEwf2fiQdBfYQncgziFAiCRJk+A0IGCDwNEsQfroeg7lyEL3poEguMEDbJLaiQUOYoBQjw9D4HwNHYmQeh+JIILcqA8mgksZA4i00BPM5MwLrAsBBMk2QUJkTk6aAEwCLZoCQJgamqXA7IQeQ26Me5nmwAGNkKQkwjyuw0AIGF6CQjwMJwgiUTaKAXCeW6dBoF6UXaLoYQoIE9DcjQ3maH5KlBnRSZxgazSqspVDGAmoDUbRhApsh6H0BRH4DNNNGvm2k1yuI6aEAgeDSEEtBGXwcAfvMlkYFlxANkYdoqU4VADZpKCsMJHo-hoWgoJgPDELVFrndpjgIIw4TQDQuSCcGVDZNoVAhWlC66rJgiPRKCCSA4dCMMgBpkppmVbLoqAeDkGxDCOE4ANJknq66NFwmJJYoyrkDOhA3oTymgGTqAU3+m6AZiigRHCVzMwJYBTNFKowMECQQogX1pbmLnkdoTm6DuqDuJV-CkhSDoMN4wm+uNhNnZO6pcA45yLFuQR86irQ3nKxum+blMkASiiEKCOCWbA9uE+IAAi0DvTQBp+rZwQtJgV5+M6Dq7fthDzNE+66JZSDJNS7h4zG20y+tLT6y4ukABLIdAEWBME1N0jRZkw5ngPJA2yVkpSsZHW5CQOdQeDDekODw8pKaretEgCOkuyaJE8AUEBz0xcEZgclcRg4vw0WA05yRSypyA7uazeutdxPPTHoMouo87haocVN5A8CILoLoy5HmC6FwTDzKg2ARMgCh+2ASAHMuDtBAL-F819ZhxXMNJYAABHUsEQDYUGAEKAA7B0IU6ChQAFZgDN1hPCVAABaAaxCrrEObsAHBHQABsAAODoTCAAMABiGhDCmEdGYaIIAA)）  
  可以写同名接口  
  最终发挥作用的接口是多个同名接口的合并  
  不允许在同名接口中把不同属性定义为不同类型
- [将属性标记为可选的](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties)  
  只要在属性名后加上`?`即可



### `type`

大家都把`type`关键字的语法称为“type alias”

除了上面的例子（组合类型）外，也可以用于定义对象的结构  
例如：

```ts
type BirdType = {
  wings: 2;
}
const bird1: BirdType = { wings: 2 }
```

如果用`type`和接口定义了相同的结构，ts是可以判断出2者是相同的  
下面是一个不会报错的例子：  

```ts
type BirdType = {
  wings: 2;
};

interface BirdInterface {
  wings: 2;
}

const bird1: BirdType = { wings: 2 };

const bird3: BirdInterface = bird1;
```

- [`type`定义对象结构时和接口的区别](https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types/52682220#52682220)  
  接口可以重复声明，而`type`不行  
  官网[这个例子](https://www.typescriptlang.org/play?#code/PTAEBUAsFMCdtAQ3qALgdwPagLaIJYB2ammANgM4mgAm0AxmcgqjKBZIgA4KYBmSQgFgAUCFCYARgCsGqAFygiqOH0T1oVRIRpoAnjyRl8iCpoB0okFbBRoepCgBucBxXw58TWABpBuvkxYNDYcTApUUHpMHDDielNNGyR6SNYECkQcaEsRUVQDBAAhfFgacELQAF5QAG9RUFB0IgBzCkUAJgBuUQBfHryRZVV1YtKaAElCFVg1DTqGptb20G6+0VFowgjQSXGARkUSsorDGtqlwjbO0H7NzG3IvbKOo-GpmbmEc8vr1duBskigxEABXMwQQoAZXosHwXEi+C07FQsFBqVBsEQZH0hgoegi0BwPmS+FQAHIqFxwu5JGQWNhhrBPAAPELQUqgcEMzC5e6PXbjADMbzKHxG8xqzxo+0BYlsMAckkwrHYoK41NgkWgLJUOlaEnSwSZXy0OlxFmSpwQ2JMZioNGwrCRoCcJiU0zgZlS+AeFoofnQkC80FJntmoyonBcSFAAGt7FgynyRAVDAB5dA4n6ETAY2CEbGKVGghC9UAAMlAx3KhQGaYQACUpERqnVQLn84WyIo1JQy5Xq+9w185SbRqAAArQdR5uOgHV6mhUGvWhYiRrRMiYTF8UE9tBo6ADRp8YyaXvYswDXqicfzADCwfoCeIi+gOhXw8+E-qG6i5A7rM+6Xv2J6gGe+AXhBV7Husgz0pEmBZoombZu2zRXCsHR+J2qCYt2xZHgCoiIVEz6vooT74C+H5thcmF-DhAHbruIEwf2fiQdBfYQncgziFAiCRJk+A0IGCDwNEsQfroeg7lyEL3poEguMEDbJLaiQUOYoBQjw9D4HwNHYmQeh+JIILcqA8mgksZA4i00BPM5MwLrAsBBMk2QUJkTk6aAEwCLZoCQJgamqXA7IQeQ26Me5nmwAGNkKQkwjyuw0AIGF6CQjwMJwgiUTaKAXCeW6dBoF6UXaLoYQoIE9DcjQ3maH5KlBnRSZxgazSqspVDGAmoDUbRhApsh6H0BRH4DNNNGvm2k1yuI6aEAgeDSEEtBGXwcAfvMlkYFlxANkYdoqU4VADZpKCsMJHo-hoWgoJgPDELVFrndpjgIIw4TQDQuSCcGVDZNoVAhWlC66rJgiPRKCCSA4dCMMgBpkppmVbLoqAeDkGxDCOE4ANJknq66NFwmJJYoyrkDOhA3oTymgGTqAU3+m6AZiigRHCVzMwJYBTNFKowMECQQogX1pbmLnkdoTm6DuqDuJV-CkhSDoMN4wm+uNhNnZO6pcA45yLFuQR86irQ3nKxum+blMkASiiEKCOCWbA9uE+IAAi0DvTQBp+rZwQtJgV5+M6Dq7fthDzNE+66JZSDJNS7h4zG20y+tLT6y4ukABLIdAEWBME1N0jRZkw5ngPJA2yVkpSsZHW5CQOdQeDDekODw8pKaretEgCOkuyaJE8AUEBz0xcEZgclcRg4vw0WA05yRSypyA7uazeutdxPPTHoMouo87haocVN5A8CILoLoy5HmC6FwTDzKg2ARMgCh+2ASAHMuDtBAL-F819ZhxXMNJYAABHUsEQDYUGAEKAA7B0IU6ChQAFZgDN1hPCVAABaAaxCrrEObsAHBHQABsAAODoTCAAMABiGhDCmEdGYaIIAA)里也提到了这一点



### 泛型

例子

- 子项为字符串的数组  
  `Array<string>`
- 子项为数字的数组  
  `Array<number>`
- 子项为『只有name属性且name属性为字符串的对象』的数组  
  `Array<{ name: string }>`

**接口生成器**

（自己起的名字）

- 例子  
  下面这个例子中`Backpack`就是接口生成器  
  `Backpack<类型>`就会生成一个接口

  ```ts
  interface Backpack<Type> {
      add: (obj: Type) => void;
      get: () => Type;
  }
  
  const backpack: Backpack<string> = {
      add(val) {
          this._val=val
      },
      get() {
          return this._val
      },
  }
  
  const object = backpack.get();
  
  backpack.add('23');
  ```




### 函数

- 参数默认全部必填，除非后面加问号



### 类

- 非方法成员必须声明

- 指定一些形参作为实例的属性  
  - 使用方法：在类的构造函数的形参前加`public`（普通的构造函数不能用`public`）
  - 效果：可以让加了`public`的形参作为实例的属性



### 模块化

<span style='opacity:.5'>（目前是观摩余榕的代码得出的结论）</span>

和es module一致，起码可以导出`type`定义的内容

- 导入报错  
  只要不导入模块（变量）都不会报错  
  比如`import './mixin/echartsMixin'`这种方式引入的，都不会报错



### 使用source map

想要用ts的source map就必须执行如下操作，不然就算在webpack里开了source map也不好使

- 操作  
  在`tsconfig.json`的`compilerOptions`属性下加一行：  
  `"sourceMap": true,`



### JSDoc

- 可以从jsdoc中获得悬停提示（jsdoc写在js、ts中都可以）

- ts文件可以从js文件的jsdoc中获得类型  
  [能给ts提供类型的jsdoc的语法清单](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

  - jsdoc定义类型的优先级高于js定义的
  - 无法从ts文件的jsdoc中获得类型  
    虽然[文档](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check)中说可以，并给出了一个demo，但是实际上是不行的  
    测试环境：webpack4、ts-loader^8.3.0、typescript^4.5.4
  - 获得的类型不能用作类型注解

- [用jsDoc生成.d.ts](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

  - 用👆列出的命令可以  
    （具体命令为：`npx -p typescript tsc 入口的ts或js文件 --declaration --allowJs --emitDeclarationOnly --outDir 输出到的目录`）

    - 可以包含ts文件

  - 配合webpack4使用的话没效果

    - 没ts文件的话不会生成.d.ts
    - 有ts文件的话ts文件会生成.d.ts  
      但是命令会报错：`Error: TypeScript emitted no output for D:\work\project\地图库\code\hrtmap_内网gitlab\src\index.ts`

  - [这个可能是介绍生成规则的文档](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#in-jsdoc-references)

  - 对于ts文件中和js语法一致的部分，规则也和js一致

  - 有的时候居然不加jsdoc生成的更好  
    下面是2个例子

    - 加了会变成any类型  

      ```js
      /**
       * @constant 
       * @type {Object}
       * @property {Object} Mapbox1
       * @property {null} Mapbox1.Mapbox_vector_streetLight `serviceCode`
       * @property {null} Mapbox1.tianditu_raster_streetLight `serviceCode`
       */
      const BASIC_IMG_SERVICE_CODE_DICT={
        Mapbox1: {
          Mapbox_vector_streetLight:null,
          tianditu_raster_streetLight:null,
        },
      }
      export default BASIC_IMG_SERVICE_CODE_DICT
      ```

    - 后代由函数生成  

      ```js
      import getMapClass from './getMapClass/getMapClass.js'
      import BASIC_IMG_SERVICE_CODE_DICT from './const/BASIC_IMG_SERVICE_CODE_DICT'
      /** 
       * 获得api的入口
       * @function getEntrance 
       * @param {Object} 配置对象
       * @param {String} [配置对象.basicMapTechCode='Mapbox1'] 基础地图技术
       * @returns {{
       *   Map:Map,
       * }}
       * */
      export default function getEntrance({
        basicMapTechCode = 'Mapbox1',
      } = {}) {
        if (basicMapTechCode in BASIC_IMG_SERVICE_CODE_DICT) {
          return {
            Map: getMapClass(basicMapTechCode),
          }
        }
      }
      ```

      JSDoc中有声明Map  
      没声明getMapClass（感觉声明getMapClass也没用的，毕竟这里直接指向的就是Map）

  - 如果是ts文件的话，生成的类型似乎和jsdoc无关

  - 注意

    - 基于js生成的.d.ts没那么智能  
      - 只会获得类型（理所当然没什么毛病）
      - 对于获得类型的部分会要求是必填
      - 比如变量的.d.ts是依据声明时赋的值来的  
        - 若声明时未赋值，那将会是any类型
    - 要注意入口是否是any类型





### 引用与给别人引用

- js文件可以引用ts文件（测试背景：vue-cli建的hrt大屏）



##### 引用自己编写的js文件

这里记录一个实战中的例子

1. 在src下新建`shims-vue.d.ts`文件
2. 对于每个要引用的js文件  
   都在`shims-vue.d.ts`中加入如下对应代码  
   `declare module '@/js文件位置'`（不要加`.js`）
3. 引用js文件  
   用如下写法  
   `import {beFlexible} from "@/js文件位置"`（不要加`.js`）



##### 引用第三方库



工程化引入

- 大部分库需要单独下载.d.ts  
  - 可以在[这个网站](https://www.typescriptlang.org/dt/search?search=)里搜索下载地址  
  - 不下的话vscode会有波浪线
- 少量库会自己携带.d.ts  
  比如[Editor.js](https://github.com/codex-team/editor.js)和[L7](https://gitee.com/antv/L7)（都是纯ts编写的项目，node_modules里都是js+.d.ts，都是找不到.ts文件的）

- 下载完.d.ts就可以用了  
  编辑器和编译过程就都有提示了

  - npm下载的.d.ts文件也是有“全局作用域”的（起码"@types/jquery": "^1.10.36"是这样）  
    具体来说就是.d.ts里的接口或type在项目代码里也可以用（只测过接口的）
    
  - vscode类型提示  
  
    | 文件类型 | 引用js包 | 引用带.d.ts的包        |
    | -------- | -------- | ---------------------- |
    | js       | 都没     | 有悬停说明、没类型校验 |
    | ts       | 都没     | 有悬停说明、有类型校验 |



引用静态文件

- > or if you’re not using modules, you can just use the global variable `_` if you have a `tsconfig.json` around. —— [博客](https://devblogs.microsoft.com/typescript/the-future-of-declaration-files-2/)

- > **Triple-Slash Directives**
  >
  > Download a declaration file from [the repository](https://github.com/DefinitelyTyped/DefinitelyTyped) and include a line like this:
  >
  > ```
  > /// <reference path="jquery/jquery.d.ts" />
  > ```
  >
  > —— [某个网站](http://definitelytyped.org/)



##### 给别人引用

- [指定`.d.ts`的入口](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html#editing-the-packagejson)  
  翻译过来就是有如下确认步骤
  1. 查看package.json是否有types属性  
     有的话就以此为入口
     - 若写的是一个.d.ts的地址  
       那就会用这个.d.ts
     - 若写的是一个js文件的地址  
       比如写的是“./dist/main.js”那就会以“./dist/main.d.ts”作为入口
  2. package.json没有types属性的话会查找main属性  
     若main值为“./dist/main.js”那就会以“./dist/main.d.ts”作为入口
  3. main属性也没有的话  
     会以`index.d.ts`作为入口



非重点提醒

- 如果要改package.json查看入口有没变更的话  
  需要重启vscode才能生效（vscode1.63.2 win10）











### [`.d.ts`](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)

有2个问答说明了这种文件

- [.d.ts 和 源文件 .ts 有什么区别](https://segmentfault.com/q/1010000007062332)
- [如何编写一个d.ts文件](https://segmentfault.com/a/1190000009247663)



依据目前的了解，我认为.d.ts的作用就是给js加上类型  

要在.d.ts里把js文件导出的内容都声明好后，才能导入ts

声明好后把内容导入其他js或ts都可以拥有类型推导（不过导入到js里的话类型推导功能是有缺陷的）

注意：一个js文件配套了对应的.d.ts后，其内部仍然是不会有.d.ts里的类型推导的

- 简单示例  

  - 如果js这样写  

    ```js
    function add(a,b) {
      return a+b
    }
    const fakeStr=11
    
    export { add,fakeStr}
    ```

  - 那么.d.ts就可以这样写  

    ```ts
    export function add(a:number,b:number): number
    export const fakeStr: string 
    ```

- js与.d.ts组合后类型推导完全依据.d.ts里的来（即使.d.ts里写错了的也是这样）









- 写于`.d.ts`里的内容都可以写在`.ts`里  
  (个人观察得出的)
- `.d.ts`专门写声明，是给库的使用者用的  
  - 放在项目里ide可以以此产生错误提示  
    （似乎对js文件也有效果）
  - 可能在编译ts时也能产生效果
- vue3中`.d.ts`基本都存在于dist或node_modules目录里，少部分存在于源码里  
  vue3中`.d.ts`的语句只会以3个关键字开头：`declare`、`type`、`export`





### `declare`

（目前没找到说明文档）

（目前还没搞清楚怎么用，虽然可以达到不赋值就使用变量、函数的效果，不过这功能并没有什么卵用啊）

- 猜测的作用：脱离主体程序来增加类型  
  比如说[官方在线运行环境](https://www.typescriptlang.org/play)里可以把ts拆成js和d.ts  
  
- vue3中`declare`大部分放在d.ts里，小部分放在ts里

- > 在 “.d.ts” 的每一个段落中，除了最外层为 interface 外，其他的都需要 declare 关键词 —— [一篇教学.d.ts的博客](https://www.jianshu.com/p/2100cc9bccf8)

操作

- 声明全局变量（目前说的是就是全局变量，而不是挂在window、process下的属性）
  - 非对象  
    `declare const或let LIB_CONTAIN_TYPE: string`



