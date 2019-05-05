
## 应用
`const 应用 =new WHS.App([各子项])`  
功能：将渲染器和场景做好、一次性设置并添加多个组件  
子项中加入new WHS.OrbitControlsModule()可以拥有控制相机的交互  
`应用.start()`运行（加不加动画这行都是必须的）  
整体例子：  
```
    const app = new WHS.App([
        new WHS.ElementModule({container:document.getElementById('app')}), // 这是2个教程里都仅存的写法，不过曾经个人用过一个写法：`new WHS.ElementModule(document.getElementById('app')),`
        new WHS.SceneModule(),
        new WHS.DefineModule('camera', new WHS.PerspectiveCamera({
            position: new THREE.Vector3(0, 22, 44),
        })),
        new WHS.RenderingModule({
            bgColor: '#1a2d39',
            renderer: {
                antialias: true,
                shadowmap: {
                    type: THREE.PCFSoftShadowMap
                }
            }
        }, {shadow: true}),
        new WHS.OrbitControlsModule(),
        new WHS.ResizeModule(),
    ])
```



## 组件
- 添加：`组件.addTo(应用或者组)`
  （用与three一致的add方法也可以）
- build
  这是一个很多组件都有的生命周期（但是基组件、组上没有），组件有new就会执行一次，出现多次也只会执行一次（个人猜测）  
  相当于普通类的constructor，但是whs组件不能写constructor  
  必须返回一个three物体（组的话可以返回WHS.Group 的.native）（这种方法建组，中间带自建sprite实例的话，组实例.children[0].material全等于sprite实例.spriteMaterial）  
- native属性：组件的three对象
- 组件进行extends后，build形参除了实参以外还会返回extends的whs组件自带的属性，在实参处也可以直接传这些自带的属性
- position、rotation可以整体赋值，不需要three的给一个向量  
- 获取父级  
  和three一样用`parent`方法就能获取，不同的是，whs组件不能在添加到场景后立即获取父级内容，立即获取会返回`undefined`


## 组（组件有的方法属性基本都有）
组件添加到组后就不能再添加进应用，不过还能单独对组中的某个组件进行控制  
声明： `const group = new WHS.Group(任意数量的组件);` 组件用数组或多参数都可以  
虽然源码上extends自MeshComponent，但是组不能通过直接传参position、rotation等进行改变  


## 动画
```
const loop=new WHS.Loop(() => {
    动画代码
})
```
loop.start(应用)和loop.stop(应用)可以开启、暂停动画（不过目前多次开关后动画似乎会叠加而加速）  


## 模块（个人感觉whs的模块有点类似es6类的扩展，但是比扩展多了一些whs的方法）
- 生命周期  
  加入模块的组件每new一次执行一次生命周期  
  顺序是：constructor、manager、integrate、build、渲染（bridge中的方法的话是调用applyBridge时执行）  
- constructor  
  在其中给this添加的内容可以在生成模块的类间通用（实例上不能用）  
  bridge中通过第二个参数调用（一般命名为self）  
  integrate中通过唯一传参调用  
  manager中直接写this  
  - bridge：存放函数，通过`this.applyBridge()`调用其中的函数  
    applyBridge方法目前感觉相当于一个默认的实例方法  
- integrate  
  - 其中给this添加的内容都会到实例上，这里操作this也相当于操作实例  
  - 除了实例，增加了这个模块的类的build方法里也能通过`this.属性名`调用这些内容，也可以给这些内容赋值
- manager 似乎是组件间通信用的


## 原生模块
- 鼠标事件
  `const mouse = new WHS.VirtualMouseModule()`
  - app增加事件步骤
    - 加入mouse模块 （目前这步会导致控制台报错：THREE.Camera: .getWorldDirection() target is now required）
	- `app.on(不带on的字符串事件名, 回调)`
      回调有一个参数，代表鼠标事件  
  - 物体增加事件步骤（组不是物体）
    - 所在app加mouse模块
    - `mouse.track(物体)`
	- `物体.on(.. )`


## 其他
- 平面组件rgba不支持透明度

