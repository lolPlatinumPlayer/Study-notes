- [class-style component syntax](https://vuejs.org/v2/guide/typescript.html#Class-Style-Vue-Components)  

  > 让你可以Use the @Component decorator on classes. —— `vue ui`

  - 如果用`vue ui`新建项目时选择了ts，那就会问你要不要添加这个内容
    




- 不支持IE





# 生命周期

- setup里用onMounted  
  不需要在setup里return onMounted



# [composition api](https://www.yuque.com/hugsun/vue3/composition)



- setup  
  似乎可以放vue2选项里的任何内容  
  最后返回内容就类似与vue2的选项

  - 可返回内容
    - state
    - 普通函数
  - computed返回内容
    - ref返回内容
  
- reactive与ref  
  reactive制造一整套vue2中的data  
  而ref只对原始值使用  
  
  - reactive  
    制造state（vue2中的data选项）  
    
    > 这个能力是完全独立的 —— [大圣](https://www.yuque.com/hugsun/vue3/composition#NhZ0H)
    
  - ref  
    
    - 更改数据  
      示例：`数据.value=10`
  
- computed  
  老样子





# 个人记录

下次学https://www.yuque.com/hugsun/vue3/composition#jAd66

- hrtPC一个项目新建后停在了如下命令行(项目本身可以运行)  

  ```cmd
  {"type":"warning","data":"@vue/cli-service > html-webpack-plugin@3.2.0: 3.x is no longer supported"}
  {"type":"warning","data":"@vue/cli-service > webpack-dev-server > chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies."}
  
  ```

  另一个改用npm的项目则一切正常（npm项目文件夹名称：`nots_usenpm`）

  - 背景  
    vue ui：yarn babel
  - 路径  
    `D:\learning_materials\vue3\code\nots`

