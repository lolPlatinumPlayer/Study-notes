## 地图

通过实例化`mapboxgl.Map`来初始化地图  
`mapboxgl.Map`实例就是地图

## 改变镜头

- **jumpTo**  
  瞬间将镜头参数瞬间改成输入值
- **easeTo**  
  直线缓动成输入值
- **flyTo**  
  镜头切换过程是缓动的，且有一个跳离地面的效果  
  `flyTo`是最灵活的改变镜头方法，比`easeTo`还多了如`curve`、`minZoom`等配置项
- **stop**  
  停止缓动动画

## 事件

有很多，比如单双击、鼠标移入移出、鼠标移动等  
应该都可以单独作用于图层（已经测过了双击和鼠标移动，这两个事件在说明里都没提到“图层”）  

- **写法**  
  `map.on`方法  
- **给地图增加事件**  
    `map.on(事件名,回调)`
  
- **给图层增加事件**  
    `map.on(事件名,图层id,回调)`


## 数据源

有很多内容，这里只写一部分，详细信息查阅[规范](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/)及[api文档](https://www.mapbox.cn/mapbox-gl-js/api/#sources)  
可以用于图层，也可以用于地图  
有五种类型：矢量瓦片、栅格瓦片、GeoJSON、图片、视频  
使用方式有很多种

- **瓦片**  
  目前看到都是出现在`"mapbox-xxxx"`对象中，但是并不知道该对象是什么  
  api文档中并没有出现对瓦片数据源的操作方法

- **api**  
  有以下内容的api  
  GeoJSON、图片、视频、canvas  
  - canvas  
  可以传入dom id也可以传入未插入文档的dom  
    可以监听canvas进行实时更新  
    coordinates输入四个坐标（从左上角起，顺时针）  
    <span style='opacity: 0.5'>canvas应该是对图片的扩展（因为canvas描述里有一句话“Extends ImageSource”）</span>
  
- **聚类**  
  应该只能用于GeoJSON数据源  
  可以通过数据源的配置项和数据源的方法来控制  
  配置项查阅规范、方法查阅api文档

## 其他

- 核心在图层，图层还待详细了解
- 似乎可以在一个页面开启多个mapbox的canvas（开图多次）  
  想法基于[博客](https://www.cnblogs.com/lilei2blog/p/8961564.html)
- `queryRenderedFeatures`  
  查询范围内可见要素，返回它们的一些信息  
  可以查单点也可以查矩形，可以加其他的限定条件  
  对raster图层无效
