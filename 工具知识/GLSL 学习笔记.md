## 裁剪空间

webGL在一个容器里会生成一个**裁剪空间**，这个**裁剪空间**所绘制的图像会被拉伸地展示在容器上

- 裁剪空间轴方向与平面坐标系相同
- 坐标值区间是[-1,1]

## gl_PointSize

顶点显示的方块的尺寸

（用ps魔棒测量时记得把“消除锯齿”去掉，不然会多选几个像素）

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
一个attribute有可能一次执行只用一部分，执行多次才全部用完


## uniform
中文名：全局变量（暂定，webglfundamentals里这样叫）  

uniform就是一个定值，在各个地方都一样  
uniform属于一个着色器程序

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

- 只有在main中才能给已声明变量赋值，不然将会报错“syntax error”或“global variable initializers must be constant expressions”   

  并且着色器无法运行  

- main中不能声明attribute、uniform、varying，不然XXX  


## 向量
- 可以用`vec4( vec2(1,2) , 0, 1);`这种写法  

- 颜色值向量的每个分量值都是从0到1  

> WebGL中颜色值的范围是0到1 —— webglfundamentals.org

- 可以用数字与向量进行加减，这时数字就相当于每个分量都等于其数字值的向量

## 向量取值

- vec4.x, vec4.y, vec4.z, vec4.w 通过x，y，z，w可以分别取出4个值。

- vec4.xy, vec4.xx, vec4.xz, vec4.xyz 任意组合可以取出多种维度的向量。

- vec4.r, vec4.g, vec4.b, vec4.a 还可以通过r，g，b，a分别取出4个值，同上可以任意组合。

- vec4.s, vec4.t, vec4.p, vec4.q 还可以通过s，t，p，q分别取出4个值，同上可以任意组合。

- vec3和vec2也是类似，只是变量相对减少，比如vec3只有x，y，z，vec2只有x，y。

## 乘法顺序

- 矩阵与向量相乘，矩阵要放前面，不然平移矩阵不会生效
- 不同顺序的矩阵相乘会产生不同的结果

## 其他

- 除了数组序号与分量值外，所有数字都要带小数点。  

  不然会报前一个运算符“wrong operand types”，而且整个着色器无法运行  
  
  （也有可能是因为声明为浮点数的值必须带小数点）
  
- 只有同类型数据才能进行运算、比较等操作  

  不然报不存在两个数据之间的那个操作符

- **普通声明**  

  *自己定义的概念：attribute、uniform、varying以外的声明*

  普通声明在任何地方都可以

  甚至可以在main外进行带四则运算的赋值
  
  可以在声明时不赋值，使用未赋值的变量程序也能正常运行

## 运算符

基本与js一致

## 条件语句相关

基本与js一致


# 疑问
- 着色器中找不到来源的的变量和函数、关键字都是什么
  - 这些变量包括但不限于uv、projectionMatrix、modelViewMatrix、position
    
    - projectionMatrix、modelViewMatrix、position估计都是three提供的 attribute 
    
      - **projectionMatrix**  
    
        投影矩阵
    
      - **modelViewMatrix**  
    
        视图矩阵与模型矩阵的乘积
    
      - **position**  
    
        模型点坐标（三维向量）（之前写是四维）  
      
        `position`可能只能在顶点着色器使用
      
      来源：[掘金博客](https://juejin.im/post/5b0ace63f265da0db479270a)
      
      `modelViewMatrix*vec4( position,1.)`的中心点位于canvas中央，单位和`position`没有区别
  - 这些函数包括但不限于perspectiveDepthToViewZ、viewZToOrthographicDepth
  
- 这些关键字包括但不限于#include
  
- `attribute`有什么`uniform`没有的功能

- 坐标系

