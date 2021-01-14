### 学习目标

- 了解用ts写出的程序是否能在运行时有类型检查  
  答案：默认情况下是没有的
  - 如果没有的话  
    了解项目中用了ts写出的库后，编译项目阶段，输入该库的内容能否拥有类型检查
- [使用第三方库的ts功能](https://v4.webpack.docschina.org/guides/typescript/#%E4%BD%BF%E7%94%A8-third-party-library)
- [ts与资源](https://v4.webpack.docschina.org/guides/typescript/#%E5%AF%BC%E5%85%A5%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)  
  前置学习内容
  - 用webpack导入资源





### ts的功能

- 用ts的话在编程阶段ide就会给出校验结果
- 编译阶段就会给出错误提示  
  并且webpack4默认拒绝编译有错误的生产环境包



### 类型注解

**用代码来解释『类型注解』**

```js
function greeter(person: string) {
    return "Hello, " + person;
}
```

这段代码中的`: string`就是类型注解

**『类型注解』的功能**

添加了类型注解的参数会被要求为毕传，且数据类型加了限制