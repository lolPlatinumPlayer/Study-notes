- [class-style component syntax](https://vuejs.org/v2/guide/typescript.html#Class-Style-Vue-Components)  

  > 让你可以Use the @Component decorator on classes. —— `vue ui`

  - 如果用`vue ui`新建项目时选择了ts，那就会问你要不要添加这个内容
    




- 不支持IE





# 使用vue3的理由

应用场景：分段加载组件（可能）、弹框组件



# 生命周期

- setup里用生命周期  
  
  - 命名：在普通生命周期前加上on  
    比如mounted就是onMounted  
    （源自[Vue Mastery](https://www.vuemastery.com/courses/vue-3-essentials/lifecycle-hooks/)1分42秒）
  
  - 不支持的生命周期  
    beforeCreate、created  
    （源自[Vue Mastery](https://www.vuemastery.com/courses/vue-3-essentials/lifecycle-hooks/)1分52秒）
  
    - 原因  
  
      - [官网](https://v3.cn.vuejs.org/guide/composition-api-lifecycle-hooks.html)说法
  
        > 在这些钩子中编写的任何代码都应该直接在 `setup` 函数中编写
  
      - [Vue Mastery](https://www.vuemastery.com/courses/vue-3-essentials/lifecycle-hooks/)说法（1分54秒）  
        beforeCreate就是setup  
        created就是setup之后
  
- 命名更改

  - beforeDestory、destroyed更名为beforeUnmount、unmounted  
    （源自[Vue Mastery](https://www.vuemastery.com/courses/vue-3-essentials/lifecycle-hooks/)1分15秒）



# [composition api](https://www.yuque.com/hugsun/vue3/composition)



- setup  
  似乎可以放vue2选项里的任何内容  
  最后返回内容就类似与vue2的选项

  - 可返回内容
    - state
    - 普通函数
  - computed返回内容
    
    - ref返回内容
    
  - > 应该避免使用 `this` —— [官网](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#setup-%E7%BB%84%E4%BB%B6%E9%80%89%E9%A1%B9)
  
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



# 内置组件

### [teleport](https://v3.cn.vuejs.org/api/built-in-components.html#teleport)

作用是更改模板的渲染位置

- 目标元素条件  
  在使用teleport的组件mounted前就要存在（beforeMount时就要存在）  
  （提醒：经过测试，如果没用v-if的话父子组件是同时mounted的）





# 个人记录

下次学https://www.yuque.com/hugsun/vue3/component#RCVh8

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

