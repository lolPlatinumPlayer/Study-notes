# 地图

通过实例化`mapboxgl.Map`来初始化地图  
`mapboxgl.Map`实例就是地图

**地图方位的配置项**

这些内容如果在实例化地图时没有传入，那就会去『地图样式』中进行查找  
『地图样式』中没有的话默认就是0

- bearing  
  是逆时针旋转地图的角度（在不倾斜地图的情况下也是顺时针转镜头的角度）
- pitch  
  地图倾斜角度
- zoom  
  地图放大的等级  
  （zoom越大，地图也越大）

**改变地图样式**

- 改变后会清空地图上所有图层  
  `map.once('idle',fn)`的`fn`里加图层的话可以避免图层被清空





# 改变镜头

- **jumpTo**  
  瞬间将镜头参数瞬间改成输入值
- **easeTo**  
  直线缓动成输入值
- **flyTo**  
  镜头切换过程是缓动的，且有一个跳离地面的效果  
  `flyTo`是最灵活的改变镜头方法，比`easeTo`还多了如`curve`、`minZoom`等配置项
- **stop**  
  停止缓动动画



# 事件

有很多，比如单双击、鼠标移入移出、鼠标移动等  
应该都可以单独作用于图层（已经测过了双击和鼠标移动，这两个事件在说明里都没提到“图层”）  

- **写法**  
  `map.on`方法  
- **给地图增加事件**  
    `map.on(事件名,回调)`
- **给图层增加事件**  
    `map.on(事件名,图层id,回调)`
- **注意**  
    回调的`this`会变成map（只测试了地图事件）




# 数据源

有很多内容，这里只写一部分，详细信息查阅[规范](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/)及[api文档](https://www.mapbox.cn/mapbox-gl-js/api/#sources)  
可以用于图层，也可以用于地图  
有7种类型：矢量瓦片、栅格瓦片、 raster-dem、GeoJSON、图片、视频（官网写了前6种，实际上还有第七种：canvas）  
使用方式有很多种

- **瓦片**  
  目前看到都是出现在`"mapbox-xxxx"`对象中，但是并不知道该对象是什么  
  api文档中并没有出现对瓦片数据源的操作方法
- **api**  
  有以下内容的api  
  GeoJSON、图片、视频、canvas  
  - canvas  
  - 可以传入dom id也可以传入未插入文档的dom  
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
- **聚类**  
  应该只能用于GeoJSON数据源  
  可以通过数据源的配置项和数据源的方法来控制  
  配置项查阅规范、方法查阅api文档



# 图层

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

**运算符**

- get  
  可以获取数据源properties的属性  
  不太懂，也不懂和properties间的联系

**学习资料**

[官方教程](https://docs.mapbox.com/help/tutorials/mapbox-gl-js-expressions/)和[官方文档](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/)







# 例子

### 批量绘制文本

用symbol图层接收单点geojson数据源，然后使用类似下面的`layout`  

```javascript
{
  "symbol-placement": "line", // 默认point，point代表一个点一个文本，line代表沿着线画文本（geojson的单线、多线及Polygon数据都可以）
  "text-ignore-placement": false, // 设置为 true 时，其他注记即使碰撞到此文本标注也会显示。
  'text-field': '{name}', // name处写的是数据源properties的一个属性名，也可以直接写一个字符串或表达式，不能写数字
  'text-size': 18,
  'text-anchor': 'center', // 文本锚点位置
  'text-allow-overlap': false, // 设置为 true 时，文本标注即使碰撞到其他绘制的注记也会显示。
  'text-max-width': 8, // 文本换行的最大宽度。（在沿线画文本时无效）
  'text-padding': 18, // 文本框四周的额外空间，用以检测注记碰撞。（在沿线画文本时有效，但是数值跨度要大一点）
  "text-font": ['Microsoft YaHei Regular'],
}
```

可以辅助使用`paint`来修改样式，下面是一个例子  

```javascript
{
  'text-color': "#000000",
  'text-halo-color': "#ffffff", // 文字描边颜色
  'text-halo-width': 1.88, // 文字描边宽度
}
```







# 未归类

- 核心在图层，图层还待详细了解

- 似乎可以在一个页面开启多个mapbox的canvas（开图多次）  
  想法基于[博客](https://www.cnblogs.com/lilei2blog/p/8961564.html)
  
- `queryRenderedFeatures`  
  查询范围内可见要素，返回它们的一些信息  
  可以查单点也可以查矩形，可以加其他的限定条件  
  对raster图层无效
  
- 地图里的画面，画在墨卡托上都是等边梯形

- mapbox的raster图层是用2个三角形表达一个四边形的，两个三角形坐标系是不同的  
  因此在图层区域不时平行四边形时画面是不理想的，中间能看到明显界限

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

- 找到所有数据源  
  `map.getStyle().sources`



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

  

