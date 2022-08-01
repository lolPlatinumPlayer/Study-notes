# GIS

地理信息系统（Geographic Information System或 Geo－Information system）



# 高程与海拔

- 两者单位相同，并且都用来描述垂直距离  
- 高程有很多种，可以以不同高度为起点  
  而海拔都是以海平面为起点的
- 『黄海高程系统』中海拔与『绝对高程』相等



# 地理编码与反向地理编码

- **地理编码**  
  通过地名或地址信息转换为地球上的位置（坐标）
- **反向地理编码**（[天地图](http://lbs.tianditu.gov.cn/server/geocoding.html)称为逆地理编码）  
  上一条反过来



# 坐标系

（有的资料叫坐标系有的资料叫坐标系统，其实都是一个东西）

- 中国坐标加密  
  也就是GCJ-02坐标系（火星坐标系）
  
  - > 测绘地图后要加密后才可以出版和发布；所有汽车导航都要加入保密算法将COM口读出来的真实坐标进行转换，这样才可以和电子地图进行匹配  —— [火星坐标系统 词条](https://baike.baidu.com/item/%E7%81%AB%E6%98%9F%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F/6734069?fr=aladdin)
  
  - [百度](https://lbsyun.baidu.com/index.php?title=coordinate)和[高德](https://lbs.amap.com/api/webservice/guide/api/convert/)会基于GCJ-02进行二次加密
  
- WGS84  
  GPS是基于WGS84的  
  （全称似乎是：WGS 1984）



### EPSG

> WGS84 是目前最流行的地理坐标系统。在国际上，每个坐标系统都会被分配一个 [EPSG](https://epsg.io/) 代码，EPSG:4326 就是基于 WGS84 的 —— https://www.cnblogs.com/E7868A/p/11460865.html

EPSG:3857也是基于WGS84的



### 平面投影

目前见过的只有2种：高斯-克吕格(Gauss-Krüger)投影 和 墨卡托(Mercator)投影

> 高斯-克吕格投影也被称为[横轴墨卡托投影](https://pro.arcgis.com/zh-cn/pro-app/2.8/help/mapping/properties/transverse-mercator.htm)的椭圆体版本 —— [ArcGIS Pro](https://pro.arcgis.com/zh-cn/pro-app/2.8/help/mapping/properties/gauss-kruger.htm)

- 高斯-克吕格 和 墨卡托 的坐标并不是相近的【】从工信一张图那里补充点细节过来



# [GeoJSON](https://geojson.org/)

- 图层  
  在ol、leaflet、mapbox里一份GeoJSON都是对应一个图层（cz里也可以依据GeoJSON渲染，但是渲染出的东西应该不叫图层）
- 要素（应该是叫要素）  
  对应GeoJSON里的feature
- 几何图形  
  一个feature可以对应任意数量的要素  
  比如点，就有单点类型和多点类型的feature，这个情况在线、面里也是一样的  
  甚至一个要素可以包含不同类型的几何图形（[GeometryCollection](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.8)类型的feature就可以）



# 底图服务标准

<span style='opacity:.5'>（搭建服务的方法见其他笔记）</span>

- > 具体使用方法请参考OGC WMTS标准 中GetCapabilities 和GetTile —— [天地图](http://lbs.tianditu.gov.cn/server/MapService.html)

- [WMS（Web Map Service）](https://www.ogc.org/standards/wms)  
  Web 地图服务  
  OGC开发的标准协议<span style='opacity:.5'>（1999年）</span>
  - [支持WMS的相关产品](https://en.wikipedia.org/wiki/Web_Map_Service#Software)  
- [WMTS（Web Map Tile Service）](https://www.ogc.org/standards/wmts)  
  Web地图瓦片服务  
  OGC开发的标准协议<span style='opacity:.5'>（2010年）</span>
  - 比WMS性能更强



# 其他名词

- [CRS](https://en.wikipedia.org/wiki/Spatial_reference_system)  
  coordinate reference system的缩写和SRS是同一个意思
- WKT（Well-known text）  
  有2个WKT，它们的写法甚至有点类似
  - WKT-CRS  
    - [维基百科](https://en.wikipedia.org/wiki/Well-known_text_representation_of_coordinate_reference_systems)  
    - [OGC主页](https://www.ogc.org/standards/wkt-crs)
  - [用来表示几何图形的WKT](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry)  
    这种WKT的二进制版本叫WKB（而WKT-CRS似乎没有WKB）
- [倾斜摄影](https://baike.baidu.com/item/%E5%80%BE%E6%96%9C%E6%91%84%E5%BD%B1)  
  通过飞行器建立真实世界三维模型的技术  
  其中一种格式叫OSGB



# 其他

- [查看行政区划代码](http://www.mca.gov.cn/article/sj/xzqh/1980/)
- shp文件  
  - 一般会有多个附属文件  
    比如：`.lock`、`.shx`、`.sbx`、`.sbn`、`.prj`、`.dbf`
