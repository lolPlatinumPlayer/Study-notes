- 可以吸纳以下笔记  
  `电气符号库\笔记\相关技术.md`



# 对mapbox的理解

- 产品定位  
  一个致力于拓扑分析的地图，并拥有一些拓扑分析以外的功能
- api理解  
  几乎所有内容都由一个称为『style』的配置对象控制  
  各种api就是用来更改style（或其中的一部分）的
  - 不由style控制的东西  
    - marker  
      删除图层只能调用map的方法删除，而删除marker只能通过调用marker的方法删除
  



# 收费

- [一个价格表页面](https://www.mapbox.com/pricing)  
  基本都有免费额度

  - [使用Mapbox GL JS本身的收费依据](https://docs.mapbox.com/mapbox-gl-js/guides/pricing/?utm_source=mapboxcom&utm_medium=pricing)  
    Mapbox GL JS v1.xx：实例化`Map`并请求mapbox的地图切片  
    Mapbox GL JS v2.xx：实例化`Map`

  - Mapbox GL JS似乎可以免除地图服务的收费  
    依据是[管理Static Tiles API费用](https://docs.mapbox.com/api/maps/static-tiles/#manage-static-tiles-api-costs)中说的“建议过渡到 Mapbox GL JS，它按地图加载而不是API请求计费”

    



# [服务](https://docs.mapbox.com/api/overview/)





# 地图

通过实例化`mapboxgl.Map`来初始化地图  
`mapboxgl.Map`实例就是地图



### 镜头



**移动镜头**

- [`jumpTo`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#jumpto)  
  瞬间将镜头参数瞬间改成输入值
- **easeTo**  
  直线缓动成输入值
- **flyTo**  
  镜头切换过程是缓动的，且有一个跳离地面的效果  
  `flyTo`是最灵活的改变镜头方法，比`easeTo`还多了如`curve`、`minZoom`等配置项
- **stop**  
  停止缓动动画



**设置初始镜头**

这些内容如果在实例化地图时没有传入，那就会去『地图样式』中进行查找  
『地图样式』中没有的话默认就是`0`

- bearing  
  是逆时针旋转地图的角度（在不倾斜地图的情况下也是顺时针转镜头的角度）
- pitch  
  地图倾斜角度
- zoom  
  地图放大的等级  
  （zoom越大，地图也越大）
- 禁止倾斜  
  pitchWithRotate设为false
- 禁止缩放  
  scrollZoom设为false
- 禁止通过鼠标拖拽来倾斜或旋转  
  dragRotate设为false  
  （用双指操作还是可以的）
- 禁止双指缩放和旋转  
  touchZoomRotate设为false  
  （可以倾斜）
- 禁止倾斜  
  maxPitch设为0
- 禁止旋转  
  [`map.touchZoomRotate.disable()`](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#touchzoomrotatehandler#disable)  
  （没有配置可以单独禁止旋转）
- 没有设置zoom步长的地方  
  （解释什么是步长：比如限制zoom只能是整数就要把步长设为1）



**获得镜头信息**

- map.getCenter()
- map.getZoom()
- map.getPitch()
- map.getBearing()
- [`map.getBounds()`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#getbounds)



**判断镜头状态**

- 判断是否正在缩放  
  [`map.isZooming()`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#iszooming)
- 判断是否正在移动  
  [`map.isMoving()`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#ismoving)  
  - mapbox认为缩放、旋转也是移动
- 判断是否正在旋转  
  [`map.isRotating()`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#isrotating)
- 判断是否在用框选来缩放  
  [`map.boxZoom.isActive()`](https://docs.mapbox.com/mapbox-gl-js/api/handlers/#boxzoomhandler#isactive)  
  （未测试）
- 还有其他方法暂未记录，不过可以看↖页面了解一部分





**其他**

- 设置镜头可移动区域  
  [`map.setMaxBounds()`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#setmaxbounds)
- 获得镜头可移动区域  
  [`map.getMaxBounds()`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#getmaxbounds)





### 设置地图样式



##### `options.style`

去[官网](https://www.mapbox.cn/mapbox-gl-js/api/#map)里搜索“options.style”查看  
可以是一个json或一个指向json的url

- json  
  官方内容见[这里](https://docs.mapbox.com/mapbox-gl-js/style-spec/)（注意点点左侧的内容）

  - 例子  
    （lat:42,lng: -76,zoom:5.5的一个图片）
    
    ```js
    const mapStyle = {
      'version': 8,
      'name': 'Dark',
      'sources': {
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
    
    - [`sprite`配置](https://docs.mapbox.com/mapbox-gl-js/style-spec/sprite/)  
    
      > 这个url模板将用来加载图标所需的2个sprite文件
    
      2个sprite文件指是一个[雪碧图](https://docs.mapbox.com/mapbox-gl-js/style-spec/sprite/#image-file)和一个[携带各图标信息<span style='opacity:.5'>（尺寸坐标缩放）</span>的json](https://docs.mapbox.com/mapbox-gl-js/style-spec/sprite/#index-file)  
      图层没用雪碧图的话可以不配
    
    - [`glyphs`配置](https://docs.mapbox.com/mapbox-gl-js/style-spec/glyphs/)  
      文字相关的  
      如果没用到文字图层的话可以不配
  
- url

  - 官方预定义的url  
    <span style='opacity:.5'>（这里只列出一部分）</span>
    
    - 卫星图  
      mapbox://styles/mapbox/satellite-v9
    - 卫星图+路网  
      mapbox://styles/mapbox/satellite-streets-v10
    - 普通亮色地图  
      mapbox://styles/mapbox/streets-v11
    - 更多内容见官网
    
    官方预定义的url里也都是用（用户可用）的source+layer的方式绘制的



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



##### 底图

- 不使用底图的方法  

  - 一个可行的方法  
    把style配置项设为如下值  

    ```js
    style:{
      sources:{},
      layers:[],
      version:8,
    },
    ```

    （不用底图就不需要`accessToken`了）

- 从`style: 'mapbox://styles/mapbox/streets-v11'`里扒出来的一个不用url的例子（只加了4个图层，所以是不完整的）  

  ```js
  style:{
    glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    sprite: "mapbox://sprites/mapbox/streets-v11",
    layers:[
      {"id":"landcover","type":"fill","source":"composite","source-layer":"landcover","metadata":{},"maxzoom":7,"paint":{"fill-color":["match",["get","class"],"snow","hsl(0, 0%, 100%)","hsl(75, 62%, 81%)"],"fill-opacity":["interpolate",["exponential",1.5],["zoom"],2,0.3,7,0],"fill-antialias":false}},
      {"id":"national-park","type":"fill","source":"composite","source-layer":"landuse_overlay","metadata":{},"minzoom":5,"filter":["==",["get","class"],"national_park"],"paint":{"fill-color":"hsl(100, 58%, 76%)","fill-opacity":["interpolate",["linear"],["zoom"],5,0,6,0.5,10,0.5]}},
      {"id":"road-street","type":"line","source":"composite","source-layer":"road","metadata":{"mapbox:group":"1444855786460.0557"},"minzoom":11,"filter":["all",["match",["get","class"],["street","street_limited","primary_link"],true,false],["match",["get","structure"],["none","ford"],true,false],["==",["geometry-type"],"LineString"]],"layout":{"line-cap":"round","line-join":"round"},"paint":{"line-width":["interpolate",["exponential",1.5],["zoom"],12,0.5,14,2,18,18],"line-color":["match",["get","class"],"street_limited","hsl(35, 14%, 93%)","hsl(0, 0%, 100%)"],"line-opacity":["step",["zoom"],0,14,1]}},
      {"id":"road-label","type":"symbol","source":"composite","source-layer":"road","metadata":{},"minzoom":10,"filter":["step",["zoom"],["match",["get","class"],["motorway","trunk","primary","secondary","tertiary"],true,false],12,["match",["get","class"],["motorway","trunk","primary","secondary","tertiary","pedestrian","street","street_limited"],true,false],15,["match",["get","class"],"golf",false,true]],"layout":{"text-size":["interpolate",["linear"],["zoom"],10,["match",["get","class"],["motorway","trunk","primary","secondary","tertiary"],10,["motorway_link","trunk_link","primary_link","secondary_link","tertiary_link","pedestrian","street","street_limited"],9,6.5],18,["match",["get","class"],["motorway","trunk","primary","secondary","tertiary"],16,["motorway_link","trunk_link","primary_link","secondary_link","tertiary_link","pedestrian","street","street_limited"],14,13]],"text-max-angle":30,"text-font":["DIN Offc Pro Regular","Arial Unicode MS Regular"],"symbol-placement":"line","text-padding":1,"text-rotation-alignment":"map","text-pitch-alignment":"viewport","text-field":["coalesce",["get","name_en"],["get","name"]],"text-letter-spacing":0.01},"paint":{"text-color":["match",["get","class"],"ferry","hsl(230, 48%, 44%)","hsl(0, 0%, 0%)"],"text-halo-color":["match",["get","class"],["motorway","trunk"],"hsla(0, 0%, 100%, 0.75)","ferry","hsl(196, 80%, 70%)","hsl(0, 0%, 100%)"],"text-halo-width":1,"text-halo-blur":1}},
    ],
    sources:{
      "composite":{
        "type":"vector",
        // "url":"mapbox://mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2", // 这个demo里url和tiles可以互相替代
        tiles: [
          "https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiZmpocnQiLCJhIjoiY2twNjludGJ4MXdndjJxcHF6OG4xNG8wNSJ9.uQgEAC3O1SEzfGCG4LCtRg",
          "https://b.tiles.mapbox.com/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiZmpocnQiLCJhIjoiY2twNjludGJ4MXdndjJxcHF6OG4xNG8wNSJ9.uQgEAC3O1SEzfGCG4LCtRg"
        ],
      },
    },
    version: 8,
  },
  ```

- 语言  
  默认英语  
  目前发现了2个更改语言的资料入口：[官网](https://docs.mapbox.com/help/troubleshooting/change-language/)、[官方插件](https://github.com/mapbox/mapbox-gl-language)

- 一些mapbox底图的实现方式  
  用[图层](#图层)实现的  
  这些图层的数据源要么是`undefined`要么是同一个`vector`[数据源](#数据源)  
  数据源背后使用的数据：

  - mapbox应该是pbf文件

  - epgis应该是sg文件

  目前还没有找到在web中把这些数据转成geojson等可读性数据的方法




# 数据源

有很多内容，这里只写一部分，详细信息查阅[样式规范](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/)及[api文档](https://www.mapbox.cn/mapbox-gl-js/api/#sources)  
可以用于图层，也可以用于地图  
有7种类型： vector、raster、 raster-dem、GeoJSON、图片、视频（[样式规范](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/)写了前6种，实际上还有第七种：[canvas](https://docs.mapbox.com/mapbox-gl-js/api/sources/#canvassource)）  
使用方式有很多种

- 设置与使用数据源  
  有2种方法：先设置后使用、与直接在新建图层时用字面量写数据源  
  （推荐先设置后使用）

  - 先设置后使用

    - [设置数据源](https://www.mapbox.cn/mapbox-gl-js/api/#map#addsource)  

      ```js
      map.addSource(数据源名称, {
        'type': 'geojson',
        'data':geojson数据,
      });
      ```

      要在map的load事件后使用

      - 数据源名称可以是任意值（官网写着是字符串，但是实际上可以是任意值）

    - 使用数据源  
  
      ```js
      map.addLayer({
        "id": "power-line",
        "type": "line",
        "source": 数据源名称,
        "layout": {},
        "paint": {}
      })
      ```
  
  - 用字面量写  
    （这里就不赘述了）
  
- [删除数据源](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#removesource)
  
- **瓦片**  

  - [使用瓦片的方法](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#tiled-sources)  
    👆说了3种：1️⃣使用TileJSON的配置2️⃣写一个TileJSON配置文件的地址3️⃣在url里输入`{bbox-epsg-3857}`的方法  
  
    - [TileJSON规范](https://github.com/mapbox/tilejson-spec)（里边会给出具体说每个配置的页面，比如[3.0.0](https://github.com/mapbox/tilejson-spec/tree/master/3.0.0)）
  
  - **raster数据源**可以用瓦片  
    [raster数据源完整配置项](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#raster)
  
    - 默认情况下在移动端会模糊  
  
      - 一个改善的方法  
        缩小数据源的[`tileSize`](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#raster-tileSize)配置<span style='opacity:.5'>（地图库是设置为128）</span>  
        （缩小后不能增加指定面积的瓦片像素密度，但是可以缩小瓦片，最终缓解模糊问题）
  
    - 希望同时从多个url加载瓦片的话就在`tiles`数组里写多个url
  
    - 一个`source`属性值示例  
  
      ```js
      {
        type: "raster",
        url: "aegis://aegis.HillShade", // 这个url是sjdt的，换成mapbox应该也一样
        tileSize: 512
      }
      ```
  
    - 天地图的示例  
  
      ```js
      style: {
        "sources": {
          "baseImg": {
            "type": "raster",
            'tiles': [
              "http://t0.tianditu.com/vec_w/wmts?tk=" + mapImgServerAccessToken + "&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles"
            ],
            'tileSize': 256,
          },
          "baseMark": {
            "type": "raster",
            'tiles': [
              "http://t0.tianditu.com/cva_w/wmts?tk=" + mapImgServerAccessToken + "&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles"
            ],
            'tileSize': 256,
          }
        },
        "layers": [
          {
            "id": "baseImg",
            "type": "raster",
            "source": "baseImg",
            "minzoom": 0,
            "maxzoom": 17
          },
          {
            "id": "baseMark",
            "type": "raster",
            "source": "baseMark",
            "minzoom": 0,
            "maxzoom": 17
          },
        ],
        version: 8,
      },
      maxZoom: 16.7, // 再大就算请求了天地图，也是返回空白图片
      pitchWithRotate:false,
      dragRotate:false,
      maxPitch:0,
      ```
  
    - OSM的示例  
      ```js
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            'tileSize':256,
          }
        },
        layers: [{
          id: 'osm',
          type: 'raster',
          source: 'osm',
        }],
      },
      maxZoom:16,
      pitchWithRotate:false,
      dragRotate:false,
      maxPitch:0,
      ```
  
  - [矢量瓦片](https://docs.mapbox.com/mapbox-gl-js/api/sources/#vectortilesource)  
    若要进一步学习，最好以『获取“更多类型”的矢量瓦片数据源』为目标（虽然官网有很多矢量瓦片相关的页面，但是很多都看不懂，因此没收集进笔记。可以通过使用mapbox工具定义数据源或使用其他厂家的数据源为入口学习，使用过程中深入各种配置应该就能了解到背后的相关知识）
  
    - [mapbox官网](https://docs.mapbox.com/vector-tiles/reference/#open-standard)提到的[矢量瓦片提供商列表](https://github.com/mapbox/awesome-vector-tiles)
    - [mapbox官网](https://docs.mapbox.com/vector-tiles/reference/#open-standard)提到的[矢量瓦片规范](https://github.com/mapbox/vector-tile-spec)
    - [矢量瓦片服务](https://docs.mapbox.com/api/maps/vector-tiles/)
    - mvt文件  
      估计是mapbox vector tile
  
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

- 用户自建图层也可以用底图的数据源  
  例子如下：  

  ```js
  window.map = new mapboxgl.Map({
    accessToken : "必须要有",
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

功能：可以根据状态响应样式、或者给其他程序读取状态

目前已知状态的方法有：setFeatureState、getFeatureState、removeFeatureState

- `setFeatureState`  
  1.2.0版本id只能为数字



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
    不同事件的形参不一样的，比如zoom的就是返回map本身
    - `features`  
      包含鼠标触碰到的所有`feature`  
      这个属性会在回调同步执行完毕后被移除  
      （[官网](https://www.mapbox.cn/mapbox-gl-js/api/#mapmouseevent)没有提到这个属性，不过在多个例子里使用了）  
      （2022.01.11实验好像没效果）



**事件列表**

[官网](https://docs.mapbox.com/mapbox-gl-js/api/events/)没有提到图层的事件列表，图层的事件可能和Map是一致的

- [`Map`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-events)  
  
  - [load事件](https://docs.mapbox.com/mapbox-gl-js/api/map/#map.event:load)  
  
    > 只会触发一次 —— 官网
  
  - style.load事件  
    官方文档没有说明，不过[官方demo](https://docs.mapbox.com/mapbox-gl-js/example/add-3d-model/)有使用  
    
    - 早于load事件触发  
    - 为鑫说这是样式加载的事件
    
  - 镜头
  
    - move类事件包含zoom类事件
    - 用jumpTo这种瞬移方法也会触发zoomstart和zoomend
  
- [`Marker`](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker-events)

- [`Popup`](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup-events)

- [`GeolocationControl`](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol-events)



# [图层](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/)

- [必须有一个字符串id](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#id)
  
- 无法调整高度（垂直方向的位置）  
  （起码目前没找着调整的方法）

- 依据状态响应样式  
  demo  

  ```js
  'paint': {
    'fill-color':[
      'case',
      ['boolean', ['feature-state', 'isHighLight'], false],
      '#000',
      '#062a80'
    ]
  }
  ```

- [删除图层](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#removelayer)



### 自定义图层

**裁剪空间坐标**

整个自定义图层覆盖整个地图，左上角是00，右下角是11

xy轴方向与canvas一致

下面这个方法可以得到裁剪空间坐标

```js
mapboxgl.MercatorCoordinate.fromLngLat({
  lng: 30.498,
  lat: 50.541
},0/*这个0代表的是海拔*/)
```





### 批量绘制文本

用symbol图层接收单点geojson数据源，然后使用类似下面的`layout`  

- 关于避让  



### 线图层

- 模糊  
  - 在拐点过于密集时会出现锯齿  
    ![mapbox线模糊出现锯齿](https://img.wenhairu.com/images/2021/08/02/9h9Lp.png)  
    不知道调整[a](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-line-line-round-limit)或[b](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-line-line-miter-limit)或[c](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-line-line-join)或[d](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-line-line-cap)之后能不能解决



### 多边形图层

- 背景图  
  背景图会依据缩放自适应大小  
  目前还没找到固定背景图的方法
- 使用不符合规范的数据源  
  - 多边形的geojson如果首尾不重合的话也可以渲染  
    但是镜头拉近时可能会少一小块
- 面对复杂形状时，绘制表现并不好



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
  'text-field': '{name}', // name处写的是数据源properties的一个属性名，也可以直接写一个字符串或表达式。值可以包含中文却不能包含数字，含数字的话整个图层不会显示并且会红色报错“GET https://api.mapbox.com/fonts/v1/mapbox/arial/0-255.pbf?access_token=你mapbox的token 404 (Not Found)”，为鑫说是字体原因，可是换了arial也还是不行。不过sjdt是可以包含数字的。官方对这个属性并没有进行什么说明，官方对`'{name}'`这种写法也没有什么说明
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



### 挤压多边形图层

```js
map.addLayer({
  'id': 'room-extrusion',
  'type': 'fill-extrusion',
  'source': {
    'type': 'geojson',
    'data': mapAreaPolygon
  },
  'paint': {
    'fill-extrusion-color': 'blue',
    // 如果“底部高度”高于“顶部高度”的话，会出现类似“去顶盖”的效果
    // 2个高度都不能小于0
    'fill-extrusion-height': 300000, // 顶部高度
    // 'fill-extrusion-base': 500000, // 底部高度
    'fill-extrusion-opacity': 1,
    'fill-extrusion-translate': [0, 30], // [向右偏移量,向下偏移量]

    /* 
    默认 map
    - map
      相对于平面地图偏移
    - viewport  
      相对于（浏览器）窗口偏移
    */
    'fill-extrusion-translate-anchor': 'viewport',
  }
})
```





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



# 使用three



### [原threebox](https://github.com/peterqliu/threebox)  

已经被归档了（不维护了）

**特性**

- 没有全局的map对象就不能运行  
  （map对象指的是mapbox地图实例）
- 经纬度转three坐标（THREE.Vector3实例）
  - 单个转  
    const 结果=tb.utils.projectToWorld([经度,纬度, 0])
  - 批量转  
    const [a结果,b结果]=tb.utils.lnglatsToWorld([[a经度,a纬度, 0],[b经度,b纬度, 0]])
- 会暴露出全局的THREE对象

**源码**

- `npm run dev`  
  在把package.json的dev-dependencies改为devDependencies后装node_modules可以正常运行（可能不改也可以）

- `npm run build`  
  目前有问题  
  【】读一下报错，如果还不能解决就去提issue

  - 直接跑的报错如下  

    ```cmd
    PS D:\learning_materials\canvas_app\mapbox_gl_js\code\threebox> yarn build
    yarn run v1.22.10
    warning package.json: Potential typo "dev-dependencies", did you mean "devDependencies"?
    $ browserify -g ./node_modules/uglifyify exports.js > dist/threebox.min.js
    SyntaxError: Unexpected token: name (static) while parsing file: D:\learning_materials\canvas_app\mapbox_gl_js\code\thre
    ebox\src\objects\objects.js
        at Z.get (D:\learning_materials\canvas_app\mapbox_gl_js\code\threebox\node_modules\terser\dist\bundle.min.js:1:463)
        at Readable.errorExit (D:\learning_materials\canvas_app\mapbox_gl_js\code\threebox\node_modules\browserify\bin\cmd.j
    s:79:27)
        at Readable.emit (events.js:314:20)
        at Labeled.<anonymous> (D:\learning_materials\canvas_app\mapbox_gl_js\code\threebox\node_modules\read-only-stream\in
    dex.js:28:44)
        at Labeled.emit (events.js:314:20)
        at Labeled.<anonymous> (D:\learning_materials\canvas_app\mapbox_gl_js\code\threebox\node_modules\stream-splicer\inde
    x.js:130:18)
        at Labeled.emit (events.js:314:20)
        at Deps.<anonymous> (D:\learning_materials\canvas_app\mapbox_gl_js\code\threebox\node_modules\stream-splicer\index.j
    s:130:18)
        at Deps.emit (events.js:314:20)
        at DuplexWrapper.<anonymous> (D:\learning_materials\canvas_app\mapbox_gl_js\code\threebox\node_modules\module-deps\i
    ndex.js:414:22)
    error Command failed with exit code 1.
    info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
    ```

  - 在把package.json的dev-dependencies改为devDependencies后装node_modules后跑的报错如下  

    ```cmd
    PS D:\learning_materials\canvas_app\mapbox_gl_js\code\threebox> yarn build
    yarn run v1.22.10
    warning package.json: "dependencies" has dependency "tape" with range "^4.10.1" that collides with a dependency in "devD
    ependencies" of the same name with version "^4.6.3"
    $ browserify -g ./node_modules/uglifyify exports.js > dist/threebox.min.js
    SyntaxError: Unexpected token: name (static) while parsing file: D:\learning_materials\canvas_app\mapbox_gl_js\code\thre
    ebox\src\objects\objects.js
        at Z.get (D:\learning_materials\canvas_app\mapbox_gl_js\code\threebox\node_modules\terser\dist\bundle.min.js:1:463)
        at Readable.errorExit (D:\learning_materials\canvas_app\mapbox_gl_js\code\threebox\node_modules\browserify\bin\cmd.j
    s:79:27)
        at Readable.emit (events.js:314:20)
        at Labeled.<anonymous> (D:\learning_materials\canvas_app\mapbox_gl_js\code\threebox\node_modules\read-only-stream\in
    dex.js:28:44)
        at Labeled.emit (events.js:314:20)
        at Labeled.<anonymous> (D:\learning_materials\canvas_app\mapbox_gl_js\code\threebox\node_modules\stream-splicer\inde
    x.js:130:18)
        at Labeled.emit (events.js:314:20)
        at Deps.<anonymous> (D:\learning_materials\canvas_app\mapbox_gl_js\code\threebox\node_modules\stream-splicer\index.j
    s:130:18)
        at Deps.emit (events.js:314:20)
        at DuplexWrapper.<anonymous> (D:\learning_materials\canvas_app\mapbox_gl_js\code\threebox\node_modules\module-deps\i
    ndex.js:414:22)
    error Command failed with exit code 1.
    info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
    ```



### [后继者做的threebox](https://github.com/jscastro76/threebox)



# 未归类

- 似乎可以在一个页面开启多个mapbox的canvas（开图多次）  
  想法基于[博客](https://www.cnblogs.com/lilei2blog/p/8961564.html)

- `queryRenderedFeatures`  
  查询范围内可见要素，返回它们的一些信息  
  可以查单点也可以查矩形，可以加其他的限定条件  
  对raster图层无效

- 地图里的画面，画在墨卡托上都是等边梯形

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

- 去除版权信息  
  （[官方](https://docs.mapbox.com/help/getting-started/attribution/)有提到大部分情况要保留版权信息）
  - 右下角文本  
    把数据源的[`attribution`](https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#vector-attribution)配置设为空串  
    （即使使用url也可以去掉）
  - 左下角的logo  
    把数据源的`mapbox_logo`配置设为`false`  
    （即使使用url也可以去掉）



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

