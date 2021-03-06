



# 概念

### 名词定义

- 地图容器：实例化地图时挂载的dom元素
- containerPoint：  
  相对于地图容器左上角的像素坐标  
  坐标轴与[html的canvas](https://developer.mozilla.org/zh-CN/docs/Glossary/Canvas)一致
- origin pixel：  
  *这是一个虚拟的点*  
  在地图实例化完毕后这个点在地图容器的左上角  
  鼠标拖拽的话会让这个点随地图移动  
  （滚轮操作不会改变这个点）
- layerPoint：  
  相对于origin pixel的像素坐标  
  坐标轴与canvas一致

### 特性

- 不需要canvas renderer的话不会在overlay pane里插入canvas（比如添加物只有marker时）

- 绘制完毕后canvas尺寸都是固定的  
  width比地图容器多267，height比地图容器多60  
  猜测：这个多出部分应该是由renderer的padding和地图容器尺寸共同决定的

- canvas中心点与地图容器的中心点并不一定是一致的（重绘后也是这样）

- 镜头动画都是通过改变各dom的css实现的  
  镜头动画结束时会对canvas进行重绘

- 移动镜头时可能进行多个『镜头动画-重绘』

  



# 程序

### 编码规范

- 非方法成员除了`options`以外，命名全以`_`开头
- 类基本都有工厂方法。使用工厂方法可以比使用类少用一个`new`关键字，工厂方法名字就是类名的小写版

### 类

这里的“类”是leaflet自己用js实现的，基类是`L.Class`  
详细内容看[官网](https://leafletjs.com/reference-1.6.0.html#class)  
实例的`__proto__`上可以看到类创建的内容，父类创建的内容则在`__proto__.__proto__`上

- **initialize**方法  
  构造函数  
  和es6不同的是，它不调用父类构造函数也是允许的
- **options**属性  
  是一个对象，会与父类的`options`进行合并（父类的`options`会作为子类`options`的`__proto__`）  
  - `setOptions(this, options)`  
    将`options`参数与`this.options`进行上文说到的『合并』  
    可以通过`L`或者`L.Util`调用  
  - 语义：  
    用户实例化时的配置项  
    leaflet内部都不会去修改`options`的属性
- **Includes**  
  操作方法：includes属性、include静态方法  
  混合  
  遇到同名属性时覆盖优先级为：include静态方法>普通属性>includes中的属性
- **addInitHook**方法  
  继承`L.Class`的类可以使用该方法（`L.Class`自身使用该方法将不生效）  
  该方法用于增加『在`initialize`方法执行完毕后执行的代码』  
  可以输入函数，也可以输入字符串的方法名

**特点**

- 实例的方法在第一层属性上都找不到  
  会添加到第一层原型链上（同类不同实例的第一层原型链都是全等的）

### 事件

##### 内置事件

在[这里](https://leafletjs.com/reference-1.0.3.html#map-event)应该能查到所有内置事件  
还有很多内容，看[文档](https://leafletjs.com/reference-1.6.0.html#map-baselayerchange)（文档其他位子估计也有相关内容）

- （其中'preclick'事件在实现上单纯就是：在该触发'click'的代码前触发了一下而已）

##### 事件基类

`L.Evented`  
有普通的`on`、`off`、`fire`方法  

- `fire`方法可以选择是否冒泡到 事件祖先对象上
- `listens`方法用于判断目标是否有指定事件  
  除了可以在目标自身上判断，还可以选择在目标及目标事件祖先上判断
- `_events`属性里有所有的事件  
- `addEventParent`和`removeEventParent`2个方法还没看  
  不过应该是用来增减事件上级对象的



### renderer

- `_bounds`属性  
  其`min`于`max`属性分别是canvas左上角与右下角的layerPoint



### 图层

##### 介绍

可以addTo`L.Map`的实例，和`L.Map`的实例产生互动  
有插入html的一些内容（插入位子是多个pane之一）  
pane的dom结构应该都如下

![leaflet-pane](..\图片\leaflet-pane.png)

如果用的renderer是`L.canvas()`的话  
所有矢量内容都会在一个canvas上（就算用了图层组也一样）

##### 情况

`L.Layer`是一个重要的类，以下内容继承了该类

- egis.layer.GraphicsLayer -> L.LayerGroup-> L.Layer
- egis.Graphic -> L.Path -> L.Layer
- L.TileLaye -> L.GridLayer -> L.Layer
- leaflet的Marker、Polygon、Popup等

##### 阅读

Layer的阅读重点在Methods和Extension methods  
Extension methods的意思是：希望子类有的方法

### 图层组

`L.layerGroup(图层组成的数组)`  
作用：将多个图层合并作一个图层处理

### `L.Path`

> 一个抽象类。其中包含矢量叠加层（多边形，折线和圆）之间共享的选项和常量。不要直接使用它——官网

Path -> Layer -> Evented -> Class

继承该类的类如下

1. Polygon -> Polyline -> Path
2. Circle -> CircleMarker -> Path

### Circle、CircleMarker 

区别：

- CircleMarker的radius单位是屏幕像素，Circle的是米
- Circle传参有三传参的方式（功能相同）
- Circle多了getBounds方法

### Util

- **stamp**  
  制造id
  
- **trim**  
  去掉头尾空格
  
- **splitWords**  
  输入字符串，返回一个数组  
  这个数组是用空格切割字符串后得到的
  
- **求平面上点与线段的距离**  
  `pointToSegmentDistance`  

  ```js
  /**
   * 求平面上点与线段的距离
   * @param {array} inputPoint 点
   * @param {array} segment 线段
   * @returns {number}
   **/
  function getDistance(inputPoint,segment) {
    const lPoint=L.point(...inputPoint)
    const lLinePointA=L.point(...segment[0])
    const lLinePointB=L.point(...segment[1])
    return L.LineUtil.pointToSegmentDistance(lPoint,lLinePointA,lLinePointB)
  }
  ```

  









# API

文档里说的上下左右方向和屏幕呈现的一致，坐标似乎与canvas一致


### 初始化

`const map = L.map(div的id)`

### 增加底图

添加一个瓦片图层到地图上

```javascript
L.tileLayer(url模板, {
  id: 'mapbox.streets'
}).addTo(map);
```

第二个参数可能叫options（本笔记中就这么叫）

- url模板还是少改好，按照leaflet官网改mapbox的url会导致底图无法加载
- url模板中`{字符串}`字样似乎会被options中同名属性替换  
  比如`{accessToken}`就可以被`accessToken`属性值替换
- 第二个参数的renderer属性指定绘制矢量图层的默认方法  
  有两个选值：`L.canvas()`和`L.svg()`

### 一些添加物

- 标记：`var marker = L.marker([51.5, -0.09]).addTo(map)`  
  用img标签实现的

- 圆  

  ```javascript
  var circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
  }).addTo(map)
  ```

  用svg实现的

- 多边形  

  ```javascript
  var polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
  ]).addTo(map)
  ```

  用svg实现的

- 弹窗  

  ```javascript
  var popup = L.popup()
      .setLatLng([51.5, -0.09])
      .setContent("I am a standalone popup.")
      .openOn(map)
  ```

  用html实现的

  - 点击指定物体进行弹窗：`其他添加物.bindPopup("弹窗文本")`



### 地图

- `getSize`  
  返回地图像素单位的宽高，用`L.Point`实例表示
- `containerPointToLayerPoint`  
  输入containerPoint返回layerPoint

### `bounds`

- 实例化时传入2个点，点可以是数组形式也可以是`L.Point`实例  
- 实例化后实例立即拥有两个属性——min与max，是两个`L.Point`实例  
  分别是x、y值都是最小的点与最大的点
- `getSize`方法  
  返回一个`L.Point`实例，`x`是x轴方向跨度，`y`是y轴方向跨度
- 其他方法看[官网](https://leafletjs.com/reference-1.0.3.html#bounds)就能理解

### `point`

- round方法  
  返回一个副本，该副本的xy都是整数（由原point四舍五入后得到）
- add方法  
  向量相加
- subtract方法  
  向量相减

