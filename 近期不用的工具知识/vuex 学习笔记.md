# 入门测试(cdn)
Vuex.Store可存放改变自身数据的函数，这个函数放在mutations对象里，调用方法是  “代表new Vuex.Store的变量”.commit('mutations中的函数名')
mutations调用自身数据的方法是 函数的单参数.state的属性名（数据名）
外部调用vuex数据方法：“代表new Vuex.Store的变量”.state.数据名
实例内调用vuex数据
vuex数据用计算属性调用，vuex方法用methods调用

（视频）
Vue.set(a,'b','c')
给全局变量a增加属性'b'，'b'属性值为'c'
局部注册
this.$set(...)
给局部变量...
前置条件：1、import Vue from 'vue'2、a是原先存在的（已测试于data中）

（测试于data、method中）
用来给对象增加属性和属性值，并且触发视图更新，不然直接用设置属性值方法很难然vue检测到属性被添加（只有其他原有属性变化时才会触发视图更新）
不过感觉全局和局部的set没有差别
不过mutation中this.$set无法使用





-------------以下测试于构建环境中-------------



（记录）mapState不知道有什么用，而且没试验出任何变化



### handler（处理器）

即位于store中的五个值为函数的属性



### state与getter

- 2者可以重名

##### 设计意义

state代表完整的数据，而getter则是从完整数据中提取出需要操作的数据
若没有getter，在反复操作深层级的数据时将要多写很多代码
而且getter可以将需要的数据组合在一起，因此写state时只需要考虑查看整体数据时是否直观，不用担心数据结构在操作时会不够直观
如果在视图中使用state的话，在setter改变后不会触发视图更新而用getter的话会（不过用cdn写的进度条测试里setter改变后会触发视图更新）

（state也会触发视图更新，测试于vuex3.6.2、vue2.6.14）



### getter

- 使用  
  组件实例里用`this.$store.getters.getter名`来调用  
  当然，可以放computed里

- 定义  
  store的getters中写：  
  
   ```js
   函数名(state,getters){
     /*
     上一行的state和getters分别是是store中的state和getters子项
     因此都是用点（.）语法操作
     */
     return state.state的子项;
     /* 或者
     return getters.其他getter的名称; */
   }
   ```

   
  

### mapGetters

功能：简化computed中getter代码
使用前须在.vue文件内import { mapGetters } from 'vuex'
例子：

```js
computed: mapGetters({
    想在该.vue文件中代表这数据的名称: 'getter名'
})
```

**`...mapGetters`**

功能：可以让computed中插入getter以外内容
...mapGetters可以作为computed的一个属性



### mutation

mutation 都是同步事务

1. 实例的methods里写：  

   ```js
   实例中的函数名(传参){ //传参可以是对象及对象字面量
     this.$store.commit('store的mutations的函数名',传参);//【1】
   }
   ```

2. store的mutations中写：  

   ```js
   函数名(s,传参){//【2】
     //操作state中数据时写：s.要操作的数据名
     //操作getter中数据时写：this.getters.要操作的数据名
     //操作state和操作getter结果上看似乎没区别
     //这里的传参与实例的methods中的传参对应
   }
   ```

   

去掉传参也可以
【1】【2】处的传参也叫荷载（payload），且数量不能超过一个
因此要传多个数据应该使用对象或者数组









```js
...mapMutations([
    'a',  //要使用的method与Mutation同名
    b:'a' //将a Mutation放入b method中
          //可以提交荷载，甚至用字面量都可以提交
]),
```



### Action

- 提交（在实例中）：  

  ```js
  methods: {
      使用时想用的函数名() {
          this.$store.dispatch('存放于actions中的action名')
      }
  }
  ```

- 注册：  

  ```js
  actions:{
      action名(context) {
          //setTimeout(() => {
              context.commit('mutation名')
          //}, 600)
      }
  } //这个例子效果和直接使用mutation完全一致，就算加上setTimeout也是完全一致（mutation也能用setTimeout）
  ```

但是如果在mutation中使用异步脚本，vue-devtools无法在“时光旅行”中捕捉到那次mutation延时改变的数据，而action是异步结束后才生成“时光旅行”记录，所以能捕捉到异步后的数据。这就是【action存在的意义】
辅助函数和mutation等一致



### [Module](https://v3.vuex.vuejs.org/zh/guide/modules.html#%E6%A8%A1%E5%9D%97%E7%9A%84%E5%B1%80%E9%83%A8%E7%8A%B6%E6%80%81)





