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



# HBuilder



### 未归类

- 依据文件名进行搜索  
  快捷键：ctrl+P



### 调试

- [这个页面](https://uniapp.dcloud.net.cn/snippet?id=%e4%bd%bf%e7%94%a8hbuilderx%e5%86%85%e7%bd%ae%e6%b5%8f%e8%a7%88%e5%99%a8%e8%b0%83%e8%af%95h5)说了一些调试内容



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
  焰荣的iphone就不行



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
  - 一次在超长时间连接iphone后，开启了iTunes，过了半个小时，可以连手机了，可以访问存储空间，不过iTunes上还是没有显示手机（测试说用的数据线只能充电，不能传数据）





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

（这部分内容都测试于：寿宁移动端项目）  

- 页面生命周期甚至包含尺寸变化、滚动到底部、点分享按钮等事件
- onLoad参数包含url中get形式的参数  
- 组件的mounted与onShow在web上的区别
  - 路由的返回不会触发mounted，但是会触发onShow

<span style='opacity:.5'>早期结论</span>

- onShow、onHide在进出页面时会执行 
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
  在pages.json的pages或subPackages里配置  
  （pages和subPackages应该是主包和分包的区别）
  - 文件路径和url路径必须保持一致  
    都是通过子项的path配置指定的

- [subPackages](https://uniapp.dcloud.net.cn/collocation/pages?id=subpackages)配置方法  
  主要做小程序的分包，2.7.12开始也做了app的分包  
  subPackages一个子项代表一个分包  
  一个分包可以包含多个页面

  - 路径的编写  
    root配置项加上pages子项的path构成一个路径  
    其中root的结尾和path的开头都不用加`/`

- 导航栏  

  - 指定一些页面隐藏导航栏  

    - 方法  
      在pages.json里配置  
      目前发现如下2种方法（目前没发现2种方法的差别）  

      - 将style属性的navigationStyle属性设为custom
      - 将style属性的app-plus属性的titleNView设为false

      （已测试网页端和安卓app端，可以隐藏包含webview的页面）

    - > 小程序端 web-view 组件一定有原生导航栏，下面一定是全屏的 web-view 组件，navigationStyle: custom 对 web-view 组件无效 —— [官网](https://uniapp.dcloud.net.cn/component/web-view)
    
      （微信）小程序就算去了导航栏，右上角的按钮也去不掉



##### 组件

- 组件的method应该不能起名为uniapp的生命周期  
  否则不生效（`vm.$options.methods`里都找不到）  
  已试过onReachBottom



### 组件库

- uni-app本身就内置了一些组件，不需要引入就可以使用  
  从组件名分辨不出来是否是内置组件，不过可以在[官网](https://uniapp.dcloud.io/component/view)查看所有内置组件
- 以`u-`开头的组件是[uView](https://www.uviewui.com/components/intro.html)的组件，不需要在vue实例里注册



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



##### [uView](https://www.uviewui.com/components/intro.html)

- 可以复制代码到项目里用  
  sn移动端就是这样做的，改代码也可以生效



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

- `uni.navigateTo({url:一个地址})`  
  可以写相对地址也可以写绝对地址  
  <span style='color:red'>写错地址不会报错也没有任何反应</span>



### api

- 图片全屏  
  [`uni.previewImage`](https://uniapp.dcloud.net.cn/api/media/image?id=unipreviewimageobject)



### 原生api

文件相关

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
  
- 打开文件  
  示例代码如下  

  ```js
  openFile(item){
    uni.showLoading({
      title: '正在打开文件'
    })
    // > 打开文件有效值 doc, xls, ppt, pdf, docx, xlsx, pptx ———— https://www.cnblogs.com/lizhao123/p/11498948.html
    // 经过测试，jpg也是可以的。已测试平台：安卓app、安卓小程序
    // 经过测试，rar也是可以的。已测试平台：安卓app
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
  
- 保存文件  
  示例代码如下  

  ```js
  uni.saveFile({
    tempFilePath: res.tempFilePath,
    success: (...a)=> {
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
    没法固定，安卓app是时间戳、安卓小程序又是另一个、win10chrome倒是有按下载路径作为文件名过  
    （文件名和下载路径也没关系）



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
  
- 可用少量uniapp的api  
  具体在[这个页面](https://uniapp.dcloud.net.cn/component/web-view?id=web-view)搜索“加载的网页中支持调用部分”查看

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
  在pages.json的如下位置加的内容会加到小程序的配置里  

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



# 缺点

- 性能差  
  sn项目中同一个时间轴功能，性能甚至不如webview
- 小程序一堆不支持的语法



# 其他



### vConsole

- 安卓app不可用
- 浏览器可用
- 微信小程序  
  初始不显示，点右上角三个点后点“打开调试”显示  
  有时候在三个点里找不到，点“打开性能监控面板”后就能找到了

