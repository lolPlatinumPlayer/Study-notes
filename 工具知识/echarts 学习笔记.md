

# echarts5



- 图表内容是否靠两边  
  由[boundaryGap](https://echarts.apache.org/zh/option.html#xAxis.boundaryGap)控制

- 更换数据  
  代码从头走一遍即可（可以包含初始化代码，但是包含初始化代码的话控制台会报警告：`There is a chart instance already initialized on the dom`）  
  有过渡动效

  - 不一定更新正确  
    比如多serie就有可能出现更新不正确的情况  
    解决办法：setOption前线clear一下

- [开关图例的交互能力](https://echarts.apache.org/zh/option.html#legend.selectedMode)  

  - 开启：鼠标划过会高亮、点击图例可以选择显示的数据
  - 关闭：鼠标划过不会高亮、点击没有反应

  

### [按需加载](https://echarts.apache.org/zh/tutorial.html#%E5%9C%A8%E6%89%93%E5%8C%85%E7%8E%AF%E5%A2%83%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts)

挺简单的，看官网说明就行了

- 如果少引了东西  
  报错会告诉你要加什么代码  
  （如果没有告诉你要加什么代码，那少的应该是第三方的东西）
- `echarts.use`这个方法可以使用多次



### option

> 我们把传入 `setOption` 第一个参数的东西，称为 `ECOption`，然后称传统的 ECharts 单个 option 为 `ECUnitOption`。
>
> - 当 `timeline` 和 `media query` 没有被设置时，一个 `ECUnitOption` 就是一个 `ECOption`。
> - 当 `timeline` 或 `media query` 被使用设置时，一个 `ECOption` 由几个 `ECUnitOption` 组成。
>
> —— [《时间轴》](https://echarts.apache.org/zh/option.html#timeline)



### 坐标轴

- y轴的轴线默认是不显示的  
  [官网](https://echarts.apache.org/zh/option.html#yAxis.axisLine.show)默认显示的说法是错误的  
  如果对调2轴，则是x轴不显示（对调2轴指的是对调xAxis和yAxis的type）
- 可以随意搞多个坐标轴  
  比如这种写法:`yAxis[对象,对象]`  
  甚至可以是空对象  
  - 注意  
    第一个坐标轴里要有data  
    因为[提示框](https://echarts.apache.org/zh/option.html#tooltip)是依据第一个坐标轴的data显示的  
    （一次经验似乎第一个坐标轴没data也可以显示提示框）
  - 一次经验  
    min、max、interval都在第二个轴上加上才会出现双y轴



### [富文本标签](https://echarts.apache.org/zh/tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE)

<span style='opacity:.5'>（echarts4也有）</span>

由“内容”和“样式”这两个配置组成（在『饼图连接线标注』上“内容”就是[`label.formatter`](https://echarts.apache.org/zh/option.html#series-pie.label.formatter)而“样式”就是[`label.rich`](https://echarts.apache.org/zh/option.html#series-pie.label.rich)）  

**套路**就是：给文本加上样式  

```js
formatter: function(原值,序号){
  return  `{文本a的样式名|文本a}{文本b的样式名|文本b}`;
},
```

柱状图  
只有一个参数，是对象  
如果这个函数不返回内容，那就当作没有这个函数



```js
rich:{
  文本a的样式名:{ // 文本a的样式
    backgroundColor:'red'
  },
  文本b的样式名:{ // 文本b的样式
    align: 'left'
  }
}
```

**“内容”**

- formatter传入函数的话是大家通用的，就像上面“套路”里写的那样  
  就是原值会有区别，有的是字符串，有的是对象（series里是对象）
- 传入字符串的话，会复杂一些，不同地方的formatter是不一样的



**样式**

- padding  
  如果不考虑背景的话可以用来调整位置



### [标线](https://echarts.apache.org/zh/option.html#series-line.markLine)

用来在折线图上画线段的  
有[丰富的手段](https://echarts.apache.org/zh/option.html#series-line.markLine.data)设置起点和终点



[图例](https://echarts.apache.org/zh/option.html#legend)

一般情况数据充足的话只要有配`legend`配置项那就会有图例  
不过雷达图比较特殊，还需要配[`legend.data`](https://echarts.apache.org/zh/option.html#legend.data)才会显示

- 上文的“数据充足”包含以下情况

  - 如果`series`有多项的话  
    `series`的各项都有`name`属性

  - 如果`series`只有一项的话  
    这一项的data长得类似下面这个样子  

    ```js
    [
      {name:'xxx',value:111},
      ...
    ]
    ```

##### 标线后的标签

- [labelLayout](https://echarts.apache.org/zh/option.html#series-pie.labelLayout)  
  如果一个标线要对应多个标签文本，且文本都要靠内对齐或靠外对齐的话  
  就需要这个配置






### 事件

可以监听各种事件  

- 事件的返回内容
  - “鼠标事件”  
    在[“鼠标事件”的最上方](https://echarts.apache.org/zh/api.html#events.%E9%BC%A0%E6%A0%87%E4%BA%8B%E4%BB%B6)有描述
  - 其他事件  
    其他事件里的`ACTION`就是返回内容

- [“鼠标事件”](https://echarts.apache.org/zh/api.html#events.%E9%BC%A0%E6%A0%87%E4%BA%8B%E4%BB%B6)  
  文档里说的“鼠标事件”其实只包含“图表主体”的鼠标事件  
  图例等内容不会触发这些事件
- highlight  
  触发时机有2个：鼠标划过图例、点击图例  
  从返回内容里无法区分是哪种触发情况
- downplay  
  和hightlight一样，只不过hixxx是开始时触发，而dwxxx是结束时触发



### 地图

echarts也可以做gis应用，加上百度地图即可  
[官方示例](https://echarts.apache.org/examples/zh/index.html#chart-type-map)在这  

但是效果会差一点，[这个例子](https://echarts.apache.org/examples/zh/editor.html?c=map-polygon)体现了所有已知bug（可能是bmap的所有已知bug）  
已知bug如下

- 地图悬挂物移动卡顿  

- 地图移动时地图覆盖物会消失

- 多边形在展示不全时外观会有问题

  

不用百度地图的话似乎都是用geo配置或者gl，用的话似乎都是bmap配置



##### [注册地图](https://echarts.apache.org/zh/api.html#echarts.registerMap)

- 一个demo：  
  `echarts.registerMap(地图名, geojson)`  
  geojson geometry合法类型有：Polygon、MultiPolygon



##### `geo`配置项

这个配置项配的就是地图本身，要在地图上加效果的话要通过serie来实现

- 淡出（blur）  
  淡出效果颜色是残留的  
  （就是说鼠标划过后进入淡出状态，并且会一直保持）  
  但是残留的颜色并不是每块都是你给的颜色（bug）

- 取消选中  
  默认情况下取消选中并不会还原成未选中的样式（bug）  
  [这篇博文](https://www.cnblogs.com/linfblog/p/12150971.html)有解决方式
- [给区域单独设置样式](https://echarts.apache.org/zh/option.html#geo.regions)  
  是通过`name`来找到指定区域的  
  <span style='opacity:.5'>（试过用`id`来找，结果是不行的）</span>  
  1. 首先，注册地图时要在geojson的properties里设置好name
  2. 设置指定区域的样式时  
     需要在[`name`配置项](https://echarts.apache.org/zh/option.html#geo.regions.name)里输入指定区域的name



##### [map serie](https://echarts.apache.org/zh/option.html#series-map)

- 可以使用注册的地图  
  方法是：通过`map`配置项指定使用的地图
- 可以用来画地图



##### gl

- 放大空间很有限  
  基本只能全览地球
- 鼠标操作体验不好



### 具体的图表



##### 折线图

- 数据堆叠  
  通过[`stack`属性](https://echarts.apache.org/zh/option.html#series-line.stack)控制  
  - 使用方法  
    指定各条线的`stack`属性  
    属性值相同的线，将会堆叠起来
  - 什么是『数据堆叠』？  
    在同一个坐标系里显示多个折线图时  
    让一条线的值凌驾于另一些线上  
    用文字描述比较抽象，去[`stack`属性](https://echarts.apache.org/zh/option.html#series-line.stack)里看demo比较好理解



##### [散点图](https://echarts.apache.org/zh/option.html#series-scatter)

- 文本  

  - 描边

    - bug1  
      把`textBorderWidth`设为0无法取消描边  
    - bug2  
      设置`textBorderColor`会让描边消失

    一个例子可以体现bug1和bug2  

    ```js
    {
      name: 'light',
      type: 'scatter',
      coordinateSystem: 'geo',
      data: areaCorePointList,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true,
          fontSize:`${pxScale*20}px`,
          // textBorderWidth:0,
          textBorderColor:'#ff0000',
          color:'white'
        },
        emphasis: {
          show: true,
        },
      },
      itemStyle: {
        normal: {
          color: '#1DE9B6',
        },
      },
    },
    ```

    

##### [象形柱图](https://echarts.apache.org/zh/option.html#series-pictorialBar)

用图片、svg、内置图形等内容当柱子的柱状图



##### [热力图](https://echarts.apache.org/zh/option.html#series-heatmap)

- 改变单元格宽高比的方法  
  修改整个option的[`grid`](https://echarts.apache.org/zh/option.html#grid)配置项



### [数据视图](https://echarts.apache.org/zh/option.html#toolbox.feature.dataView)

[工具栏](https://echarts.apache.org/zh/option.html#toolbox)里的一个工具

[例子](https://echarts.apache.org/examples/zh/editor.html?c=bar-label-rotation)

- 可以出现一个表格  
  用户可以手动在表格里改数据，点刷新用表格里的数据作为图表数据
- 去除“刷新”按钮  
  设为只读模式即可  
  也就是把[`readOnly`属性](https://echarts.apache.org/zh/option.html#toolbox.feature.dataView.readOnly)设为`false`





### [颜色](https://echarts.apache.org/zh/option.html#color)

可以下发



### [文本超出隐藏](https://echarts.apache.org/zh/option.html#series-pie.label.bleedMargin)



### 疑似bug

- 重复渲染直角坐标系时横线消失  
  - 触发条件：  
    一开始设置了`yAxis.max`，后续渲染如果没有max的话就会消失，再渲染有max的话就会又出现  
  - 重复渲染：  
    指的是对于同一个元素从头走一遍代码  



### bug

- yAxis.max设置值比各val值小的话有bug  
  - bug表现：
    - 图表中的各横线消失（这里的横线不是指markLine）
    - 图表的最大值会变成值得最大值
    - 图表的最小值会变成值得最小值
  - 详细触发条件
    - 折线图+markLine
    - yAxis.max与markLine值相等
    - 图表数据有多项null，有2项为数值，且数字比yAxis.max大
    - 有通过从头走一遍代码的方式来更新视图
- [雷达图serie的itemStyle属性](https://echarts.apache.org/zh/option.html#series-radar.itemStyle)部分无效  
  无效部分为border系列的属性



### 未归类

- 单独设置每一项  
  <span style='opacity:.5'>（比如说柱状图每个柱子不同颜色）</span>  
  `serie.data`写子项为对象的数组
  - 可以和集体设置的配置重复  
    会自动合并  
    （比如说集体设置了`label.show:true`，单独设置了`label.color`，那这2项都会保留）



# echarts4

[总览echarts建议从这个页面开始](https://echarts.apache.org/zh/cheat-sheet.html)

本笔记当前假设echarts不存在dataset这个配置项，因为这个配置项会变更数据的输入方式（官方直播时说dataset是方便转换从后端拿的数据的）

也假设都采用平面直角坐标系，其他坐标系暂未过多研究





- 有事件  

  - [这个是教程](https://echarts.apache.org/zh/tutorial.html#ECharts%20%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6%E5%92%8C%E8%A1%8C%E4%B8%BA)
  - [这个是api](https://echarts.apache.org/zh/api.html#events)

- 有些值写错的话不会报错，但是会导致展示上面有些错误  
  比如`title.textStyle.fontWeight`设为`'static'`会导致`title.textStyle.fontSize`失效

- 深色模式  
  设置方式：`echarts.init`的第二个参数传入`'dark'`  
  注意：深色模式会改写一些颜色。比如说label文本的颜色在不设dark且series子项.data 的子项 .itemStyle.color有值时，取的是这个color值，而有dark时，就不会取这个值

- 可以服务端渲染

  



第一级配置项意义

- 系列列表：`series`  
  重点，本笔记下方有进一步说明
- 标题：`title`
- 图例：`legend`
- 平面直角坐标系的x轴：`xAxis`
- 平面直角坐标系的y轴：`yAxis`
- 图表主体4个边的位置：`grid`
- 提示框：`tooltip`  
  也就是鼠标划到图表主体上时跟随鼠标显示的东西
- 背景色：`backgroundColor`
- 数据截取功能：`dataZoom`





### series

官方介绍在[这个页面](http://echarts.apache.org/zh/tutorial.html#ECharts%20%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5%E6%A6%82%E8%A7%88)中搜索“系列”进行查看

『series』这个词在官网里具有二义性

- 有时代表第一级的配置项`series`  
  中文名是系列列表  
  系列列表是一个图表的核心，主要负责图表主体，很多时候也会略微影响到其他内容
- 有时代表第一级的配置项`series`的子项  
  中文名是系列  
  系列代表图表主体中的一张“图”  
  比如说一圈的环状图，比如说一条折线，比如说一组柱状图

系列列表可以拥有多个系列，多个系列在图表主体上呈现的就是有多条折线的折线图、或多圈的环状图、或多组的柱状图  
下图就是多组的柱状图，一个颜色对应的是一个系列  
![多组柱状图](D:\non_work_project\mine\Study-notes\图片\多组柱状图.png)



### 系列的详细说明

系列有很多种类型，比如饼图、折线图、柱状图  
不同类型的系列要设置不同的`type`  
也拥有不同的配置，比如[这个是饼图的配置](http://echarts.apache.org/zh/option.html#series-pie)、[这个是折线图的配置](http://echarts.apache.org/zh/option.html#series-line)、[这个是柱状图的配置](http://echarts.apache.org/zh/option.html#series-bar)  
下面是一些系列的进一步描述

- label属性的formatter属性里的`a`、`b`、`c`
  - `a`  
    series数组子项的`name`属性
  - `b`  
    series数组子项的`data`属性的子项的`name`属性
  - `c`  
    series数组子项的`data`属性的子项的`value`属性



饼图

- 标注连线  
  `series-pie.labelLine`  
  官方名称是：视觉引导线
  - 一个没用的配置  
    `labelLine.showAbove` echarts5
- 饼图中“饼”的文本标注  
  文本来源：系列的data属性的子项的name属性  
  【】可能其他类型的系列也是这样
- `labelLayout`  
  控制引导线及标签的位置  
  目前只记函数的用法  
  echarts5
  - 返回值的x属性可以控制标签在水平方向上的位置  
  - 返回值的labelLinePoints属性是三个点  
    代表引导线的三个坐标



### 注意

- 名称轴默认放不下是会隐藏名称  
  这个其实大家都会认为是bug  
  接绝方法：把`名称轴.axisLabel.interval`赋值为`0`





### 经验

- echarts4 `option.radar.splitArea.areaStyle.color` 用`#abcdef99`这种写法
  在i国网上会变成全黑，pc/移动各浏览器可以正常使用。用`rgba(255,255,255,.125)`的话i国网可以使用



