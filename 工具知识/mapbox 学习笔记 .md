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

## 未归类

- 核心在图层，图层还待详细了解

- 似乎可以在一个页面开启多个mapbox的canvas（开图多次）  
  想法基于[博客](https://www.cnblogs.com/lilei2blog/p/8961564.html)
  
- `queryRenderedFeatures`  
  查询范围内可见要素，返回它们的一些信息  
  可以查单点也可以查矩形，可以加其他的限定条件  
  对raster图层无效
  
- 地图里的画面，画在墨卡托上都是等边梯形

- mapbox用梯形图层承载矩形canvas时画面分成两个三角形，两个三角形的内容都被扭曲，且扭曲方向不同，中间能看到明显界限

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

## 记录

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

  