# 学习

- heading, pitch, range的内容单独抽出来记一处笔记



**学习进度**

- 无底图且球透明的场景  
  这样就可以那种只有局部的三维地图了
- https://github.com/YanzheZhang/Cesium.HPUZYZ.Demo  
  学习的好东西
- https://github.com/NASA-AMMOS/3DTilesRendererJS  
  似乎把three和cz和3dtile结合了
- 水面  
  [demo](https://sandcastle.cesium.com/?src=Lighting.html&label=All)
- 镜头锁定住一点进行环绕  
  可以做，记得CesiumLab里就有
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



- 似乎没有设置初始镜头的功能





### 代码项目



- 账号
  - 不需要token、帐号等额外的东西  
    token、帐号是地图服务、地形服务需要的  
    当然就算你没有帐号实际上也是可以用地图服务的
  - 一个不使用帐号的例子  
    二开的commit id为7adcc4d57157078c1dfcd6f1587cd774b45f8a6b的commit，可能还有更早的例子，但不记得了  
    InitCesium那个文件应该是用了谷歌地图，所以不需要token，不过有时要翻墙
  - 用npm装Cesium的话，`Cesium.Ion.defaultAccessToken`默认就有值





- **多次初始化**  
  目前做法：用删dom作为退出操作，重新开始就从头执行一遍代码  
  目前做法的测试结果：多次『退出进入』后一切正常，cpu也不会多用，但内存可能会稍微多占一些



##### 运行

- 直接cdn引入就能写

- 用npm安装也可以
  - `import * as Cesium from 'cesium'`  
    不搞项目配置直接这样搞Cesium里有东西，不过`new Cesium.Viewer('czContainer')`仍然报错【】？？？
    
  - [官方方式](https://www.cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/#install-with-npm)引入
    
    - 官方引入方式和本笔记记录的“一个实践过的webpack操作方式”比较类似  
      下面列出将“一个实践过的webpack操作方式”改为官方引入方式所需操作  
    
      1. 引入cz的代码由  
         `import * as Cesium from 'cesium/Cesium'`改为  
         `import * as Cesium from 'cesium'`
      2. 给`webpack配置对象.resolve.mainFiles`赋值`['index','Cesium']`
      3. 删除`new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }])`
      4. 将  
         `CESIUM_BASE_URL: JSON.stringify('./')`改为  
         `CESIUM_BASE_URL: JSON.stringify('')`
    
    - 如果只加下面这点[官网](https://www.cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/#install-with-npm)代码的话，无法运行项目，并且会报错  
    
      ```js
      window.CESIUM_BASE_URL = '/'; // 官方demo里不需要手动加这行代码，应该是由webpack的DefinePlugin插件做的
      import * as Cesium from 'cesium';
      import "cesium/Build/Cesium/Widgets/widgets.css";
      Cesium.Ion.defaultAccessToken = 'your_access_token';
      ```
    
      具体报错在本笔记内搜索“ThirdParty/zip.js”查看  
      官网上的引入操作不止这几行代码
    
  - 在webpack上操作后引入  
    （不管是搜“cesium webpack”还是“cesium vue”，各个文章的操作方式都是不同的，官网demo也和这些文章不同）  
  
    - 『一个实践过的webpack操作方式』（这个方式具体是哪看的无从考究了）  
      除了无法结合ts使用外没别的问题  
      要结合ts用的话要改为官方方式引入（本笔记上方有记录如何操作）  
      需加内容如下  
      
      1. 在vue.config.js里加如下内容  
      
         ```js
         const CopyWebpackPlugin = require('copy-webpack-plugin')
         const webpack = require('webpack')
         const path = require('path')
         
         // Cesium源码所在目录
         const cesiumSource = './node_modules/cesium/Source'
         ```
         
      2. 给webpack加上如下配置  
  
         ```js
         output: {
           sourcePrefix: ' ' // 让webpack 正确处理多行字符串配置 amd参数
         },
         amd: {
           toUrlUndefined: true // 告诉Cesium，webpack中计算 require声明的AMD 模块里的toUrl 函数和标准的不兼容
         },
         resolve: {
           alias: {
             'vue$': 'vue/dist/vue.esm.js',
             '@': path.resolve('src'),
             /* 
             定义别名cesium后，cesium代表了cesiumSource的文件路径。有了这行才能用'cesium/Cesium'、'cesium/Widgets/widgets.css'来引用cz代码
             */
             'cesium': path.resolve(__dirname, cesiumSource),
           }
         },
         plugins: [
           // 使用 copy-webpack-plugin，它能在编译阶段，把Cesium里静态文件整个拷贝到 dist 目录下，确保我们的服务能访问它
           new CopyWebpackPlugin([{ from: path.join(cesiumSource, '../Build/Cesium/Workers'), to: 'Workers' }]),
           new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
           new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
           new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }]),
           new webpack.DefinePlugin({
             CESIUM_BASE_URL: JSON.stringify('./') // Cesium载入静态的资源的相对路径（写空串可以运行，但是打包后地址不对）
           })
         ],
         module: {
           unknownContextCritical: /^.\/.*$/, //打印载入特定库时候的警告
           unknownContextCritical: false, //解决Error: Cannot find module "."
         },
         ```
  
    - [解决`./node_modules/cesium/Source/ThirdParty/zip.js`报错](https://blog.csdn.net/qq_44749616/article/details/120328371?utm_source=app&app_version=4.15.0&code=app_1562916241&uLinkId=usr1mkqgl919blen)  
      出现这个报错项目就运行不了  
      报错中包含`Module parse failed: Unexpected token`  
  
      - 解决方式  
        在configureWebpack函数里加入如下代码  
  
        ```js
        config.module.rules.push({
          test: /\.js$/, // vue-cli里没给js加loader
          use: {
            loader: '@open-wc/webpack-import-meta-loader',
          },
        })
        ```
  
      - 问题原因  
        在cz1.82.1(不含)~1.87.1间某个版本加入了import.meta语法  
  
    - 引入  
      可以用require也可以用import，import好像性能会差一点
  
      - 用require引入  
        引入代码如下  
  
        ```js
        const Cesium = require('cesium/Cesium');
        require('cesium/Widgets/widgets.css');
        ```
  
      - import  
  
        ```js
        import * as Cesium from 'cesium/Cesium'
        import 'cesium/Widgets/widgets.css'
        ```
  
      - 如果没引入css的话无法渲染场景（其他库不引入css只会出现样式问题）  
        cesiumWorkerBootstrapper.js都不会请求（这是cesium的js入口文件里引用的一个文件）  
        而且不会报错
  
    - [这个博客](https://www.jianshu.com/p/85917bcc023f)有说一些优化操作，在博客里搜索“webpack 高级配置”查看





### 底图服务



非重点内容

- 查看数据来源  
  把类名为`cesium-credit-lightbox-overlay`的dom的`display:none`去掉  
  然后就会出现“Data provided by：”字样，后面几行就会说明来源  
  <span style='opacity:.5'>（用mapbox影像的话就会有一行`© Mapbox © OpenStreetMap Improve this map`，如果再用静态地形文件做服务的话，下一行就会是`layer.json`里的不知道是attribution属性还是description属性）</span>



##### 影像

- 默认值：[`createWorldImagery`](https://cesium.com/learn/cesiumjs/ref-doc/global.html#createWorldImagery)<span style='opacity:.5'>（[`Viewer`](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html)的`imageryProvider`配置项）</span>

- 限制加载服务的最大层级  
  配置[`ImageryProvider`](https://cesium.com/learn/cesiumjs/ref-doc/ImageryProvider.html)的`maximumLevel`配置  
  超过这个层级<span style='opacity:.5'>（离地过近）</span>就不会加载更深层级的底图服务  
  这个限制可以在深层级服务不理想的情况下发挥作用<span style='opacity:.5'>（天地图在深层级下就会返回一张图片，图片上写着“此级别下无影像”）</span>

  - 设为非整数可能会出现问题  
    在本笔记上方的[知乎方法](https://zhuanlan.zhihu.com/p/267935427)里设为非整数cz就会全屏报错，报错信息如下：  

    ```
    An error occurred while rendering. Rendering has stopped.
    RangeError: Maximum call stack size exceeded
    ```

- 冗余加载  
  冗余加载可以提升底图切片的获取速度，也会加大服务端压力  
  [`subdomains`配置](https://cesium.com/learn/cesiumjs/ref-doc/WebMapTileServiceImageryProvider.html#.ConstructorOptions)配的越多冗余量越大  
  大部分[`ImageryProvider`](https://cesium.com/learn/cesiumjs/ref-doc/ImageryProvider.html)似乎都没有这个配置  

  - 天地图  
    上文说的[知乎方法](https://zhuanlan.zhihu.com/p/267935427)配了8个，这样会让天地图服务的配额高速消耗，平时留1个就行了，不然耗不起

- 可以有多个影像底图  
  cz负责管理影像底图的是：[`viewer.imageryLayers`](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#imageryLayers)
  
  - 增加影像底图  
    [`viewer.imageryLayers.add`](https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayerCollection.html#add)  
    （[`addImageryProvider`](https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayerCollection.html#addImageryProvider)也可以，不过它内部也是调用add，源码没几行）
  - 序号  
    - 序号越大越靠前
    - 加大序号  
      [`raise`](https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayerCollection.html#raise)、[`raiseToTop`](https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayerCollection.html#raiseToTop)
    - 减少序号  
      [`lower`](https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayerCollection.html#lower)、[`lowerToBottom`](https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayerCollection.html#lowerToBottom)
  - 有`get(idx) → layer`、`indexOf(layer) → idx`、remove、removeAll、判断layer是否存在 等方法  
    这里就不赘述了
  - 多个影像底图会同时加载
  - 如果初始影像底图加载失败，其他影像底图也无法显示  
    `raiseToTop`也没用



具体的影像底图

- 使用mapbox底图  
  有如下2种选择

  - MapboxImageryProvider  
    demo如下  

    ```js
    const viewer = new Cesium.Viewer('cesiumContainer',{ 
      imageryProvider:new Cesium.MapboxImageryProvider({
        mapId:'mapbox.satellite', // 底图类型
        accessToken: mapbox的Token,
      }),
      baseLayerPicker:false
    } );
    ```

  - MapboxStyleImageryProviderr可能也可以  
    找到了2个文章，还没试过  

    - https://zhuanlan.zhihu.com/p/340669216
    - https://blog.csdn.net/qq_26991807/article/details/103862839

- 使用天地图底图  
  服务大部分时候都是卡的

  - [官方方法](http://lbs.tianditu.gov.cn/docs/#/sanwei/)  
    - 官方的说法是：“目前支持cesuim1.52、1.58、1.63.1”
    - 在cz1.89.0上简单试了下是不行的  
      会报错：`normal must be normalized`
  - [知乎方法](https://zhuanlan.zhihu.com/p/267935427)  
    可行  
    - 标注用的是栅格标注（标注图层是可以去掉的）<span style='opacity:.5'>（标注图层只包含道路和文本，大部分区域是透明的）</span>
    - 这个方法里说要设置`Cesium.Ion.defaultAccessToken`实际上是不用的

- 网格底图<span style='opacity:.5'>（不需要发起请求）</span>  
  [`Cesium.GridImageryProvider`](https://cesium.com/learn/cesiumjs/ref-doc/GridImageryProvider.html)
  
- 使用图片作为底图  
  [`Cesium.UrlTemplateImageryProvider`](https://cesium.com/learn/cesiumjs/ref-doc/UrlTemplateImageryProvider.html)的url传个图片地址就行了



##### 地形（terrain）

- **概念**  
  让地球表面有凹凸（没有地形的话就只是平面或曲面）
  
- **设置地形**  
  有2种方式  
  
  - 一：viewer的terrainProvider配置  
    例子：`terrainProvider: Cesium.createWorldTerrain(),`
  - 二：给`viewer.scene.terrainProvider`赋值  
    - 赋值后地形会重新加载（就算是之前用过的地形也一样）<span style='opacity:.5'>（在视图上会有一个明显地加载过程）</span>
    - 就算没有地形`viewer.scene.terrainProvider`也会有值  
      值是一个[`EllipsoidTerrainProvider`](https://cesium.com/learn/cesiumjs/ref-doc/EllipsoidTerrainProvider.html) 
  
- 关闭地形  
  `viewer.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider()`  
  <span style='opacity:.5'>（2022.03.21看应该只有这一种方法）</span>
  
- 如果物体依据球体表面设置高度（而不是地形表面）  
  那地形不会盖住这些物体  

  - 部分依据球体表面设置高度的情况如下：  
    - polyline的clampToGround设为false
    - 设置polygon的height

  



##### 使用自建服务

- 影像

  - [这个博客](https://blog.csdn.net/hzh839900/article/details/78063118)里搜索“SingleTileImageryProvider”可以查看相关内容

- 地形  

  - 服务端  
    - 数据下载  
      [地理空间数据云](https://www.gscloud.cn/sources/index)  
    - 建立服务  
      
      - 把如下文件存到http服务器上，然后地形服务的url就是文件夹所在地址  
      
        ```
        文件夹
           meta.json
           layer.json
           .tmp文件夹
           0文件夹
           1文件夹
           2文件夹
           等等
        ```
      
      - 用cesiumLab应该可以
    
  - 前端使用  
  
    - 使用ZY书峰乡数据的例子  
      在Viewer配置项里加上如下代码  
  
      ```js
      terrainProvider: new Cesium.CesiumTerrainProvider({
        url: '一个地址',
        requestVertexNormals: true,
      })
      ```
  
      
  
  



### Promise

（没找到可靠文档，以下内容都是猜测）

拥有then方法和otherwise方法（otherwise在失败时触发）

- then和otherwise会返回`Promise$1`实例  
  但是彼此间是不相等的（用`===`判断结果为`false`）
- ts里类型写es6的Promise也能契合这个cz的Promise
- `Promise$1`实例应该都是`Cesium.when()`生成的
- [github源码](https://github.com/CesiumGS/cesium/blob/1.89/Source/DataSources/DataSourceCollection.js)里引用'when.js'的地址不存在  
  但是在[官网](https://cesium.com/downloads/)上下的源码里`when.js`是存在的  
  关于这个疑惑，已经在cesium社区里提了[问题](https://community.cesium.com/t/why-code-download-from-website-is-different-to-github/16906)



资料

- [这个可能过时的官方页面](https://cesium.com/downloads/cesiumjs/releases/b21/Documentation/Promise.html)有提到Promise和when.js的关系



### 时间

cz有自己的时间类：[`JulianDate`](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html?classFilter=Date)

- Date的时间和JulianDate是有差的  
  朱利安时间=UTC=GMT  
  北京时间=UTC+8=GMT+8
- 将Date转为JulianDate的方法  
  [`JulianDate.fromDate`](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html?classFilter=Date#.fromDate)
- 获取当前的JulianDate（语法糖）  
  [`JulianDate.now()`](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html#.now)





# 前端编程



### [`Viewer`](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html)

- 场景模式  
  可以选择是3维球体还是二维还是三维平面等  
  `sceneMode`配置项  
  
  - [可选值](https://cesium.com/learn/cesiumjs/ref-doc/global.html#SceneMode)如下
  
    - Cesium.SceneMode.SCENE3D  
      默认值  
      3维球体
  
    - Cesium.SceneMode.SCENE2D  
      二维  
      不可旋转不可倾斜
  
    - Cesium.SceneMode.COLUMBUS_VIEW  
      三维平面
  
    - Cesium.SceneMode.MORPHING  
      官网描述是在二三维间渐变  
      目前没体验出和三维球体的区别<span style='opacity:.5'>（可能是只有配置为这个，后续才能在各个模式间切换）</span>
  
  - 动态切换  
    给[`viewer.scene.mode`](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#mode)赋值
  
- 让地球透明  
  `viewer.scene.globe.show=false`
  - 会让贴在地形上的东西也透明  
    <span style='opacity:.5'>（不贴地的不会）</span>





##### 天空盒

- 可在[Viewer的配置项](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions)中设置也可以实例化Viewer后设置

- 后期设置天空盒贴图的demo  

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

  





### 镜头

[`camera`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html)

- 返回以米为单位的像素大小  
  [`getPixelSize`方法](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#getPixelSize)
- 获得镜头离地距离  
  [`getMagnitude`方法](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#getMagnitude)
- 获得镜头朝向  
  [`direction`属性](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#direction)
- 倾斜信息  
  pitch属性  
- heading  
  应该是heading属性
- 镜头位置  
  position属性



##### 与物体无关的镜头操作

- 将镜头缓动到指定坐标  

  ```js
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(经度,纬度,海拔),
    // orientation 朝向
  })
  ```

  - 朝向（`orientation`配置项）<span style='opacity:.5'>（非必填）</span>  
    <span style='opacity:.5'>（官方没有具体说明，所有了解都只能靠自己测出来）</span>  
    不设的话就是正对地面  
    有2种写法，2种写法不能共存，共存的话要么只有写法二生效，要么直接报错
    - 写法一：heading、pitch、roll  
      单位都是弧度<span style='opacity:.5'>（可以用`Cesium.Math.toRadians`方法把角度转为弧度）</span>  
      这三个都不是必传
      - heading：地球及宇宙逆时针旋转角度<span style='opacity:.5'>（实际上改变的是镜头，但是heading对镜头的改变用语言描述起来比较复杂，因此用地球来描述，这样比较好理解）</span>
      - pitch：镜头与地球切线的夹角  
        负数为从天空俯视，正数为从地底仰视
      - roll：镜头顺时针旋转角度
      - 提示：若镜头正对地球，那heading和roll具有相同表现<span style='opacity:.5'>（相同表现的意思是这2种设置是相同的：设置heading=a; roll=b，设置heading=a+b; roll=0）</span>
    - 写法二：direction、up  
      direction不必传，up必传
      - direction：镜头朝向
      - up：镜头上方朝向
      - 坐标系未了解【】
      - 输入方向会做归一化处理

- 将镜头瞬移到指定坐标  
  `viewer.camera.setView`方法  
  传参参考上一条的`flyTo`方法
  
- 镜头缓动到球体上<span style='opacity:.5'>（一个虚构的球体）</span>  
  [`camera.flyToBoundingSphere`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#flyToBoundingSphere)  

  ```js
  viewer.camera.flyToBoundingSphere(
    new Cesium.BoundingSphere(Cartesian3实例, 半径),
    {
      offset: new Cesium.HeadingPitchRange(heading, pitch, range),
    },
  )
  ```
  
  - 2d视图里看到的东西会比3d视图少
  - 镜头距离的计算方式
    - 用`BoundingSphere`里的半径  
      触发条件：`BoundingSphere`里有半径且没有`offset`或者`HeadingPitchRange`的range为0  
      效果：镜头距离为差不多能看全`BoundingSphere`的距离<span style='opacity:.5'>（目前觉得是这样）</span>
    - 用`HeadingPitchRange`的range  
      触发条件：有`offset`且`HeadingPitchRange`的range不为0  
      效果：range代表距离地球表面多远（用负数的话代表从地底往地表看）<span style='opacity:.5'>（目前觉得是这样）</span>
  - 半径和range的单位  
    - [官网](https://cesium.com/learn/cesiumjs/ref-doc/HeadingPitchRange.html)说range单位是米  
    - [官网](https://cesium.com/learn/cesiumjs/ref-doc/BoundingSphere.html?classFilter=bound)没有说BoundingSphere里的半径的单位  
      估计也是米
  
- 停止缓动并留在当前位置  
  [`camera.cancelFlight`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#cancelFlight)

- 停止缓动并瞬移到终点  
  [`camera.completeFlight`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#completeFlight)

- 让镜头往指定方向上瞬移  
  [`move`方法](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#move)及“See:”下方列出来的前移后移等方法

- 保存镜头位置信息，以便未来把镜头放到保存的位置  
  <span style='opacity:.5'>（该方法最终效果的倾斜和旋转都是默认值）</span>
  
  - 保存镜头位置信息  
    `const a=viewer.camera.position.clone()`
  - 把镜头放到保存的位置  
    `viewer.camera.flyTo({destination: a})`  
  






##### 与物体关联的镜头操作

这里的物体可以是`viewer.entities`

- 将镜头“锁定”在物体上  
  `viewer.trackedEntity=物体`  
  【】无人机项目里是这样写，但是这条的“物体”可能不是上面几条里提到的物体

  - 解除“锁定”  
    `viewer.trackedEntity=null`

- 将镜头移动到某些东西上  
  注意这2个方法来自viewer而不是camera，配置比camera的少很多  
  
  | 功能 | 代码                                                         |
  | ---- | ------------------------------------------------------------ |
  | 缓动 | [`viewer.flyTo(目标,配置)`](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#flyTo) |
  | 瞬移 | [`viewer.zoomTo(目标,offset)`](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#zoomTo) |
  
  - 哥伦布视图和2d视图下，这两个方法定位位置都不对<span style='opacity:.5'>（有很大偏差）</span>
  - 可以作为目标的东西非常多  
    比如：单entity、多entity、数据源、以及返回这些东西的promise
  - 调用`viewer.flyTo`后调用停止方法<span style='opacity:.5'>（[`camera.cancelFlight`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#cancelFlight)或[`camera.completeFlight`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#completeFlight)）</span>并不一定生效  
    比如`duration`设为`1.5`的话在0.5秒内调用停止方法都是不生效的
  - `offset`配置<span style='opacity:.5'>（2个方法的`offset`是一样的）</span>  
    用来设置镜头的朝向和高度  
    - 不设置  
      旋转为0  
      倾斜为45度  
      高度会根据目标的大小来变化<span style='opacity:.5'>（目标越大高度也越大）</span>
    - 值为[`HeadingPitchRange`](https://cesium.com/learn/cesiumjs/ref-doc/HeadingPitchRange.html)实例  
      一二三参数分别为：旋转、倾斜、高度<span style='opacity:.5'>（真的是高度，而不是文档里写的距离）</span>  
      <span style='opacity:.5'>（测试版本：1.89.0）</span>
      - 设置倾斜的bug  
        最终的镜头位置会是物体的正上方<span style='opacity:.5'>（意思就是说如果设个负30度，可能物体就看不见了）</span>
  
  

bug

- SceneMode.SCENE2D或SceneMode.COLUMBUS_VIEW下  
  给带polygon的entity追加position和billboard后（只有position或billboard都没问题）  
  对这样的entity使用viewer.flyTo或viewer.zoomTo的话  
  最终镜头位置是不对的<span style='opacity:.5'>（和正确位置有极大偏差）</span>  
  在网上反复搜索都没找到相关信息







##### 限制镜头

[`viewer.scene.screenSpaceCameraController`](https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html)  
（仅限制交互操作，也就是说不会限制用编程的方式移动镜头）

- 限制镜头离地距离  
  - 限制最近距离  
    `minimumZoomDistance`属性  
  - 限制最远距离  
    `maximumZoomDistance`属性  
  - 单位应该是米
  - 在即将到达限制距离时，距离的移动会变慢，越接近越慢（可能是`bounceAnimationTime`属性控制的）
- 禁止左键拖动地图  
  - 3d视图：  
    把[`enableRotate`](https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html#enableRotate)设为`false`<span style='opacity:.5'>（2d视图下不会产生任何影响）</span>
  - 2d视图：  
    把[`enableTranslate`](https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html#enableTranslate)设为`false`<span style='opacity:.5'>（3d视图下不会产生任何影响）</span>
  
- 禁止倾斜和旋转地图  
  把[`enableTilt`](https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html#enableTilt)设为`false`
- 禁止缩放地图  
  把[`enableZoom`](https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html#enableZoom)设为`false`



##### 设置镜头交互方式

给[`viewer.scene.screenSpaceCameraController`](https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html)的属性赋值



- 缩放  
  更改：[`zoomEventTypes`属性](https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html#zoomEventTypes)  
  禁用/启用：[`enableZoom`属性](https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html#enableZoom)

- 平移地图  
  更改：[`rotateEventTypes`属性](https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html#rotateEventTypes)  
  禁用/启用：[`enableRotate`属性](https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html#enableRotate)





### 模型

有2种方法加入模型  
返回的物体是由不同构造函数构造的

- 加载czml  
  具体在本笔记内搜索“CzmlDataSource”查看

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

- entity方法

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
    这里说的其实都是多边形的（包含模型的笔记见2022.2.11前的版本，不过对于多边形来说不怎么适用）
    
    - 叠加效果  
      用来叠加的物体会覆盖在被叠加物表面
    - 叠加区域  
      用来叠加的物体垂直于地面投影在被叠加内容上的部分
    - [可选值](https://cesium.com/learn/cesiumjs/ref-doc/global.html#ClassificationType)  
      - TERRAIN：和地球表面叠加
      - CESIUM_3D_TILE：和3dtile叠加
      - BOTH：同时和地球表面与3dtile叠加
    
  - 给不同高度的建筑（整体是一个模型）上不同的颜色  
    
    - https://b23.tv/uKMyQp8 10分50秒
    
    - > 用[`Cesium3DTileStyle`](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileStyle.html)来做 —— [谋篇文章](http://t.zoukankan.com/telwanggs-p-13043836.html)
    
      文末有说不同建筑不同颜色是shp文件中预先编辑好的字段
    
  - 使用自定义着色器  
    
    - 监听[`tileVisible`](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileset.html#tileVisible)的方式<span style='opacity:.5'>（[这里](https://blog.csdn.net/weixin_39150852/article/details/124710094)有个demo）</span>
    - [`customShader`属性](https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileset.html#customShader)可能可以，不过似乎被标记为 实验性的



### [“物体”](https://cesium.com/learn/cesiumjs-learn/cesiumjs-creating-entities/)

目前属于自己定义的一个概念

- 跟随地图的html  
  应该没有现成工具只能自己手写
- 避让效果  
  2022.06.02再网上翻了一大圈没找到避让效果<span style='opacity:.5'>（demo或者工具都没找到）</span>  
  不过可能可以用[`Cesium.EntityCluster`](https://cesium.com/learn/cesiumjs/ref-doc/EntityCluster.html)做聚类和避让



**添加方法分类**

有2种添加方法：entity和primitive

entity和primitive对比

- entity简单，primitive复杂

- primitive更底层，性能更好

- > Entity底层调用的仍然是Primitive —— [知乎文章](https://zhuanlan.zhihu.com/p/348807058)



**特性**

- 双击物体会选中  
  - 取消方法  
    目前想到的方法只有：直接取消cz默认的选中事件



**其他**

【】贴地和定义“高度”的意义这2部分待合并

- 贴地  
  由`clampToGround`配置和`classificationType`共同影响  
  - `clampToGround`决定是否贴地  
    目前只看到[GeoJsonDataSource类](https://cesium.com/learn/cesiumjs/ref-doc/GeoJsonDataSource.html)和[KmlDataSource类](https://cesium.com/learn/cesiumjs/ref-doc/KmlDataSource.html)里有，但是默认值是false  
    entity和图形里没发现有的，不过默认就是贴地的（已测试多边形）  
  - [`classificationType`](https://cesium.com/learn/cesiumjs/ref-doc/global.html#ClassificationType)决定贴哪种地  
    多边形里默认就是都贴
  
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
  
  
  box、label、billboard等都有这个配置项



### [entity](https://cesium.com/learn/cesiumjs/ref-doc/Entity.html)

- 一个entity允许携带多个不同种的图形  
  比如同时携带线和和面
  - entity里存在的图形会是对应图形的实例  
    不存在的就是undefined
- `viewer.entities.add`之后物体并不一定立即显示  
  label确实是立即显示，但是线和面要等底图影像服务加载到一定程度才会出现
- 似乎可以用entity做父子关系，相当于别的库的group的概念  
  通过[`parent`配置项](https://cesium.com/learn/cesiumjs/ref-doc/Entity.html#parent)来做
- 坐标  
  大部分图形使用entity.position作为坐标  
  仅有少量图形不使用entity.position作为坐标，下面列出这些图形
  - 图形列表<span style='opacity:.5'>（2022.06.13官网最新[文档](https://cesium.com/learn/cesiumjs/ref-doc/Entity.html)）</span>  
    - polygon  
    - polyline
    - polylineVolume
    - wall




**demo**

进行如下操作可以添加一个固定尺寸的圆。  
点击点时镜头会锁定在该圆，并在圆周围出现锁定图案、展示出描述信息  

```js
// 圆
var pointEntity = viewer.entities.add({
  description: `行数不定的字符串`, // 点击点后弹出的描述信息 (sn大屏项目测试发现点击后不会弹出，甚至把默认控件都放出来也没看见)
  position: Cesium.Cartesian3.fromDegrees(经度,纬度,高度),
  point: { pixelSize: 10, color: Cesium.Color.ORANGE }
})
```



##### 添加方法

有2种

- 第一种：`viewer.entities.add`

  - 入参：可以是[Entity](https://cesium.com/docs/cesiumjs-ref-doc/Entity.html)实例也可以是[Entity的配置对象](https://cesium.com/docs/cesiumjs-ref-doc/Entity.html#.ConstructorOptions)
    - 配置对象
      - 配置对象的属性都会被添加到实例里<span style='opacity:.5'>（不管文档里有没有这个属性，都会添加进去）</span>  
        甚至实例里还会有配置对象加下划线版本的属性<span style='opacity:.5'>（比如原属性名是a，加下划线后就是_a）</span>
  - 返回值：[Entity](https://cesium.com/docs/cesiumjs-ref-doc/Entity.html)实例

- 第二种  

  > 由 [`CzmlDataSource`](https://cesium.com/learn/cesiumjs/ref-doc/CzmlDataSource.html)、[`GeoJsonDataSource`](https://cesium.com/learn/cesiumjs/ref-doc/GeoJsonDataSource.html)这样的数据源生成 —— [Entity文档](https://cesium.com/learn/cesiumjs/ref-doc/Entity.html)
  
  具体方法在本笔记的“数据源”部分有记录



##### 操作

- 坐标  

  - 设置初始值  
    `position`配置项  
    操作方法去[Entity的配置项](https://cesium.com/docs/cesiumjs-ref-doc/Entity.html#.ConstructorOptions)里找
  - 后期修改  
    通过[`position`属性](https://cesium.com/learn/cesiumjs/ref-doc/Entity.html#position)修改  
    直接赋值也可以修改

- 更改图形  
  Entity实例里有存各个图形的实例，可以通过图形的实例去做更改  
  也可以通过给赋值一整个图形配置来修改，比如下面这种写法  
  
  ```js
  entity.billboard={
    image:templateConfig.ornamentIco,
    width: 30,
    height: 30,
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,
    scaleByDistance: new Cesium.NearFarScalar(20000, 1, 400000, 0),
  }
  ```
  
  
  
- 显隐  
  [`show`属性](http://127.0.0.1:5501/Build/Documentation/Entity.html?classFilter=entity#show)  
  读取和修改都用这个属性
  
  
  
  

##### 图形

图形是cesium里的一个概念  
像[立方体](https://cesium.com/docs/cesiumjs-ref-doc/BoxGraphics.html#.ConstructorOptions)、[椭球体](https://cesium.com/docs/cesiumjs-ref-doc/EllipsoidGraphics.html#.ConstructorOptions)这种东西就是图形  
<span style='opacity:.5'>（图形在Entity文档里叫visualization，而对应的类名基本都是以Graphics结尾的）</span>

- 按目前了解，一般图形的载体都是entity  
  entity有一部分的配置就是图形
  
- 图形的配置项<span style='opacity:.5'>（注意是图形的不是entity的）</span>  
  - `show`用来设置是否显示
  - `material`用来设置材质
  
- 图形的属性<span style='opacity:.5'>（以下内容通过观察得出）</span>  
  配置项都会在属性里存在  
  
  - 如果某个配置没配，那在属性里值就会是undefined  
  - 修改  
    对属性进行赋值即可<span style='opacity:.5'>（就算值是undefined，修改也可以生效）</span>  
    - 部分类型的值可以用`值.setValue(新值)`的方法进行修改  
      比如值为[`ConstantProperty`实例](https://cesium.com/learn/cesiumjs/ref-doc/ConstantProperty.html)时
  - 查看  
    属性如果有值的话都会是cz的实例  
    - 属性值不一定是设置值，比如如下设置值
      - js的原始值  
        属性值将会是[`ConstantProperty`实例](http://127.0.0.1:5501/Build/Documentation/ConstantProperty.html)
      - cz的[`Color`实例](https://cesium.com/learn/cesiumjs/ref-doc/Color.html)  
        属性值将会是[`ColorMaterialProperty`实例](https://cesium.com/learn/cesiumjs/ref-doc/ColorMaterialProperty.html)
    - 查看设置值  
      通过实例的`getValue(julianDate)`方法来查看
  
- 覆盖关系  

  - zIndex配置  
    默认不生效的  
    不同图形有不同的生效条件（个人猜测之所以有条件，是为了确保这些东西都在地面上）  
    如果不生效的话一定是近的盖住远的  
    - 这个zIndex是可以跨entity比较的

  - height:0的面<span style='opacity:.5'>（zIndex不生效）</span>一定会盖住clampToGround:true的线<span style='opacity:.5'>（zIndex生效）</span>
  - 如果zIndex都生效但是都没设值的话  
    表现会很奇怪  
    - 案例  
      2个带线和面的entity  
      覆盖关系为：先画的线>后画的线>先画的面>后画的面

  



entity中的图形配置项

- 可通过给属性赋值来更新视图  
  已试过`point`  
  point的颜色、大小直接赋值，视图就能更新  
  甚至直接给point赋值一个对象都可以
- 可以通过不同配置项同时携带多种图形  
- 这些配置项可以传这个图形的实例也可以传这个图形的配置项



###### [圆](https://cesium.com/docs/cesiumjs-ref-doc/PointGraphics.html#.ConstructorOptions)  

- 在Entity里对应的配置项是：`point`
- 这个圆在地面下时并不一定会被地面挡住  
  镜头要距离地面足够近时才会开始有一部分被挡住
- 圆图形的配置项  
  可以设颜色、描边等内容（描边只能是外扩的）  
  （这里只有1个配置项没记录，就是随镜头距离禁用`depth test`的配置项）

  - 让尺寸随着『相机与物体间的距离』而变化  
    配置项：`scaleByDistance`  
    配置项的值：[`Cesium.NearFarScalar`](https://cesium.com/docs/cesiumjs-ref-doc/NearFarScalar.html)实例（关于该实例更多内容可在本笔记内查看）  
    默认值：不会近大远小  
    
  - 让透明度随着『相机与物体间的距离』而变化  
    配置项：`translucencyByDistance`  
    配置项的值：[`Cesium.NearFarScalar`](https://cesium.com/docs/cesiumjs-ref-doc/NearFarScalar.html)实例（关于该实例更多内容可在本笔记内查看）
  
  - 让圆只在『相机与物体间的距离』在指定区间内时才显示  
    配置项：`distanceDisplayCondition`  
    配置项的值：`new Cesium.DistanceDisplayCondition (会显示的最小距离,会显示的最大距离)`
  
    

###### [立方体](https://cesium.com/docs/cesiumjs-ref-doc/BoxGraphics.html#.ConstructorOptions)  

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
  
  - 投影  
    目前的尝试都是失败的  
    已经尝试过的方案：给`shadows`配置项设置了所有枚举值、半透明的、不透明的、边框的各种情况、加地形与不加的、实例化`viewer`时`shadows`与`terrainShadows`配置项的设与不设  
    [这个官方demo](https://sandcastle.cesium.com/index.html?src=Shadows.html)可以成功投下模型的影子
    
  - 允许显示物体时的镜头距物体的区间  
    配置项为`distanceDisplayCondition`，值为[DistanceDisplayCondition](https://cesium.com/docs/cesiumjs-ref-doc/DistanceDisplayCondition.html)实例



###### [椭球体](https://cesium.com/docs/cesiumjs-ref-doc/EllipsoidGraphics.html#.ConstructorOptions)

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
  
- [`Cesium.Ellipsoid.WGS84`](https://cesium.com/learn/cesiumjs/ref-doc/Ellipsoid.html#.WGS84)  
  其实就是个模仿地球的椭球体  
  源码就一行：`new Ellipsoid(6378137.0, 6378137.0, 6356752.3142451793)`



###### 矩形  

有2个东西可以画矩形

- [plane](https://cesium.com/learn/cesiumjs/ref-doc/PlaneGraphics.html)
- [rectangle](https://cesium.com/learn/cesiumjs/ref-doc/RectangleGraphics.html)

2者的区别

- rectangle可以增加厚度成多面体
- 设置宽高的方式
  - plane直接设置宽高
  - rectangle设置2个坐标，然后cz算出宽高



###### [文本](https://cesium.com/docs/cesiumjs-ref-doc/Label.html)  

`label`

[demo](https://sandcastle.cesium.com/index.html?src=Labels.html)

- 偏移
  - 以米为单位的偏移  
    `eyeOffset`配置项
  - 以屏幕像素为单位的偏移  
    `pixelOffset`配置项
- 样式  
  有很多地方可以设置，比如font、scale、fillColor等，其中style比较特殊，值为对象
  - font  
    要求输入值满足以下格式，否则为固定值（固定值应该是`'14px sans-serif'`）  
    `数字px 字体`




###### 多边形

[`polygon`配置项](https://cesium.com/learn/cesiumjs/ref-doc/PolygonGraphics.html)  

- 可以增加厚度成多面体  
  厚度可以不等的（就是说可以做出各个地方厚度不一样的多面体）
- 控制离开球面的高度  
  `height`配置项  
  这里说的球面不包括地形  
  只有值为`undefined`时才会贴在地形表面
  - 决定`height`值的情况
    - 直接用entity生成多边形，那`height`不设的话就是undefined  
      （就算去掉数据里的首尾重复点，结果也是一样的）
    - 用geojson数据源生成的话`height`会是0
  - 为undefined时会有如下bug
    - 描边不显示
    - 如果用8字型数据  
      那会生成一个难以形容的立体形状  
      （`height`不为undefined的话生成的是一个三角形）
  - 提醒：不为undefined的话zIndex无法生效
- 有“叠加类型”选项  
  和模型一样，具体内容见模型的“叠加类型”部分
- 坐标用顺时针逆时针都可以
- 描边宽度  
  无法大于1（[有的博客](https://blog.csdn.net/weixin_33716941/article/details/93150599)说只有win不行，可是去余榕的mac上试过也是不行）
- `textureCoordinates`配置  
  应该是用来控制各个面的贴图方向的  
  如果没用[ImageMaterialProperty](https://cesium.com/learn/cesiumjs/ref-doc/ImageMaterialProperty.html)应该是不生效的，读取`textureCoordinates`属性也会返回undefined<span style='opacity:.5'>（已测试[StripeMaterialProperty](https://cesium.com/learn/cesiumjs/ref-doc/StripeMaterialProperty.html)）</span>









###### 其他

- 模型  
  [demo](https://sandcastle.cesium.com/index.html?src=3D%2520Models.html)
- [墙](https://cesium.com/learn/cesiumjs/ref-doc/WallGraphics.html)
- 图（含canvas）  
  [`billboard`](https://cesium.com/learn/cesiumjs/ref-doc/BillboardGraphics.html)
- 线  
  [`polyline`配置项](https://cesium.com/learn/cesiumjs/ref-doc/PolylineGraphics.html#.ConstructorOptions)  
  - 宽度模式  
    `clampToGround`配置项  
    - 默认值为false  
      线各处宽度在屏幕上看都一样
    - true  
      线在地面上有一致的宽度  
      （就是说屏幕上看的话宽度不一定一致）



### primitive

[api文档](https://cesium.com/docs/cesiumjs-ref-doc/Primitive.html)里的例子修改后就可以跑，修改为：把`scene`改成`viewer.scene`

更多内容可以参考[博客A](https://www.jianshu.com/p/5a74c607a591)和[博客B](https://blog.csdn.net/happyduoduo1/article/details/51868042)（这2篇博客是差不多的，A是参考B写的）

- 用`viewer.scene.primitives.add`添加



### collection

（现在记录的都是猜测，没有深入了解过）

collection目前是自己定义的一个概念，包括但不仅限于如下内容：

- [PrimitiveCollection](https://cesium.com/docs/cesiumjs-ref-doc/PrimitiveCollection.html)
- [BillboardCollection](https://cesium.com/docs/cesiumjs-ref-doc/BillboardCollection.html)
- [LabelCollection](https://cesium.com/docs/cesiumjs-ref-doc/LabelCollection.html)



**诞生意义**

在图形数量大的时候提升性能



**操作方式**

1. 创建collection  
   `var billboards = new Cesium.BillboardCollection()`
2. 把collection加入场景  
   `scene.primitives.add(billboards)`  
   - 上面这个方法会返回入参
   - `scene.primitives`本身就是一个[PrimitiveCollection](https://cesium.com/docs/cesiumjs-ref-doc/PrimitiveCollection.html)实例

- 增加图形  
  `collection.add`方法  
  比如[BillboardCollection#add](https://cesium.com/docs/cesiumjs-ref-doc/BillboardCollection.html#add)
- 获取所有entity  
  通过`values`属性可以获取（文档里没写这个方法）



### 材质

[这个回答](https://stackoverflow.com/questions/50298267/how-to-use-material-fromtype-in-cesium)里说了图形和primitive有不同的材质api  
[`Material`](https://cesium.com/learn/cesiumjs/ref-doc/Material.html?classFilter=Material)类只能primitive用

- [着色器似乎只能给3D Tiles用](https://github.com/CesiumGS/cesium/tree/main/Documentation/CustomShaderGuide#applying-a-custom-shader)  
  3D Tiles中的用法在本笔记内搜索“Cesium.Cesium3DTileset”查看



##### 图形的`material`配置项



可以直接写一个颜色（比如`Cesium.Color.RED.withAlpha(0.5)`）  
可以直接写一个图片地址【】真的吗——2022.06.17  
也可以写各个具体的实例  



**具体的实例**

具体实例的列表见[MaterialProperty](https://cesium.com/learn/cesiumjs/ref-doc/MaterialProperty.html)  
这个MaterialProperty类似于各具体类的父类，但实际上不是

- 用图片当材质  
  `ImageMaterialProperty`  
  可以用栅格图也可以用svg  
  不过svg是转成栅格图后使用的



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

2种用法都会模糊  
去svg文件里加大width、height就可以变清晰  
当然加大之后会造成性能负担导致cz整个挂掉



### 数据源

也就是[DataSource](https://cesium.com/learn/cesiumjs/ref-doc/DataSource.html)



**术语说明**

>`DataSource`只是书写文档用的，并不是给开发者编程时用的 —— 官方文档

文档里的DataSource实际指的都是GeoJsonDataSource、CzmlDataSource这种类，但是实际上这些类并没有继承DataSource类，本笔记里也是用DataSource指代这些类



**DataSource的功能**

用来将数据源转为物体的（目前看到都是转为entity）

- 支持数据源  
  <span style='opacity:.5'>（截止至cz1.89为止）</span>共支持3种数据源
  - geojson：对应[GeoJsonDataSource类](https://cesium.com/learn/cesiumjs/ref-doc/GeoJsonDataSource.html)
  - czml：对应[CzmlDataSource类](https://cesium.com/learn/cesiumjs/ref-doc/CzmlDataSource.html)
  - kml：对应[KmlDataSource类](https://cesium.com/learn/cesiumjs/ref-doc/KmlDataSource.html)



**最简demo**

添加一个czml模型

```js
viewer.dataSources.add(
  Cesium.CzmlDataSource.load('czml文件地址')
)
```



**编程流程**

1. 创建一个DataSource实例或能生成实例的Promise  
   用`DataSource类.load`方法创建（这里只介绍这种创建方法，一般来说也是用这种方法创建）  
   这个方法会返回一个`Promise$1`实例，`Promise$1`实例的then方法会返回DataSource实例
   - 入参  
     1. 第一个入参  
        可以是一个数据源的url也可以是一个内存里的数据源
     2. 第二个入参  
        一个配置，像[GeoJsonDataSource](https://cesium.com/learn/cesiumjs/ref-doc/GeoJsonDataSource.html#.LoadOptions)的话就有少量对entity的设置
   - 返回值：一个`Promise$1`实例  
     `Promise$1`实例的then方法会返回DataSource实例
2. 把实例添加进场景  
   `viewer.dataSources.add(入参)`  
   [这个方法](https://cesium.com/learn/cesiumjs/ref-doc/DataSourceCollection.html#add)接受2种入参
   1. DataSource实例
   2. 返回DataSource实例的Promise$1实例



**操作**

- 获取entity的方法  
  dataSource的entities属性是一个[EntityCollection](https://cesium.com/learn/cesiumjs/ref-doc/EntityCollection.html)实例，里边放着entity
- 做样式等设置的方法  
  - 可以在『DataSource类的load方法』的第二个参数进行设置<span style='opacity:.5'>（像[GeoJsonDataSource](https://cesium.com/learn/cesiumjs/ref-doc/GeoJsonDataSource.html#.LoadOptions)的话就有少量对entity的设置）</span>
  - GeoJSON的话如果符合[simplestyle-spec](https://github.com/mapbox/simplestyle-spec)，也会按properties的渲染  
    cz1.89.0基本遵守[simplestyle-spec1.1.0](https://github.com/mapbox/simplestyle-spec/tree/master/1.1.0)<span style='opacity:.5'>（描边宽度不生效是因为entity本身就不支持）</span>
    - 不遵守simplestyle-spec的部分  
      - simplestyle-spec默认颜色是灰色  
        但是cz改为了黄色
    - 透明度  
      simplestyle-spec的透明度完全依据透明度类属性走  
      虽然simplestyle-spec写着fill-opacity默认值是0.6，但是cz里设了fill的话默认值就会变成1  
      fill里的透明度不会生效
    - cz里颜色值允许用`rgb(1,1,1)`和`rgba(1,1,1,.5)`格式<span style='opacity:.5'>（simplestyle-spec的意思好像是只能用#ace和#aaccee这种格式）</span>
    - 提醒：如果直接生成entity（不用数据源）的话，就算遵从simplestyle-spec也不会生效
  - 获取entity后修改entity  
    用这个方法想做什么设置都可以



GeoJsonDataSource

- entity里会存GeoJSON里的properties  
  存properties的属性就叫[`properties`](https://cesium.com/learn/cesiumjs/ref-doc/Entity.html#properties)

  - 取出properties  
    `entity.properties.getValue(任意值)`  
    [文档](https://cesium.com/learn/cesiumjs/ref-doc/PropertyBag.html#getValue)要求传入[JulianDate](https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html)，实际上传什么都可以
  
- > 可以加载墨卡托数据 —— ZY



**非重点细节**  

- `viewer.dataSources.add`  
  viewer.dataSources.add(DataSource实例)的话会返回一个`Promise$1`实例  
  这个实例的then回调的参数返回的是传给add的DataSource实例





### 事件

笔记待整理



##### [`Event`](https://cesium.com/learn/cesiumjs/ref-doc/Event.html)实例

cesium中有些类的部分成员是`Event`实例<span style='opacity:.5'>（比如`Camera`的[`moveEnd`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#moveEnd)）</span>

通过`Event`实例可以进行监听、取消监听等操作



##### 镜头事件

并不是每次都会触发的，应该是变化量达到[`camera.percentageChanged`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#percentageChanged)以上时才会触发（`camera.percentageChanged`应该是代表前后有多少比例的差异）

- 变化的开始  
  [`camera.moveStart`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#moveStart)  
  无参数
- 一次变化  
  [`camera.changed`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#changed)  
  - 一个参数  
    应该是和[`camera.percentageChanged`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#percentageChanged)所代表的的一样的内容  
  - 如果`camera.percentageChanged`设得小，那该事件的触发频率也会增加  
    甚至会让该事件早于[`camera.moveStart`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#moveStart)触发
- 变化的结尾  
  [`camera.moveEnd`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#moveEnd)  
  无参数



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

[ScreenSpaceEventHandler](https://cesium.com/docs/cesiumjs-ref-doc/ScreenSpaceEventHandler.html)

- 在这里可以找到一个事件处理器实例：  
  `viewer.cesiumWidget.screenSpaceEventHandler`
  
- 可以建立多个实例  
  建立方法：`new ScreenSpaceEventHandler(viewer.canvas)`

- [设置监听函数](https://cesium.com/docs/cesiumjs-ref-doc/ScreenSpaceEventHandler.html#setInputAction)  
  `ScreenSpaceEventHandler实例.setInputAction(监听函数,事件类型)`

  - 监听函数（action）  
    唯一形参是cz封装的鼠标事件对象
    - 鼠标事件对象  
      （找遍[api文档](https://cesium.com/docs/cesiumjs-ref-doc/index.html)也没看到相关说明）  
      应该都只有少量简单的属性，比如`position`、`startPosition`、`endPosition`  
      - `position`  
        值是`Cartesian2`实例，实例的xy值就是鼠标在canvas上所处的xy值  
        把这个属性传给`viewer.scene.pick`就可以获得点击到的物体

  - 事件类型  
    这个参数要输入`Cesium.ScreenSpaceEventType`的属性  
    可选值见[这里](https://cesium.com/docs/cesiumjs-ref-doc/global.html#ScreenSpaceEventType)  

  注意：这个方法是设置而不是增加。如果设置了多个函数，只有最后设置的函数会生效

- 没有只监听一次的方法  
  手动去做的话也有问题  

  - 比如禁用拖动地图（用enableRotate还是rotateEventTypes没差）后监听拖动事件（LEFT_DOWN+LEFT_UP+MOUSE_MOVE）  
    在拖动结束后允许拖动的话，如果鼠标一直处于滑动状态，那地图就会被拖上一会

- [删除监听函数](https://cesium.com/docs/cesiumjs-ref-doc/ScreenSpaceEventHandler.html#removeInputAction)

- 提醒：双击会触发单击事件2次  
  而且单击还是早于双击触发的



### 拾取物体

- 依据屏幕点坐标返回第一个物体  
  [`viewer.scene.pick(Cartesian2实例)`](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#pick)

  - 返回值   
    （只在👆这个文档里看到少量说明）

    - 只会返回第一个点到的物体（[这篇文章](https://blog.csdn.net/zhangqun23/article/details/83056315)也认同这个观点）

    - 返回对象的id属性就是用`viewer.entities.add`添加的实例

    - 没有地球以外的东西的话返回undefined  

  - 拾取范围  
    一个矩形，以输入点为中心，矩形内有东西就会返回对象
    - 设置拾取范围  
      通过该方法（`pick`）的第二和第三个参数设置矩形宽高
  
- 依据屏幕点坐标返回物体（可不限数量）  
  [`viewer.scene.drillPick(Cartesian2实例)`](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#drillPick)  
  
  - 返回值为数组（没物体的话返回空数组）  
    数组子项的id属性是用`viewer.entities.add`添加的实例  
  
  - 提醒：width和height都不能传入0





### [widget（小部件）](https://cesium.com/learn/cesiumjs/ref-doc/CesiumWidget.html)

小部件一般都会有html部分

- <span style='opacity:.5'>（怀疑这个widget和小部件没关系啊，感觉是渲染整个场景的，[这个影像服务切换demo](https://sandcastle.cesium.com/index.html?src=Imagery%2520Layers%2520Manipulation.html)里也没有使用widget）</span>
- <span style='opacity:.5'>（怎么感觉整个场景都是widget实现的，就算cz的使用者不加widget，canvas父元素的类名也是`cesium-widget`）</span>
- 通过Viewer配置增加的小部件也是由`CesiumWidget`实现的



##### 去除默认开启的小部件

```js
const viewer = new Cesium.Viewer('cesiumContainer', {
  animation: false, //（下方）动画控制不显示
  timeline: false, //（下方）时间线不显示
  fullscreenButton: false, //（右下角）全屏按钮不显示
  homeButton: false, //（右上角）homePage按钮不显示
  baseLayerPicker: false, //（右上角）底图服务选择按钮不显示
  sceneModePicker:false, //（右上角）模式切换按钮不显示（可选球体、3d平面和2d平面）
  geocoder:false, //（右上角）搜索按钮不显示
  navigationHelpButton:false, //（右上角）镜头操作说明按钮不显示
  infoBox:false, // 解决控制台报错：Blocked script execution in 'about:blank'..
})
  
// （左下角）隐藏左下角版权信息
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



##### 其他小部件详细描述

- 底图服务选择按钮  
  `baseLayerPicker`
  - 默认值是必应地图  
    <span style='opacity:.5'>（而不是cesium默认的[createWorldImagery](https://cesium.com/learn/cesiumjs/ref-doc/global.html#createWorldImagery)）</span>
  - baseLayerPicker放出来的话  
    文本会参与到遮挡关系中<span style='opacity:.5'>（原本都是最前显示的）</span>
  
- 投影方式选择按钮  
  `projectionPicker`配置项，默认值为false





### 其他

- 置灰指定内容以外的区域  

  > `viewer.scene.invertClassification = true` —— [某篇文章](https://blog.csdn.net/qq_27816785/article/details/123236815)



##### [`Cesium.NearFarScalar`](https://cesium.com/docs/cesiumjs-ref-doc/NearFarScalar.html)

这个实例会让物体的某个标量和『相机与物体间的距离』产生关系

- **具体关系描述**

  这个标量在这个实例外会有一个设置值  
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



[`Cesium.Cartographic`](https://cesium.com/docs/cesiumjs-ref-doc/Cartographic.html)  
比较罕见  
用经纬度和高度表示一个三维坐标  
经纬度用弧度表示，高度为距离椭球表面的米数



###### [`Cesium.Cartesian3`](https://cesium.com/docs/cesiumjs-ref-doc/Cartesian3.html)  

*是比较常用的，应该是表示空间直角坐标系的3维向量*  



实例内容

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



###### 坐标转换



坐标系转换  
可以看看[`Cesium.SceneTransforms`](https://cesium.com/docs/cesiumjs-ref-doc/SceneTransforms.html)



转为空间直角坐标系坐标

- 将经纬度海拔转为Cartesian3实例  
  [`Cesium.Cartesian3.fromDegrees`](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html#.fromDegrees)  
  （这是一个几何方向的方法，但是一般用来做经纬度的转换）
- 将经纬度数组转为Cartesian3实例数组  
  [`Cesium.Cartesian3.fromDegreesArray`](https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html#.fromDegreesArray)  
  （这是一个几何方向的方法，但是一般用来做经纬度的转换）
- 将经纬度海拔数组转为Cartesian3实例数组  
  应该是用Cesium.Cartesian3.fromDegreesArrayHeights，没仔细了解
- 将屏幕坐标转为Cartesian3实例  
  以下2个方法都无法将地形纳入运算，要纳入运算的话估计得手写了
  - [`viewer.camera.pickEllipsoid`方法](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#pickEllipsoid)  
    这个方法应该是转为地球表面的坐标
  - [`viewer.scene.pickPosition`方法](https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#pickPosition)  
    和`viewer.camera.pickEllipsoid`的数值会有些差异，不过这个方法时不时会返回undefined，原因未知



转为经纬度高度坐标<span style='opacity:.5'>（必须带高度，没有单纯只转出经纬度的方法）</span>

- 将空间三维坐标转为经纬度高度  
  [`Cartographic.fromCartesian`](https://cesium.com/learn/cesiumjs/ref-doc/Cartographic.html#.fromCartesian)



##### [`BoundingSphere`](https://cesium.com/learn/cesiumjs/ref-doc/BoundingSphere.html)

- 有很多获取`BoundingSphere`实例的静态方法
- 修改半径  
  直接修改[`radius`属性](https://cesium.com/learn/cesiumjs/ref-doc/BoundingSphere.html?classFilter=boundingSphere#radius)即可<span style='opacity:.5'>（[`flyToBoundingSphere`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html?classFilter=cam#flyToBoundingSphere)等方法可以正确运行）</span>
- 获取entity的`BoundingSphere`实例  
  方法见下方`EntityView`的笔记

<span style='opacity:.5'>（boundingSphere的值不会受到镜头的影响）</span>



##### [`EntityView`](https://cesium.com/learn/cesiumjs/ref-doc/EntityView.html)

用来获取entity的`BoundingSphere`实例



注意

- 要调用[`update`方法](https://cesium.com/learn/cesiumjs/ref-doc/EntityView.html#update)后才会生成[`boundingSphere`属性](https://cesium.com/learn/cesiumjs/ref-doc/EntityView.html#boundingSphere)
- update方法要依赖entity的position、viewFrom等属性，大部分entity应该是没有这些属性的
- 这条不一定正确：[`update`方法](https://cesium.com/learn/cesiumjs/ref-doc/EntityView.html#update)的`boundingSphere`属性一定要传  
  不然没效果可能也不会报错



##### 动画

- 每帧设置配置  
  官方提供了[`CallbackProperty`类](https://cesium.com/learn/cesiumjs/ref-doc/CallbackProperty.html)来辅助这个事（虽然感觉帮助不大，主要作用就是帮你封装代码）  
  每帧执行回调，回调返回值将会作用于Property
  - 性能  
    用它做动画或者不做动画（应该是用他做还是不用它做吧），肉眼看差别不大  
    第二个参数设true还是false肉眼看差别不大
  - 使用  
    `CallbackProperty`实例应该可以用在大部分Property上
    - 可用的Property中一部分直接作为设置值使用即可
    - 一部分要用别的方法使用  
      <span style='opacity:.5'>（这些“别的方法”在文档上都没有说）</span>  
      比如说作为ColorMaterialProperty的入参  
      比如说作为ImageMaterialProperty的image配置项的值
  - 回调执行时机  
    - 只是实例化的话不会执行  
    - 添加到场景里就会开始执行  
    - 隐藏entity也会执行  
    - 把polygon图形的fill设为false之后填充材质（`material`配置项）的回调就不会执行了？？？
    - 第二个参数设为true时返回值不变的话不会执行（不理解这是怎么实现的，不执行怎么知道返回值变不变呢）  
      好像是“设为true的话不用回调返回的JuliaTime就只会执行一次”才对

- [这个文章](https://blog.csdn.net/ls870061011/article/details/122748442)里搜索`Cesium.CompositeProperty`也有动画描述



##### 效果

可以从[bloom后处理效果](https://cesium.com/docs/cesiumjs-ref-doc/PostProcessStageCollection.html#bloom)



# 性能优化

- entity图形的material配置项  
  给ColorMaterialProperty的话会复用，给Color不会复用（判断依据是各material属性间是否全等）  
  不过复用后性能提升不明显
- 显示文本的那一帧会比较耗时间  
  如果要贴在地形上的话这个时间会特别明显
  - 这个显示的操作是异步的
  



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
  
- `Cesium.knockout`  
  就是[Knockout](https://knockoutjs.com/documentation/introduction.html)





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





# [CesiumLab](http://www.cesiumlab.com/)

- 官网可以下个exe  
  exe打开是个本地网页  
  里面有不少东西

  - > 可以把shp转为3d tiles<span style='opacity:.5'>（已实践）</span> —— [某篇文章](http://t.zoukankan.com/telwanggs-p-13043836.html)
  
- 服务  

  > 国内公司基本都是用这个工具做数据服务 —— 为鑫

  ZY的书峰乡地形服务好像也是用这个做的



### [EarthSDK](http://www.earthsdk.com/)

3个js库的统称  
功能不少，还可以调整FOV



**资源**

- [官网](http://www.earthsdk.com/)提供了个下载包  
  下载包里包括：文档、demo和3个js库的生产版



**特性**

- 有暴露出Cesium，且能取出EarthSDK中的Viewer进行操作
- 使用上是免费的  
  但是[获取源码、技术咨询、修改版权信息](http://www.cesiumlab.com/#/service)都要钱



**简述3个js库**

[设计的重点：配置式、与vue结合](https://github.com/cesiumlab/XbsjEarthUI/wiki/Cesium%E7%9A%84%E6%89%A9%E5%B1%95%E5%B7%A5%E5%85%B7%E5%8C%85-EarthSDK%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%971#earthsdk%E6%8F%90%E4%BE%9B%E8%B6%85%E7%BA%A7%E6%98%93%E7%94%A8%E7%9A%84api)

- XbsjEarthUI  
  开源有文档  
  依赖XbsjEarth
- XbsjEarth  
  闭源有文档  
  依赖XbsjCesium
- XbsjCesium  
  闭源无文档 



**XbsjEarthUI**

- 可以研究，但不建议使用  
  原因如下

  - api文档不全  
    缺少教程
  - 依赖2个闭源库  
    且闭源库文档也不全
  - 复制源码出来用也不太适合  
    看过图层控制的代码，内部vue组件依赖不少的，一个图层控制源码了解完半天或一天就过去了
  
- [官方有时候](https://github.com/cesiumlab/XbsjEarthUI/wiki/Cesium%E7%9A%84%E6%89%A9%E5%B1%95%E5%B7%A5%E5%85%B7%E5%8C%85-EarthSDK%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%971#%E6%A0%B7%E4%BE%8B%E7%A8%8B%E5%BA%8Fxbsjearthui)不把XbsjEarthUI当成EarthSDK的一部分

- 有在码云和github上开源

- 有部分是用vue写的
  - vue组件都是自己的代码
    - 可能是从iview复制的代码  
      判断依据是：package.json里有iview，而且注释里有引用iview

  

# [TerriaJS系列](https://github.com/TerriaJS/terriajs)

基于Cesium的项目，主要是数据、地图展示，似乎有提供服务

Cesium不可用时可以退回Leaflet



# 其他工具

- [HPUZYZ.Demo](https://github.com/YanzheZhang/Cesium.HPUZYZ.Demo)  
  demo集合
- [zhangti0708/cesium-examples](https://github.com/zhangti0708/cesium-examples)  
  demo集合
- https://sandcastle.cesium.com  
  可以在线编写cesium代码并保存（云端可以，本地好像也可以）



### [cesium-navigation-es6](https://github.com/cesium-plugin/cesium-navigation-es6)

拥有的小部件：

- 比例尺
- 缩放地图按钮（中间有带个重置镜头的刷新图标）
- 指南针
  - 可以通过指南针移动镜头  
    可以上下移动，也可以旋转镜头
  - [指南针外环无法关闭](https://github.com/cesium-plugin/cesium-navigation-es6/issues/3)  
    对应的是`enableCompassOuterRing`配置项



### [xt3d](http://211.149.185.229:8080/home)

- 有大量demo



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
  
  - [一个用JSON代表czml的例子](http://zgeo.work/cesiumTx/examples/editor.html#czml_box)
  
  关于czml的了解，这3个页面还没看完：[第1个](https://www.cnblogs.com/mazhenyu/p/8315840.html)、[第2个](https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Structure)、[第3个](https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Packet)
  
  - czml里就已经包含了坐标等信息（看了各来源的例子后得出的结论）

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
  
- 本地文档  
  源码下下来运行`npm run generateDocumentation`  
  命令执行完后运行index.html就可以看文档了
  
- 解决如下报错  
  ```
  Blocked script execution in 'about:blank' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.
  ```

  方法：把Viewer的infoBox[配置项](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions)设为`false`
  
- 效果参考  

  - https://datav.aliyun.com/portal/graphics-engine倒数第三块内容
  - cesiumLab里点“三维可视”部分

