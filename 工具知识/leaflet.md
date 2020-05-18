

### 类

这里的“类”是leaflet自己用js实现的  
详细内容看[官网](https://leafletjs.com/reference-1.6.0.html#class)

*leaflet里的类基本都有工厂方法。使用工厂方法可以比使用类少用一个`new`关键字，工厂方法名字就是类名的小写版*


### 初始化

`const map = L.map(div的id)`

### 增加底图

添加一个瓦片图层到地图上

```javascript
L.tileLayer(url模板, {
  id: 'mapbox.streets'
}).addTo(map);
```

第二个参数可能叫options（本笔记中就这么叫）

- url模板还是少改好，按照leaflet官网改mapbox的url会导致底图无法加载
- url模板中`{字符串}`字样似乎会被options中同名属性替换  
  比如`{accessToken}`就可以被`accessToken`属性值替换

### 一些添加物

- 标记：`var marker = L.marker([51.5, -0.09]).addTo(mymap)`

- 圆  

  ```javascript
  var circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
  }).addTo(mymap)
  ```

  

- 多边形  

  ```javascript
  var polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
  ]).addTo(mymap)
  ```

  

- 弹窗  

  ```javascript
  var popup = L.popup()
      .setLatLng([51.5, -0.09])
      .setContent("I am a standalone popup.")
      .openOn(mymap)
  ```

  

  - 点击指定物体进行弹窗：`其他添加物.bindPopup("弹窗文本")`

### 事件

`map.on('click', 函数)`  
还有很多内容，看[文档](https://leafletjs.com/reference-1.6.0.html#map-baselayerchange)（文档其他位子估计也有相关内容）