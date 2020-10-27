# CSS

- 可以使用`@import`语法组织代码
- 选择器可以进行连写，如：`.ivu-form-item-content>*:first-child`
- less会把空的样式去掉  
  纯css就算类名下没有样式，chrome控制台Elements->Styles标签里也会显示出该类名
- transform可以使用两个translate，rotateX和rotateZ也可以同时使用——源自mapbox
- 取消某个元素的交互能力  
  `pointer-events: none;`

### 滚动条

以下内容没有深入了解，并不保证100%正确

`::-webkit-scrollbar`可以改变滚动条样式，不过无法在鼠标移动到滚动条上时改变光标外观，火狐与IE不支持，其他浏览器基本都支持

ie也可以改变滚动条样式，不过仅限于颜色



### 层级关系

下方是chrome和firefox的实操经验

- float不影响层级关系
- relative与absolute参与层级关系的计算的效果是相同的



# HTML

- 可以用任意英文做标签名，但是用中文不行
- **中文乱码**  
  加`meta`标签即可解决，以下两个标签都可以
  1. `<meta charset="UTF-8">`
  2. `<meta http-equiv="Content-Type" content="charset=utf-8"/>`
- 可以通过插入`script`、`link`这种js或css的标签来使js或css生效
  - 电气符号库与GeoGL的鉴权服务就用了插入标签来执行js的方法
  - css  
    吉奥这有人用这种方式使css生效（个人未做详细测试）
- [预加载](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Preloading_content)



# 综合

- **标签的id**  
  所有标签的id值都会作为键增加到`window`变量下  
  这个增加的属性的属性值就是标签对应的dom  
  <span style='opacity:.5'>可以通过window调用到这个增加的属性，不过当前未在打印出的window对象上找到这些属性</span>
- firefox滚动条bug  
  （并不明确触发条件，约十分钟内进行的尝试有这个bug，结果之后不知道为什么没有了）  
  有元素大于视口，但是父元素已经`overflow: hidden;`了，结果还是会出现滚动条。  
  解决方案：body上加`overflow: hidden;`

