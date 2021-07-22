

### 关于canvas尺寸

- css可以控制canvas dom在视口里的尺寸  
  但是无法控制canvas的可绘制像素  
- 读取canvas的可绘制像素  
  `dom.width`、`dom.height`
- 设置canvas的可绘制像素的方法：  
  - 在html标签上写width、height属性
  - js上给dom的width、height赋值

- <span style='color:red'>canvas的可绘制像素改变后会自动清空画布</span>  
  2d上下文在各浏览器的表现都一致  
  webgl上下文在chrome里和firefox里表现不一致  
  chrome改变后会等比伸缩，下次绘制时才会把伸缩的内容清空



### 上下文对象

`const ctx =canvas.getContext("2d")`

所有的实际性内容都要从上下文对象里调用

（猜测一个canvas标签只能用一个上下文）  
第一次使用`getContext`方法时就确定了上下文（比如说第二次使用`getContext`方法时不管第二个参数怎么传，其实都是没什么卵用的）

一个canvas只能`getContext`一种类型（2d、webgl、webgl2、bitmaprenderer）  
在第一次`getContext`后，如果`getContext`其他类型，那都是返回`null`

- 上下文对象里存有canvas dom  
  存在名为`canvas`的属性里

### 绘制矩形

- 设置填充颜色  

  `ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'`    

  也可以把渐变填充赋值给`ctx.fillStyle`

- 填充矩形

  - 直接填充矩形（不用先创建路径）  
    `ctx.fillRect(10, 10, 100, 100)`  
四个参数为x/y/width/height
    
  - 创建路径后填充  
  可以创建多个路径然后一次性填充  
  
  1. 创建矩形路径  
  
     `ctx.rect(x, y, width, height)`  
  
  2. 按路径画线（这步不确定要不要）  
  
     `ctx.stroke()`  
  
  3. 填充路径  
  
       `ctx.fill()`  

### 径向渐变填充

`var ggg = ctx.createRadialGradient(六个参数)`  

画两个圆，连接两个圆上的对应顶点，并在画到第二个圆后延长至一个点  

六个参数分别是：第一个圆的xy坐标与半径、第二个圆的xy坐标与半径  

`ggg.addColorStop(距离百分比,颜色)`

百分比=这个节点与第一个圆对应顶点的距离/两个圆对应顶点的距离

`ctx.fillStyle = ggg`

最后调用填充矩形的方法进行绘制

### 画线

```javascript
ctx.beginPath();
ctx.strokeStyle = 'blue';
ctx.moveTo(40,20);
ctx.lineTo(200,20);
ctx.stroke();
```

- `ctx.beginPath()`  
  可能意味着不清空之前的绘画，而继续进行接下来的绘制（看[慕课](https://www.imooc.com/video/3479)时产生的想法）  
  实操时发现加不加没有区别（不过如果之前调用过`ctx.clearRect`的话不加`beginPath`会出问题，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect)里提到了这一点）

- 设置线宽  
  `ctx.lineWidth = 线宽`  
  线宽要求为数字
- [设置虚线](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setLineDash)

### 插入图像（用图片或canvas）

canvas上下文的`drawImage`方法

插入图片的方法

```javascript
var imageObj = new Image();
imageObj.addEventListener('load',function () {
  context.drawImage(imageObj, 绘制起点x坐标, 绘制起点y坐标,绘制区域宽,绘制区域高)
})
imageObj.src = 图片地址;
```

插入canvas的方法

```js
context.drawImage(canvas dom, 绘制起点x坐标, 绘制起点y坐标,绘制区域宽,绘制区域高)
```

- `drawImage`参数只有头三个是必填的（IE除外，IE的后2个也是必填）  
  绘制区域宽高不填的话，绘制区域宽高就等于图像的宽高
- 插入canvas  
  `drawImage`第一个参数可以是自身的『canvas dom』  
  <span style='opacity:.5'>使用『canvas dom』绘制的开销与使用 Image 对象的开销几乎一致</span>

### 画布操作

- 移动之后绘制的坐标系中心点  
  `ctx.translate(x,y)`  
  可以多次使用进行叠加移动

### 复制canvas

`cloneNode`复制的canvas不会拥有原canvas的画面



### 像素操作

> 兼容性不是完美的，比如`ImageData`的构造函数在IE和安卓上是不可用的（但是可以用2d上下文的`createImageData`方法来实例化） —— 2020.8.14 MDN



##### 获得canvas部分的像素信息

`ctx.getImageData(x, y, w, h)`

详细解释：  
在canvas上指定一个矩形区域，返回矩形区域内的像素信息（`ImageData`实例）

参数说明：

- x：矩形区域左上角x坐标
- y：矩形区域左上角y坐标
- w：矩形区域宽度
- h：矩形区域高度



##### 像素信息

`ImageData`

含有3个 **只读** 属性

- `data`  
  是一个一维数组  
  是一个[Uint8ClampedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)实例  
  按顺序存储了每个像素的r、g、b、a  
  - 像素的排序规则是：  
    左上角开始  
    先从左到右，再到下一行
  - 可修改性  
    虽然这个属性是只读的，但是这个属性的子项是可修改的  
    <span style='opacity:.5'>（至少『对子项进行赋值』是允许的）</span>
- `width`  
  canvas宽度
- `height`  
  canvas高度



##### 依据像素信息填充canvas

实现是用canvas上下文的`putImageData`方法

**必填参数：**

1. imageData：`ImageData`实例
2. x：在canvas上填充内容的左上角的x坐标
3. y：在canvas上填充内容的左上角的y坐标

**先裁剪再填充**

使用必填参数意味着直接用`ImageData`实例的像素信息去填充  
也可以选择先把像素信息裁剪一下再去填充  
`putImageData`方法提供了这个能力  
需要使用裁剪能力的话需要加上后续全部的4个参数

4. clipX：裁剪区域左上角x坐标
5. clipY：裁剪区域左上角y坐标
6. clipW：裁剪区域宽度
7. clipH：裁剪区域高度



### canvas转图像

- 转base64  
  `canvas.toDataURL()`  

  - 让webgl也可用的方法  

    1. 获得webgl上下文时传入`{preserveDrawingBuffer: true}`  
       完整代码如下：  

       ```js
       const canvas = document.getElementById("canvas")
       const gl = canvas.getContext("webgl", {
         preserveDrawingBuffer: true
       })
       ```

       

### 擦除图像

- [`clearRect`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect)  
  设置一个矩形区域，并且擦除区域内图像
- 改变canvas的可绘制像素
- 颜色值设置为`'transparent'`然后绘图的方法应该是不行的  
  （没有试验过）





### 其他

- `canvas.getContext('2d').lineWidth`可以设置边框宽度，边框向内扩展，值是一边的2倍

- 颜色值可以写`'transparent'`







# 性能优化



### 对上下文（context）的赋值操作

> 我尝试执行以下赋值操作 10 6 次（个人认为可能是$10^6$），得到的结果是：对一个普通对象的属性赋值只消耗了 3ms，而对 context 的属性赋值则消耗了 40ms。
>
> 值得注意的是，如果你赋的值是非法的，浏览器还需要一些额外时间来处理非法输入，正如第3、4种情形所示。
>
> 1. `somePlainObject.lineWidth = 5;  // 3ms (10^6 times)`
> 2. `context.lineWidth = 5;  // 40ms`
> 3. `context.lineWidth = 'Hello World!'; // 140ms`
> 4. `context.lineWidth = {}; // 600ms`
>
> 
>
> 对 context 而言，对不同属性的赋值开销也是不同的。 lineWidth 只是开销较小的一类。下面整理了为 context 的一些其他的属性赋值的开销，如下所示。
>
> | 属性                 | 开销  | 开销（非法赋值） |
> | -------------------- | ----- | ---------------- |
> | line[Width/Join/Cap] | 40+   | 100+             |
> | [fill/stroke]Style   | 100+  | 200+             |
> | font                 | 1000+ | 1000+            |
> | text[Align/Baseline] | 60+   | 100+             |
> | shadow[Blur/OffsetX] | 40+   | 100+             |
> | shadowColor          | 280+  | 400+             |
>
> （不过）与真正的绘制操作相比，改变 context 状态的开销已经算小了
>
> —— [博客](https://www.cnblogs.com/mopagunda/p/5622911.html#articleHeader1)





### 程序设计

>  分层 Canvas 在几乎任何动画区域较大，动画较复杂的情形下都是非常有必要的。 —— [博客](https://www.cnblogs.com/mopagunda/p/5622911.html#articleHeader1)



### 离屏渲染

[MDN上的描述](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#%E5%9C%A8%E7%A6%BB%E5%B1%8Fcanvas%E4%B8%8A%E9%A2%84%E6%B8%B2%E6%9F%93%E7%9B%B8%E4%BC%BC%E7%9A%84%E5%9B%BE%E5%BD%A2%E6%88%96%E9%87%8D%E5%A4%8D%E7%9A%84%E5%AF%B9%E8%B1%A1)



### 其他一些重要等级不高的内容

**绘制图片时裁剪比不裁剪的性能消耗更大**

> 我尝试绘制 10 4 （个人认为可能是$10^4$）次一块 320x180 的矩形区域，如果数据源是一张 320x180 的图片，花费了 40ms，而如果数据源是一张 800x800 图片中裁剪出来的 320x180 的区域，需要花费 70ms。 —— [博客](https://www.cnblogs.com/mopagunda/p/5622911.html#articleHeader1)

**离屏绘制的api**  

> 第一次看到 getImageData 和 putImageData 这一对 API，我有一种错觉，它们简直就是为了上面这个场景（不开worker的离屏绘制）而设计的。前者可以将某个 Canvas 上的某一块区域保存为 ImageData 对象，后者可以将 ImageData 对象重新绘制到 Canvas 上面去。但实际上， putImageData 是一项开销极为巨大的操作，它根本就不适合在每一帧里面去调用。 —— [博客](https://www.cnblogs.com/mopagunda/p/5622911.html#articleHeader1)

**[MDN上关于性能优化的说明](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)**

**释放文档外的canvas元素**

- 覆盖存储元素的变量确实可以略微降低内存消耗
- 覆盖存储canvas上下文的变量会导致内存略微上升？  
  （这是一次测试的结果，未进一步了解以验证这条结果）