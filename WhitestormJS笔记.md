例子目前运行不了


## 应用
`const 应用 =new WHS.App([各子项])`
功能：将渲染器和场景做好、一次性设置并添加多个组件
子项中加入new WHS.OrbitControlsModule()可以拥有控制相机的交互
`应用.start()`运行（加不加动画这行都是必须的）


## 组件
- 添加：`组件.addTo(应用或者组)`
  （用与three一致的add方法也可以）


## 组
组件添加到组后就不能再添加进应用，不过还能单独对组中的某个组件进行控制
声明： `const group = new WHS.Group(任意数量的组件);` 组件用数组或多参数都可以


## 动画
```
const loop=new WHS.Loop(() => {
    动画代码
})
```
loop.start(应用)和loop.stop(应用)可以开启、暂停动画（不过目前多次开关后动画似乎会叠加而加速）
