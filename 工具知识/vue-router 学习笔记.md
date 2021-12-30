



这是第三版的笔记



- > 第四版只支持Vue3 —— [第四版仓库](https://github.com/vuejs/vue-router-next)

- 变量名意义

  - `VueRouter`  
    vue-router的node_module包导出的变量

    - 导入方式  

      ```js
      import VueRouter from "vue-router"
      ```

      





# 基础

工程化的完整例子如下

```js
import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

const router=new VueRouter({
  routes:[
    { 
      name:'xx',
      path: '/dd',
      component: { template: '<div>foo</div>' } 
    },
  ]
})

new Vue({
    // 其他内容
    router,
}).$mount('#app')
```

然后在`<router-view></router-view>`内就可以渲染路由了



- vue-router直接引入不支持ie9，不过听说用工程化的方法使用的话是支持的

- 让vue-router生效方法  
  将其html部分包裹在一个标签内，并将该标签挂载。挂载例子：  

  ```javascript
  new Vue({
      router //这个是router实例
  }).$mount('#app')
  ```






### 定义路由
```javascript
const routes = [
    { 
        name:'xx',
        path: '/dd',
        component: { template: '<div>foo</div>' } 
    },
]
```
- `name`值可以带`.`带数字
- `path`的值是路由  
  里边可以带`.`带数字
- `component`的值是组件

### 创建 router 实例
```javascript
const router = new VueRouter({
    routes
})
```





### [`router-link`](https://router.vuejs.org/zh/api/#router-link)

- `router-link`标签中to属性的值代表路由（跳转到的组件）
  - to传入字符串时  
    必须以/开头且不能以/结尾
  - to传入对象时  
    对象和`router.push()`里的一致
- `router-link`要加点击事件的话要写`@click.native`，而且直接写语句的话就算加了箭头函数也是没有this
- 渲染标签  
  默认会被渲染为a标签  
  要修改渲染的标签的话要用[tag属性](https://router.vuejs.org/zh/api/#tag)  
  <span style='opacity:.5'>（提醒：用is不行，用is的话就已经不是`router-link`标签了）</span>  
  <span style='opacity:.5'>（用tag的话控制台会提示vue-router4不支持）</span>





### `router-view`

`router-view`本身不会渲染出一个标签，只会在`router-view`的位子渲染出需要的内容  

`router-view`标签上除了name属性外所有属性都会传递到渲染出来的根标签上。  

- `router-view`标签叫出口，路由匹配到的组件将渲染在里，可以在组件模板中使用。

### `router-view`的`name`属性

name属性相当与vue的key属性，用来标识每个出口的不同。对于使用name的router-view，将不会作为component的出口，也不会作为components.default的出口。
要想出口渲染到有name的router-view上，routes中应该用components代替component，如果两个对象同时存在，只会渲染components。
components的属性名与router-view的name属性值对应，对于没有name的router-view，对应到components中的属性名为default。
对于name属性值没被包含于当前路由components的属性名中的router-view，不会渲染。













### History模式

> 这种模式要玩好，还需要后台配置支持 —— [第三版文档](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)

new VueRouter({})中加入 mode:'history' 开启History模式
wb测试中会让url中html文件的盘符消失，并且去掉url中vue-router部分的开头井号
【并未理解作用】（似乎是：1、让直接写url可以访问  2、让url看起来像正常的url。  其中第一点没测试成功过，可能要后端技术支持。第二点除了去掉盘符、井号并没有发现其他优化。）
history模式的网页只能在http服务器上运行，直接双击html文件的话会导致：
    1. 路由后除了钩子（已测试mounted）外什么都找不到
        2. 所有图片、字体文件都找不到
       不放在http服务器更目录上的话，这些资源一样找不到，不过路由可用，但是路由到“/”时，浏览器url栏显示的会变成服务器底层地址，除此外没有其他毛病
       服务器上的图片、字体资源都是去底层目录上找





# 数据获取

官方页面这个章节完全看不懂（js部分）







下面记录的内容来源不是官方页面

- 获得当前路由信息  
  通过`vue组件实例.$route`可以获得  
  有很多信息，包括params、meta等  
  （本笔记的《动态路径参数》部分也有类似用法）







### 路由信息对象的属性

（这里说的路径都是页面地址加井号后面部分的url地址）
（在实例中使用时记得在前面加上“this.”）

- `$route.hash`  
  hash值，路由中#及其以后部分。如果路由以#开头的话，这种路由的url就是前一个url后加上hash值，并且这一次路由只会给上一次的路由更新hash值（path中无法写hash，但是不影响对hash的捕获）。
- `$route.query`  
  - 在路径中加入的 “?xx=123” 叫查询参数  
    查询参数一定要写在hash值的前面
  - $route.query会返回 “{"xx":"123"}”   
    写$route.query.xx则会返回123。
- `$route.path`  
  不含hash值和查询参数的路径。
- `$route.fullPath`  
  包含查询参数和 hash 的完整路径。
- `$route.matched`  
  一个数组，当前路由的 路由记录（routes 配置数组中的对象副本）
- `$route.name`  
  routes中与path同级的name属性的属性值。















# 路由数据描述



query与params不同的地方

- query是在路由中输入名值对中的名，而params只能在routes中输入名？？？



### param  

如果一个path是这样的`'xxx/:id/:type'`，那id和type就是param

- 可以通过`this.$route.params.id`、`this.$route.params.type`访问

- $router.push的2种写法

  - path直接完整地拼出来  
    比如：

    ```js
    this.$router.push({
      path: `/xxx/123/edit`
    })
    ```

  - name+对象形式的params

  - 下面这种写法是不行的  

    ```js
    this.$router.push({
      path: `/xxx/:id/:type`,
      params: {
        id:123,
        type:'edit',
      },
    })
    ```

    

### 动态路径参数

```javascript
const router = new VueRouter({
    routes: [
        {path: '/user/:xx', component:{
        	template: '<div>{{ $route.params.xx }}</div>'
        }}
    ]
})
```

遇到所有 “/user/:xx” 的路由，都会在{{}}中渲染出 xx。

- 可以设置多个 动态路径参数
  - 中间可以有任何间隔
  - 也可以没有间隔  
    没有间隔的话除了最后一个 动态路径参数 以外其他 动态路径参数 都只取一个字符（？？？）





### 嵌套路由

在VueRouter的参数中使用children配置，children值与routes完全一致。
如果希望子嵌套的路由是跟在父嵌套后面的话那path无需加/，如果希望子嵌套路由就是path值的话，就要加上/。
无论path加不加/，页面呈现都是一样的，都会渲染出父路由的template，再从父路由template的router-view中渲染出子路由。
以上两条适用与所有与path同级的路由属性（已验证：重定向redirect、别名alias【目前只学了这两个】）





### 重定向

routes的redirect属性

- 值要求是另一个path的值

- 发起原path路由后效果将完全和发起redirect中path一样

- 如果重定向不是依赖hash或者query的话，定向前的hash或者query会保留到定向后。

- 也可以用name重定向  
  例子： `redirect: { name: 'foo' } `

- 根据params重定向：  
  `path: '/aa/:xx', redirect: '/bb/:xx'`

- 为所有不存在于routes中的路由重定向：  
  `path: '*', redirect: '/foo'`  
  （去掉redirect，加上component的话，能将不存在的路由渲染出东西）

- 动态返回重定向目标  
  格式：

  ```js
  path: '/xxx/:id?',
  redirect: to => {
      const { hash, params, query } = to
      if (query.to === 'foo') {//后面只跟?to=foo的跳到了foo
          return { path: '/foo', query: null }
      }
      if (hash === '#baz') {//hash值为baz的定向到了这里
          return { name: 'baz', hash: '' }
      }
      if (params.id) {
          return '/with-params/:id'//只带ID的跳到了这个
      } else {
          return '/bar'//什么都没加跳到了这个
      }
  }
  ```

  

### 别名

/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。
普通写法：
alias: '/foo'
多别名写法：
alias: ['/baz', 'baz-alias', '/baz-alias']





### 路由元信息

定义路由（就是写routes中与path同级的属性）的时候可以配置meta字段（对象），meta中可以设置一级对象，对象名代表需要验证的参数，对象值经过if判断为非的不验证，if判断为是的验证。
验证格式：
router.beforeEach((to, from, next) => {
    if (to.matched.some(xx => xx.meta.requiresId)) {
        ...
    }//这个if在new VueRouter的scrollBehavior属性中同样适用
}// requiresId 在路由的meta中存在、有值且值不为判断为‘非’的值，例子中if判断会返回true，其余情况返回false

- meta的属性的值可以是对象



# js语句编写



### 编程式的导航

<span style='opacity:.5'>下面的`router`用`vue组件实例.$router`也是一样的</span>

[`router.push()`](https://router.vuejs.org/zh/guide/essentials/navigation.html#router-push-location-oncomplete-onabort)  
（👆更多内容见文档）

与`<router-link :to="...">`效果一致  
参数可以是字符串或者对象

- 字符串  
  这个字符串是path（前面要有`/`）
- 对象  
  可以依据name跳转，也可以依据path，还可以带query或者params（如meta等其他参数传了也没有效果）



[`router.replace()`](https://router.vuejs.org/zh/guide/essentials/navigation.html#router-replace-location-oncomplete-onabort)

完全替换当前历史记录，不管如何前进后退再执行这个方法都会完全替换掉当前的历史记录，并且对其他历史记录没有任何影响。`<router-link :to="..." replace>`也有同样效果。



[`router.go(n)`](https://router.vuejs.org/zh/guide/essentials/navigation.html#router-go-n)

在历史记录中向前或者后退多少步。【知道这些方法怎么执行后测试一下超负荷会有什么结果】



### [导航钩子](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

（[2018年的文档](https://github.com/vuejs/vue-router/blob/ca2561f79345c136eccb146caaefe75d78f5855e/docs/zh/advanced/navigation-guards.md)就已经称为导航守卫了）

相当于路由的生命周期钩子

注册分三种情况：全局、路由独享、组件独享  

- 全局  
  - router.beforeEach((to, from, next)=>{})
    - 一定要执行next才会完成路由跳转  
    - 如果给next的配置的name属性和`to.name`一致  
      那会导致无限跳转，最终页面报错`Maximum call stack size exceeded`

- [组件独享（组件内的守卫）](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E7%BB%84%E4%BB%B6%E5%86%85%E7%9A%84%E5%AE%88%E5%8D%AB)  
  这里说的组件就是普通的vue组件  

  - 触发时机
    - beforeRouteEnter、beforeRouteLeave  
      组件因路由而被创建、销毁时会触发
    - beforeRouteUpdate  
      网说是“路由改变，但是组件复用”时触发，不过个人未测过  
    - 如果组件不是router-view中出来的  
      那3个钩子都不会触发

- 有三个钩子：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave ？？？ 
  
- beforeRouteEnter例子：  ？？？
  
    ```js
    mounted() {},
    beforeRouteEnter(to, from, next)  {
      debugger 
      next()
    },
    ```
    `to`代表下一个路由，`from`是跳转前路由。  
    加点后面可以跟上 路由信息对象属性，并且可以打印出来。`query`和`params`可以再点下一级属性。  
    钩子中一定要有`next()`才会正常到下一步，`next(false)`就是不到下一步（目前测试结果和不写`next()`没区别）。  
  `next()`也可以用来路由，有两种写法：
  
    1. `next('/xx')` 
  2. `next({name:'xx'})`。
  
- 路由后会执行那个路由的钩子  
  （如果有的话）









- 在$router.go(-1)无法回退时  
  全局守卫都不会触发（已测过[前置](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)、[解析](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E8%A7%A3%E6%9E%90%E5%AE%88%E5%8D%AB)、[后置](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%90%8E%E7%BD%AE%E9%92%A9%E5%AD%90)）



##### 判断是否无法回退  

换句话说就是：判断是否回退到初始页面

- 目前的判断方法  

  ```js
  mounted(){
    this.$router.beforeEach ((to, from, next) => {
      this.isGoingBack=false
      next()
    })
  },
  methods:{
    goBack(){
      this.$router.go(-1)
      this.isGoingBack=true
      requestAnimationFrame(()=>{ // 经过测试：2个requestAnimationFrame会比2个setTimoute0或者2个$nextTicket更靠谱
        requestAnimationFrame(()=>{
          if(this.isGoingBack){
            // 到这就说明无法回退了
            debugger
          }
        })
      })
    },
  },
  ```

  





# 效果





### 路由动效

可以整体设、单个路由设置、根据'$route' (to, from)设置
https://router.vuejs.org/zh-cn/advanced/transitions.html





### 滚动行为

new VueRouter中的scrollBehavior属性，例子：
scrollBehavior (to, from, savedPosition) {
    return { x: 222, y: 222 }//路由后滚动条滚动到x222，y222处
}
用变量代理的方法：
    new VueRouter处写 scrollBehavior:xx, // 也可以简写为 scrollBehavior, 但是这样的话变量名必须是scrollBehavior。（简写支持来源于ES6的 对象字面属性值简写 ）
    声明处写 const xx = (to, from, savedPosition) => {...}
不启动scrollBehavior的话，用浏览器的前进后退按钮会保存每个历史记录中的滚动位子，不过退回到没有启动路由的那个历史记录时会发生改变，那个历史记录的下一个历史记录的滚动位子记录会被清空。
如果只有例子中的内容的话，各历史记录中的滚动位子记录会变得很混乱，要拥有之前滚动位子记录功能需加savedPosition的存在判断，如下：
scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition //根据测试，写false更好
    } else {
        return { x: 0, y: 0 }
    }
}
要跳转到hash的锚记：
if (to.hash) {
    return {
        selector: to.hash
    }
} // 可以同时返回selector和x、y，三者同时存在的情况下根据selector跳转







# 缺陷

- 子路由必须在父路由页面中渲染  
  这样就导致：如果一个页面属于另一个页面，无法在vue-router中体现这两个页面的从属关系





# 未归类

- vue-router每次跳转到一个组件都会触发组件的`mounted`方法  
  离开一个组件都会执行`beforeDestroy`和`destroyed`方法
  - [在同组件不同路由间调整时不会触发钩子](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96)
- 路由配置中配置params不生效（用router-link、router.push形式可以带）  
  配置query也只能加到path里才能生效（用属性形式不生效）  
  用属性形式配meta生效   
  （路由配置指的是实例化`'vue-router'`时的`routes`参数）
- 刷新页面后params居然还在
- [路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)  
  [这个博客也可以看](https://blog.csdn.net/xm1037782843/article/details/88225104)  
  懒加载可以把项目从一个大包拆成一个页面一个包，进入页面时再加载页面的包  
  - 不过在加载过程中不会跳到相应页面，也没有任何反应  
    - 解决办法：  
      空白时间也就是beforeEach和afterEach之间的时间  
      可以通过这个特性加上加载效果



