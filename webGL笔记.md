## 坐标系
z轴指向屏幕外


## 场景
- 创建：`let scene=new THREE.Scene()`


## 相机
- 创建：`let camera=new THREE.PerspectiveCamera(视角，获取图像宽高比，最近渲染距离，最远渲染距离)`
  - 获取图像宽高比：就是相机捕获到的图像的宽高比，猜测：一般这个图像会拉伸着塞进canvas里
  - 是否渲染：只有同时在渲染距离与视角内的物体才会被渲染
- 移动：
  给`camera.position.x或y或z`赋值
  要一次性设置三个参数的话用position的set方法
  （无法直接给camera.position赋值）
- 旋转与移动同理，就是把`position`改为`rotation`


## 渲染器
暂时理解为canvas节点
- 创建：`let renderer = new THREE.WebGLRenderer()`
- 设置canvas节点尺寸：`renderer.setSize(宽度,高度)`
  宽高只接受数字，渲染时会自动加上px
- 插入canvas节点：
  `父元素.appendChild(renderer.domElement)`


## 对象
``` // 例子为立方体
var geometry = new THREE.BoxGeometry(1, 1, 1); // 设置形状
var material = new THREE.MeshBasicMaterial({color: 0x00ff00}); // 设置材质（这里直接上色，颜色值要么16进制数字要么非缩写字符串，字符串可以用单词）
var cube = new THREE.Mesh(geometry, material); // 依据形状和材质新建对象
scene.add(cube); // 将对象加进场景中
```
- 移动与旋转操作方法与相机相同
- 设置形状：
  - 立方体：`new THREE.BoxGeometry(1, 1, 1)` 参数对应立方体x、y、z边的长度
  - 圆：`new THREE.CircleGeometry( 半径, 圆弧上的节点数 )`
  - 线：
    ```
    new THREE.Geometry()
    geometry.vertices.push(new THREE.Vector3(-10,0,0));
    geometry.vertices.push(new THREE.Vector3(0,10,0));
    geometry.vertices.push(new THREE.Vector3(10,0,0));
    可以加更多节点...
    ```
    这里的节点会按顺序连成线，但是首尾不会相连
    （`new THREE.Vector3(x,y,z)`是three里面表达向量的一种方法，还有2维4维向量。目前不知道更简便地加线条节点的方法）
- 设置材质
  - 网格：`new THREE.MeshBasicMaterial({color: 0x00ff00})`
  - 线：`new THREE.LineDashedMaterial({color:'red'})`
- 新建对象
  - 网格：`new THREE.Mesh(形状, 材质)`
  - 线：`new THREE.Line(形状, 材质)`


## 动画
```
function animate() {
    requestAnimationFrame( animate ); // 1/60秒后调用其中函数（点其他标签页后就会暂停）

    // 这里放每1/60秒需要的变化
    
    renderer.render( scene, camera );
}
animate();
```


## 最终渲染
`renderer.render( scene, camera )`


## js判断浏览器是否支持webGL
https://threejs.org/docs/index.html#manual/zh/introduction/WebGL-compatibility-check
