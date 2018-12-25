## 场景
- 创建：`let scene=new THREE.Scene()`


## 相机
- 创建：`let camera=new THREE.PerspectiveCamera(145,container.offsetWidth/container.offsetHeight)`
  （PerspectiveCamera是透视相机）
- 移动：`camera.position.z = 5`


## 渲染器
暂时理解为canvas节点
- 创建：`var renderer = new THREE.WebGLRenderer()`
- 设置canvas节点尺寸：`renderer.setSize(window.innerWidth, window.innerHeight)`
- 插入canvas节点：在某个地方插入一个dom——`renderer.domElement`


## 对象
```
var geometry = new THREE.BoxGeometry(1, 1, 1); // 立方体的形状参数
var material = new THREE.MeshBasicMaterial({color: 0x00ff00}); // 上材质（上色）
var cube = new THREE.Mesh(geometry, material); // 新建立方体
scene.add(cube); // 将立方体加进场景中
```
