
## 上下文对象
所有的实际性内容都要从上下文对象里调用（猜测一个canvas标签只能用一个上下文）
`let ctx =canvas.getContext("2d")`

## 矩形

- 设置填充颜色  

  `ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'`    

  也可以把渐变填充赋值给`ctx.fillStyle`

- 创建矩形路径  

  `ctx.rect(x, y, width, height)`  

- 按路径画线  

  `ctx.stroke()`  

- 填充路径  

  `ctx.fill()`  

  可以创建多个路径然后一次性填充  

- 直接填充矩形（不用先创建路径）  

  `ctx.fillRect(10, 10, 100, 100)`

## 径向渐变填充

`var ggg = ctx.createRadialGradient(六个参数)`  

画两个圆，连接两个圆上的对应顶点，并在画到第二个圆后延长至一个点  

六个参数分别是：第一个圆的xy坐标与半径、第二个圆的xy坐标与半径  

`ggg.addColorStop(距离百分比,颜色)`

百分比=这个节点与第一个圆对应顶点的距离/两个圆对应顶点的距离

`ctx.fillStyle = ggg`

最后调用填充矩形的方法进行绘制

## 画线

```javascript
ctx.beginPath();
ctx.strokeStyle = 'blue';
ctx.moveTo(40,20);
ctx.lineTo(200,20);
ctx.stroke();
```

`ctx.beginPath()`可能意味着不清空之前的绘画，而继续进行接下来的绘制（看[慕课](https://www.imooc.com/video/3479)时产生的想法）

## 其他

- canvas宽高改变后会自动清空画布

- 返回canvas转为图片后的base64代码  

  `canvas.toDataURL()`

- `canvas.getContext('2d').lineWidth`可以设置边框宽度，边框向内扩展，值是一边的2倍

- 颜色值可以写`'transparent'`