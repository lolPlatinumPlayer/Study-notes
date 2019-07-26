## 裁剪空间

webGL在一个容器里会生成一个**裁剪空间**，这个**裁剪空间**所绘制的图像会被拉伸地展示在容器上

- 裁剪空间轴方向与平面坐标系相同
- 坐标值区间是[-1,1]

## gl_Position

- `gl_Position`应该就是顶点着色器最终输出结果  
- 值应该是四维向量，头两个是xy坐标 

【】研究后两个是什么，才能研究出varing


## 顶点着色器与片段着色器
- 两个着色器之间作用域应该不共享  

  这意味着片段着色器中要用顶点着色器中的变量的话仍然需要再声明一次  

- 着色器中使用变量都需要声明  

  如果是attribute、uniform、varying的话前面还需要加上相应的内容

## 片段着色器

- `gl_FragColor`应该就是片段着色器的最终输出  

- 可以输出透明度颜色（不过“最初例子”两个重叠图形的透明部分不会叠加）

- 片断着色器没有默认精度，我们需要设置一个精度  

  `precision mediump float;`代表中等精度


## attribute
中文名：属性（暂定）  

可在js与顶点着色器之间共享


## uniform
中文名：全局变量（暂定）  

- GLSL中uniform声明的变量需要全部添加到ShaderMaterial的uniforms配置项下  
- 着色器运行前就要从js中获取这些变量值  
- 两个着色器都可以用uniform


## varying
中文名：可变量（暂定）

- 顶点着色器计算出varying的值，在片段着色器中调用
- 在着色器绘制面时，面中的每个“像素”将有不同的`gl_Position`，因此有`gl_Position`参与计算的varying在每个“像素”也有不同的值

> 对于每一个片段，每一个varying的值将是相邻顶点值的平滑插值。 —— three官网

## main方法

```c
void main() {
    // 代码
}
```

- 只有在main中才能进行赋值，不然将会报错“syntax error”或“global variable initializers must be constant expressions”   

  并且着色器无法运行  

- main中不能声明attribute、uniform、varying，不然XXX  


## 向量
- 可以用`vec4( vec2(1,2) , 0, 1);`这种写法  

- 颜色值向量的每个分量值都是从0到1  

> WebGL中颜色值的范围是0到1 —— webglfundamentals.org

- 可以用数字与向量进行加减，这时数字就相当于每个分量都等于其数字值的向量

## 其他

- 除了数组序号与分量值外，所有数字都要带小数点。  

  不然会报前一个运算符“wrong operand types”，而且整个着色器无法运行


# 疑问
- 着色器中找不到来源的的变量和函数、关键字都是什么
  - 这些变量包括但不限于uv、projectionMatrix、modelViewMatrix
  - 这些函数包括但不限于perspectiveDepthToViewZ、viewZToOrthographicDepth
  - 这些关键字包括但不限于#include

- `attribute`有什么`uniform`没有的功能