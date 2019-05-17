
## 应用
`const 应用 =new WHS.App([各模块])`  
`应用.start()`运行（加不加动画这行都是必须的）  
功能：将渲染器和场景做好、一次性设置并添加多个组件、等等  
模块：加入`new WHS.OrbitControlsModule()`模块可以拥有控制相机的交互  
可运行例子：  
```javascript
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
	// 其他模块..
    ])
```


## 名词定义
这些定义限于本笔记，可能与其他文档不同  
- **应用**：`App`类的实例  
- **模块**：`new`应用时传参的各数组元素，或生成数组元素的类
- **组件**：所有有继承`Component`类的类、以及这些类的实例都可以称为组件  
- **物体**：各种几何体或几何体组成的东西，不管是依赖three生成的还是依赖whs生成的，都可以称为物体  【】
- **bridge**：模块的`bridge`属性的各方法都称为“bridge”  


## 组件
- 添加：`组件.addTo(应用或者组)`
  （用与three一致的add方法也可以）
- build
  这是一个很多组件都有的生命周期（但是`Component`组件、`Group`组件没有），组件有`new`就会执行一次  
  可返回内容：
  - three物体（组的话可以返回WHS.Group 的.native）（这种方法建组，中间带自建sprite实例的话，组实例.children[0].material全等于sprite实例.spriteMaterial）  
  - promise对象  
    返回promise对象的话这个promise也会执行  
- native属性：组件的three对象
- 组件进行extends后，build形参除了实参以外还会返回extends的whs组件自带的属性，在实参处也可以直接传这些自带的属性
- position、rotation可以整体赋值，不需要three的给一个向量  
- 获取父级  
  和three一样用`parent`属性就能获取。不同的是，whs组件不能在添加到场景后立即获取父级内容，立即获取会返回`undefined`


## 组（组件有的方法属性基本都有）
组件添加到组后就不能再添加进应用，不过还能单独对组中的某个组件进行控制  
声明： `const group = new WHS.Group(任意数量的组件或three物体);` 组件用数组或多参数都可以  
虽然源码上继承自`MeshComponent`，但是组不能通过直接传参position、rotation等进行改变  


## 动画
```javascript
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
  在其中**给this添加的内容**可以在生成模块的类间通用（实例上不能用）  
  - bridge中通过第二个参数调用（一般命名为self）  
  - integrate中通过唯一传参调用  
  - manager中直接写this  
- bridge  
  - **声明**  
    模块的`bridge`属性接收一个对象为值，这个对象拥有多个方法，这些方法称为“bridge”  
  - **调用**  
    实例上通过`this.applyBridge(对象)`调用bridge  
    这个对象可以有多个属性，属性名就是bridge名，属性值就是传给bridge的第一个实参  
    `applyBridge`执行完毕后返回这个对象，对象的值会改为各个bridge的计算结果  
- integrate  
  - 其中给this添加的内容都会到实例上，这里操作this也相当于操作实例  
  - 除了实例，增加了这个模块的类的build方法里也能通过`this.属性名`调用这些内容，也可以给这些内容赋值
- manager 似乎是组件间通信用的


## 原生模块
- **增加鼠标事件方法**  
  1. `const mouse = new WHS.VirtualMouseModule()`  
  2. 应用的模块中加入mouse （目前这步会导致控制台报错：`THREE.Camera: .getWorldDirection() target is now required`）  
  3. - **加在应用上的话**  
       `应用.on(不带on的字符串事件名, 回调)`  
       回调有一个参数，代表鼠标事件  
     - **加在物体上的话**（组不是物体）  
       `mouse.track(物体)`  
       `物体.on(.. )`（格式与应用的on一致）  


## 导入3d模型文件
```javascript
new Importer({
  url:文件地址,
  loader:对应文件格式的加载器, // 默认是JSON的，obj格式的话用`new THREE.OBJLoader()`
  parser(geometry, material) { // 传入加载器处理后的数据
    return new THREE.Mesh(geometry, material); // 返回（接近）最终放入场景的内容。应该要求是mesh对象
  },
}).addTo(app);
```
更多操作看官网和源码


## 其他
- 平面组件rgba不支持透明度


# 不常用内容
（摘自官网与源码，都没有验证过）


## `Component`类
网格组件、相机、灯光 都继承自`Component`类
- **`isDeffered`取值函数**
  查看组件内的promise是否全部执行完毕
- **`_wait`实例属性**
  查看组件内未执行完毕的promise
  
  
## 网格组件
即`MeshComponent`类
