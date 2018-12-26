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


## 动画
```
function animate() {
	requestAnimationFrame( animate ); // 应该是输入所在的函数名，让函数中内容每1/60秒执行一次
  
  // 两行动画效果
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
	renderer.render( scene, camera ); // 应该是执行渲染
}
animate();
```
