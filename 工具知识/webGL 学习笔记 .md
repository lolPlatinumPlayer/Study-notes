## 简介

> “WebGL是使用JS来实现OpenGL ES 2.0” —— 《交互式计算机图形学  基于WebGL的自顶向下方法 （第七版）》

笔记里只记关键部分，完整api查看mdn或者其他网站

## 上下文对象

`let gl =canvas.getContext("webgl")`

- 所有的实际性内容都要从上下文对象里调用（猜测一个canvas标签只能用一个上下文）
  webGL上下文对象由三部分组成：

  1. 属性  
  2. 方法  
  3. 常量  

  其中方法和常量存放于原型链中  


## webGL清除色
- **定义清除色 ** 
  `gl.clearColor(0.0, 0.0, 0.0, 1.0)`  
  rgb的取值范围都是0到1。alpha可能也是，不过透明度并不是0到1之间均分  
- **使用清除色**  
  `gl.clear(gl.COLOR_BUFFER_BIT)`  


## 创建着色器
```javascript
const 着色器 = gl.createShader(类型常量)
gl.shaderSource(着色器, 着色器代码字符串)
gl.compileShader(着色器)
```
类型常量有两个选值：`gl.VERTEX_SHADER`和`gl.FRAGMENT_SHADER`  


## 着色器程序
一个顶点着色器和一个片段着色器组合起来叫一个着色程序（mapbox demo备注里称为WebGL program）  
- 创建  
  ```javascript
  const 着色器程序 = gl.createProgram()
  gl.attachShader(着色器程序, 顶点着色器)
  gl.attachShader(着色器程序, 片段着色器)
  gl.linkProgram(着色器程序)
  ```
- 使用  
  `gl.useProgram(着色器程序)`    


## 使用属性（attribute）
```javascript
const 属性序号 = gl.getAttribLocation(着色器程序, 字符串的属性名) // 获取指定属性在着色器程序中的序号
gl.enableVertexAttribArray(属性序号) // 开启属性
const 缓冲 = gl.createBuffer(); // 创建缓冲
gl.bindBuffer(gl.ARRAY_BUFFER, 缓冲); // 将缓冲绑定到绑定点（gl.ARRAY_BUFFER）
/*
设置属性如何从缓冲中读取数据（执行这个方法前绑定点上要有缓冲）
- size规定了一次读取数组的几个元素，如果size小于属性的向量分量数的话，那么一个属性中没有从缓冲中读取数据的部分将会取默认值）
*/
gl.vertexAttribPointer( 属性序号, size, gl.FLOAT, false, 0, 0) 

/*
通过绑定点（gl.ARRAY_BUFFER）给缓冲传输强类型数据
（“最初例子”用的『使用方法』是`gl.STATIC_DRAW`）
*/
gl.bufferData(gl.ARRAY_BUFFER, 强类型数据 , 使用方法);
```

## 使用全局变量（uniform）

```js
gl.uniform2f( // 给某个uniform赋值
  gl.getUniformLocation(program, "brightnessDelta"), // 获取指定uniform在着色器程序中的序号（不确定是否有“启用uniform”的功能）
  向量第1位,向量第2位,
)
```

- **向量赋值**   

  方法：`gl.uniform+数字+i或f+可选的v`   

  - `数字` 
    当前还没找到数字为`1`的成功案例，`2`倒是可以
  - `i`代表整数
  - `f`代表浮点数  
  - `v`还没看，不过似乎是用来换一种传参方式的
  
  详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/uniform)
  
- **矩阵赋值**   

  方法：`gl.uniformMatrix+数字+fv`  

  - > `数字`可选值为：2、3、4分别代表4,9,16个浮点数的数组 —— [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/uniformMatrix)

  传参：`(uniform在着色器程序中的序号,false,普通数组)`

  详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/uniformMatrix)

## 运行着色器

`gl.drawArrays(图元类型, 0, 顶点着色器运行次数)`  

- 图元类型决定了顶点会生成什么样的图形  

  可以选择点、线、三角形  
  线和三角形有不同的绘制方式可以选择

- 顶点着色器运行几次就会生成几个顶点  


## viewport
- 定义：承载视觉内容的容器  
- 翻译：“视口”、“视区”  
- `gl.viewport(x, y, width, height)`  
  设置视口（不设置也可以，webGL会自动获取canvas元素尺寸进行设置）  
  `x`和`y`基本都是输入0，`width`和`height`写绘画的宽度与高度  
- 获取目前视口的信息  
  `gl.getParameter(gl.VIEWPORT)`  


# 疑问点

- 有多个`attribute`时绑定点（`gl.ARRAY_BUFFER`）够用吗
- 坐标系