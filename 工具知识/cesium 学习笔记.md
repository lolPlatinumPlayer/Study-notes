### 学习

**学习进度**

- 下次从https://www.cesium.com/docs/tutorials/cesium-workshop/ 的Setup开始学
- 连接webpack的教程学到[这](https://www.cesium.com/docs/tutorials/cesium-and-webpack/#manage-cesiumjs-static-files)之前  
  本地代码地址为：[地址](D:\learning_materials\cesium\code\cesium-webpack-app)

**学习上的记录**

- [最初教程](https://cesium.com/ion/stories?t=welcome)
- 官网的学习资源蛮丰富的，不过都是教程，目前还没找到api文档（不过百度一搜就能搜到一堆）



### 地形（terrain）

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





### 代码项目



##### 运行

- 直接cdn引入就能写，且不需要token、帐号等额外的东西<b style='color:red'>？？？</b>  
  可能可以参考[这个页面](https://www.cesium.com/docs/tutorials/quick-start/)

- 不使用帐号的例子（并不是上一条的例子，这两条是从2个思路得出的东西）
  - 代码可以参考二开的commit id为7adcc4d57157078c1dfcd6f1587cd774b45f8a6b的commit，可能还有更早的例子，但不记得了





- **关于多次初始化**  
  目前做法：用删dom作为退出操作，重新开始就从头执行一遍代码  
  目前做法的测试结果：多次『退出进入』后一切正常，cpu也不会多用，但内存可能会稍微多占一些

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

### 下方仪表盘和时间轴

用来控制时间的

- **仪表盘下面三个按钮**  
  控制时间暂停或者正负向走动
- **仪表盘外圈的环和指针**  
  控制时间流速
- **仪表盘左上角时钟**  
  重置时间方面的操作
- **时间轴**  
  拖动手柄以选择到哪个时间

### 相关文件格式

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
  
  > “Cesium与CZML的关系就如同Google Earth和KML的关系”
  >
  > “CZML是一种用来描述动态场景的JSON架构的语言”
  >
  > ——[某篇博客](https://www.cnblogs.com/mazhenyu/p/8315840.html)
  
  甚至可以包含快速衰减的精灵文字和投影（投影是指在其他物体上上色）
  
  - 似乎用json就可以写CZML了  
    看[这个例子](http://zgeo.work/cesiumTx/examples/editor.html#czml_box)



### 未归类

- 生成物体  

  - 二开项目  

    ```js
    var 物体 = Cesium.CzmlDataSource.load(czml)
    “Cesium.Viewer实例”.dataSources.add(物体)
    ```

    

  - 无人机项目  
    代码层级有点深，不好找

- 镜头  

  - 设为“自由镜头”模式  
    `“Cesium.Viewer实例”.trackedEntity=null`
  - 将镜头瞬移到物体上  
    `“Cesium.Viewer实例”.zoomTo(物体)`
  - 将镜头缓动到物体上  
    `“Cesium.Viewer实例”.flyTo(物体)`
  - 将镜头“锁定”在物体上  
    `“Cesium.Viewer实例”.trackedEntity=物体`  
    【】无人机项目里是这样写，但是这条的“物体”可能不是上面几条里提到的物体
  
- 旋转单位是角度（一圈是360那个）
  天上往下看是顺时针转（中国内是：角度0时朝北，角度90朝东）
  
- cz（canvas）容器的祖先的display为none时加载完毕的事件不会触发  

  - 监听事件的代码为：  
    `“Cesium.Viewer实例”.scene.globe.tileLoadProgressEvent.addEventListener(函数)`
  - 规避方法为：  
    祖先高度设0，overflow设hidden

