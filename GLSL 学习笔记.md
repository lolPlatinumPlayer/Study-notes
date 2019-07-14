## gl_Position
gl_Position应该就是顶点着色器最终输出结果
值应该是四维向量，头两个是xy坐标

片段着色器main函数中的gl_FragColor最终值就是最终计算出每个像素的颜色


## 顶点着色器与片段着色器
两个着色器之间作用域应该不共享，这意味着片段着色器中要用顶点着色器中的变量需要再声明一次


## attribute
可在js与顶点着色器之间共享


## uniform
uniform可以在js中进行赋值，赋值后下一帧开始就会按照新值进行计算
GLSL中uniform声明的变量需要全部添加到ShaderMaterial的uniforms配置项下
着色器运行前就要从js中获取这些变量值


## varying
顶点着色器计算出varying的值，在片段着色器中调用
varying声明的变量需要同时在顶点着色器和片段着色器中进行声明
> 对于每一个片段，每一个varying的值将是相邻顶点值的平滑插值。 —— three官网


## 向量
可以用`vec4( vec2(1,2) , 0, 1);`这种写法


除了数组序号外，所有数字都要带小数点

颜色值向量的每个分量值都是从0到1
> WebGL中颜色值的范围是0到1 —— webglfundamentals.org

可以用数字与向量进行加减，这时数字就相当于每个分量都等于其数字值的向量


# 疑问
- 着色器中找不到来源的的变量和函数、关键字都是什么
  这些变量包括但不限于uv、projectionMatrix、modelViewMatrix
  这些函数包括但不限于perspectiveDepthToViewZ、viewZToOrthographicDepth
  这些关键字包括但不限于#include
- 顶点着色器实际如何工作，比如gl_Position的结果到底有何影响
