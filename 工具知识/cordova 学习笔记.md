- 平台  

  - 执行`cordova platform list`命令列出的平台可能不全  
    不过依旧可以通过`cordova platform add 平台`命令添加平台

  - 已知平台有：
    - android
    - browser
    - ios
    - electron
    - windows


- 开发指定平台的前置条件  
  除了bowser以外都有前置条件  
  - 检查是否满足添加的各平台的前置条件    
    `cordova requirements`
  - 各平台的前置条件
    - [android](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#installing-the-requirements)  
      - Android SDK




# 创建项目

- 不使用模板  
  `cordova create 路径`
- 使用模板  
  `cordova create path [id [name [config]]] [options]`  
  可参考资料有：[教程](https://cordova.apache.org/docs/en/latest/guide/cli/template.html)和[CLI](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html#cordova-create-command)  





跑起项目

- 安卓
  1. 开启模拟的设备  
     （比如通过AS开启）
  2. `cordova run android`  
     这时模拟设备上就已经有项目对应的应用了  
     （自己操作下模拟设备就能开启这个应用）





执行`cordova run 平台名`时可能遇到的问题

- 安卓
  - 可能在下载gradle-6.5-all.zip上出现问题  
    - 问题表现：
      - 等待时间过长
      - 命令执行失败并报错`Could not unzip`
    - 解决方案：  
      翻墙下载[gradle-6.5-all.zip](https://downloads.gradle-dn.com/distributions/gradle-6.5-all.zip)  
      并替换类似如下地址中的`gradle-6.5-all.zip`  
      `C:\Users\Administrator\.gradle\wrapper\dists\gradle-6.5-all\2oz4ud9k3tuxjg84bbf55q0tn`






# 学习



待做事项

- 在手机上调试cordova app
- 更换AS及其他安卓内容的下载地址



目录意义

- learnCordova_1  
  以`cordova create learnCordova_1`命令创建的项目  
  目前遇到了安卓开发环境不足的问题
- hello  
  跟着[create your first app](https://cordova.apache.org/docs/en/latest/guide/cli/index.html)走所建立出来的项目



当前Android Studio和安卓的一些东西可能被弄乱了，已经搞不清了

