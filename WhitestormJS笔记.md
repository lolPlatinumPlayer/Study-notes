
## 自命名为应用（动画、对象以外所有内容）
`const 应用 =new WHS.App([各子项])`
子项中加入new WHS.OrbitControlsModule()可以拥有控制相机的交互
`应用.start()`运行（加不加动画这行都是必须的）


## 对象
添加：`对象.addTo(应用或者组)`
删除：`父内容.remove(对象)`


## 组
对象添加到组后就不能再添加进应用，不过还能单独对组中的某个对象进行控制
声明： `const group = new WHS.Group(任意数量的对象);` 对象用数组或多参数都可以


## 动画
```
const loop=new WHS.Loop(() => {
    动画代码
})
```
loop.start(应用)和loop.stop(应用)可以开启、暂停动画（不过目前多次开关后动画似乎会叠加而加速）
