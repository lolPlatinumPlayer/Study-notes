## 学习进度

Story的中间部分没有看

## 学习上的记录

- [最初教程](https://cesium.com/ion/stories?t=welcome)

## 地形（terrain）

- **概念**  
  让地球表面有凹凸（没有地形的话就只是平面或曲面）
  
- **使用方法**  
  把`var viewer = new Cesium.Viewer('cesiumContainer');`  
  改成  
  
  ```javascript
  var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
  });
  ```
  就拥有了地形

## 下方仪表盘和时间轴

用来控制时间的

- **仪表盘下面三个按钮**  
  控制时间暂停或者正负向走动
- **仪表盘外圈的环和指针**  
  控制时间流速
- **仪表盘左上角时钟**  
  重置时间方面的操作
- **时间轴**  
  拖动手柄以选择到哪个时间

## 资源上传（My Assets）

资源传完就能在代码里通过id来用了

- **上传地址**  
  这两个页面可以传，最终是传进资源仓库

  - [ion页面](https://cesium.com/ion)  
    拖拽进网页就行

  - [addasset页面](https://cesium.com/ion/addasset)  

    （*这个页面是点“My Assets”选项卡的“Add data”按钮出来的*）  
    点击“Add files...”按钮  

- “reference terrain”选项的选择  
  选“Cesium World Terrain”

## Story

可以加模型、地图等内容。  
可以发布为一个网址，也可以把story嵌入你的开发页面。  
在编辑界面点“Present”按钮可以进行预览

- **轮播**（silde）  
  由标题、信息框和初始视角构成  
  标题和信息框是可选的  
  可以点击左上角“Capture View ”按钮来设置初始视角。  
- **展示页面的各按钮**  
  - **左下角**  
    ![cesium-展示页面-左下角](图片\cesium-展示页面-左下角.PNG)
  - **右上角**  
    ![cesium-展示页面-右上角](图片\cesium-展示页面-右上角.PNG)

## 相关文件格式

- **KML**（Keyhole Markup Language）  
  最初由Keyhole公司开发的XML语言  
  用于描述地理空间数据(如点、线、面、多边形和模型等)
  
- **KMZ**  
  压缩过的KML文件  
  除了KML还能包含其他文件  
  官网“getting-started”例子跑完后产生了一堆的“模型”
  
- **COLLADA**  

  > “COLLADA FX支持OpenGL ES“”——[百度百科](https://baike.baidu.com/item/COLLADA/2359440?fr=aladdin)

- **CZML**  

  > “Cesium与CZML的关系就如同Google Earth和KML的关系”
  >
  > “CZML是一种用来描述动态场景的JSON架构的语言”
  >
  > ——[某篇博客](https://www.cnblogs.com/mazhenyu/p/8315840.html)