本笔记对于小程序的描述只保证在微信小程序下是正确的



# 未整理内容

- 似乎样式会强制加上scope
- 自定义组件在小程序里都会变成web component  
  已验证了全局组件
- 并且无法改变组件内样式
  - 组件根元素也和web不一样  
    - web是组件内根元素就是组件标签代表的元素
    - 小程序是如下的  
      第一层：组件标签代表的元素  
      第二层：`#shadow-root`  
      第三层：组件内根元素
- [请求代理](https://blog.csdn.net/zhoumengshun/article/details/108779325)  
  manifest.json源码里的`h5.devServer.proxy`配置就是  
  （似乎和vue-cli4是一致的）

- url的query中可以携带中文



# 调试

- [这个页面](https://uniapp.dcloud.net.cn/snippet?id=%e4%bd%bf%e7%94%a8hbuilderx%e5%86%85%e7%bd%ae%e6%b5%8f%e8%a7%88%e5%99%a8%e8%b0%83%e8%af%95h5)说了一些调试内容
- uniapp vConsole只能加在web版上  
  （原因可能是html只在web端用。虽然没在官网上看到这个说法，不过sn项目的html的注释里有这样说）



### app真机调试

- 鸿蒙2.0可用



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

（听杭兴说安卓上就是有问题的，苹果可以）

- 点HBuilder控制台的调试按钮（甲壳虫图标）

  - 使用条件  
    电脑和手机处于同一局域网  
    （电脑通过usb使用手机流量是可以的，电脑通过手机热点使用流量是不行的）
  - 对程序结果有影响
    寿宁app进“系统设置”页面就会报错白屏
  - 能力
    - 可以打断点

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

- 有上面经验后还是会出现问题  
  提示`项目 'shouNingAppMobile' 编译成功`  
  但是手机上没有任何反应  
  后面把手机上hbuilder卸载了  
  关闭了电脑上的hubuilder  
  以管理员权限运行hbuilder  
  再运行这次在提示`项目 'shouNingAppMobile' 编译成功`后就会继续提示`正在建立手机连接...`  
  并且在手机上安装hbuilder  
  安装后点打开，是不好使的  
  关闭手机端hbuilder，且在pc端停止运行项目  
  再运行项目即可

  

##### iOS

- 苹果手机也不一定可以真机调试  
  （焰荣的iphone就不行）
- iOS12.5.3的iPhone6
  - 不需要iTunes就能用HBuilder X 3.2.3进行真机调试
  - 曾完美连上hrtPC的iTunes
- iOS15可以连接？？



关于iTunes版本与iOS14

- HBuilder官网要求itunes在12.10.9.3以下  
  装了2018/4/26发布于[微软](https://www.microsoft.com/zh-cn/p/itunes/9pb2mz1zmb1s?cid=appledotcom&rtc=1&activetab=pivot:overviewtab)的版本后发现确实连不上HBuilder（不过iPhone可以和iOS连接）
- [苹果官网](https://support.apple.com/downloads/itunes)12.10以前的最新版是12.4
- 使用12.4连接，iTunes会提示至少需要12.5
- 在EFreeLife网站下载[12.8](https://www.efreelife.com/ipsw/itunes/164)后  
  打开会提示`不能读取文件 iTunes Library.itl,因为它是由更高版本的iTunes所创建的`（原因是之前装了2018/4/26发布于[微软](https://www.microsoft.com/zh-cn/p/itunes/9pb2mz1zmb1s?cid=appledotcom&rtc=1&activetab=pivot:overviewtab)的版本）  
  按[百度的方法](https://jingyan.baidu.com/article/0964eca24699648285f5369c.html)删除`iTunes Library.itl`后可以打开iTunes   
  但iTunes连手机时还是失败并提示要求下载更新的版本  
  HBuilder一开始也检测不到手机，不过静置一段时间后HBuilder就可以真机调试了！  
  （杭兴也说他那里连不上iTunes但是可以连HBuilder）
  - 不可连接的经验  
    一次在超长时间连接iphone后，开启了iTunes，过了半个小时，可以连手机了，可以访问存储空间，不过iTunes上还是没有显示手机，HBuilder也检测不到（测试说用的数据线只能充电，不能传数据）  
    后面用了好的线，iPhoneX+iOS14还是连不上（不过杭兴的iTunes12.9可以连）





### 小程序真机调试

有时候微信开发者工具里的结果和线上结果是有差异的  
所以就需要真机调试来尽量抹除差异



操作

- 微信开发者工具里的操作  
  点“真机调试”按钮  
  操作很好理解

- 直接uniapp调试的话可能会因尺寸过大而被拒接  
  有2个解决方案  
  其中发行的方案压缩率更高
  - 可以发行后进行真机调试  
    发行的操作步骤如下：

        1. 点上方工具栏的“发行”  
           （要填AppID）
        2. 点“小程序-微信（仅适用于uni-app）” 
        3. 在弹窗里点“发行”
        4. 在微信开发者工具里新建项目  
           （有时候不用这一步，HBuilder会自己打开）  
           目录：用HBuilder控制台打印的目录  
           AppID：点“发行”时填的AppID
        5. 点微信开发者工具里的“真机调试”按钮
  - 勾选运行小程序时压缩代码  
    
    - 勾选步骤：上方工具栏的运行 =》 运行到小程序模拟器 =》 运行时是否压缩代码



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



### 打包

- app  
  发行 =》 云打包
- 网站  
  发行 =》 网站（后面还跟着一堆）  
  弹窗里的“网站域名”没必要写



### bug

- HBuilder开微信开发者工具白屏  
  [微信开放社区](https://developers.weixin.qq.com/community/develop/doc/0002665789c9983b5ab9365ab55c00)里就提到了这个问题  
  一个可用的解决方案是：关掉后台所有微信开发者工具的进程，然后再去HBuilder里重开
- 如果左侧开了多个项目，有可能操作串的  
  （比如你点了项目A的manifest.json，可能开的是项目B的）



# 编程



- `uni`全局对象  
  源自uni-app  
  官网的[《API》页面](https://uniapp.dcloud.net.cn/api/README)里的内容都是从`uni`里来的
  
- app端内置5+能力  
  详见[官网](https://uniapp.dcloud.io/use-html5plus)
  
  



### 判断平台

- [`uni.getSystemInfoSync().platform`](https://uniapp.dcloud.net.cn/api/system/info?id=getsysteminfosync)  
  找出操作系统（无法分辨是web还是小程序）
- [条件编译](https://uniapp.dcloud.net.cn/platform?id=preprocessor)  
  无法判断操作系统
  - 写法  
    可以写指定平台编译也可以写指定平台不编译  
    可以跟多个平台，多个平台用`||`连接
  - 能力  
    [pages.json](https://uniapp.dcloud.net.cn/collocation/pages)都可以用  
    文件、目录也可以用
  - [增加自定义条件编译的方法](https://uniapp.dcloud.io/collocation/package?id=%e7%a4%ba%e4%be%8b%ef%bc%9a%e9%92%89%e9%92%89%e5%b0%8f%e7%a8%8b%e5%ba%8f)  
    可以加任意数量的自定义条件编译  
    添加后hbuilder里会多出对应按钮



### 应用、页面、组件

App.vue代表应用

其他SFC代表页面或组件

有在[pages.json](https://uniapp.dcloud.net.cn/collocation/pages)里配置的是页面，其他的是组件



##### [生命周期](https://uniapp.dcloud.io/collocation/frame/lifecycle)

（这部分内容都测试于：寿宁移动端项目）  

- 页面生命周期列表  
  uniapp的生命周期甚至包含尺寸变化、滚动到底部、点分享按钮等事件  
  除了[这一页](https://uniapp.dcloud.io/collocation/frame/lifecycle)的生命周期外，还包含[小程序的分享事件](https://uniapp.dcloud.net.cn/api/plugins/share?id=onshareappmessage)
- 组件的mounted与onShow在web上的区别
  - 路由的返回不会触发mounted，但是会触发onShow
- 通过`uni.navigateBack()`进入页面的话不会触发onLoad（已测：网页端）

<span style='opacity:.5'>早期结论</span>

- onShow、onHide在进出页面时会执行 【】有机会详细测试下这条
- onLoad、mounted在初次进入页面时会执行  
  执行顺序为onLoad、onShow、mounted  
  onLoad的nextTick就可以获取dom了
- destroyed都不会执行

<span style='opacity:.5'>8月6日安卓app测试</span>

- onHide  
  （在webLink页面上测试的）
  - 在离开页面时不会执行
  - 把应用退到后台才会执行
- onUnload  
  （在webLink页面上测试的）
  - 在离开页面时会执行
  - 把应用退到后台不会执行



##### 页面

- 配置方法  
  在[pages.json](https://uniapp.dcloud.net.cn/collocation/pages)的pages或subPackages里配置  
  （pages和subPackages应该是主包和分包的区别）
  - 文件路径和url路径必须保持一致  
    都是通过子项的path配置指定的  
    （从这里也可以看出来没法用一个组件生成多个页面）
  
- [subPackages](https://uniapp.dcloud.net.cn/collocation/pages?id=subpackages)配置方法  
  主要做小程序的分包，2.7.12开始也做了app的分包  
  subPackages一个子项代表一个分包  
  一个分包可以包含多个页面

  - 路径的编写  
    root配置项加上pages子项的path构成一个路径  
    其中root的结尾和path的开头都不用加`/`

- 应用首页  
  [pages.json](https://uniapp.dcloud.net.cn/collocation/pages)的pages的第一项
- 获取url  

  - 获取`?`后的部分  
    通过onLoad钩子的第一个参数即可获得  
    这个参数是一个对象，是由`?`后的内容转换来的
    - 其中字符串布尔值会转为布尔类型



##### 组件

- 组件的method应该不能起名为uniapp的生命周期  
  否则不生效（`vm.$options.methods`里都找不到）  
  已试过onReachBottom



### 组件库

- uni-app本身就内置了一些组件，不需要引入就可以使用  
  从组件名分辨不出来是否是内置组件，不过可以在[官网](https://uniapp.dcloud.io/component/view)查看所有内置组件



##### 官方组件

分为内置组件和[扩展组件（uni ui）](https://github.com/dcloudio/uni-ui)

- 扩展组件  
  - 部分组件直接拷源码就可以用  
    比如说uni-transition





###### 简易弹框

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



###### [过渡动画](https://ext.dcloud.net.cn/plugin?id=985)

也就是uni-transition组件

- 原理  
  会渲染出一个标签  
  不过在小程序里这个标签是持续显示的  
  - 所以不要依赖这个标签去做样式  
    写代码时就当它不会产生标签就行



###### [滚动区域](https://uniapp.dcloud.net.cn/component/scroll-view)

入门

- 要设置`:scroll-x="true"`或`:scroll-y="true"`

特性

- 垂直滚动时不一定要设置高度  
  （官网说要通过css设置height，这是错误的）  
  - 不过如果用flex的话记得设一个height  
    不然安卓8和iOS上滚动有问题
- 内层元素的尺寸和`scroll-view`的尺寸是一致的  
  （『内层元素』指的是`scroll-view`生成的类名为`uni-scroll-view-content`的元素）  

操作

- 滚动到能展示指定元素的位置  
  用`scroll-into-view`prop  
  - 指定元素是后代就行了，并不是像官网说的要是子元素
  - 滚动到的位置  
    会尽量把指定元素放到边缘  
    横线就是最左边  
    纵向就是最上边



### 事件

- [事件映射表](https://uniapp.dcloud.net.cn/vue-basics?id=%e4%ba%8b%e4%bb%b6%e6%98%a0%e5%b0%84%e8%a1%a8)里列出了部分事件  
  这个表只有第一行的左右是不同的（2021.6.23）  
  这个意思应该是写click会转为tap（测试结果也是这样表明的）



页面旋转

- 锁定旋转方向  
  网上都是说在onLaunch里加plus.screen.lockOrientation  
  杭兴说这个方法只有app有用  
  （已测iOS网页、iOS微信小程序,meiyong）
  
- 安卓app  
  
  - 默认应该是禁止旋转  
    不过真机调试的时候是允许旋转的  
  - app禁止旋转的话里边webview也无法旋转  
    （包括video标签也无法旋转）
  
- 设为自动旋转

  - 方法一  
    
    ```js
    //#ifdef APP-PLUS
    plus.screen.unlockOrientation(); //解除屏幕方向的锁定  
    //#endif
    ```

    安卓app可用（打包后也可以）

  - 方法二  
    在[配置列表](https://uniapp.dcloud.io/collocation/pages?id=%e9%85%8d%e7%bd%ae%e9%a1%b9%e5%88%97%e8%a1%a8)里设置`globalStyle.pageOrientation`  
    （官方说可以，个人未测过）



### 导航

[api列表](https://uniapp.dcloud.net.cn/api/README?id=%e8%b7%af%e7%94%b1)

- `uni.navigateTo({url:一个地址})`  
  - 可以写相对地址也可以写绝对地址  
    - 写相对路径一定要以`/`开头  
      （相对路径可以是url的『路径』部分）
  - <span style='color:red'>写错地址不会报错也没有任何反应</span>
  - 可以导航到同路径不同query的页面  
    和导航到其他页面效果一致（已测浏览器端）
- `uni.redirectTo`  
  调用该方法后 调用返回上一页方法 是不会到达这个页面的  
  而是会到达该页面的上一页

[标签](https://uniapp.dcloud.net.cn/component/navigator?id=navigator)

特性



### 顶部内容

包括：导航栏、状态栏 、胶囊按钮（小程序）

（状态栏就是显示时间、电量的那一栏，uniapp和uview都是这么叫的）

（胶囊按钮就是每个小程序右上角都有的几个按钮）

- 指定一些页面隐藏导航栏  

  - 特性

    - 小程序就算去了导航栏，也有2个东西去不掉

      1. 胶囊按钮
      2. 状态栏

    - >小程序端 web-view 组件一定有原生导航栏  
      >navigationStyle: custom 对 web-view 组件无效 
      >—— [uniapp官网](https://uniapp.dcloud.net.cn/component/web-view)

  - 方法  
    在[pages.json](https://uniapp.dcloud.net.cn/collocation/pages)里配置  
    目前发现如下2种方法（目前没发现2种方法的差别）  

    - 将style属性的navigationStyle属性设为custom
      - bug
          - 安卓app端的普通页面失效，webview页面可以  
              （同一个安装包也会出现有时有bug有时没bug的情况）  
            普通页面设了navigationBarTitleText，而webview页面设为了空串  
              之前打了一个包是可以的（之前用的hbuilder版本不记得了）  
              hbuilderX版本号：3.2.12.20211029
    - 将style属性的app-plus属性的titleNView设为false
    
    （已测试网页端和安卓app端，可以隐藏包含webview的页面）
    
  - 解决去掉导航栏后顶部距离不好把握的问题  

    - 问题描述  
      - 各个手机顶部距离是不一样的，因此给定值不行  
      - 部分手机（比如iOS）在系统顶部条出现的区域无法操作app
    - 解决办法  
      - 非webview页面可以用`--status-bar-height`css变量（注意：官网说了`--status-bar-height`在小程序中不代表状态栏高度）
      - webview由于会占满全屏且无法使用外部css变量  
        因此只能把`uni.getSystemInfoSync().statusBarHeight`传到webview里
    - 参考资料  
      [css变量](https://uniapp.dcloud.net.cn/frame?id=css%e5%8f%98%e9%87%8f)  
      [自定义导航栏使用注意](https://uniapp.dcloud.net.cn/collocation/pages?id=customnav)

- 设置导航栏与状态栏的样式
  - 背景色  
    [pages.json](https://uniapp.dcloud.net.cn/collocation/pages)的navigationBarBackgroundColor配置  
    （寿宁项目小程序里设置什么值最后都是透明，不知道是不是因为用了"navigationStyle":"custom"）
    
  - 要求必须是HexColor  
      "#00000000"可以通过编译（但是没看过效果）
    
  - 文本颜色  
    `navigationBarTextStyle`配置项  
  
    > 仅支持 black/white
  
- 胶囊按钮附近的样式问题  

  - 解决方案：获得胶囊按钮的尺寸信息  
    [`getMenuButtonBoundingClientRect`](https://uniapp.dcloud.net.cn/api/ui/menuButton?id=getmenubuttonboundingclientrect)方法  
    （和微信的[`getMenuButtonBoundingClientRect`](https://developers.weixin.qq.com/miniprogram/dev/api/ui/menu/wx.getMenuButtonBoundingClientRect.html)方法应该是一致的）  

    - 该方法只存在于小程序平台
    - 返回数值是针对屏幕左上角而言的  
      （比如right=left+width）

  - 文本不会进入胶囊按钮的区域  
    但是也没法设置与胶囊按钮间的间距  
    （这条信息并不是很确定）

  - 示例代码  

    ```vue
    <template>
      <div class='NavigationBar'>
        <div class="topSpace"></div>
        <div class="bar">
          <u-icon class="backBtn" name="arrow-left" @click="goBack"></u-icon>
    			<u-search 
            v-model="searchText" 
            :placeholder="placeholder" 
            bg-color='#F7F7F7' 
            color='#333' 
            placeholder-color='#A9A9A9'
            action-text="搜索  "
    			  :search-icon-color="searchText?'#333':'#A9A9A9'" 
            :action-style="{
              color: '#333333',
              'font-size': '30rpx',
              'font-weight':'bold',
              'padding-right':'0',
              'padding-left':'21rpx',
              width:'auto', // 重置u-search上的width
            }" 
            @search='search' 
            @custom='search'
          ></u-search>
          <div class="rightSpace" v-html="'&nbsp;&nbsp;'"></div>
          <div class="rightSpace" v-html="'&nbsp;&nbsp;'"></div>
        </div>
      </div>
    </template>
    ```






### 应用使用须知  

##### 安卓

[这里有个官方文章](https://ask.dcloud.net.cn/article/36937)

- 官方文章里“HBuilderX3.2.1及以上版本配置方式”在覆盖安装时是无效的  
  测试于3.2.12  
  无配置version
- 相对路径  
  试过`pages/user/privacyPolicy`和`/pages/user/privacyPolicy`，都不行  
  应该只有static里的行



### dom

- 执行dom操作  
  - 不用renderjs只有web端可以进行dom操作
  - 用renderjs可以在app端进行dom操作

- 获取dom信息  
  可以用[createSelectorQuery](https://uniapp.dcloud.net.cn/api/ui/nodes-info?id=createselectorquery)等方法获取[NodesRef](https://uniapp.dcloud.net.cn/api/ui/nodes-info?id=nodesref)实例  
  调用该实例的方法即可获得对应元素的信息



##### [renderjs](https://uniapp.dcloud.io/frame?id=renderjs)

- 使用步骤
  1. 要建立2个script标签  
     一个普通的script标签和一个有指定属性的script标签  
     指定属性有2个：module和lang  
     module似乎可以是任意值（没找到module的更多资料）  
     lang值必须为`"renderjs"`
  2. 这时在有指定属性的script标签里就可以进行dom操作了



### 非原生api

- 图片全屏  
  [`uni.previewImage`](https://uniapp.dcloud.net.cn/api/media/image?id=unipreviewimageobject)



##### [下拉刷新](https://uniapp.dcloud.net.cn/api/README?id=%e4%b8%8b%e6%8b%89%e5%88%b7%e6%96%b0)

- 使用方法  
  在[pages.json](https://uniapp.dcloud.net.cn/collocation/pages)里开启enablePullDownRefresh后拥有下拉刷新界面功能  
  在用户下拉刷新时会触发onPullDownRefresh[生命周期](https://uniapp.dcloud.net.cn/collocation/frame/lifecycle?id=%e9%a1%b5%e9%9d%a2%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)  
  刷新完成后调用[uni.stopPullDownRefresh](https://uniapp.dcloud.net.cn/api/ui/pulldown?id=stoppulldownrefresh)方法
- 用js开启下拉刷新动画  
  调用[uni.startPullDownRefresh](https://uniapp.dcloud.net.cn/api/ui/pulldown?id=startpulldownrefresh)即可  
  注意：只有开启enablePullDownRefresh的页面可以用
- 下拉后的背景色  
  都是[pages.json](https://uniapp.dcloud.net.cn/collocation/pages)里配置的
  - 安卓小程序：backgroundColor
  - 微信开发者工具：backgroundColorTop（[uniapp官网](https://uniapp.dcloud.net.cn/collocation/pages?id=style)说这是iOS用的）



### 原生api

##### 文件相关

- 下载文件  
  代码示例如下  

  ```js
  download(item){
    const {name,backEndPath}=item
    item.status='下载中'
    const downloadTask = uni.downloadFile({
      url: READIMAGE_URL+backEndPath,
      success: (res) => {
        if (res.statusCode === 200) {
          const {tempFilePath}=res
          console.log('下载成功',tempFilePath);
          item.localPath=tempFilePath
          item.status='下载成功'
        }else{
          item.status='下载失败'
        }
      },
      fail:()=>{
        item.status='下载失败'
      },
    });
    downloadTask.onProgressUpdate((res) => {
      item.percent=res.progress
      // console.log('已经下载的数据长度' + res.totalBytesWritten);
      // console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
    });
  },
  ```
  
  - 下载地址  
    可以是文件流（安卓小程序可以，iOS小程序下载pdf成功但是打开会报错“格式不支持”。不用文件流pdf可以开）
  
- 打开文件  
  示例代码如下  

  ```js
  openFile(item){
    uni.showLoading({
      title: '正在打开文件'
    })
    uni.openDocument({
      /* 
      - 不加escape
        安卓app、安卓小程序可用
      - 加escape  
        安卓小程序不可用
        https://www.cnblogs.com/lizhao123/p/11498948.html里说iOS要这样写对于文件名为中文的文件才可以成功
      */
      filePath: item.localPath,
      // filePath: escape(item.localPath),
      success: function(res) {
      },
      fail(e) {
        console.error('打开失败',e)
        item.status='格式不支持'
      },
      complete(){
        uni.hideLoading();
      },
    })
  },
  ```
  
  - 支持格式  
    [官网](https://uniapp.dcloud.io/api/file/file?id=opendocument)说了一串支持格式  
    经过测试，实际上是iOS小程序只限于那些格式  
    下面是测出额外支持的格式（肯定还有更多支持的格式）
  
    | jpg                          | rar     | zip                          |
    | ---------------------------- | ------- | ---------------------------- |
    | 安卓app、安卓小程序、iOS app | 安卓app | 安卓app、安卓小程序、iOS app |
  
    
  
- 保存文件  
  示例代码如下  

  ```js
  uni.saveFile({
    tempFilePath: res.tempFilePath,
    success: (a)=> { // 只有1个参数
      console.log('保存成功',a)
      item.saveStatus='保存成功'
    },
    fail:e=>{
      console.log('保存失败',e)
      item.saveStatus='保存失败'
      uni.showToast({title:"保存失败",icon:"none"});
    },
  })
  ```

  - 下载的文件名  
    没法固定，安卓app是时间戳、安卓小程序又是另一个（安卓小程序文件名和下载路径也没关系）  
    win10chrome倒是有按下载路径作为文件名过
    
  - 保存文件后会删除临时文件  
  
    > 会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用 —— [官方文档](https://uniapp.dcloud.io/api/file/file?id=savefile)
    
    个人测试结果：安卓小程序会、安卓app不会（可以使用『打开文件』api）
    
  - 测试  
    安卓小程序端可以搜到下载的文件

##### 媒体相关

- 音频  
  [`uni.createInnerAudioContext()`](https://uniapp.dcloud.io/api/media/audio-context?id=createinneraudiocontext)  
  - bug
    - 调用该方法后会立即触发onError  
      而实际上没发现什么问题  
      （已测试iOS14、iOS12）



##### 支付

uni.requestPayment

- 小程序  

  > “下单账号与支付账号不一致”弹框是微信弹出的 —— 杭兴



##### app更新

uniapp专用

- [小程序](https://uniapp.dcloud.net.cn/api/other/update?id=getupdatemanager)
- [整包更新](https://ask.dcloud.net.cn/article/34972)
- [资源文件热更新(wgt升级)](https://ask.dcloud.net.cn/article/35667)

5+应用有3种方式

- [整包升级](http://ask.dcloud.net.cn/article/431)
- [应用资源升级](http://ask.dcloud.net.cn/article/182)
- [应用资源差量升级](http://ask.dcloud.net.cn/article/199)

通用

- wgt包内含版本号的  
  如果版本号不对，uniapp会弹窗提示安装失败<span style='opacity:.5'>（这个弹窗是uniapp弹的而不是开发者弹的）</span>





### [webview](https://uniapp.dcloud.net.cn/component/web-view)

- 调试  
  可以开启或关闭网页控制台的输出  
  - 例子  
    寿宁app7月23日或之前的某个版本就可以  
    7月26日的代码就没了
    - 不过把webview内核改为腾讯x5内核后，控制台又会输出了  
      7月23日到7月26日间并没有改动webview内核
  - 功能限制
    - 一次只能打印一个东西（`console.log(a,b,c)`只会打出a）
    - 打对象不会显示属性  
      只会显示类名
    - 打得出函数
  
- 在app端webview会占满全屏  
  改webview的css也是全屏  
  
  > 会自动铺满整个页面（nvue 使用需要手动指定宽高）
  
- 加上进度条  
  在标签上加上如下属性：  
  `:webview-styles="{progress:{color: '你要的颜色'}}"`  
  iOS app里进度条颜色不会跟着这个走
  
- 可用个别uniapp的api  
  具体在[这个页面](https://uniapp.dcloud.net.cn/component/web-view?id=web-view)搜索“加载的网页中支持调用部分”查看
  
- 缓存  
  默认不缓存
  
- 有5+能力  
  可以在[官网](https://uniapp.dcloud.io/component/web-view)搜索“加载的 HTML 中是有 5+ 环境的”查看

- 底部留白  
  是有留白以适配iPhoneX等机型的，不需要在webview内部再进行处理  
  留白部分就是纯白色

和uniapp互动

- 非网页端用uni.postMessage通信  
  - 网页端直接用window.parent.postMessage
  - 小程序消息只有离开webview时才能接收
  - 目前uniapp端都是用@message  
    但是官网说@onPostMessage时比@message多了个“实时”
  
- 小程序端导航到webview外
  - 离开webview  
    `uni.navigateBack({delta: 1})`
  - 离开webview并到指定页面  
    `uni.switchTab({ url: '/pages/home/home' })`  
    （uni.navigateBack没用，甚至离开webview之后也没用）
  
- uniapp发消息给webview  
  获取一个代表webview的对象后发送消息

- 获取一个代表webview的对象  

  - 普通vue环境  

    ```js
    var currentWebview = this.$scope.$getAppWebview()
    setTimeout(function() {
      代表webview的对象 = currentWebview.children()[0]
    }, 1000)
    ```

    - 不延时的话currentWebview是空数组  
      [官网](https://uniapp.dcloud.io/component/web-view?id=app%e7%ab%afweb-view%e7%9a%84%e6%89%a9%e5%b1%95)也说了`如果是页面初始化调用时，需要延时一下`  
      官网延时用的就是setTimeout1000

    - 就算webview不是第一个元素  
      用`currentWebview.children()[0]`也能获取到

    - > currentWebview相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()

  - nvue环境  
    （没实操过，是看[评论中“阿宁啊”用户和别人的对话](https://ask.dcloud.net.cn/article/id-38730)得出的结果。[官网](https://uniapp.dcloud.io/component/web-view)最底部demo也是这样写的）  

    - 可以用ref获取到代表webview的对象  
      比如：`this.$refs.aaa`就是代表webview的对象



### 语法支持

资料

- [官网页面A](https://uniapp.dcloud.io/use)（已无法通过[首页](https://uniapp.dcloud.io/)进入）

特性

- div支持良好
- v-bind  
  - 打包小程序不支持（2021.09.13）  
    会红色报错`Error: 暂不支持 v-bind="" 用法`

- 在自定义组件中使用属性保留名作为prop  

  - 小程序上会有一些问题（2021.09.13）  

    - 打包会提示（普通颜色）：`[HBuilder] 13:58:42.643 提示：id 作为属性保留名,不允许在自定义组件 other-body 中定义为 props`
    - 提示了也仍然可以发布
    - 不过如果watch id的话，watch是不会触发的  
    - 而且id会加到标签上
    - 无法通过this.id获得到

    （没百度到相关信息）

- window对象

  - 小程序里没有window对象  
    （点发行后在微信开发者工具控制台里就可以看到报错）

- 在模板里使用原生函数  

  - 小程序不支持  
    已测过Number  
    微信开发者工具控制台上就会报错，而且报错不会说Number有问题

- mixin的components
  - 小程序不支持  
    注意：不会报错



### 配置

- 配置小程序的[页面配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html)  
  在[pages.json](https://uniapp.dcloud.net.cn/collocation/pages)的如下位置加的内容会加到小程序的配置里  

  ```json
  {
    "path": "hospital/index",
    "style": {
      配置
      "navigationBarTitleText": "医疗服务",
      "enablePullDownRefresh": false
    }
  }
  ```




### 未归类

- 解析html建议用[uview的u-parse组件](https://www.uviewui.com/components/parse.html)  
  不然样式上不上去（因为小程序会把v-html转为rich-text组件）  
  而且uview点图片后有全屏图片的功能
- canvas  
  要使用[uniapp的组件](https://uniapp.dcloud.io/component/canvas)  
  这个组件虽然也叫canvas，但实际上和web的canvas不是一个东西





# 其他特性

- 刷新的话页面滚动位置不会变  
  要变的话可以加如下代码  

  ```js
  mounted(){
    uni.pageScrollTo({
      scrollTop: 0,
    })
  },
  ```

  

  



# 问题排查

并不是所有问题排查都记录在这一部分  
如果问题只与本笔记记录的其他某个知识点有关，那问题直接会记在那个知识点下





- `position: sticky`iOS小程序下不生效  
  在外面套上[u-sticky组件](https://www.uviewui.com/components/sticky.html)也不一定好使，更多内容在本笔记里搜索“u-sticky”查看  
  <span style='opacity:.5'>（想要脱离该组件的话可以看看这个[这个问题](https://developers.weixin.qq.com/community/develop/doc/00086c29bdcba816bf2968f7d5fc00?_at=1566630830developers.weixin.qq.com)，可能有帮助）</span>



### 各端差异



小差异

- `requestAnimationFrame`  
  安卓app、小程序里没有
  
- `alert()`  
  安卓app无效
  
- 注释类

  - `:style="{/*xxx*/}"`  这种写法小程序不可用（`:class`的可以）  
    直接无法编译（报错只会告诉你哪个文件错了，不会告诉你更多信息）

  - 模板里监听事件时不能加内联注释  
    否则小程序里监听不上（可以通过编译，但是编译后代码里监听代码好像会变掉）  
    甚至用这种写法都不行：`@change="onTabChange;/*注释*/"`  
    （已测试u-tabs的chang事件）
    
  - 模板中多行js的话不能用单行注释，要用内联注释<span style='opacity:.5'>（对象中是个例外，对象中可以用单行）</span>
  
    ```vue
    <div
      v-if="
        // 2021.11.11晚 和龙杰口头确认无数据都是null
        true
      "
    >
    ```
  
    上面👆这种写法小程序无法编译  
    要改成👇下面的写法  
  
    ```vue
    <div
      v-if="
        /* 2021.11.11晚 和龙杰口头确认无数据都是null */
        true
      "
    >
    ```
  
- class里不能执行method  
  `:class="method"`可以  
  `:class="method(1)"`不行
- v-for里不能用解构赋值
- :style应该只能赋值字符串  
  试过用对象，不生效






##### 计算属性

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

- iOS app英文[连字](https://www.zhihu.com/question/25872415?rf=26390404)问题  
  - 解决办法  
    给`*`或`page`加一条样式：`font-family: Microsoft YaHei, Arial, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, sans-serif;`  
  - 更多内容  
    应该是默认就会连字的  
    不过webview里默认不会
  
- showToast有时不生效  

  - 解决办法：放在setTimeout里面，具体延迟多久看具体场景
  - [官方解释](https://ask.dcloud.net.cn/question/90442)：showToast 和 showLoading 会相互覆盖，而 hideLoading 也会关闭 showToast
  
- 小程序组件传参，传undefined会变null
  >杭兴也是这么认为的
  - 例子：sn项目搜索“小程序里undefined传进组件会变成null”  
  已提issue：https://github.com/dcloudio/uni-app/issues/2892

- 小程序对于键值为undefined的对象,v-for不会去迭代  
  已提issue：https://github.com/dcloudio/uni-app/issues/2893

- 小程序v-for对象，在新增对象属性后，标签上的属性渲染是重复的（这里说的属性包括ref）  
  已提issue：https://github.com/dcloudio/uni-app/issues/2894

  - 解决办法
    - 办法A  
      在模板中使用键名的部分用method返回  
  	  比如你要用`'字符串'+键名`，那么就写一个method接收键名，然后返回`'字符串'+键名`
    - 办法B  
      建一个计算属性，这个计算属性是对象的数组版，然后迭代这个计算属性

- 小程序mustache里会把null显示出来

- 小程序出现2条分割线  
  原因：画分割线的元素类名叫divider  
  解决办法：改用其他类名
  
- [prop的默认值为函数的话在小程序上有问题](https://github.com/dcloudio/uni-app/issues/2943)

- 小程序模板里不能直接调用$refs  
  比如：`<scroll-view @scrolltolower="$refs.xxx.mmm">`  
  否则一进页面就报错`Cannot read property 'mmm' of undefined`（不需要等事件触发就会报）  
  而且就算事件触发了也不能正确执行  

  - 替代方案：在method里用$refs
  
- 在外部给组件上样式的话小程序会有问题  
  （由于目前还未学习小程序，因此这部分内容还不能归纳进小程序里）  
  （其中slot在微信开发者工具里看是在#shadow-root外的）  

  - 问题表现  
    （组件内部上是没问题的）  
    （外部不管是用class还是style都不行）
    - padding挤压不到slot 
    - 加padding或margin后，上方会比其他平台多一个固定距离  
      （有一个例外，就是padding:0或margin:0，其他的就算是padding:0 1px也是一样的）  
      （这个距离不管padding或margin是多少都是一样的）
  - 解决办法  
    把要加的样式传给组件，组件用style去上

- 小程序端给view、text加了`box-sizing: border-box;`

- `position:sticky;`似乎都不会生效



# 缺点

- 性能差  
  sn项目中同一个时间轴功能，性能甚至不如webview
  
- 小程序一堆不支持的语法

- 要被收集数据  
  在[这个文章](https://ask.dcloud.net.cn/article/36937)里搜索“DCloud数据采集说明”查看
  
  



# 生态

- [项目模板](https://github.com/zhouwei1994/uni-app-demo)



### [uView](https://www.uviewui.com/components/intro.html)

- 以`u-`开头的组件是[uView](https://www.uviewui.com/components/intro.html)的组件，不需要在vue实例里注册
- 可以复制代码到项目里用  
  sn移动端就是这样做的，改代码也可以生效



bug

- [tabsSwiper](https://www.uviewui.com/components/tabsSwiper.html)滚动位置不正确
  - 解决办法  
    去源码里找到setScrollViewToCenter方法  
    然后把tab = this.tabsInfo[this.animationFinishCurrent]的animationFinishCurrent改为current
- [u-swiper](https://v1.uviewui.com/components/swiper.html)在数据减少后轮播图有可能白屏  
  - 具体说  
    设减少前数据量为a、减少后数据量为b  
    那么轮播到序号不小于b的图时进行减少数据量  
    且减少数据量的方式是给data赋值（只测过用这种方式减少）  
    那么就会白屏
  - 这个[swiper问题](https://ask.dcloud.net.cn/question/81562)十分类似本笔记说的bug
- [u-search](https://www.uviewui.com/components/search.html)组件为固定高度（高度无法用align-items: stretch撑开）
- [Navbar](https://www.uviewui.com/components/navbar.html#props)  
  height prop默认值其实不是44（官网说是44）  
  这个值到了小程序上就是48（起码微信开发者工具里看是48）
  - 如果把height设为44的话  
    `calc(var(--status-bar-height) + 44px`会比『该组件高度+状态栏高度』要高
- [image](https://www.uviewui.com/components/image.html)  
  width、height在小程序上设为100%是无效的  
  解决办法：补充对应style
- [u-sticky](https://www.uviewui.com/components/sticky.html)到达吸顶距离后元素消失  
  - bug出现条件
    - 有问题的例子：`<页面根标签><u-sticky>自定义组件</u-sticky></页面根标签>`
    - 没问题的例子：`<页面根标签><view><u-sticky>u-tabs组件</u-sticky></view></页面根标签>`
  - 解决办法：给offset-top（prop）传一个不合法的数值  
    起码可以让元素不消失

