

# DOM

### 获得dom

- 获得dom子代  

  > - `dom.children`  
  >   获取元素节点，浏览器表现相同
  > - `dom.childNodes`  
  >   IE：只获取元素节点  
  >   非IE：获取元素节点与文本节点
  >
  > —— [博客](https://www.cnblogs.com/ilovexiaoming/p/6853176.html)

### dom的属性操作

- 获得dom的属性值  
  `dom.getAttribute(字符串属性名)`
- 设置dom的id  
  `dom.id=id值`

### 在文档上增减dom

增加dom：

- `document.body.appendChild(dom)`  
  多次对一个dom执行这个方法只会生效一次  
  这个方法会同步生效，`appendChild`后马上就能从文档上获取到这个dom

移除dom：

- `dom.remove()`
- `dom的父元素.removeChild(dom)`



### 样式相关

更改dom的类名

- [`classList`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)  
  兼容性不完美  
  mdn里没写api，不过api看[示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList#%E7%A4%BA%E4%BE%8B)就能了解了
  - `replace(被替换类,新增类)`  
    替换，如果dom上没有`被替换类`的话，`新增类`也不会被加进去  
    老婆说这个方法兼容性不好

##### 控制内联样式

`dom.style`是[CSSStyleDeclaration](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration)的实例

- 给样式属性赋值  
  `dom.style.属性=属性值`
- 移除样式属性  
  `dom.style.removeProperty(属性)`
- dom的style属性是可读可写的  
  这就意味着：可以把一个dom的style赋值给另一个dom

控制css

- 听说直接修改style标签就可以，不过自己还未测试过
- 使用`CSSStyleSheet`实例



### 其他

- 找到元素的父元素：  
  `dom.parentElement`

  

# 其他

### 中文支持情况

ie5支持js中的中文  

- 测试环境：ie11模拟ie5

- 测试代码：  

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title></title>
  </head>
  <body>
  <script>
    var 一 = 1
    var 对象 = {
      甲: 2,
      乙: 3
    }
    
    函数()
    function 函数() {
      对象.乙 += 一
      console.log(对象)
    }
  </script>
  </body>
  </html>
  ```

  ### 模块
  
  - 浏览器的模块里路径的".js"不能省略