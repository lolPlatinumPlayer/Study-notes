# 简要综述

- 编辑器  
  除了as外还可以用Eclipse和IntelliJ作为编辑器
- [API级别](https://developer.android.google.cn/guide/topics/manifest/uses-sdk-element#ApiLevels)



# android studio

[界面及名称说明](https://developer.android.google.cn/studio/intro#the_user_interface)

### 需配合使用的工具

这里只记录各工具与android studio衔接的部分

- 查看jdk与Android SDK的安装位置  

  - jdk  
    - AS Arctic Fox Patch 1（203）版本  
      要去Gradle的设置里找  
      （打开Gradle设置的方法在本笔记搜索“打开Gradle设置”即可查看）  
      （不过里面写的是一个jre的地址）
    - AS202版本  
      点左上角File按钮，然后点Project Structure按钮
  - Android SDK  
    点左上角File按钮，然后点Project Structure按钮  
    （怀疑这里装的也不是Android SDK，起码运行不了`android -h`）

- jdk  
  旧版AS应该都是有jdk的，202开始应该只有jre  
  （一次装202升级Arctic Fox Patch 1（203）后发现没有jdk）

  - > OpenJDK（Java 开发工具包）与 Android Studio 捆绑在一起 —— [官方推荐的教程](https://developer.android.com/codelabs/android-training-hello-world?index=..%2F..%2Fandroid-training#2)

  - > 安装android studio时就要配上jdk —— 冯怡茹
  
  - > java -version没输出成功不代表没有jdk，AS是只要电脑硬盘里有jdk选位置就行了 —— 冯怡茹
- Android SDK  
  [官网](https://developer.android.google.cn/studio/install?hl=zh-cn#windows)的安装视频里有下载Android SDK的选项  
  但是2021.7.9下载的202.7486908版本android studio里并没有这个选项

  - AS启动时如果没在默认位置检测到Android SDK  
    会弹窗提示`Unable to access Android SDK add-on list`  
    ![`Unable to access Android SDK add-on list`](https://img-blog.csdn.net/20180809133741180?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTAzNTgxNjg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)（不知道是不是只有第一次打开时才有，Arctic Fox Beta5（2021.7.9下载）在日常使用中是没看见这个弹窗的)  
    可以百度到不少相关资料【】搞这个
    
  - >android studio需要android sdk，一般是软件下载完之后可以再配置的 —— 冯怡茹

- gradle
  - 开启项目后gradle下半天的问题  
    开系统翻墙也不好使  
    - 解决方法：
      1. 翻墙下好gradle的压缩包  
         （比如gradle-6.5-bin.zip就是[这个地址](https://downloads.gradle-dn.com/distributions/gradle-6.5-bin.zip)）
      2. 关掉AS
      3. 找到类似`C:\Users\Administrator\.gradle\wrapper\dists\gradle-6.5-bin\6nifqtx7604sqp1q6g8wikw7p`这样的目录
      4. 把类似`gradle-6.5-bin.zip.lck`和`gradle-6.5-bin.zip`的2个文件删掉
      5. 放入下好的gradle压缩包
      6. 开启AS
      7. 剩下的AS会处理好，也会把压缩文件解压出来
  - 打开Gradle设置方法  
    AS Arctic Fox Patch 1（203）版本
    - 方法一：在右侧打开  
      按下图顺序点击  
      ![在AS右侧打开gradle设置的方法](..\图片\在AS右侧打开gradle设置的方法.png)
    - 方法二：在file按钮里打开  
      先点击左上角file按钮  
      再点击Settings按钮  
      再点下图红框  
      ![在file按钮里打开gradle设置的方法](..\图片\在file按钮里打开gradle设置的方法.png)



### 打包

1. 点上方工具栏的Build
2. 点下拉列表里的Make Project
3. 等待
4. 然后在`项目路径\app\build\outputs\apk\debug`下就可以找到apk文件了



### 版本

- [版本说明（含大版本介绍）](https://developer.android.google.cn/studio/releases)
- [版本大全（及下载地址）](https://developer.android.google.cn/studio/archive)  
  （语言选择中文的话更新有延迟）



# 使用真实设备运行

初次安装调试的app时可能要选择“允许文件传输”



**步骤**

1. 准备好AS等各种东西
2. 在AS新建项目  
   要注意设置的`Minimum API level`不能高于手机的
3. usb连接手机与电脑
4. 手机开启USB调试
5. 如果顺利的话几秒内AS就会开始加载  
   加载成功的话这块就会显示出连接的手机  
   ![AS上显示的手机](../图片/app开发/AS上显示的手机.PNG)
6. 点击上图的绿色三角  
   然后手机上就会提示安装app  
   点允许即可



如果有步骤进行不下去的话看这里

- 第5步未显示出连接的手机的话  
  - 原因：应该就是AS没检测到连接的手机  
    有一个方法可以进一步确定这个猜想  
    那就是：上方工具栏 -> Tools -> Troubleshoot Device Connections
  - 解决办法：  
    华为手机的话需要安装华为手机助手  
    调试的时候不开华为手机助手也可以
- 第6步手机上提示`解析包时出现问题`  
  并且AS上有如下提示  
  ![android_studio真机调试失败报错A](../图片/app开发/android_studio真机调试失败报错A.PNG)  
  - 问题原因：  
    app的`Minimum API level`设置得太高了
  - 解决办法：  
    把app的`Minimum API level`设置得不高于手机的





**google给的用真实设备运行的方式都不好使**

- 方式A

  > 1. 在Android Studio中，从工具栏的“运行/调试配置”下拉菜单中选择您的应用。
  > 2. 在工具栏中，从目标设备下拉菜单中选择要在其上运行应用程序的设备。
  >
  > —— [在真实设备上运行app](https://developer.android.google.cn/training/basics/firstapp/running-app#RealDevice)

- 方式B：[安装OEM USB 驱动程序](https://developer.android.google.cn/studio/run/oem-usb)  
  这个页面并没有什么卵用  
  对win7的2个操作并没有什么卵用  
  OEM USB驱动程序也么有什么卵用  



# 模拟真实设备

如果已经配置完毕的话，只要点击Run按钮（![toolbar-run](../图片/app开发/toolbar-run.png)）就可以模拟真实设备（要稍等一会才会开启）

- 如果没有模拟成功  
  1. 需要在Tools列表的AVD Manager选项卡里查看是否有可用的配置
     1. 有的话  
        检查是否在下拉列表里选择了可用的AVD  
        下拉列表如下：  
        ![下拉列表中的AVD](../图片/app开发/下拉列表中的AVD.png)

     2. 有一次装好AS发现很多地方都找不到AVD Manager  
        像上面截图的这个列表里就没有（好像列表都没看见）  
        Tools列表里也没有AVD Manager  
        不过这时候右上角是有![AVD Manager](https://developer.android.google.cn/studio/images/buttons/toolbar-avd-manager.png)图标的  
        这3个地方点开效果都一样的  
        同时还有如下报错   

        ```
        Could not automatically detect an ADB binary. Some emulator functionality will not work until a custom path to ADB is added. This can be done in Extended Controls后续内容懒得打字了
        ```

        后来在几次关闭、新建项目后这些东西就都有了，也不报错了（除了新建、关闭项目外什么操作都没做)

- 打开虚拟设备后一直白屏的问题  
  按[这篇文章](https://blog.csdn.net/cjzjolly/article/details/79892191)把Graphics选项改为Software后再开就正常了  

  - 详细描述  
    有一次一开始并没有白屏问题  
    开关多次后不知道在哪个环节出现了白屏问题  
    并且多次重启也不行



在AS中打开模拟设备的另一个方法：

Run -> Debug -> App -> Run



**Android Emulator和AVD的关系**

> AVD是一种配置，用于定义要在[Android Emulator](https://developer.android.google.cn/studio/run/emulator)中模拟的Android手机，平板电脑，War OS，Android TV或Automotive OS设备的特征 。—— [创建和管理虚拟设备](https://developer.android.google.cn/studio/run/managing-avds)

意思就是说AVD是Android Emulator中的一个概念



**3种配置的优先级**

> - AVD configuration properties override hardware profile properties.
> - Emulator properties that you set while the emulator is running override them both.  
>
> —— [AVD properties](https://developer.android.google.cn/studio/run/managing-avds#avdproperties)







**[Android Emulator](https://developer.android.google.cn/studio/run/emulator)**

安卓模拟器

> 提供了真正的Android设备的几乎所有功能。可以安装app、存储文件，模拟来电和短信，指定设备的位置，模拟不同的网络速度，模拟旋转和其他硬件传感器，访问Google Play商店等等。 —— [《Android Emulator》](https://developer.android.google.cn/studio/run/emulator)

[《Android Emulator》](https://developer.android.google.cn/studio/run/emulator)里还提供了更多详细信息





**AVD**

android virtual devices（安卓虚拟设备）

> - AVD在电脑上有专用存储区域
> - AVD 存储设备用户数据，如已安装的应用和设置以及模拟 SD 卡
> - 可以用AVD Manager 擦除用户数据
>
> —— [google之存储区域](https://developer.android.google.cn/studio/run/managing-avds#storage)



**AVD Manager与avdmanager**

> AVD Manager是一个可以从 Android Studio 启动的界面 —— [创建和管理虚拟设备](https://developer.android.google.cn/studio/run/managing-avds)

> `avdmanager` 是一个命令行工具 —— [avdmanager](https://developer.android.google.cn/studio/command-line/avdmanager)



**AVD Manager**

- AS里很多地方都可以打开AVD Manager（不同地方点开效果一样的）  
  比如右上角的这个按钮![AVD 管理器图标](https://developer.android.google.cn/studio/images/buttons/toolbar-avd-manager.png)  
  点开可以看到一个个AVD  
  双击AVD即可在屏幕上呼出虚拟手机



# 命令行

- `android.BAT`  
  以`“android sdk”绝对路径\tools\android.BAT`开头在命令行里可以执行一些命令  
  - 查看可执行命令：  
    执行`“android sdk”绝对路径\tools\android.BAT`来查看  
  - 可执行命令示例：  
    `D:\devtools\android\android_sdk\tools\android.BAT list target`



# 其他



### android sdk  

- 判断Android SDK是否安装成功  

  > 命令`android -h` —— [某个不一定靠谱的博客](https://blog.csdn.net/weixin_33898233/article/details/93065818)

- adb  

  > Android 调试桥 (adb) 是一种功能多样的命令行工具，可让您与设备进行通信 —— [android调试桥(adb)](https://developer.android.google.cn/studio/command-line/adb?hl=zh_cn)

  - > `adb` 包含在 Android SDK 平台工具软件包 —— [android调试桥(adb)](https://developer.android.google.cn/studio/command-line/adb?hl=zh_cn)



### gradle

##### 配置环境变量

- 方法A  
  参考[腾讯云](https://cloud.tencent.com/developer/article/1719340)  
  可用，步骤如下  
  1. 增加系统变量GRADLE_HOME  
     之前设的值为`C:\Users\Administrator\.gradle\wrapper\dists\gradle-7.0.2-bin\857tjihv64xamwrf0h14cai3r\gradle-7.0.2`  
     这应该是AS下的一个地址
  2. 在系统变量Path前加上`%GRADLE_HOME%\bin;`
- 方法B   
  [这个博客](https://blog.csdn.net/shilei_comeon/article/details/111152149)说可以直接去Path添加，但是不友好  
  （没实践过）





# 学习

- [官方推荐的教程](https://developer.android.com/courses)