## 简介

> “WebGL是使用JS来实现OpenGL ES 2.0” —— 《交互式计算机图形学  基于WebGL的自顶向下方法 （第七版）》

笔记里只记关键部分，完整内容请查看[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)或者其他网站



**版本**

> - `"webgl"` (或`"experimental-webgl"`) 这将创建一个 [`WebGLRenderingContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext) 三维渲染上下文对象。只在实现[WebGL](https://developer.mozilla.org/en-US/docs/Web/WebGL) 版本1(OpenGL ES 2.0)的浏览器上可用。
> - "`webgl2`" (或 "`experimental-webgl2`") 这将创建一个 [`WebGL2RenderingContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL2RenderingContext) 三维渲染上下文对象。只在实现 [WebGL](https://developer.mozilla.org/en-US/docs/Web/WebGL) 版本2 (OpenGL ES 3.0)的浏览器上可用。<span style='opacity:.5'>（这是一个实验中的api，尽量不要在生产环境中使用）</span>
>
> —— [MDN canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext#%E5%8F%82%E6%95%B0)

> [WebGL 2](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API#WebGL_2) API引入了对大部分的OpenGL ES 3.0功能集的支持 —— [mdn webgl](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)



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
  rgb的取值范围都是0到1。alpha的可能也是，不过透明度并不是0到1之间均分的  
  （似乎不定义清除色就使用清除色的话，就是用`rgba(0,0,0,0)`来清除。在开发`《learnWebGL/单色椒盐噪声.html》`时的经验）
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



**使用多个着色器程序进行叠加绘制**

- 后绘制的画面会盖住原有的画面  
  会覆盖的部分是：后绘制的着色器程序中有上`gl_FragColor`的部分
- 注意后绘制的着色器程序的attribute要用本笔记里的方法添加（2020.11.18）  
  用其他方法可能画不出任何东西，比如如下的方法就画不出来：  
  《learnWebGL/点击后绘制点.html》里的方法

- 叠加绘制时后绘制的着色器程序没必要用先前着色器程序的canvas上下文  
  自己再从canvas上`getContext`也是可以的




## 使用属性（attribute）
```javascript
const 属性序号 = gl.getAttribLocation(着色器程序, 字符串的属性名) // 获取指定属性在着色器程序中的序号
gl.enableVertexAttribArray(属性序号) // 开启属性
const 缓冲 = gl.createBuffer(); // 创建缓冲
gl.bindBuffer(gl.ARRAY_BUFFER, 缓冲); // 将缓冲绑定到绑定点（gl.ARRAY_BUFFER）
/*
设置属性如何从缓冲中读取数据（执行这个方法前绑定点上要有缓冲）
- size规定了一次读取数组的几个元素，如果size小于属性的向量分量数的话，那么一个属性中没有从缓冲中读取数据的部分将会取默认值）
  【】可能不是这样。可能size是把attribute分的段数。一个从网上摘抄的代码的注释也佐证了这个观点，这个注释是：2 components per iteration
*/
gl.vertexAttribPointer( 属性序号, size, gl.FLOAT, false, 0, 0) 

/*
通过绑定点（gl.ARRAY_BUFFER）给缓冲传输强类型数据
（“最初例子”用的『使用方法』是`gl.STATIC_DRAW`）
*/
gl.bufferData(gl.ARRAY_BUFFER, 强类型数据 , 使用方法);
```

- 设置属性如何读取数据
  - [`gl.vertexAttribPointer`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/vertexAttribPointer)
  - [`gl.vertexAttrib[1234]f[v]`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/vertexAttrib)  
    似乎用`vertexAttrib3f`就能给4维向量`gl_Position`赋值？  
    例子为：《learnWebGL/椒盐噪声.html》
- [`gl.bufferData(gl.ARRAY_BUFFER, 强类型数据, 使用方法)`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/bufferData)  
  - `使用方法`  
    没有理解不同选值有什么用  
    MDN上只是说这个属性描述了数据 是否经常被使用 以及 是否经常被更改

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

`gl.drawArrays(图元类型, 绘制起始点的序号/*一般用0*/, 顶点个数)`  

- 图元类型决定了顶点会生成什么样的图形  

  可以选择点、线、三角形  
  线和三角形有不同的绘制方式可以选择

- 顶点着色器运行几次就会生成几个顶点  

**规则猜测**

定义

- attribute实际上是有2种的
  - 一个是webGL里输入的attribute
  - 另一个是每个像素运行的顶点着色器里的attribute

执行流程

`gl.drawArrays`一次就会用webGL绘制一次  
绘制一次会做的操作如下

1. 先每个顶点执行一次顶点着色器得到顶点坐标  
   （含在`gl_Position`里）
2. 依据顶点坐标、图元类型（、顶点数量）就确定了需绘制的路径（点、折线、三角形的几何结构）
3. 路径覆盖到的每个像素会做以下操作
   1. 运行顶点着色器计算出varying  
      这时的attribute是webGL里输入的attribute的差值  
      <span style='color:red'>[WebGL 基础概念（webglfundamentals）](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-fundamentals.html)里说顶点着色器运行次数是`gl.drawArrays`第三个参数决定的，这与这里的说法冲突。不过《WebGL 基础概念》上关于“差值”只看到简单的一句话：“顶点着色器中设置的varying会在片断着色器运行中获取不同的插值”</span>
   2. 运行片段着色器，最终计算出该像素需绘制的色值与透明度（`gl_FragColor`）

[WebGL 工作原理（webglfundamentals）](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-how-it-works.html)对上面的1、3点有不同的解释

- 第1点  
  除了得到坐标外还得到了varying值
- 第3点  
  这时并不会运行顶点着色器  
  片段着色器里的varying值是依据顶点的varying值插值算出的  
  这里没说具体是怎么插值的，不过个人猜测应该是依据像素所处的坐标插值出来的



**`gl.drawElements`**

估计也是运行着色器的，不过暂时不研究



## 使用图片

**只用一张图**

```js
// 创建纹理
var texture = gl.createTexture(); // 方法创建并初始化了一个可以被任何图像绑定的WebGLTexture目标
gl.bindTexture(gl.TEXTURE_2D, texture);//把WebGLTexture目标绑定到『绑定点（目标）』（绑定点就是第一个实参）

//--------设置纹理参数，让我们可以绘制任何尺寸的图像--------
//将纹理设置为拉伸（应该是拉伸）
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//缩小滤镜设为“最近”（应该是）//墓志未晚的值是gl.LINEAR（应该是线性的意思）
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//放大滤镜设为“最近”（应该是）
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

// 将图像上传到纹理（第二个可能是清晰度，第三个和第四个相同，一般选用gl.RGBA或gl.RGB。图像有6种可以选择，包括canvas dom）
// （webgl的dom想要能用这个api的话,获得上下文时第二个参数的preserveDrawingBuffer属性要设为true）
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
```

写了上面的代码后，在着色器内就可以通过如下代码获取纹理：（已在片段着色器上测试过）  
`uniform sampler2D u_image;`

js中没有设置`u_image`却还能在着色器里访问的原因在[这页面](https://webglfundamentals.org/webgl/lessons/webgl-image-processing.html)里搜索“为什么`u_image`没有设置还能正常运行？”来进行了解



**多张图片**

可参考代码

1. 《使用多个图片/使用多个图片.html》
2. 《webgl-fundamentals/webgl/webgl-2-textures.html》



## 获得像素信息

下面这段代码可以获得上下镜像的像素信息

```js
const gl=canvas.getContext('webgl',{preserveDrawingBuffer:true}) // 要注意第一次getContext时preserveDrawingBuffer就要是true
const w=canvas.width;
const h=canvas.height;
const pixels=new Uint8Array(w*h*4)
gl.readPixels(0,0,w,h,gl.RGBA,gl.UNSIGNED_BYTE,pixels)
const imageData=new ImageData(new Uint8ClampedArray(pixels),w,h)
console.log({pixels,imageData})
```

在无人机项目里看起来挺正常的  
但是在《learnWebGL/把webgl的canvas画到2d的上（失败）.html》里用这种方法获得的颜色是有偏差的  
（猜测得到的数据其实是准确的，而偏差是透明部分的叠加算法不一致导致的）

注意：

- 如果第一次getContext时preserveDrawingBuffer不是true的话  
  最终`imageData.data`将会每一项都是`0`


## viewport
- 定义：承载视觉内容的容器  
- 翻译：“视口”、“视区”  
- `gl.viewport(x, y, width, height)`  
  设置视口（不设置也可以，webGL会自动获取canvas元素尺寸进行设置）  
  `x`和`y`基本都是输入0，`width`和`height`写绘画的宽度与高度  
- 获取目前视口的信息  
  `gl.getParameter(gl.VIEWPORT)`  





## 其他



- 如果要生成新的图像，最好新建一个canvas去做，而不是接着原有canvas去做  
  比如无人机项目里就曾经翻车，在《无人机项目笔记.md》搜索“有时拍照有问题”可以看到具体内容
  
  





#### 画面转图片

- 转base64  
  请查看《canvas及2d 学习笔记 .md》



#### 与『canvas dom』尺寸相关的内容

请查看《canvas及2d 学习笔记 .md》



#### 容器的操作

mapbox/geogl与cesium可以把dom移除掉后期再添加，程序可以正常运作



# 学习

当前有webgl代码的目录如下

- learnWebGL
- 综合性代码\4.28v_alpha(custom_layer)






### 疑问点

- 有多个`attribute`时绑定点（`gl.ARRAY_BUFFER`）够用吗
- 坐标系