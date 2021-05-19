目前对mapbox的理解就是：一个致力于拓扑分析的地图，并拥有一些拓扑分析以外的功能

# 地图

通过实例化`mapboxgl.Map`来初始化地图  
`mapboxgl.Map`实例就是地图



### 改变镜头

- **jumpTo**  
  瞬间将镜头参数瞬间改成输入值
- **easeTo**  
  直线缓动成输入值
- **flyTo**  
  镜头切换过程是缓动的，且有一个跳离地面的效果  
  `flyTo`是最灵活的改变镜头方法，比`easeTo`还多了如`curve`、`minZoom`等配置项
- **stop**  
  停止缓动动画



**地图方位的配置项**

这些内容如果在实例化地图时没有传入，那就会去『地图样式』中进行查找  
『地图样式』中没有的话默认就是`0`

- bearing  
  是逆时针旋转地图的角度（在不倾斜地图的情况下也是顺时针转镜头的角度）
- pitch  
  地图倾斜角度
- zoom  
  地图放大的等级  
  （zoom越大，地图也越大）

### 设置地图样式



##### `options.style`

去[官网](https://www.mapbox.cn/mapbox-gl-js/api/#map)里搜索“options.style”查看  
可以是一个json或url  

- json  
  官方内容见[这里](https://docs.mapbox.com/mapbox-gl-js/style-spec/)（注意点点左侧的内容）

  - 例子  

    ```js
    const mapStyle = {
      'version': 8,
      'name': 'Dark',
      'sources': {
        'mapbox': {
          'type': 'vector',
          'url': 'mapbox://mapbox.mapbox-streets-v8'
        },
        'overlay': {
          'type': 'image',
          'url': 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
          'coordinates': [
            [-80.425, 46.437],
            [-71.516, 46.437],
            [-71.516, 37.936],
            [-80.425, 37.936]
          ]
        }
      },
      'sprite': 'mapbox://sprites/mapbox/dark-v10',
      'glyphs': 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
      'layers': [
        {
          'id': 'overlay',
          'source': 'overlay',
          'type': 'raster',
          'paint': { 'raster-opacity': 0.85 }
        },
      ]
    }
    ```

- url

  - 官方预定义的url
    - 卫星图  
      mapbox://styles/mapbox/satellite-v9
    - 卫星图+路网  
      mapbox://styles/mapbox/satellite-streets-v10
    - 普通亮色地图  
      mapbox://styles/mapbox/streets-v11
    - 更多内容见官网



##### 初始化时配置

```js
var map = new mapboxgl.Map({
  container: 'map',
  maxZoom: 5.99,
  minZoom: 4,
  zoom: 5,
  center: [-75.789, 41.874],
  style: 上面的`options.style`
})
```





##### 初始化之后设置

`map.setStyle(上面的options.style)`  
详细内容请参考[官网](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#setstyle)

- 改变后会清空地图上所有图层与数据源  
  而且清空后新生成的图层是由输入的json决定的  
  `map.once('idle',fn)`的`fn`可以确保在『清空图层』动作结束后执行  
  - 会清空所有图层与数据源的原因  
    应该是因为`setStyle`实际上是更新style对象  
    而所有图层与数据源（数据源应该是）都是style对象的一部分  
    所以导致了这个情况



**一些mapbox底图的实现方式**

用[图层](#图层)实现的  
这些图层的数据源要么是`undefined`要么是同一个`vector`[数据源](#数据源)  
数据源背后使用的数据：

- mapbox应该是pbf文件
- epgis应该是sg文件

目前还没有找到在web中把这些数据转成geojson等可读性数据的方法




# 数据源

有很多内容，这里只写一部分，详细信息查阅[样式规范](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/)及[api文档](https://www.mapbox.cn/mapbox-gl-js/api/#sources)  
可以用于图层，也可以用于地图  
有7种类型： vector、raster、 raster-dem、GeoJSON、图片、视频（[样式规范](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/)写了前6种，实际上还有第七种：canvas）  
使用方式有很多种

- **瓦片**  

  - raster数据源可以用瓦片  
    下方是一个`source`属性值示例  

    ```js
    {
      type: "raster",
      url: "aegis://aegis.HillShade",//这个url是sjdt的，换成mapbox应该也一样
      tileSize: 512
    }
    ```

  - ？？？  
    目前看到都是出现在`"mapbox-xxxx"`对象中，但是并不知道该对象是什么  
    api文档中并没有出现对瓦片数据源的操作方法  
  
- **api**  
  有以下内容的api  
  GeoJSON、图片、视频、canvas  

  - canvas  

    - canvas数据源的`canvas`参数可以传入dom id也可以传入未插入文档的dom  

    - 可以监听canvas进行实时更新  
      方法有2种：
      - `animate`配置项  
        true开启，默认值未测
      - `play`与`pause`方法  
        可以开启或关闭监听  
        经过测试数据量小时更新canvas可以用开启后立刻关闭的方法，但是数据量大的时候基本不可用，数据量大的时候需要把关闭方法放进`requestAnimationFrame`里
    - coordinates输入四个坐标（从左上角起，顺时针）  
      <span style='opacity: 0.5'>canvas应该是对图片的扩展（因为canvas描述里有一句话“Extends ImageSource”）</span>  
      coordinates的4个坐标不能一致
  - geojson  
    - `data`属性可以写geojson文件所在的地址
    - 比普通geojson多的东西  
      feature可以有`id`属性
    - `feature`的位置写了几何体的话不会报错，但是地图上也不会出现东西  
  
- **聚类**  
  应该只能用于GeoJSON数据源  
  可以通过数据源的配置项和数据源的方法来控制  
  配置项查阅[样式规范](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#geojson-cluster)、方法查阅api文档
  
- mapbox提供的数据源，用户自建图层也可以用  
  例子如下：  
  
  ```js
  
      mapboxgl.accessToken = token
      window.map = new mapboxgl.Map({
          container: 'map',
          center: [119.2861, 26.0709],
          zoom: 18, 
          style: 'mapbox://styles/mapbox/satellite-v9', // 只有卫星图 
      }); 
      map.on("load", function (e) {
          mapLoadComplete()
      })
  
      function mapLoadComplete() {
        window.satelliteLayer=map.getLayer('satellite')
        map.setLayoutProperty("satellite", 'visibility', false?'visible':'none') 
  map.on('click',function(){
    console.log('click')
    drawRasterLayer_useMapboxSource(map)
  })
  
  
      }
  
      function drawRasterLayer_useMapboxSource(map){
        
        map.addLayer({
            'id': 'drawRasterLayer_useMapboxSource',
            'type': 'raster',
            source: "mapbox", 
        })
      }
  ```
  
  

非重点内容

- 找到地图用的所有数据源  
  `map.style.sourceCaches.map(x=>x._source)`  
  <span style='opacity: 0.5'>官网对此并没有描述，暂时也没找到其他方法</span>



### 状态

（geojson以外的数据源并没有测试过）

描述：可以标记feature的状态，

功能：可以根据状态响应样式，或者给其他程序读取状态

目前已知状态的方法有：setFeatureState、getFeatureState、removeFeatureState





# 事件



- api
  - 给地图增加事件  
    `map.on(事件名,回调)`
  - 给图层增加事件  
    `map.on(事件名,图层id,回调)`
- api里的回调  
  - 回调的`this`会变成map（只测试了地图事件）
  - 回调的形参  
    也就是事件对象（代码里通常命名为`e`）
    - `features`  
      包含鼠标触碰到的所有`feature`  
      这个属性会在回调同步执行完毕后被移除  
      （[官网](https://www.mapbox.cn/mapbox-gl-js/api/#mapmouseevent)没有提到这个属性，不过在多个例子里使用了）



**事件列表**

[官网](https://docs.mapbox.com/mapbox-gl-js/api/events/)没有提到图层的事件列表，图层的事件可能和Map是一致的

- [`Map`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-events)  
  - style.load事件  
    官网没找到相关信息，不过可以使用  
    早于load事件触发  
    为鑫说这是样式加载的事件
- [`Marker`](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker-events)
- [`Popup`](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup-events)
- [`GeolocationControl`](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol-events)



# [图层](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/)



### 自定义图层

**裁剪空间坐标**

整个自定义图层覆盖整个地图，左上角是00，右下角是11

xy轴方向与canvas一致

下面这个方法可以得到裁剪空间坐标

```js
mapboxgl.MercatorCoordinate.fromLngLat({
  lng: 30.498,
  lat: 50.541
})
```





### 批量绘制文本

用symbol图层接收单点geojson数据源，然后使用类似下面的`layout`  

- 关于避让  



### symbol图层

目前只接收过单点geojson数据源

可以绘制文本、图标，一个图层同时展示文本和图标也是可以的



下面是一个layout的示例

```javascript
{
  "icon-allow-overlap": true, // 内部是否开启避让效果
  "symbol-placement": "line", // 默认point。point就是普通的展示方式（不沿线），线数据也可以用，不过线数据出来的文字只会出现在第一个点上。line代表沿着线画文本（geojson的单线、多线及Polygon数据都可以）。line-center的效果感觉和line比较相似但又说不出区别，就是不能用于多边形（虽然官网说“只能用于单线和多边形”）
  'text-radial-offset':0.8,//文本要远离中心点多远进行展示（不带图标时还没用过该配置）（不加text-variable-anchor的话是没效果的）
  'text-variable-anchor': ['top', 'bottom', 'left', 'right'], // 允许展示文本的方向
  "text-ignore-placement": false, // 设置为 true 时，其他注记即使碰撞到此文本标注也会显示。
  'text-field': '{name}', // name处写的是数据源properties的一个属性名，也可以直接写一个字符串或表达式。值可以包含中文却不能包含数字，含数字的话整个图层不会显示并且会红色报错“GET https://api.mapbox.com/fonts/v1/mapbox/arial/0-255.pbf?access_token=pk.eyJ1IjoiaWRvbnRkcml2ZSIsImEiOiJjazAyM3RhbGUwOW1hM21tZXMxYjhpbndnIn0.YyfL9JQcV11Y3Kv-KvTD6Q 404 (Not Found)”，为鑫说是字体原因，可是换了arial也还是不行。不过sjdt是可以包含数字的。官方对这个属性并没有进行什么说明，官方对`'{name}'`这种写法也没有什么说明
  'text-size': 18, // 可以用表达式，返回结果是数字就行，单位是像素
  'text-anchor': 'center', // 文本锚点位置
  'text-allow-overlap': false, // 设置为 true 时，文本标注即使碰撞到其他绘制的注记也会显示。
  'text-max-width': 8, // 文本换行的最大宽度。（在沿线画文本时无效）
  'text-padding': 18, // 文本框四周的额外空间，用以检测注记碰撞。（在沿线画文本时有效，但是数值跨度要大一点）
  "text-font": ['Microsoft YaHei Regular'],
  'text-justify': 'auto', // 多行文本的对其方式。默认值是'center'
}
```



下面是用`paint`来修改样式的例子

```javascript
{
  'text-color': "#000000",
  'text-halo-color': "#ffffff", // 文字描边颜色
  'text-halo-width': 1.88, // 文字描边宽度
}
```





- 改变图片颜色  
  2021.3.10做了了解，只能改变一个格式的图片的颜色（好像叫swt）





### raster图层

- 似乎自身指定不了形状（形状只能由数据源指定）  
- 似乎形状只能是四边形
- mapbox的raster图层是用2个三角形表达一个四边形的，两个三角形坐标系是不同的  
  因此在图层区域不是平行四边形时画面是不理想的，中间能看到明显界限



### 图层数组

就是`map.getStyle().layers`  
数组中越靠后的图层显示得越靠前

- `map.moveLayer(第一个id,第二个id)`  
  - 不加第二个id的话  
    在数组中 移动到最后一项  
    在视图中 移动到最前面  
  - 加的话  
    在数组中 把第一个图层移动到第二个图层的前面  
    在视图中 把第一个图层移动到第二个图层的后面  



###  其他

- 多边形图层在面对复杂形状时，绘制表现并不好





# 表达式

**前置名词定义**

- 表达式运算符  
  官网用词是：expression operator  
  中文名是百度翻译来的  
  类似于js的函数名

`[表达式运算符, 表达式运算符的第一个参数, 表达式运算符的第二个参数, ...]`

**操作**

- 可嵌套  
  表达式运算符的参数还可以是一个表达式

**部分功能**

- 获取数据源properties的属性  
  `['get', 属性名]`  
  
- js三元表达式的功能   

  ```js
  ['case',
    ['get', 属性名],
    '属性值为`true`的话返回这个值', 
    '属性值为`false`的话返回这个值',
  ]
  ```

- 拼接字符串  
  `['concat','字符串A','字符串B','字符串C',]`  
  可拼接的字符串的数量没有限制

**学习资料**

[官方教程](https://docs.mapbox.com/help/tutorials/mapbox-gl-js-expressions/)和[官方文档](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/)







# 未归类

- 核心在图层，图层还待详细了解

- 似乎可以在一个页面开启多个mapbox的canvas（开图多次）  
  想法基于[博客](https://www.cnblogs.com/lilei2blog/p/8961564.html)
  
- `queryRenderedFeatures`  
  查询范围内可见要素，返回它们的一些信息  
  可以查单点也可以查矩形，可以加其他的限定条件  
  对raster图层无效
  
- 地图里的画面，画在墨卡托上都是等边梯形

- 可以用json文件配置地图样式

- **绑定元素位置方法**  

  ```javascript
  var popup = new mapboxgl.Popup({ closeOnClick: false })
  .setLngLat([-96, 37.8])
  .setHTML('<h1>Hello World!</h1>')
  .addTo(map);
  ```

- 倾斜是以穿过画面中心点的水平线为基准进行的  
  就是说这条“基准线”的墨卡托长度不会因为倾斜地图而变化（测试代码得到的结果在小数点后第六位开始有变化，mapbox原生经纬度最后几位也有偏差）
  
- **显隐图层**  
  `map.setLayoutProperty(图层id, 'visibility', 是否显示?'visible':'none');`
  
- 数据源可以用任意值作为id，图层只能用字符串作id

- **编译**  

  - `yarn run build-prod-min`生成`mapbox-gl.js`及其map文件
  - `yarn run build-dev`生成`mapbox-gl-dev.js`

- 找到所有图层  
  `map.getStyle().layer`  
（2021.5.17 测试结果是`map.getStyle().layers`）
  
- 找到所有数据源  
  `map.getStyle().sources`
  
- 使用栅格图  
  应该是要先`map.addImage`才能使用canvas以外的栅格图

  > 图片文件必须为png，webp或jpg格式 —— [loadImage](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#loadimage)

  ```js
  map.loadImage('http://placekitten.com/50/50', function(error, image) {
    if (error) throw error;
    map.addImage('kitten', image);
  });
  ```

  `map.addImage`还可以接收其他格式的图像，比如ImageData，[这是一个ImageData的例子](https://docs.mapbox.com/mapbox-gl-js/example/add-image-generated/)













# 记录

- 源码可以跑了，但是当前`yarn install` 时有报错（下方记录可能会多一些换行）  
报错里似乎有说明原因：Chromium下载失败
  
    ```
    error D:\learning_materials\map_box\Mapbox_GL_JS\open_source_repositories\mapbox-gl-js-master2020.4.22\node_modules\puppeteer: Command failed.
    Exit code: 1
    Command: node install.js
    Arguments:
    Directory: D:\learning_materials\map_box\Mapbox_GL_JS\open_source_repositories\mapbox-gl-js-master2020.4.22\node_modules
    \puppeteer
    Output:
    ERROR: Failed to download Chromium r686378! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.
    { Error: read ECONNRESET
        at TLSWrap.onStreamRead (internal/stream_base_commons.js:111:27)
      -- ASYNC --
        at BrowserFetcher.<anonymous> (D:\learning_materials\map_box\Mapbox_GL_JS\open_source_repositories\mapbox-gl-js-mast
    er2020.4.22\node_modules\puppeteer\lib\helper.js:111:15)
        at Object.<anonymous> (D:\learning_materials\map_box\Mapbox_GL_JS\open_source_repositories\mapbox-gl-js-master2020.4
    .22\node_modules\puppeteer\install.js:64:16)
        at Module._compile (internal/modules/cjs/loader.js:778:30)
        at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
        at Module.load (internal/modules/cjs/loader.js:653:32)
        at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
        at Function.Module._load (internal/modules/cjs/loader.js:585:3)
        at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    ```

- `yarn run build-prod-min`时有提示（下方记录可能会多一些换行）  

  ```
  $ rollup -c --environment BUILD:production,MINIFY:true
  
  src/index.js, src/source/worker.js → rollup/build/mapboxgl...
  (!) Circular dependencies
  src\util\ajax.js -> src\util\mapbox.js -> src\util\ajax.js
  src\style-spec\expression\parsing_context.js -> src\style-spec\expression\compound_expression.js -> src\style-spec\expre
  ssion\parsing_context.js
  src\style-spec\validate\validate.js -> src\style-spec\validate\validate_function.js -> src\style-spec\validate\validate.
  js
  ...and 10 more
  ```

- 有时候一个url既可以给`map.setStyle`用又可以给`raster`数据源用  
  环境：

  - 二开框架切换地图样式功能
  - sjdt
  - url：`"aegis://aegis.Satellite512"`

- 有时候`raster`数据源url的`.json`可以去掉也可以加上  
  环境：

  - 二开框架切换地图样式功能
  - sjdt
  - url：`"aegis://aegis.HillShade.json"`

