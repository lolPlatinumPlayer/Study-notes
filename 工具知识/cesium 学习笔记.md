# 学习

**学习进度**

- 下次从https://www.cesium.com/docs/tutorials/cesium-workshop/ 的Setup开始学
- 连接webpack的教程学到[这](https://www.cesium.com/docs/tutorials/cesium-and-webpack/#manage-cesiumjs-static-files)之前  
  本地代码地址为：[地址](D:\learning_materials\cesium\code\cesium-webpack-app)

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



# 基础



所有项目都必要的代码如下：  
`var viewer = new Cesium.Viewer(cz的html容器的id)`



### `viewer`

- [`viewer.entities`](https://cesium.com/docs/cesiumjs-ref-doc/EntityCollection.html)



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





### 代码项目



##### 运行

- 直接cdn引入就能写，且不需要token、帐号等额外的东西<b style='color:red'>？？？</b>  
  可能可以参考[这个页面](https://www.cesium.com/docs/tutorials/quick-start/)

- 不使用帐号的例子（并不是上一条的例子，这两条是从2个思路得出的东西）
  - 代码可以参考二开的commit id为7adcc4d57157078c1dfcd6f1587cd774b45f8a6b的commit，可能还有更早的例子，但不记得了





- **关于多次初始化**  
  目前做法：用删dom作为退出操作，重新开始就从头执行一遍代码  
  目前做法的测试结果：多次『退出进入』后一切正常，cpu也不会多用，但内存可能会稍微多占一些



# 编程

### 镜头



**与物体无关的镜头操作**

- 将镜头缓动到指定坐标  

  ```js
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(经度,纬度,海拔)
  })
  ```



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

- 方法一    

  ```js
  var 物体 = Cesium.CzmlDataSource.load(czml)
  viewer.dataSources.add(物体)
  ```

  改方法在二开项目中使用

- 方法二：流形式

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

  



### 图形

这是cesium里的一个概念



**示例**

进行如下操作可以添加一个固定尺寸的圆。  
点击点时镜头会锁定在该圆，并在圆周围出现锁定图案、展示出描述信息

```js
// 圆
var pointEntity = viewer.entities.add({
  // 点击点后弹出的描述信息
  description: `行数不定的字符串`,
  position: Cesium.Cartesian3.fromDegrees(经度,纬度,高度),
  point: { pixelSize: 10, color: Cesium.Color.ORANGE }
})
```



**目前已知的添加图形方式**

- 第一步：`Entity`通过配置项携带图形

- 第二步：把`Entity`传入`viewer.entities.add` 方法



**`viewer.entities.add`**  

- 入参：可以是[Entity](https://cesium.com/docs/cesiumjs-ref-doc/Entity.html)实例也可以是[Entity的配置项](https://cesium.com/docs/cesiumjs-ref-doc/Entity.html#.ConstructorOptions)
- 返回值：[Entity](https://cesium.com/docs/cesiumjs-ref-doc/Entity.html)实例



**Entity关键配置项**

- 坐标  
  `position`  
  操作方法去[Entity的配置项](https://cesium.com/docs/cesiumjs-ref-doc/Entity.html#.ConstructorOptions)里找
- 负责携带图形的配置项  
  - 可以通过不同配置项同时携带多种图形  
  - 这些配置项可以传这个图形的实例也可以传这个图形的配置项





**已学习过的图形如下**

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

      

- 立方体  

  - 在Entity里对应的配置项是：`box`

  - `box`的配置项  
    （这里记录了所有配置项）

    - 有完整填充的示例  

      ```js
      {
        dimensions: new Cesium.Cartesian3(宽度,厚度,高度),
        material: Cesium.Color.RED.withAlpha(不透明度),
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      }
      ```

      

    - 只有边框的示例  

      ```js
      {
        dimensions: new Cesium.Cartesian3(宽度,厚度,高度),
        fill: false,
        outline: true,
        outlineColor: Cesium.Color.YELLOW.withAlpha(不透明度),
      }
      ```

    - 设置`Cesium.Cartesian3.fromDegrees`方法第三个参数的意义  
      代码中的名称为：`heightReference`  
      可选值：

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

  > “COLLADA FX支持OpenGL ES“”——[百度百科](https://baike.baidu.com/item/COLLADA/2359440?fr=aladdin)

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



### czml-writer

想运行czml-writer，但是2条路线都卡住了

- 路线一：运行jar文件  
  卡在了报错“没有主清单属性”
- 路线二：按[官方说明](https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Quick-Start#java-1)进行操作  
  详细内容见[自己提的issue](https://github.com/AnalyticalGraphicsInc/czml-writer/issues/178)









# 未归类

- 旋转单位是角度（一圈是360那个）
  天上往下看是顺时针转（中国内是：角度0时朝北，角度90朝东）
- cz（canvas）容器的祖先的`display`为`none`时加载完毕的事件不会触发  

  - 监听事件的代码为：  
    `viewer.scene.globe.tileLoadProgressEvent.addEventListener(函数)`
  - 规避方法为：  
    祖先高度设为`0`，`overflow`设为`hidden`

