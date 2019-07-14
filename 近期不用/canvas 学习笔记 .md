canvas.getContext('2d').lineWidth可以设置边框宽度，边框向内扩展，值是一边的2倍`


## 上下文对象
所有的实际性内容都要从上下文对象里调用（猜测一个canvas标签只能用一个上下文）
`let ctx =canvas.getContext("2d")`


## 返回canvas转为图片后的base64代码
canvas.toDataURL()


## canvas宽高改变后会自动清空画布
