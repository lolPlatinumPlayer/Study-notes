# 未整理内容

- 似乎样式会强制加上scope
- 自定义组件在小程序里都会变成web component  
  已验证了全局组件
  
  



# HBuilder



### 未归类

- 依据文件名进行搜索  
  快捷键：ctrl+P



### 在浏览器里运行

步骤如下

1. 用鼠标选中根目录
2. 在上方菜单栏里依次点击  
   运行 -> 运行到浏览器 -> 你要的浏览器

错误提示

- 弹框“浏览器尚不支持此种类型文件”  
  原因：没做步骤1



### app真机调试

步骤如下

1. 在上方菜单栏里依次点击  
   运行 -> 运行到手机或模拟器 -> 你要的手机



初次调试

- 会在手机上安装HBuilder这个app



**查看调试信息**

开启真机调试之后可以在控制台看打印内容和错误提示  
如果打印对象的话点击对象可以查看对象完整内容  
有时候会出现看不了的情况，重启即可恢复

**获得进一步调试能力的方法**

听杭兴说安卓上就是有问题的，苹果可以

- 点HBuilder控制台的调试按钮（甲壳虫图标）
  
  - 使用条件
    
    - 电脑通过usb使用手机流量 可用
    
    - 电脑通过手机热点使用流量 不可用  
      会有如下提示信息  
    
      ```
      无法连接到调试服务，可能原因：
      1. 手机与PC不处于同一局域网
      2. 手机使用移动网络
      3. 手机使用VPN等代理设置
      4. PC设置了防火墙
      ```
    
      
    
  - 对程序结果有影响
    寿宁app进“系统设置”页面就会报错白屏
  
- webview调试  
  - 开启方法  
    在上方菜单栏里依次点击  
    运行 -> 运行到手机或模拟器 -> 显示Webview调试控制台
  - 特性
    - 在“Webview调试”里进行的操作也会反应在手机上
    
      



经验

- 第一次调试的时候不成功  
  终端会提示“如手机上HBuilder调试基座未启动,请手动启动”  
  后来重启2端的HBuilder再次尝试就成功了，不过这个提示还在  
  不过没有热更新功能
- 后来把手机上的HBuilder卸载了，并更新了手机系统（记不清先后顺序了）  
  再调试，一步到位，也有热更新功能
- 更新调试app并不需要下载app  
  需要下载app的话应该是app自身的要求
- 苹果手机也不一定可以真机调试  
  焰荣的iphone就不行



### 小程序真机调试

有时候微信开发者工具里的结果和线上结果是有差异的  
所以就需要真机调试来尽量抹除差异



操作

- 微信开发者工具里的操作  
  点“真机调试”按钮  
  操作很好理解
- 直接uniapp调试的话可能会因尺寸过大而被拒接  
  可以发行后进行真机调试  
  发行的操作步骤为：点上方工具栏的“发行” -> 点“小程序-微信（仅适用于uni-app）”  -> 在弹窗里点“发行”



### bug

- HBuilder开微信开发者工具白屏  
  [微信开放社区](https://developers.weixin.qq.com/community/develop/doc/0002665789c9983b5ab9365ab55c00)里就提到了这个问题  
  一个可用的解决方案是：关掉后台所有微信开发者工具的进程，然后再去HBuilder里重开



# 编程



- `uni`全局对象  
  源自uni-app  
  官网的[《API》页面](https://uniapp.dcloud.net.cn/api/README)里的内容都是从`uni`里来的



### 判断平台

- [`uni.getSystemInfoSync().platform`](https://uniapp.dcloud.net.cn/api/system/info?id=getsysteminfosync)  
  找出操作系统（无法分辨是web还是小程序）
- [条件编译](https://uniapp.dcloud.net.cn/platform?id=%e6%9d%a1%e4%bb%b6%e7%bc%96%e8%af%91)  
  无法判断操作系统
  - 写法  
    可以写指定平台编译也可以写指定平台不编译  
    可以跟多个平台，多个平台用`||`连接



### 应用、页面、组件

App.vue代表应用

其他SFC代表页面或组件

有在pages.json里配置的是页面，其他的是组件



##### [生命周期](https://uniapp.dcloud.io/collocation/frame/lifecycle)

寿宁移动端项目里  

- onShow、onHide在进出页面时会执行
- onLoad、mounted在初次进入页面时会执行  
  执行顺序为onLoad、onShow、mounted
- destroyed都不会执行



### 官方组件

分为内置组件和[扩展组件（uni ui）](https://github.com/dcloudio/uni-ui)

- 扩展组件  
  - 部分组件直接拷源码就可以用  
    比如说uni-transition





##### 简易弹框

[`uni.showModal`](https://uniapp.dcloud.net.cn/api/ui/prompt?id=showmodal)

- 判断用户点的是 确认还是取消还是遮罩  
  官网说可以区分是否通过蒙层关闭的说法是错误的，遮罩都是没有交互的  
  下面是具体测试结果

  - 浏览器  

    |             | 确认                                 | 取消                                | 遮罩     |
    | ----------- | ------------------------------------ | ----------------------------------- | -------- |
    | success回调 | 触发                                 | 触发                                | 无法点击 |
    | fail回调    |                                      |                                     | 无法点击 |
    | 返回对象    | {confirm:true,errMsg:"showModal:ok"} | {cancel:true,errMsg:"showModal:ok"} | 无法点击 |

  - 小程序  

    |             | 确认                                                 | 取消                                                 | 遮罩     |
    | ----------- | ---------------------------------------------------- | ---------------------------------------------------- | -------- |
    | success回调 | 触发                                                 | 触发                                                 | 无法点击 |
    | fail回调    |                                                      |                                                      | 无法点击 |
    | 返回对象    | {cancel: false,confirm: true,errMsg: "showModal:ok"} | {cancel: true,confirm: false,errMsg: "showModal:ok"} | 无法点击 |

  - 安卓app  

    |             | 确认                                                    | 取消                                                    | 遮罩     |
    | ----------- | ------------------------------------------------------- | ------------------------------------------------------- | -------- |
    | success回调 | 触发                                                    | 触发                                                    | 无法点击 |
    | fail回调    |                                                         |                                                         | 无法点击 |
    | 返回对象    | {"cancel":false,"confirm":true,"errMsg":"showModal:ok"} | {"cancel":true,"confirm":false,"errMsg":"showModal:ok"} | 无法点击 |
    

- 这个方法不能嵌套  
  嵌套的话第二个不会出来，加了setTimeout也不行



##### [过渡动画](https://ext.dcloud.net.cn/plugin?id=985)

也就是uni-transition组件

- 原理  
  会渲染出一个标签  
  不过在小程序里这个标签是持续显示的  
  所以不要依赖这个标签去做样式  
  写代码时就当它不会产生标签就行



### 事件

- [事件映射表](https://uniapp.dcloud.net.cn/vue-basics?id=%e4%ba%8b%e4%bb%b6%e6%98%a0%e5%b0%84%e8%a1%a8)里列出了部分事件  
  这个表只有第一行的左右是不同的（2021.6.23）  
  这个意思应该是写click会转为tap（测试结果也是这样表明的）



### 导航

- `uni.navigateTo({url:一个地址})`  
  可以写相对地址也可以写绝对地址  
  <span style='color:red'>写错地址不会报错也没有任何反应</span>



# 各端差异



小差异

- `requestAnimationFrame`  
  安卓app、小程序里没有
- `alert()`  
  安卓app无效



### 计算属性

没有被引用的时候

- 网页端和安卓app端不会执行
- 网页端在vue devtools里点组件后会执行
- 小程序端会执行



### bug

- 在依赖vuex的计算属性的页面里，小程序初次进入页面时数据更新有延迟  
  比如说vuex里原数据是a，改为b之后跳进页面，页面一开始显示的还会是a  
  不过在onShow之后是正常的  
  这里也包含了另一个bug：就是onShow是在显示之后才执行的，而不是显示时执行的
  - 解决办法  
    离开（onHide）后就隐藏  
    进入（onShow）后再显示

- 微信小程序里视图上没有及时依据data更新的问题
  似乎很多人碰到了这个问题
  - [百度搜索](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=uniapp%20%E5%B0%8F%E7%A8%8B%E5%BA%8F%20%E8%A7%86%E5%9B%BE%E5%92%8Cdata%E4%B8%8D%E4%B8%80%E8%87%B4&oq=uniapp%2520%25E5%25B0%258F%25E7%25A8%258B%25E5%25BA%258F&rsv_pq=de8eb917000755ee&rsv_t=27f6oeDcCXu3aQeJgLYUwMDu%2B6BsR5Woo6PSnmzk%2F%2FowtEhjYhtQILZEQ2o&rqlang=cn&rsv_dl=tb&rsv_enter=1&rsv_sug3=24&rsv_sug1=21&rsv_sug7=100&rsv_sug2=0&rsv_btype=t&inputT=11712&rsv_sug4=14226)
  - [dcloud问答](https://ask.dcloud.net.cn/question/69907)  

  目前没找到解决方案  

  - 详细情况  

    - ```js
      computed: {
          ...mapGetters({
              isLogin: 'isLogin'
          }),
      },
      ```

    - 这个`isLogin`依赖了vuex一个module里的另一个state（应该是state）

    - 从别的页面改变依赖的state后再进入这个页面就有这个情况



# 其他



### vConsole

- 安卓app不可用
- 浏览器可用
- 微信小程序  
  初始不显示，点右上角三个点后点“打开调试”显示  
  有时候在三个点里找不到，点“打开性能监控面板”后就能找到了

