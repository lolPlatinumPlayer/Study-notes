


### 创建项目

- 不使用模板  
  `cordova create 路径`
- 使用模板  
  `cordova create path [id [name [config]]] [options]`  
  可参考资料有：[教程](https://cordova.apache.org/docs/en/latest/guide/cli/template.html)和[CLI](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html#cordova-create-command)  





### 运行项目

简要步骤：

1. `cordova platform add 平台`
2. 准备好平台的前置条件
3. `cordova run 平台名`



##### 平台概念  

- 查看已添加和可添加的平台  
  `cordova platform list`  
  该命令列出的平台可能不全  
  不过就算是没列出来的平台，也可以使用`cordova platform add 平台`命令
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



##### 各平台的介绍

- browser  
  没有前置条件
- android  
  前置条件应该在[这个页面](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#installing-the-requirements)里都说了  
  应该只要AS能跑起项目，cordova也可以
  - 使用模拟设备运行  
    如果AS里模拟不成功的话说明还没达到可以在cordova里模拟的条件
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

- ios  

  - > 要求
    >
    > - 基于 Intel 的 Mac 上的 OS X 操作系统
    > - Xcode® 11.0（最低要求版本）仅在 OS X 版本 10.14.4 (Mojave) 或更高版本上运行，并包含 iOS 13 SDK（软件开发工具包）
    > - 要将应用程序提交到 Apple App Store℠，需要最新版本的 Apple 工具
    >
    > —— [官网](https://cordova.apache.org/docs/en/10.x/guide/platforms/ios/index.html#requirements-and-support)





##### 可能遇到的问题

执行`cordova run 平台名`时

- 安卓  
  这里没列出的问题可以查阅《android 学习笔记.md》
  - 可能在下载gradle-6.5-all.zip上出现问题  
    - 问题表现：
      - 等待时间过长
      - 命令执行失败并报错`Could not unzip`
    - 解决方案：  
      翻墙下载[gradle-6.5-all.zip](https://downloads.gradle-dn.com/distributions/gradle-6.5-all.zip)  
      并替换类似如下地址中的`gradle-6.5-all.zip`  
      `C:\Users\Administrator\.gradle\wrapper\dists\gradle-6.5-all\2oz4ud9k3tuxjg84bbf55q0tn`






# 学习

待学习内容

- 项目搞起来



非重点学习事项

- 更换AS及其他安卓内容的下载地址



目录意义

- learnCordova_1  
  以`cordova create learnCordova_1`命令创建的项目  
  目前遇到了安卓开发环境不足的问题
- hello  
  跟着[create your first app](https://cordova.apache.org/docs/en/latest/guide/cli/index.html)走所建立出来的项目  





