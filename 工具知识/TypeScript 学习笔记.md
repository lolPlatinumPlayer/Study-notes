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
- [用jsDoc来指明类型](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [用jsDoc生成.d.ts](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)
- [source map](https://v4.webpack.js.org/guides/typescript/#source-maps)



### ts的功能

- 用ts的话在编程阶段ide就会给出校验结果
  - 不同文件也会被视为处于相同作用域  
    比如说不能在不同文件中用`let`声明同样的变量、比如不同文件的同名接口也会进行合并  
    默认情况是这样的，[这里](https://www.jianshu.com/p/78268bd9af0a?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)略微有提到修改默认配置以取消这个特性的方法
- 编译阶段就会给出错误提示  
  并且webpack4默认拒绝编译有错误的生产环境包  
  不过`typescript`npm包是允许编译有错误的文件的



非重点特性

- 使用全局变量  
  是会报错的（不过引用jq的时候在全局下加`$`不会报错）  
  百度了几个方法，都不好使（可能之前好使，到了ts4.1.3就不好使了）



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

类型注解在会产生参数、变量、属性、返回值的地方都可以使用

- 在返回值处使用类型注释的写法  

  ```js
  function 函数名(): string {
      return '返回值'
  }
  ```

  

### 基本类型

[官网](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#defining-types)称为“primitive types”

**js也有的类型**

- string
- number
- 其他

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

  

### 模块化

<span style='opacity:.5'>（目前是观摩余榕的代码得出的结论）</span>

和es module一致，起码可以导出`type`定义的内容



### 使用source map

想要用ts的source map就必须执行如下操作，不然就算在webpack里开了source map也不好使

- 操作  
  在`tsconfig.json`的`compilerOptions`属性下加一行：  
  `"sourceMap": true,`



### 使用第三方库

##### 使用js库

使用js库必须要下载它的.d.ts文件  
下载地址：在[这个网站](https://microsoft.github.io/TypeSearch/)里可以搜出来  

- 使用构建工具  
  下载完.d.ts就可以用了，编辑器和编译过程就都有提示了

  - npm下载的.d.ts文件也是有“全局作用域”的（起码"@types/jquery": "^1.10.36"是这样）  
    具体来说就是.d.ts里的接口或type在项目代码里也可以用（只测过接口的）

- 用静态文件的js库  
  看下面2句话感觉好像也可以

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



### [`.d.ts`](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)

有2个问答说明了这种文件

- [.d.ts 和 源文件 .ts 有什么区别](https://segmentfault.com/q/1010000007062332)
- [如何编写一个d.ts文件](https://segmentfault.com/a/1190000009247663)



依据目前的了解，我认为.d.ts的作用就是让js拥有ts的功能  

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





### 指定一些形参作为实例的属性

使用方法：在类的构造函数的形参前加`public`（普通的构造函数不能用`public`）

效果：可以让加了`public`的形参作为实例的属性


