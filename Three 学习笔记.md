## js判断浏览器是否支持webGL
https://threejs.org/docs/index.html#manual/zh/introduction/WebGL-compatibility-check


## 坐标系（默认情况下）
x轴向右  
y轴向上  
z轴向屏幕外  


## 场景
- 创建：`let scene=new THREE.Scene()`
- 添加内容：`scene.add(a,b,c)`
  可以同时添加不限个数的对象、光源，也可以多次添加
- 改变背景色  
  `scene.background = new THREE.Color( 十六进制或字符串 )`  
  这里字符串色值可以缩写


## 相机
- 创建：`let camera=new THREE.PerspectiveCamera(视角，获取图像宽高比，最近渲染距离，最远渲染距离)`
  - 获取图像宽高比：就是相机捕获到的图像的宽高比，猜测：一般这个图像会拉伸着塞进canvas里
  - 是否渲染：只有同时在渲染距离与视角内的物体才会被渲染
- 移动：
  给`camera.position.x或y或z`赋值、camera.position.setX或setY或setZ(距离)
  要一次性设置三个参数的话用position.set(x值,y值,z值)
  （无法直接给camera.position赋值、如果`position.set`传参数量不足，则几何体不会出现，但也不报错）
- 旋转与移动同理，就是把`position`改为`rotation`，three的角度单位都是弧度
- 缩放：scale
- quaternion暂不理解


## 渲染器
- 创建：`let renderer = new THREE.WebGLRenderer()`
- 设置canvas节点尺寸：`renderer.setSize(宽度,高度)`
  宽高只接受数字，渲染时会自动加上px
- 插入canvas节点：
  `父元素.appendChild(renderer.domElement)`
- 最终渲染
  `renderer.render( scene, camera )`


## 对象
这里的对象是指`Object3D`的实例，组也是`Object3D`的实例
```javascript // 例子为立方体
var geometry = new THREE.BoxGeometry(1, 1, 1); // 设置形状
var material = new THREE.MeshBasicMaterial({color: 0x00ff00}); // 设置材质（这里直接上色，颜色值要么16进制数字要么非缩写字符串，字符串可以用单词）
var cube = new THREE.Mesh(geometry, material); // 依据形状和材质新建对象
scene.add(cube); // 将对象加进场景中
```
- 移动与旋转操作方法与相机相同、旋转比相机多了`物体.lookAt(new THREE.Vector3(0,0,2))`这种方法
  （在whs组件中返回的组件中，这些操作要在setTimeout0里才能生效）
- 新建对象
  - 网格：`new THREE.Mesh(形状, 材质)`
  - 线：`new THREE.Line(形状, 材质)`
- 删除对象：`父内容.remove(组件)`
- 找到父级：`对象.parent`
- 遍历
  - 遍历对象及其后代  
    `对象.traverse(callback)`  
  - 遍历可见对象及其可见后代  
    `对象.traverseVisible(callback)`  
  - 遍历对象的祖先  
    `对象.traverseAncestors(callback)`  
- 让物体永远处于最前：`物体.material.depthTest=false`（new材质时也可以设置）（depthWrite也可以）
  （bug：whs平面有时候会挡在depthTest=false的物体上，这个时候给需要最前的物体的材质设置transparent:true就行）


## 材质
材质由纹理（map）与颜色等构成  
- 网格：
  - 直接上色：MeshBasicMaterial
    什么情况下都固定颜色
  - 漫反射：MeshLambertMaterial、MeshPhongMaterial（两个目前不知道区别）
    没有光源的话将不显示
- 线：`new THREE.LineDashedMaterial({color:'red'})`
- 更换贴图：给material.map赋值新new的图片或者新new的canvas
  （不过在whs的精灵组件中可以给spriteMaterial.map赋值）
- 面的渲染：  
  默认都只渲染正面  
  面的渲染有三个选项：正面（`THREE.FrontSide`）、反面（`THREE.BackSide`）、双面（`THREE.DoubleSide`）
  设置面的渲染有两个方法：在new材质时配置side选项、new材质后给side属性赋值  
- 将对象渲染为线框  
  方法：1、将`wireframe`配置项设为`true` 2、将`wireframe`属性赋值为`true`
  适用材质：大部分几何体或面的材质


## 形状
- **立方体**  
  `new THREE.BoxGeometry(1, 1, 1)`  
  参数对应立方体x、y、z边的长度  
- **圆**  
  `new THREE.CircleGeometry( 半径, 圆弧上的节点数 )`  
- **矩形**  
  `new THREE.PlaneBufferGeometry(x长,y长)`  
- **线**  
  线和点的尺寸似乎都不会随着相机远近而改变  
  ```javascript
  new THREE.Geometry()
  geometry.vertices.push(new THREE.Vector3(-10,0,0));
  geometry.vertices.push(new THREE.Vector3(0,10,0));
  geometry.vertices.push(new THREE.Vector3(10,0,0));
  // 可以加更多节点...
  ```
  这里的节点会按顺序连成线，但是首尾不会相连  
  （`new THREE.Vector3(x,y,z)`是three里面表达向量的一种方法，还有2维4维向量。目前不知道更简便地加线条节点的方法）  
- **任意形状的平面**  
  ```javascript
  const shape = new THREE.Shape(/*[
    new THREE.Vector2(-22,22),
    new THREE.Vector2(0,22),
    new THREE.Vector2(22,22),
    new THREE.Vector2(22,0),
    new THREE.Vector2(0,-22)
  ]*/);
  shape.moveTo(-22,22);
  shape.lineTo(0,22);
  shape.lineTo(22,22);
  shape.lineTo(22,0);
  shape.lineTo(0,-22);
  new THREE.ShapeGeometry( shape );
  ```
  这个例子中 **构造函数传参** 和 **`moveTo`、`lineTo`组合** 的效果一致  
  如果第一个`moveTo`替换为`lineTo`，则将会从中心点连线到第一个坐标，而不是以第一个坐标为 **起始/终止点**  
- **任意形状的平面加厚成的几何体**  
  `new THREE.ExtrudeGeometry( THREE.Shape实例, js对象 )`  
  `js对象`的常用属性：  
  - depth：厚度  
  - steps：加厚部分的分段数  
  - bevelEnabled：控制是否使用斜角（默认为true）
  
  更多属性及其他内容见[three官网](https://threejs.org/docs/#api/zh/geometries/ExtrudeGeometry)  
- **任意的面**  
  ```javascript
  function parametricFunc(u, v,target) {
    let x = u*10;
    let y = v*10;
    let z = 0;
    if (
      u > 0.1 && u < 0.2
      ||
      v > 0.3 && v < 0.5
    ){
      z=1
    }
    target.set( x, y, z );
  }
  const pg = new THREE.ParametricGeometry(parametricFunc, 100, 100);
  const pm = new THREE.MeshPhongMaterial({color: 0x00ff00});
  const p = new THREE.Mesh(pg, pm);
  scene.add(p);
  ```
  - **中文俗名**：参数化几何体  
  - **原理**：生成一个平面，再将这个平面的每个点进行坐标转换，最终面中的每个点的坐标我们都可以控制，控制时可以获得原平面的x坐标与y坐标。  
  - **参数**：`new THREE.ParametricGeometry(点坐标转换函数, 原平面x坐标分段数, 原平面y坐标分段数)`  
  - **点坐标转换函数**：  
    原平面的每个点都会调用这个函数而后生成新的点。  
    三个形参分别为：原平面x坐标、原平面y坐标、target  
    原平面x坐标和原平面y坐标的值都是从0到1  
    函数中要调用`target.set(最终x坐标,最终y坐标,最终z坐标)`来生成最终的点  
    最终坐标的单位与three空间一致  


## Sprite对象（总朝着相机的一个平面）
```javascript
var spriteMap = new THREE.TextureLoader().load("图片地址") // 这个加载是异步的
var spriteMaterial = new THREE.SpriteMaterial({map: spriteMap,rotation:1,color:'red'}) // color会与map相乘
var sprite = new THREE.Sprite(spriteMaterial)
```
- **近大远小**  
  默认会。`sizeAttenuation`设置为`false`后不会  
- **尺寸**  
  sprite对象建好后都是宽1高1的，需要用`scale`放大至需要的尺寸（`sizeAttenuation`设置为`false`的情况未测试）
- **旋转**  
  只能通过`spriteMaterial.rotation`旋转
  增加的话是逆时针
- **`center`**（只有sprite有）  
  值是three二维向量  
  xy为0时在左下角，为1时在右上角，值的大小不限  
  之后旋转位移缩放等都会以此为中心  
  
  
## Points对象（总朝着相机的一个平面）
- **近大远小**  
  不会（就算`sizeAttenuation`设为`true`还是不会）
> **曾用名**  
  `Points`曾用名有`PointCloud`、`ParticleSystem`  
  `PointsMaterial`曾用名有`PointCloudMaterial`、`ParticleBasicMaterial`、`ParticleSystemMaterial`  


## 光源
- **点光源**  
  ```javascript
  var light = new THREE.PointLight( 'white' );
  light.position.set( 10, 0, 25 );
  scene.add( cube,light );
  ```
  【】目前点光源似乎无法照亮漫反射材质，有空看下《官方点光源例子.html》
- **平行光**  
  `new THREE.DirectionalLight(光线颜色, 光照强度)`  
  光照方向：从无穷远处射向 position处的反方向  
  默认position：`{x:0,y:1,z:0}`


## 动画
```javascript
function animate() {
    requestAnimationFrame( animate ); // 1/60秒后调用其中回调（js专门给动画做的定时器，各方面比普通定时器都有优化）

    // 这里放每1/60秒需要的变化

    renderer.render( scene, camera );
}
animate();
```


## 鼠标拾取（鼠标碰了什么物体）
```javascript
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
function onMouseMove( event ) {
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // 通过相机和鼠标位置更新射线
    raycaster.setFromCamera( mouse, camera );
    // 鼠标所在位置投线触碰到所有物体的数组
    var intersects = raycaster.intersectObjects( scene.children );
    if(intersects.length>0){
        for ( var i = 0; i < intersects.length; i++ ) {
            console.log(intersects[ i ])
            intersects[ i ].object.position.x+=0.01 // 对物体进行操作
        }
        renderer.render( scene, camera );
    }
}
window.addEventListener( 'mousemove', onMouseMove, false );
```
如果物体添加到组里的话，鼠标是拾取不到的


## 组
只有两个添加子项的方法：  
1. 使用`Object3D`的`add`添加子项
2. `子项.addTo(组)`  


## 其他
- 材质的颜色值有set方法（应该所有值都能用set设置）


# three辅助方法


## 渲染几何体所有面的法线
```javascript
geometry = new THREE.BoxGeometry( 10, 10, 10, 2, 2, 2 );
material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
box = new THREE.Mesh( geometry, material );
helper = new THREE.FaceNormalsHelper( box, 2, 0x00ff00, 1 );
// scene.add( box );
scene.add( helper );
```


# 配合使用工具


## stats
功能：提供一个帧率显示面板  
地址：https://github.com/mrdoob/stats.js  


## dat.gui
功能：提供一个可以控制指定数据的面板  
地址：https://github.com/dataarts/dat.gui  


## OrbitControls
功能：鼠标控制相机  
使用方法：
1. `const ms_Controls = new THREE.OrbitControls(camera, renderer.domElement);`  
2. 在定时器里加上`ms_Controls.update();`

地址：可能是https://github.com/fibo/three-orbitcontrols  
three仓库里有源码，路径为“examples/js/controls/OrbitControls.js”

