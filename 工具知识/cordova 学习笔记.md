- 平台  

  - 执行`cordova platform list`命令列出的平台可能不全  
    不过依旧可以通过`cordova platform add 平台`命令添加平台

  - 已知平台有：
    - android
    - browser
    - ios
    - electron
    - windows

- 前置条件
  
  - 检查是否满足添加的各平台的前置条件  
    `cordova requirements`
  
  - [android](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#installing-the-requirements)  



# 创建项目

- 不使用模板  
  `cordova create 路径`
- 使用模板  
  `cordova create path [id [name [config]]] [options]`  
  可参考资料有：[教程](https://cordova.apache.org/docs/en/latest/guide/cli/template.html)和[CLI](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html#cordova-create-command)  



# 非cordova内容

### android studio

- 开启项目后gradle下半天的问题  
  开系统翻墙也不好使  
  - 解决方法：
    1. 翻墙下好gradle的压缩包
    2. 关掉AS
    3. 找到类似`C:\Users\Administrator\.gradle\wrapper\dists\gradle-6.5-bin\6nifqtx7604sqp1q6g8wikw7p`这样的目录
    4. 把类似`gradle-6.5-bin.zip.lck`和`gradle-6.5-bin.zip`的2个文件删掉
    5. 放入下好的gradle压缩包
    6. 开启AS
    7. 剩下的AS会处理好，也会把压缩文件解压出来






# 学习



目录意义

- learnCordova_1  
  以`cordova create learnCordova_1`命令创建的项目  
  目前遇到了安卓开发环境不足的问题
- hello  
  跟着[create your first app](https://cordova.apache.org/docs/en/latest/guide/cli/index.html)走所建立出来的项目