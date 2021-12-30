# 综合介绍

- > cordova最初被称作PhoneGap —— 《JavaScript移动设备应用程序开发》

- >adobe将PhoneGap的核心抽离出来，命名为cordova —— [黑马视频07:12](https://www.bilibili.com/video/BV1N4411A77d?p=1)





# 入门

**安装**

npm install -g cordova



**创建项目**

- 不使用模板  
  `cordova create 路径`
- 使用模板  
  `cordova create path [id [name [config]]] [options]`  
  可参考资料有：[教程](https://cordova.apache.org/docs/en/latest/guide/cli/template.html)和[`cordova create`](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html#cordova-create-command)  



**打包**

cordova build



# 平台概念  

- 查看已添加和可添加的平台  
  `cordova platform list`  
  该命令列出的平台可能不全  
  有的平台就算没列出来也可以使用`cordova platform add 平台`命令
  - 已知平台有：
    - android
    - browser
    - ios
    - electron
    - windows

- 用命令行查看平台所需的『前置条件』  
  `cordova requirements`  
  可能会有些不准确的地方  
  （『前置条件』并不是一个专业术语）



# [工作流](https://cordova.apache.org/docs/en/10.x/guide/overview/index.html#development-paths)

分为 **跨平台 (CLI) 工作流** 和 **以平台为中心的工作流**



# 运行项目

这里只说『跨平台 (CLI) 工作流』  
<span style='opacity:.5'>（不过`cordova platform add android`后会显示`Using cordova-fetch for cordova-android@^9.0.0`，不知道这是不是意味着用的是以平台为中心的工作流）</span>

简要步骤：

1. `cordova platform add 平台`
2. 准备好平台的前置条件
3. 在项目里放入www文件夹（前端包）
4. `cordova run 平台名`  
   （如果没有www文件夹的话会报错`urrent working directory is not a Cordova-based project`）



### browser平台  

没有前置条件

- `cordova run browser`  
  就相当于起了一个http服务器，并在浏览器里打开页面  
  - 起了之后改文件也不会变  
    （刷新也没用）



# android平台

### 特性

- 前置条件  
  应该在[这个页面](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#installing-the-requirements)里都说了  

- AS里能在模拟设备里跑项目

  - 就代表到达执行`cordova platform add android`的条件了
  - 不代表cordova能跑项目（`cordova run android`）  
  
- 跑项目成功的一些细节  
  跑项目指的是`cordova run android`命令
  - 成功的标志  
    控制台打印出`Waiting for emulator to start...`
  - 成功的同时会产生apk  
    产生位置为`platforms\android\app\build\outputs\apk\debug`
  - 初次运行成功有可能比较慢  
    比如要下载gradle  
    后续运行就很快了

- `cordova run android`后产生的apk  
  - `assets/www`就是`www`文件夹里的东西复制来后加了一些cordova的js
  
- 打包生成的包  
  和运行项目生成的一模一样

- > run android后会部署在设备上，可在设备上测试 —— 《JavaScript移动设备应用程序开发》

### 操作

- 使用模拟设备运行  
  1. 开启模拟的设备  
     （比如通过AS开启）
  2. `cordova run android`  
     这时模拟设备上就已经有项目对应的应用了  
     （自己操作下模拟设备就能开启这个应用）
- 使用真实设备运行  
  如果AS里不能运行的话说明还没达到可以在cordova里真机调试的条件
  1. usb连好手机
  2. `cordova run android`  
     这时手机上就会提示有app可以安装了  
     （畅享20plus5G只要连上手机执行这个命令就行了，不需要再运行华为手机助手之类的软件）
- 调试  
  chrome远程调试可以发现运行的app，但是目前点inspect后没成功调试过（背景：同时在调试node。[这个文章](https://www.cnblogs.com/cannel/p/11074387.html)的系列文章上说是要装一个东西才行）
  
  



### 问题排查

- 执行`cordova run android`时  
  （这里没列出的问题可以查阅《android 学习笔记.md》）

  - 如果jdk有问题的话就会报如下错误  

    ```cmd
    Checking Java JDK and Android SDK versions
    ANDROID_SDK_ROOT=undefined (recommended setting)
    ANDROID_HOME=undefined (DEPRECATED)
    Failed to run "javac -version", make sure that you have a JDK version 8 installed.
    You can get it from the following location:
    https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
    ```

    解决办法：在Path系统变量前加上“java命令行地址”（比如`D:\devtools\jdk\8\software_body\bin;`）

  - 如果gradle有问题的话就会报如下错误  

    ```cmd
    ANDROID_SDK_ROOT=undefined (recommended setting)
    ANDROID_HOME=undefined (DEPRECATED)
    Using Android SDK: C:\Users\Administrator\AppData\Local\Android\sdk
    Could not find an installed version of Gradle either in Android Studio,
    or on your system to install the gradle wrapper. Please include gradle
    in your path, or install Android Studio
    ```

    解决办法：配置gradle的环境变量（详细去《android 学习笔记》搜索“配置环境变量”查看）  
    配好后再运行cordova run android就会下载gradle-6.5-all.zip（环境变量配的是7.0.2）  
    命令行也会展示进度，到最后就会打印`Waiting for emulator to start...`（看到这句话就代表命令执行成功了）  

  - 可能在下载gradle-6.5-all.zip上出现问题  

    - 问题表现：
      - 等待时间过长
      - 命令执行失败并报错`Could not unzip`
    - 解决方案：  
      翻墙下载[gradle-6.5-all.zip](https://downloads.gradle-dn.com/distributions/gradle-6.5-all.zip)  
      并替换类似如下地址中的`gradle-6.5-all.zip`  
      `C:\Users\Administrator\.gradle\wrapper\dists\gradle-6.5-all\2oz4ud9k3tuxjg84bbf55q0tn`



- 缓存  
  这里说的内容可能是[Gradle Daemon](https://docs.gradle.org/current/userguide/gradle_daemon.html)的特性

  - > `项目根目录\platforms\android\app\src\main\res`下不能有不能有预料外的文件 —— qq用户2178551572

    例子：一次将图标指定为png后`cordova run android`读的还是`res\mipmap-mdpi`下的ico，要将ico删除才会读png

  - `cordova run android`之后会在res文件夹下产生文件  
    再次run并不会删除之前run产生的文件





- 执行命令失败并报错`No Java files found that extend CordovaActivity`
  - 解决办法  
    `cordova platform rm android`后`cordova platform add android`
  - 出现原因  
    有次移动目录后出现了  
    有次可能是改到配置文件所以出现了






# ios平台  

### 要求

- 关于Intel芯片  
  虽然看过的权威资料里都说要Intel芯片  
  不过issue里有人是用m1芯片的，不过用m1问题比较多

  - > 基于 Intel 的 Mac 上的 OS X 操作系统 —— [官网](https://cordova.apache.org/docs/en/10.x/guide/platforms/ios/index.html#requirements-and-support)

- > 用cordova开发iOS应用要安装iOS sdk —— 《JavaScript移动设备应用程序开发》

  - 一般不需要单独安装  
    通过xcode就可以搞定（具体是自带还是在xcode里下载忘记了）

  




### 特性

- 运行项目会自己打开模拟器




### 操作

- 打包  
  打包后生成iOS项目  
  项目位置为：`platform/ios`<span style='opacity:.5'>（这个叫ios的文件夹就是项目）</span>
  - 前端代码存放位置  
    访达里看是`ios/www`  
    Xcode里看是`Staging/www`  
    <span style='opacity:.5'>（Xcode里最外层的www文件夹不知道是干嘛的）</span>

### 问题排查

- 报错：这不是cordova项目  
  完整的错误是`Current working directory is not a Cordova-based project`  
  原因之前删了www和platform/ios  
  解决方法：放弃这个目录再开一个（网上说建好www就行，试过不行）



# 插件

### 定位

- org.apache.cordova.geolocation  
  `cordova plugin add org.apache.cordova.geolocation`后用`navigator.geolocation.getCurrentPosition`即可  
  - 错误
    - code是null，message空串  
      原因：没给app授予定位权限



# 其他

### 配置

[`config.xml`](https://cordova.apache.org/docs/en/latest/config_ref/)

- 设置app名  
  name标签间的内容就会作为app的名称  
  （已在安卓10上测试）
- 设置id  
  widget标签的id属性就是id  
  同id的应用在一个设备上只能装一个  
  （已在安卓10上测试）
- 设置app的初始页面  
  content标签的src属性
  - 错误  
    - www文件夹不存在的话运行命令会报错
    - 如果www在而指定文件不存在就不会报错（起码目前没发现报错文本）  
      可以进行打包  
      在iphone13ios15模拟器上app打开会是白屏
- [图标](https://cordova.apache.org/docs/en/10.x/config_ref/images.html)  
  - 图标地址  
    就和官网说的一样是从项目根目录算起的（项目根目录不是指www）  
    如果写错，在用run命令运行项目时会提示你路径不存在（`Source path does not exist: 图标文件名.后缀名`）
  - 图片格式  
    安卓只支持xml和png（2021.12.18测试结果）  
    如果用其他格式则无法通过编译并报错`项目根目录\platforms\android\app\src\main\res\mipmap-mdpi\ic_launcher.后缀名: Resource and asset merger: The file name must end with .xml or .png`








# 学习



非重点学习事项

- 更换AS及其他安卓内容的下载地址



目录意义

- learnCordova_1  
  以`cordova create learnCordova_1`命令创建的项目  
  目前遇到了安卓开发环境不足的问题
- hello  
  跟着[create your first app](https://cordova.apache.org/docs/en/latest/guide/cli/index.html)走所建立出来的项目  
  目前笔记本电脑上的是重装前复制过来的
- helloBuildByThisComputer  
  笔记本跟着[create your first app](https://cordova.apache.org/docs/en/latest/guide/cli/index.html)走所建立出来的项目





