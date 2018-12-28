## 场景
- 创建：`let scene=new THREE.Scene()`


## 相机
- 创建：`let camera=new THREE.PerspectiveCamera(视角，获取图像宽高比，最近渲染距离，最远渲染距离)`
  - 获取图像宽高比：就是相机捕获到的图像的宽高比，猜测：一般这个图像会拉伸着塞进canvas里
  - 是否渲染：只有同时在渲染距离与视角内的物体才会被渲染
- 移动：
  给`camera.position.x或y或z`赋值（无法直接给camera.position）
  坐标系：z轴指向屏幕外


## 渲染器
暂时理解为canvas节点
- 创建：`let renderer = new THREE.WebGLRenderer()`
- 设置canvas节点尺寸：`renderer.setSize(宽度,高度)`
  宽高只接受数字，渲染时会自动加上px
- 插入canvas节点：
  `父元素.appendChild(renderer.domElement)`


## 对象
```
var geometry = new THREE.BoxGeometry(1, 1, 1); // 立方体三个边的长度
var material = new THREE.MeshBasicMaterial({color: 0x00ff00}); // 上材质（上色，颜色值要么16进制数字要么非缩写字符串）
var cube = new THREE.Mesh(geometry, material); // 新建立方体
scene.add(cube); // 将立方体加进场景中
```


## 动画
```
function animate() {
	requestAnimationFrame( animate ); // 1/60秒后调用其中函数（点其他标签页后就会暂停）

    // 加点变化
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate();
```


## 最终渲染
`renderer.render( scene, camera )`


## js判断浏览器是否支持webGL
https://threejs.org/docs/index.html#manual/zh/introduction/WebGL-compatibility-check
