# 学习

**学习进度**

- 【】整整classificationType的笔记，面也有的
- 水面  
  [demo](https://sandcastle.cesium.com/?src=Lighting.html&label=All)
- 镜头锁定住一点进行环绕  
  应该是可以做的
- 线路A  
  下次从https://www.cesium.com/docs/tutorials/cesium-workshop/ 的Setup开始学
- 线路B
  - 先搞『卫星绕地球转的，卫星间要加个连线』
    - 加模型
    - 加图片
- 连接webpack的教程学到[这](https://www.cesium.com/docs/tutorials/cesium-and-webpack/#manage-cesiumjs-static-files)之前  
  本地代码地址为：[地址](D:\learning_materials\cesium\code\cesium-webpack-app)





**非重点待学内容**

- 拖拽物体方法
- 模型中心点查看方法



**学习上的记录**

- [最初教程](https://cesium.com/ion/stories?t=welcome)
- 官网的学习资源蛮丰富的





# 前置内容

阅读本笔记需先阅读的内容



- 本笔记将Cesium.Viewer实例称为`viewer`  
  （这也是一个通用称法）



# 综述

> CesiumJS是一个为了web上的3D地图而生的js库
>
> Cesium ion是一个 可以发现3D内容、可以以流的形式切片个人数据 的中心
>
> —— [官网](https://cesium.com/docs/tutorials/getting-started/)



### 版本比较

**66 vs 82**

- 拖拽后镜头飞行状态的画面抖动  
  在hrtPC上已经经过多种情况的测试  
  - cdn引入方式  
    2个版本都有，不过82比66流畅很多
  - node_module引入方式  
    2版本差别巨大，82完全不卡  
    甚至加载切片都感觉快了很多
- node_module版本67升82  
  感觉不需要做任何改动



# 基础



所有项目都必要的代码如下：  
`var viewer = new Cesium.Viewer(cz的html容器的id)`



### 代码项目



##### 运行

- 直接cdn引入就能写
- 用npm安装也可以
  - `import * as Cesium from 'cesium'`  
    不搞项目配置直接这样搞Cesium里有东西，不过`new Cesium.Viewer('czContainer')`仍然报错





- 账号
  - 不需要token、帐号等额外的东西  
    token、帐号是地图服务、地形服务需要的  
    当然就算你没有帐号实际上也是可以用地图服务的
  - 一个不使用帐号的例子  
      二开的commit id为7adcc4d57157078c1dfcd6f1587cd774b45f8a6b的commit，可能还有更早的例子，但不记得了  
      InitCesium那个文件应该是用了谷歌地图，所以不需要token，不过有时要翻墙
  - 用npm装1.67版的话，`Cesium.Ion.defaultAccessToken`默认就有值





- **关于多次初始化**  
  目前做法：用删dom作为退出操作，重新开始就从头执行一遍代码  
  目前做法的测试结果：多次『退出进入』后一切正常，cpu也不会多用，但内存可能会稍微多占一些



### `viewer`

- [`viewer.entities`](https://cesium.com/docs/cesiumjs-ref-doc/EntityCollection.html)
- 似乎没有设置初始镜头的功能



### 底图服务

- 默认应该是bing地图，因为开地图选择控件的话默认选的是bing

- 搭建本地地图服务  

  - [这个博客](https://blog.csdn.net/hzh839900/article/details/78063118)里搜索“SingleTileImageryProvider”可以查看相关内容

- 使用mapbox底图  
  MapboxImageryProvider可以，MapboxStyleImageryProvider可能也可以

  - MapboxImageryProvider  
    demo如下  

    ```js
    const viewer = new Cesium.Viewer('cesiumContainer',{ 
      imageryProvider:new Cesium.MapboxImageryProvider({
        mapId:'mapbox.satellite',//底图类型
        accessToken: mapbox的Token,
      }),
      baseLayerPicker:false
    } );
    ```

  - MapboxStyleImageryProvider  
    找到了2个文章，还没试过  

    - https://zhuanlan.zhihu.com/p/340669216
    - https://blog.csdn.net/qq_26991807/article/details/103862839



### 地形（terrain）

- **概念**  
  让地球表面有凹凸（没有地形的话就只是平面或曲面）
  
- **使用方法**  
  把`var viewer = new Cesium.Viewer(cz的html容器的id)`  
  改成  
  
  ```javascript
  var viewer = new Cesium.Viewer(cz的html容器的id, {
    terrainProvider: Cesium.createWorldTerrain()
  });
  ```
  就拥有了地形



### 天空盒

设置天空盒贴图

```js
viewer.scene.skyBox = new Cesium.SkyBox({
  sources: {
    positiveX: "images/sky/right.jpg",
    negativeX: "images/sky/left.jpg",
    positiveY: "images/sky/front.jpg",
    negativeY: "images/sky/back.jpg",
    positiveZ: "images/sky/top.jpg",
    negativeZ: "images/sky/bottom.jpg",
  },
})
```





# 编程

### 镜头



**与物体无关的镜头操作**

- 将镜头缓动到指定坐标  

  ```js
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(经度,纬度,海拔)
  })
  ```
  
  - 倾斜  
    orientation配置项的pitch属性  
    可以直接写数字  
    不过下面这个用法应该更常见  
    `pitch:Cesium.Math.toRadians(-80)`
  - 旋转  
    orientation配置项的heading属性  
    例子  
    `heading:Cesium.Math.toRadians(30,0)`
  
- 将镜头瞬移到指定坐标  
  `viewer.camera.setView`方法  
  使用方法参考上一条的`flyTo`方法

- 保存镜头位置信息，以便未来把镜头放到保存的位置

  - 保存镜头位置信息  
    `const a=viewer.camera.position.clone`
  - 把镜头放到保存的位置  
    `viewer.camera.flyTo({destination: a})`
  
  
  
  - 倾斜信息就放在camera的pitch属性里  
    而镜头位置是position





**与物体关联的镜头操作**

这里的物体可以是`viewer.entities`

- 将镜头瞬移到物体上  
  `viewer.zoomTo(物体)`
- 将镜头缓动到物体上  
  `viewer.flyTo(物体)`

- 将镜头“锁定”在物体上  
  `viewer.trackedEntity=物体`  
  【】无人机项目里是这样写，但是这条的“物体”可能不是上面几条里提到的物体

  - 解除“锁定”  
    `viewer.trackedEntity=null`

  



### 模型

有2种方法加入模型  
返回的物体是由不同构造函数构造的

- 加载czml【】去天津北斗项目中找找坐标、大小怎么设置

  ```js
  Cesium.CzmlDataSource
    .load("./resources/data/beidouⅢ.czml")
    .then(function (data) {
      viewer.dataSources.add(data)
    })
    .otherwise(function (data) { // 失败的回调
      console.log(data)
    })
  ```

  - 简写  
    由于[`viewer.dataSources.add`](https://cesium.com/learn/cesiumjs/ref-doc/DataSourceCollection.html#add)可以接收返回“data source”的promise，所以也可以用下面的简写方法【】去[官方例子](https://sandcastle.cesium.com/index.html?src=CZML.html)及二开中找找坐标、大小怎么设置  

    ```js
    const promise=Cesium.CzmlDataSource.load(czml)
    viewer.dataSources.add(promise)
    ```

  - [`Cesium.CzmlDataSource.load`](https://cesium.com/learn/cesiumjs/ref-doc/CzmlDataSource.html#load)可接收url也可接收czml对象

  - 非重点细节  

    - then回调的data参数是`Cesium.CzmlDataSource`实例
    - load、then、otherwise返回的都是`cz的Promise$1`实例  
      但是彼此间是不相等的

- [`Cesium.Model`](https://cesium.com/docs/cesiumjs-ref-doc/Model.html)方法  

  ```js
  // 模型坐标
  var origin = Cesium.Cartesian3.fromDegrees(经度,纬度,海拔)
  var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(origin)
  
  const model = scene.primitives.add(Cesium.Model.fromGltf({
    url : 地址,
    show : true,
    modelMatrix : modelMatrix,
    scale : 2000.0, // 模型默认放大比例
    color: Cesium.Color.ROYALBLUE,
    
    /*给模型设置最小的像素值
    （当模型按scale配置项放大不能满足需求时会自动放大）*/
    minimumPixelSize : 128,
    
    /* 模型放大值的上限
    （可以管住scale与minimumPixelSize配置项）*/
    maximumScale: 200,
    
  }))
  model.readyPromise
    .then(function(model) { // 这个model和外层的model是全等的
      // 当模型加载完毕时触发回调
      // 具体时机为：渲染模型的第1帧前
    })
  ```

  
  
- 流形式加载

  ```js
  var 物体=new Cesium.Cesium3DTileset({
    /*
    url的官方描述是：The url to a tileset JSON file
    写本地模型地址的话不会报错，但也不会生效
    */
    url: Cesium.IonResource.fromAssetId(72498) 
  })
  viewer.scene.primitives.add(物体) // 这个方法会返回物体（和传进该方法的物体是全等的）
  ```

  - 叠加类型  
    [`classificationType`选项](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileset.html#classificationType)  
    - 效果  
      若产生叠加，那该模型的形状会消失  
      而被叠加物体的表面会变成该模型的颜色  
      变色区域为：不叠加时该模型遮挡被叠加物体的区域
    
    - [可选值](https://cesium.com/learn/cesiumjs/ref-doc/global.html#ClassificationType)  
      - undefined不产生叠加
      - TERRAIN：应该是和地形叠加
      - CESIUM_3D_TILE：和3dtile叠加
      - BOTH：应该是同时和地形和3dtile叠加



### “物体”

目前属于自己定义的一个概念，包括以下2种添加方法

- `viewer.entities.add`
- `viewer.scene.primitives.add`



特性

- 双击物体会选中  
  - 取消方法  
    目前想到的方法只有：直接取消cz默认的选中事件





**Entity 和primitive 对比**

- entity简单，primitive复杂

- primitive更底层，性能更好





##### 图形

这是cesium里的一个概念

- 一个demo  
  进行如下操作可以添加一个固定尺寸的圆。  
  点击点时镜头会锁定在该圆，并在圆周围出现锁定图案、展示出描述信息  

  ```js
  // 圆
  var pointEntity = viewer.entities.add({
    // 点击点后弹出的描述信息 (sn大屏项目测试发现点击后不会弹出，甚至把默认控件都放出来也没看见)
    description: `行数不定的字符串`,
    position: Cesium.Cartesian3.fromDegrees(经度,纬度,高度),
    point: { pixelSize: 10, color: Cesium.Color.ORANGE }
  })
  ```

- 一个添加图形的方式

  - 第一步：`Entity`通过配置项携带图形
  - 第二步：把`Entity`传入`viewer.entities.add` 方法



###### `viewer.entities.add`  

- 入参：可以是[Entity](https://cesium.com/docs/cesiumjs-ref-doc/Entity.html)实例也可以是[Entity的配置项](https://cesium.com/docs/cesiumjs-ref-doc/Entity.html#.ConstructorOptions)
  - 配置项
    - 配置对象的属性都会被添加到实例里  
      甚至实例里还会有配置对象加下划线版本的属性<span style='opacity:.5'>（比如原属性名是a，加下划线后就是_a）</span>
- 返回值：[Entity](https://cesium.com/docs/cesiumjs-ref-doc/Entity.html)实例





###### Entity关键配置项

- 坐标  
  `position`  
  操作方法去[Entity的配置项](https://cesium.com/docs/cesiumjs-ref-doc/Entity.html#.ConstructorOptions)里找
- 负责携带图形的配置项  
  - 可以通过不同配置项同时携带多种图形  
  - 这些配置项可以传这个图形的实例也可以传这个图形的配置项



###### 操作

- 直接赋值就可以更新视图  
  已试过`point`  
  point的颜色、大小直接赋值，视图就能更新  
  甚至直接给point赋值一个对象都可以





###### 具体图形

图形的`show`配置项都是用来设置是否显示的，`material`配置项都是用来设置材质的。  
下面就不重复说明了

- [圆](https://cesium.com/docs/cesiumjs-ref-doc/PointGraphics.html#.ConstructorOptions)  

  - 在Entity里对应的配置项是：`point`
  - 这个圆在地面下时并不一定会被地面挡住  
    镜头要距离地面足够近时才会开始有一部分被挡住
  - 圆图形的配置项  
    可以设颜色、描边等内容（描边只能是外扩的）  
    （这里只有1个配置项没记录，就是随镜头距离禁用`depth test`的配置项）

    - 让尺寸随着『相机与物体间的距离』而变化  
      配置项：`scaleByDistance`  
      配置项的值：[`Cesium.NearFarScalar`](https://cesium.com/docs/cesiumjs-ref-doc/NearFarScalar.html)实例（关于该实例更多内容可在本笔记内查看）  

    - 让透明度随着『相机与物体间的距离』而变化  
      配置项：`translucencyByDistance`  
      配置项的值：[`Cesium.NearFarScalar`](https://cesium.com/docs/cesiumjs-ref-doc/NearFarScalar.html)实例（关于该实例更多内容可在本笔记内查看）

    - 让圆只在『相机与物体间的距离』在指定区间内时才显示  
      配置项：`distanceDisplayCondition`  
      配置项的值：`new Cesium.DistanceDisplayCondition (会显示的最小距离,会显示的最大距离)`

      

- [立方体](https://cesium.com/docs/cesiumjs-ref-doc/BoxGraphics.html#.ConstructorOptions)  

  - 在Entity里对应的配置项是：`box`

  - 立方体图形的配置项  
    （这里记录了所有配置项）

    - 既有边框又有表面的示例  

      ```js
      {
        dimensions: new Cesium.Cartesian3(
          纬线方向的厚度,
          经线方向的厚度,
          高度
        ),
        material: Cesium.Color.RED.withAlpha(不透明度),
      outline: true,
        outlineColor: Cesium.Color.BLACK,
    }
      ```

      
    
    - 只有边框没有表面的示例  
    
      ```js
      {
        dimensions: new Cesium.Cartesian3(
          纬线方向的厚度,
      经线方向的厚度,
          高度
        ),
        fill: false,
    outline: true,
        outlineColor: Cesium.Color.YELLOW.withAlpha(不透明度),
      }
      ```
    
    - 定义“高度”的意义<span style='opacity:.5'>（这里“高度”指的是Entity的`position`配置项的`Cesium.Cartesian3.fromDegrees`方法的第三个参数）</span>  
      定义方法：给`heightReference`配置项赋值  
      `heightReference`配置项可选值：
    
      1. 传统认知的海拔（和地形无关）  
         `Cesium.HeightReference.NONE`  
         这个是默认值  
          立方体的锚点在中心
      2. 让立方体固定在地形上  
         `Cesium.HeightReference.CLAMP_TO_GROUND`  
         这时第三个参数是失效的  
          立方体的锚点在底面的中心
      3. 立方体高于地形的距离  
         `Cesium.HeightReference.RELATIVE_TO_GROUND`  
         立方体的锚点在底面的中心
    
    - 投影  
      目前的尝试都是失败的  
      已经尝试过的方案：给`shadows`配置项设置了所有枚举值、半透明的、不透明的、边框的各种情况、加地形与不加的、实例化`viewer`时`shadows`与`terrainShadows`配置项的设与不设
    
    - 允许显示物体时的镜头距物体的区间  
      配置项为`distanceDisplayCondition`，值为[DistanceDisplayCondition](https://cesium.com/docs/cesiumjs-ref-doc/DistanceDisplayCondition.html)实例

- [椭球体](https://cesium.com/docs/cesiumjs-ref-doc/EllipsoidGraphics.html#.ConstructorOptions)

  - 在Entity里对应的配置项是：`ellipsoid`

  - 椭球体图形的配置项  
    （这里记录的配置项并不全）

    - 设置大小  
      给`radii`配置项赋如下值：  

      ```js
      new Cesium.Cartesian3(
        纬线方向上的半径, 
        经线方向上的半径, 
        垂直方向上的半径
      )
      ```

    - 表面与边框  

      - 操作方法  
        和立方体的一致  
        可以在本笔记内搜索 “既有边框又有表面的示例” 与 “只有边框没有表面的示例” 进行查看
      - 边框线  
        也就是“纬线”分段线与“经线”分段线

    - 分段  
      分段是依据“纬线”分段线与“经线”分段线进行分段的

      - 控制“纬线”分段线数量  
        控制方法：给`stackPartitions`配置项赋值  
        最终数量=`stackPartitions`值-1
      - 控制“经线”分段线数量  
        控制方法：给`slicePartitions`配置项赋值  
        最终数量=`slicePartitions`值  
        注意：2条“经线”才会形成1个圆

- 矩形  
  有2个东西可以画矩形

  - [plane](https://cesium.com/learn/cesiumjs/ref-doc/PlaneGraphics.html)
  - [rectangle](https://cesium.com/learn/cesiumjs/ref-doc/RectangleGraphics.html)

  2者的区别

  - rectangle可以增加厚度成多面体
  - 设置宽高的方式
    - plane直接设置宽高
    - rectangle设置2个坐标，然后cz算出宽高

- [文本](https://cesium.com/docs/cesiumjs-ref-doc/Label.html)  
  [demo](https://sandcastle.cesium.com/index.html?src=Labels.html)
  
  - 偏移
    - 以米为单位的偏移  
      `eyeOffset`配置项
    - 以屏幕像素为单位的偏移  
      `pixelOffset`配置项

- [多边形](https://cesium.com/learn/cesiumjs/ref-doc/PolygonGraphics.html)  
  可以增加厚度成多面体  
  厚度可以不等的（就是说可以做出各个地方厚度不一样的多面体）
- 模型  
  [demo](https://sandcastle.cesium.com/index.html?src=3D%2520Models.html)
- [墙](https://cesium.com/learn/cesiumjs/ref-doc/WallGraphics.html)



##### primitive

[api文档](https://cesium.com/docs/cesiumjs-ref-doc/Primitive.html)里的例子修改后就可以跑，修改为：把`scene`改成`viewer.scene`

更多内容可以参考[博客A](https://www.jianshu.com/p/5a74c607a591)和[博客B](https://blog.csdn.net/happyduoduo1/article/details/51868042)（这2篇博客是差不多的，A是参考B写的）



### collection

（现在记录的都是猜测，没有深入了解过）

collection目前是自己定义的一个概念，包括但不仅限于如下内容：

- [PrimitiveCollection](https://cesium.com/docs/cesiumjs-ref-doc/PrimitiveCollection.html)
- [BillboardCollection](https://cesium.com/docs/cesiumjs-ref-doc/BillboardCollection.html)
- [LabelCollection](https://cesium.com/docs/cesiumjs-ref-doc/LabelCollection.html)



诞生意义

在图形数量大的时候提升性能



操作方式

1. 创建collection  
   `var billboards = new Cesium.BillboardCollection()`
2. 把collection加入场景  
   `scene.primitives.add(billboards)`  
   - 上面这个方法会返回入参
   - `scene.primitives`本身就是一个[PrimitiveCollection](https://cesium.com/docs/cesiumjs-ref-doc/PrimitiveCollection.html)实例

- 增加图形  
  `collection.add`方法  
  比如[BillboardCollection#add](https://cesium.com/docs/cesiumjs-ref-doc/BillboardCollection.html#add)







### 事件

笔记待整理

##### 加载完成事件

例子

```js
var helper = new Cesium.EventHelper();
helper.add(viewer.scene.globe.tileLoadProgressEvent,  (tileNumNeedLoad)=> {
  if (testMachine.isLoadMost(tileNumNeedLoad)) {
    setTimeout(()=>{
      this.goMaSha()
    },2000)
  }
}); 
```

`tileNumNeedLoad`：应该是剩余需要加载的瓦片数量



##### 鼠标事件

[ScreenSpaceEventHandler](https://cesium.com/docs/cesiumjs-ref-doc/ScreenSpaceEventHandler.html)上有[增](https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceEventHandler.html#setInputAction)、[减](https://cesium.com/docs/cesiumjs-ref-doc/ScreenSpaceEventHandler.html#removeInputAction)监听函数等方法

- 在这里可以找到一个事件处理器实例：  
  `viewer.cesiumWidget.screenSpaceEventHandler`



[设置监听函数](https://cesium.com/docs/cesiumjs-ref-doc/ScreenSpaceEventHandler.html#setInputAction)

`ScreenSpaceEventHandler实例.setInputAction(监听函数,事件类型)`

- 监听函数（action）  
  唯一形参是cz封装的鼠标事件对象
  - 鼠标事件对象  
    （找遍[api文档](https://cesium.com/docs/cesiumjs-ref-doc/index.html)也没看到相关说明）  
    应该都只有少量简单的属性，比如`position`、`startPosition`、`endPosition`  
    - `position`  
      值是`Cartesian2`实例，实例的x、y值和canvas坐标是一致的
- 事件类型  
  这个参数要输入`Cesium.ScreenSpaceEventType`的属性  
  可选值见[这里](https://cesium.com/docs/cesiumjs-ref-doc/global.html#ScreenSpaceEventType)

注意：这个方法的功能是设置而不是增加。如果设置了多个函数，只有最后设置的函数会生效





##### 判断点击物体

方法A：`viewer.scene.pick`

```js
viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(function (czMouseEvent) {
  var pickedFeature = viewer.scene.pick(czMouseEvent.position);
  console.log(pickedFeature)
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```

**返回对象**

没看到对返回对象的说明

- 看[这篇文章](https://blog.csdn.net/zhangqun23/article/details/83056315)里的说明似乎只会返回第一个点击的物体
- 返回对象的id属性似乎是用`viewer.entities.add`添加的实例
- 没点到东西（点地球不算）的话返回undefined  
  （经验之谈）



### 材质

[这个回答](https://stackoverflow.com/questions/50298267/how-to-use-material-fromtype-in-cesium)里说了图形和primitive有不同的材质api  
[`Material`](https://cesium.com/learn/cesiumjs/ref-doc/Material.html?classFilter=Material)类只能primitive用



##### 图形的`material`配置项



可以直接写一个颜色（比如`Cesium.Color.RED.withAlpha(0.5)`）  
可以直接写一个图片地址  
也可以写各个具体的实例  



**具体的实例**

具体实例的列表见[MaterialProperty](https://cesium.com/learn/cesiumjs/ref-doc/MaterialProperty.html)  
这个MaterialProperty类似于各具体类的父类，但实际上不是

- `ImageMaterialProperty`可以用栅格图也可以用svg  
  不过用了svg后还是会模糊



##### primitive的材质

- 用svg也会模糊  
  demo如下  

  ```js
  var instance = new Cesium.GeometryInstance({
    geometry: new Cesium.EllipseGeometry({
      center: Cesium.Cartesian3.fromDegrees(-100.0, 20.0),
      semiMinorAxis: 500000.0,
      semiMajorAxis: 1000000.0,
      rotation: Cesium.Math.PI_OVER_FOUR,
      vertexFormat: Cesium.VertexFormat.POSITION_AND_ST
    }),
    id: 'object returned when this instance is picked and to get/set per-instance attributes'
  });
  scene.primitives.add(new Cesium.Primitive({
    geometryInstances: instance,
    appearance: new Cesium.EllipsoidSurfaceAppearance({
      material: new Cesium.Material({
        fabric: {
          type: 'Image',
          uniforms: {
            image: './resource/img/redBorder1.svg',
          }
        }
      })
    })
  }))
  ```

  

##### svg

2边都会模糊  
去svg文件里加大width、height就可以变清晰  
当然加大之后会造成性能负担导致cz整个挂掉



### 其他



##### [`Cesium.NearFarScalar`](https://cesium.com/docs/cesiumjs-ref-doc/NearFarScalar.html)

这个实例会让物体的某个标量和『相机与物体间的距离』产生关系

- **具体关系描述**

  首先先了解一点，这个标量在这个实例外会有一个设置值  
  然后该实例会依据『相机与物体间的距离』产生一个倍数  
  最终这个标量的真实值将等于：`设置值 * 该实例返回的倍数`

- **实例化时的参数**

  不传参的话倍数一直都会是`0`

  - 参数1：倍数会响应的『相机与物体间的距离』的最小值
  - 参数2：『相机与物体间的距离』<=参数1 时倍数的值
  - 参数3：倍数会响应的『相机与物体间的距离』的最大值
  - 参数4：『相机与物体间的距离』>=参数3 时倍数的值

- 『相机与物体间的距离』处于响应的极限值之间时，倍数会依据『参数2』、『参数4』进行补间



##### 地球

可以通过`viewer.scene.globe`获得

官方文档为：[这个](https://cesium.com/docs/cesiumjs-ref-doc/Globe.html)

构造函数只有1个入参：`Ellipsoid`实例

入参会被存到`this._ellipsoid`和`this.ellipsoid`上



##### 坐标 



**坐标系转换**  
可以看看[`Cesium.SceneTransforms`](https://cesium.com/docs/cesiumjs-ref-doc/SceneTransforms.html)



[`Cesium.Cartesian3`](https://cesium.com/docs/cesiumjs-ref-doc/Cartesian3.html)  
是比较常用的，据说是空间直角坐标系  

- `x`、`y`、`z`属性存有x、y、z坐标
- 有克隆该实例的方法：`实例.clone`
- 有乘以标量的方法：  
  `Cesium.Cartesian3.multiplyByScalar(输入的实例,标量,输出的实例)`  
  3个参数都是必填  
  该方法会返回输出的实例
- 有实例相加的方法：  
  `Cesium.Cartesian3.add(输入的实例A,输入的实例B,输出的实例)`  
  3个参数都是必填  
  该方法会返回输出的实例  
- 有判断实例数值是否相等的方法：`实例.equals`
- 有判断距离的方法：`Cesium.Cartesian3.distance(实例A,实例B)`
- 有判断角度的方法：`Cesium.Cartesian3.angleBetween(实例A,实例B)`  
  返回单位为弧度
- 有归一化方法  
  - 这里归一化的意思是：  
    产生一个与原点相距1个单位距离的点，该点与输入点方向相同
  - 具体使用方法：  
    `Cesium.Cartesian3.normalize(输入的实例,输出的实例)`  
    2个参数都是必填  
    该方法会返回输出的实例  



[`Cesium.Cartographic`](https://cesium.com/docs/cesiumjs-ref-doc/Cartographic.html)  
比较罕见，属性里的经纬度是用弧度表示



##### 效果

可以从[bloom后处理效果](https://cesium.com/docs/cesiumjs-ref-doc/PostProcessStageCollection.html#bloom)



# 源码

- `defaultValue`函数  

  ```js
  function defaultValue(a, b) {
    if (a !== undefined && a !== null) {
      return a;
    }
    return b;
  }
  ```

- `clone`函数（有挂在`Cesium`全局对象上）  
  返回第1个参数的副本  
  第2个参数为`true`则用深拷贝，为`false`用浅拷贝。默认为`false`  
  不会拷贝原型链上的属性





# 非代码操作



### 资源上传（My Assets）

资源传完就能在代码里通过id来用了

- **上传地址**  
  这两个页面可以传，最终是传进资源仓库

  - [ion页面](https://cesium.com/ion)  
    拖拽进网页就行  
    似乎在这页面的所有子页面都可以
  
- [addasset页面](https://cesium.com/ion/addasset)  
  
    （*这个页面是点“My Assets”选项卡的“Add data”按钮出来的*）  
  点击“Add files...”按钮  
  
- “reference terrain”选项的选择  
  选“Cesium World Terrain”
  
- [可上传文件的说明](https://www.cesium.com/docs/tutorials/uploading/)

- **在代码项目里使用资源**  
    需要申请一个token（不花钱也能申请）  
    用如下语法引入  
    `Cesium.IonResource.fromAssetId(资源的id)`

### Story

可以加模型、地图等内容。  
可以发布为一个网址，发布后也可以继续修改，也可以选择关闭  
可以把story嵌入你的开发页面。（不知道是不是只能用iframe标签嵌入）  
在编辑界面点“Present”按钮可以进行预览

- **轮播**（silde）  
  已知内容有：标题、信息框和初始视角  
  标题和信息框是可选的  
  可以点击左上角“Capture View ”按钮来设置初始视角。  
  如果不输入标题和Infobox的话轮播框将不会出现
- **添加资源**  
  “Assets”部分点“Add asset...”选择具体资源后完成添加  
  *（资源都来自于ion账户）*  
  每个轮播都可以独立配置需要显示的资源，通过切换勾选框来完成  
  点资源后的放大镜来将镜头移动到资源所在位置
- **展示页面的各按钮**  
  - **左下角**  
    ![cesium-展示页面-左下角](..\图片\cesium-展示页面-左下角.PNG)
  - **右上角**  
    ![cesium-展示页面-右上角](..\图片\cesium-展示页面-右上角.PNG)

### cz默认带的小部件

这个小部件指的就是默认就带的html元素

##### 去除小部件

```js
const viewer = new Cesium.Viewer('cesiumContainer', {
  animation: false,  //（下方）动画控制不显示
  timeline: false,    //（下方）时间线不显示
  fullscreenButton: false, //（右下角）全屏按钮不显示
  homeButton: false, //（右上角）homePage按钮不显示
  baseLayerPicker: false, //（右上角）地图选择按钮不显示
  sceneModePicker:false, //（右上角）球体地图与平面地图切换按钮不显示
  geocoder:false, //（右上角）搜索按钮不显示
  navigationHelpButton:false, //（右上角）提示信息按钮不显示
})
  
// （下方）ion文字不显示
viewer._cesiumWidget._creditContainer.style.display = "none"
```



##### 下方仪表盘和时间轴

用来控制时间的

- **仪表盘下面三个按钮**  
  控制时间暂停或者正负向走动
- **仪表盘外圈的环和指针**  
  控制时间流速
- **仪表盘左上角时钟**  
  重置时间方面的操作
- **时间轴**  
  拖动手柄以选择到哪个时间

# 相关文件格式

- **KML**（Keyhole Markup Language）  
  Keyhole公司开发并维护的XML语言（Keyhole是谷歌旗下的）  
  用于描述地理空间数据(如点、线、面、多边形和模型等)
  
- **KMZ**  
  压缩过的KML文件  
  除了KML还能包含其他文件  
  官网“getting-started”例子跑完后产生了一堆的“模型”
  
- **COLLADA**  

  > “COLLADA FX支持OpenGL ES” ——[百度百科](https://baike.baidu.com/item/COLLADA/2359440?fr=aladdin)

- **CZML**  
  是“Cesium Language”的缩写
  
  > - Cesium与CZML的关系就如同Google Earth和KML的关系
  > - CZML用来描述随时间而变化场景的json格式
  > - CZML可以增量流式传输到客户端，文档还未整份准备好时就能显示场景，很多时候客户端可以加入或离开正在传输的流（个人翻译的可能有些偏颇）
  >
  > —— [czml-writer提供的CZML指南](https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Guide)
  
  > - CZML是JSON的子集，这意味着有效的CZML文档也是有效的JSON文档。
  > - CZML是一个JSON数组，子项是CZML [Packet](https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Packet)
  >
  > —— [czml-writer提供的CZML结构指南](https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Structure)
  
  甚至可以包含快速衰减的精灵文字和投影（投影是指在其他物体上上色）
  
  - 似乎用json就可以代表CZML了  
    看[这个例子](http://zgeo.work/cesiumTx/examples/editor.html#czml_box)
  
  
  关于czml的了解，这3个页面还没看完：[第1个](https://www.cnblogs.com/mazhenyu/p/8315840.html)、[第2个](https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Structure)、[第3个](https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Packet)

- [b3dm](https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/Batched3DModel/README.md)  
  批量3d模型（Batched 3D Model）  
  使用『core 3D Tiles spec language』



### czml-writer

想运行czml-writer，但是2条路线都卡住了

- 路线一：运行[jar文件](D:\learning_materials\cesium\code\czml-writer)  
  卡在了报错“没有主清单属性”
- 路线二：按[官方说明](https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Quick-Start#java-1)进行操作  
  详细内容见[自己提的issue](https://github.com/AnalyticalGraphicsInc/czml-writer/issues/178)  
  官方人员回应：现在改用idea了，所以eclipse的方式不管用





# 未归类

- 旋转单位是角度（一圈是360那个）
  天上往下看是顺时针转（中国内是：角度0时朝北，角度90朝东）
- cz（canvas）容器的祖先的`display`为`none`时加载完毕的事件不会触发  

  - 监听事件的代码为：  
    `viewer.scene.globe.tileLoadProgressEvent.addEventListener(函数)`
  - 规避方法为：  
    祖先高度设为`0`，`overflow`设为`hidden`

