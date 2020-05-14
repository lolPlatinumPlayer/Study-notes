# CSS

- 可以使用`@import`语法组织代码
- 选择器可以进行连写，如：`.ivu-form-item-content>*:first-child`
- less会把空的样式去掉  
  纯css就算类名下没有样式，chrome控制台Elements->Styles标签里也会显示出该类名
- transform可以使用两个translate，rotateX和rotateZ也可以同时使用——源自mapbox



# HTML

- 可以用任意英文做标签名
- **中文乱码**  
  加`meta`标签即可解决，以下两个标签都可以
  1. `<meta charset="UTF-8">`
  2. `<meta http-equiv="Content-Type" content="charset=utf-8"/>`