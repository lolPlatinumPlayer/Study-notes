# 待研究

- created里执行的函数的this是undefined



记录vue混合和模板

- https://segmentfault.com/q/1010000016743391
- https://forum.vuejs.org/t/mixin-and-templates/5053/4
- http://jsfiddle.net/6x2v9y20/24/







构建vue项目可以用到的内容

- vue-cli  
  全局安装命令是：`npm install -g @vue/cli`
- vue-loader  
  webpack的loader，提供单文件组件支持
- `npm install vue`
- vueify  
  已废弃。  
  github上说正在集中精力搞webpack and rollup  
  
  > 用于Browserify的Vue组件转换 —— [JavaScript中文网](https://www.javascriptcn.com/read-63210.html)





有空整理一个有less，vuex配置完全，去掉默认页面,build.js引入前面去掉 / ,四空格缩进的模板  
（原本写在《vue-loader 学习笔记》里）

# 起始

支持ie9

### 版本



**术语**

- 编译器  
  将模板字符串编译成为js渲染函数的代码

##### 版本的纬度

有4个纬度来描述版本

- 完整版或运行时

  - 完整版：包含『运行时』和『编译器』

  - 运行时：不包含『编译器』的版本  

    > 当使用 vue-loader 或 vueify 的时候，*.vue 文件内部的模板会在构建时预编译成 JavaScript。你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可。 —— [官网](https://cn.vuejs.org/v2/guide/installation.html#%E8%BF%90%E8%A1%8C%E6%97%B6-%E7%BC%96%E8%AF%91%E5%99%A8-vs-%E5%8F%AA%E5%8C%85%E5%90%AB%E8%BF%90%E8%A1%8C%E6%97%B6)

- 不同的模块化方案

  - UMD版
  -  CommonJS版
  - 给构建工具使用的ES Module版
  - 给浏览器使用的ES Module版

- 开发版或生产版

- 版本号

**[版本清单](https://cn.vuejs.org/v2/guide/installation.html#%E5%AF%B9%E4%B8%8D%E5%90%8C%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC%E7%9A%84%E8%A7%A3%E9%87%8A)**<span style='opacity:.5'>（👈点这里查看）</span>




### 查看编译后的源代码的方法

谷歌控制台sources选项卡 -> Page选项卡 -> Top文件夹 -> webpack://文件夹 -> src文件夹

# 综合




### 可在控制台直接操作
如“app2.message = '新消息'”，app2为用new Vue()新建的对象


### 缩写
`<a v-bind:href="url"></a>` 缩写-> `<a :href="url"></a>`
`<a v-on:click="doSomething"></a>` 缩写-> `<a @click="doSomething"></a>`


### this
实例中this会代理data、computed、method
可以用于钩子、method、computed中
this就代表实例本身（也就是说可以在外部查看data等信息、调用method等方法）


### 实例的生命周期钩子（函数）
![](..\图片\vue\vue-lifecycle.png)作为方法写在实例中（也就是）new Vue({})中，例子：
```
mounted: function () {
    this.show = false
}
```
- mounted中的函数在这个实例一切准备好也渲染好之后执行。
- updated：data变更时调用*【】未实测、未测试prop改变的情况、未测试data变而视图不变的情况*
- 疑似bug：mounted中如果引用methods中函数前有语句的话，会报错
          解决方法：在这些函数后面加上分号“;”




### `.nextTick`

1、Vue.nextTick(function () {...})
   页面中所有dom渲染好之后立即执行当中函数内容，（由于vue的智能渲染，直接运行的函数会先运行，然后再渲染dom，所以nextTick中获取的数值都是先运行这些函数后才获得的）
   setTimeout延迟0毫秒效果同上。延迟更长时间就能获取到更长时间后改变的数据，这点nextTick做不到。
2、this.$nextTick(function () {...})
   实例中套与不套好像没什么差别


### 混合mixins

存在于Vue.extend中<span style='opacity:.5'>（？？？）</span>，所以实例、组件都可以使用，使用例子：

```js
var mixin = { //先声明要混合的部分
  created: function () {
    console.log('混合对象的钩子被调用')
  }
}
new Vue({
  mixins: [mixin], //将要混合的部分用中括号包裹后放入mixins选项中即可完成混合
  created: function () {
    console.log('组件钩子被调用')
  }
})
```

- data和methods都可以用mixins进行拆分

- 同名钩子函数混合规则：  
  两个函数都保存，混合对象的钩子先调用，原钩子再调用。

- 值为对象的（非自定义）选项的同名混合规则：（这个说的是data吧？？？）  
  对象键名冲突时，取原对象的键值对。

- 值为对象的（自定义）选项的同名混合（的默认）规则：  
  不产生任何效果。

- 可以通过 “optionMergeStrategies” 自定义混合规则【还未研究】

- 全局混合：（所有实例和组件都会受到混合）  

  ```js
  Vue.mixin({
    ...
  })
  ```

  




### 自定义指令

（有文章说用于DOM操作）
对使用自定义指令的对象执行函数。
使用方法：在需要使用的标签中添加 “v-指令名” 属性
全局注册写法：
    Vue.directive('focus', { //标签中加入 “v-focus” 属性即可使用
      inserted: function (el) { //inserted是钩子
        el.focus()// 聚焦元素
      }
    })
局部注册写法：
    directives: {
      focus: {
        // 指令的定义---
      }
    }
1、自定义指令有一套不同于 组件的生命周期钩子 的钩子，详见：
https://cn.vuejs.org/v2/guide/custom-directive.html#钩子函数
已知的有：
bind：只会在指令第一次绑定到元素时调用一次。
      不过其中可以设置事件，以此来达到多次调用部分代码的目的；
      而且事件中能改变bind的变量值，并反应到bind层级的函数内。
update：当其中语句依赖的数据发生改变后才会触发（应该是这样）
2、钩子函数的参数：
    el: 指令所绑定的元素，可以用来直接操作 DOM 。
    binding: 一个对象，包含以下属性：
        name:指令名，不包括v-前缀
        value:指令的绑定值（写在该自定义指令等号后面双引号中的内容）（会计算后得出最终数值）可以写对象（直接在标签中写{q:{a:1,b:2}}都可以），可以访问到对象后代数据
        oldValue:指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
        expression:指令的绑定内容，写在等号后面双引号中的内容以字符串形式写出来。
        arg:传给指令的参数。例如 v-my-directive:foo， arg 的值是 "foo"。
        modifiers:一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。
    vnode.context代表所属实例的this
    其他vnode和oldVnode【不知道怎么用】
3、钩子只挂载在bind和update上的简写：
    Vue.directive('name', function (el, binding) {
      el.style.backgroundColor = binding.value //从渲染开始背景颜色就是value，后面value变动后背景颜色也会更新为value
    })


### 指令与vuex的结合使用

方法一：
局部引入其他文件指令，且指令中引入store的情况下，例子如下：
    store,
    钩子() {
        // store.state.数据名 可以使用
        // store.commit(xxx) 也可以使用，不过似乎无法使用辅助函数
    }
方法二：（不推荐使用，因为指令中部分独有代码可能要写在.vue文件中）
在.vue文件中注册mutation，并在指令中用vnode.context.xx()使用

【有需要再试验】能不能在指令中使用所有能在实例中用的vuex功能

### render函数（渲染函数，组件中的一个选项）

**【其实并不了解，需要一些实操后再整理】**

代替template渲染html（如与template同时存在template将会失效）
例子：
    render: function (createElement) {
        // 这里可以写一些东西 在后面的return里调用
        return createElement(标签名,设置该标签各内容的对象,包含在首尾标签中的内容);
    }
设置该标签各内容的对象（三个常用属性）：
1、class:{
       class1:true,
       class2:false
   }
2、style:{
      color: 'red'
  }
3、attrs: {
      href: 'www.baidu.com',
      'sa':'sa',
      'aaa':[1,2,3] //不能用对象，如果值为false则整个属性都不会显示，属性名和属性值都可以用变量代理
  }
还有更多属性，详见： https://cn.vuejs.org/v2/guide/render-function.html#深入-data-对象
包含在首尾标签中的内容：
写字符串就生成文本节点，也可以再写一个createElement生成一个子标签（再写createElement的话一定要包裹在数组中），也可以写变量来达到前两种效果，也可以写一个数组生成多个内容


### render函数小知识点

VNodes必须唯一【测来测去好像多个VNodes也没什么问题】
在createElement生成的标签中写vue的html部分只会被当成普通html

- 默认不支持`v-model`这样的双向数据绑定  
  不过可以自己实现，[官方](https://cn.vuejs.org/v2/guide/render-function.html#v-model)有教

**坑**

- .vue文件里style标签的scoped影响不到渲染函数渲染出来的元素


### 模块

从.vue文件导入的模块会渲染为局部注册格式，而局部注册格式与全局注册格式不同（组件和自定义指令的全局注册都是传参格式而局部注册是对象格式），所以从.vue文件导入的模块都只能局部注册

将自定义指令写在.vue文件中时，export default内可以套directives: {}也可以不套
使用例子：
directives: {
    aaa
}
不过个人推断自定义指令的最佳封装方法为：封装于js文件中，并在局部进行引入
js中格式：
export default {
    focus: {
        ...
    }
}
局部引入格式：
directives: {
    ...aaa //import重命名可随意取，最终引入的指令名称都会与js文件中的一致
}

### 过滤器

`|`
真的和官网说的一样不能用在v-for里面





# 数据驱动视图


### “Mustache” 语法
双大括号，如“<span v-once>This will never change: {{ msg }}</span>”
可包含单个JS表达式，如“{{ message.split('').reverse().join('') }}”
当中语法与JS一致，可包含限定作用域内变量，限定作用域为：用new Vue(){}新建对象中data的属性值。可用逗号“,”隔开多个内容。


### v-html="rawHtml"与mustache的区别
v-html用加号（+）连接多个变量
v-html中似乎不能对变量进行运算
经过测试v-html可以用v-html="a.trackingDayBegin<=now&&now<a.trackingDayEnd?1:2"，而mustache只能{{a.trackingDayBegin<=now?1:2}}


### v-model
input、textarea等自然输入控件中属性加上v-model="xxx"，可实现input中输入数据与Vue对象data属性中的xxx属性的双向绑定，即输入数据===xxx属性，显示也同步。该点在单多选下拉input中同样适用。
多选按钮：在xxx声明为数组时可以获取选中框的value（使用vue的标签中应用v-bind），声明为空时将以true、false反映选中状态。
单选按钮：只要有声明xxx，xxx值都为选中按钮的value。（相同v-model的单选按钮会自动绑定到一起）
select下拉列表：只要有声明xxx，xxx值都为选中选项option中的内容。
勾选框：true或false。绑定数值方法：v-bind:true-value="'a'"
（因为v-model是双向数据绑定，所以用v-for循环出来的内容直接写循环中的某一项就行，不用再从循环依赖的数据里一层一层点出来）

坑：

- v-model的值必须在data、computed等内容里存在
  - 也就意味着不能直接写一个原始类型值
  - 也意味着不能写表达式  
    要放computed里  
    如果v-model输入非法值的话编译会阻塞报错：`'Assigning to rvalue'`


### v-model修饰符
添加在v-model.后
lazy:使v-model不会在输入未完成时就同步
number:将输入数值变为Number类型（如果原值的转换结果为 NaN 则返回原值，如果输入第一位为数字，那后续也只能输入数字）
trim:过滤用户输入的首尾空格


### data选项

- 必须是函数，在其中写入“return{a:1}”可以让所有同名组件拥有独立的a数据（值为1）

- Vue对象中data属性用来存放vue操作的数据，可在Mustache中写属性名直接打印，也可在其他vue属性中用 this.属性名 来调用，vue对象外可用 `vue对象名.属性名` 调用。
- 可用对象代理
- 子项与视图更新
  - 子项变化会不会触发视图更新取决于子项在初始情况存不存在
  - 如果希望在操作初始不存在的子项后更新视图
    - 赋值：`vm.$set(对象或数组,键名或序号,新值)`
    - 删除：`vm.$delete(对象或数组,键名或序号)`
    
    这两个方法在`Vue`全局对象上也是存在的

**关于数组视图更新的研究**

结果和上面说的“不会触发视图更新”是相反的，不过[vue官网](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%AF%B9%E4%BA%8E%E6%95%B0%E7%BB%84)也确实说“给数组子项赋值是不会触发视图更新的”

实验结果：  

- $set、push在各方面都有着相同的表现  
  <span style='opacity:.5'>具体有：更新视图、给子项属性赋值后更新视图、给子项赋值对象后更新视图、打印结果、给子项赋值对象后的打印结果、map循环遍历</span>
- 测试中的所有情况都会触发视图更新  
  除了上面↑列出来的内容外，`data名[0]=1`也是会更新的（这个data之前只用`[]`初始化过）
- `$set`或`push`后的打印结果  
  ![实验中$set或push后的data](../图片/vue/实验中$set或push后的data.png)
- `$set`或push，给子项赋值对象后的打印结果  
  ![实验中$set或push后，再给那个子项赋值对象后的data](../图片/vue/实验中$set或push后，再给那个子项赋值对象后的data.png)

实验环境：

- 无人机项目  
  vue2.5.10
- home页面  
  `'/'`路由就是这个页面，不过`router.beforeEach`里进行了判断，一开始会跳到另一个页面
- 控制台操作`vm`


### 计算属性（computed属性的值的属性名）
（不可与data重名）
getter作用：依赖几个数据生成另一个数据，并赋值给计算属性。
getter的简写方法：在计算属性中直接写入无参数匿名函数，return一个值。
在Mustache中写入计算属性，会直接运行getter中的函数。
使用计算属性会进行缓存，函数只有当其依赖数据（使用的变量）改变时才会重新运行，多次调用只会调用计算结果而不会运行函数。


### 计算属性的setter（set属性）
要使用setter必须有一个getter（这种情况下要写为计算属性的get属性），setter只能以单参数匿名函数放于计算属性的set属性中，参数代表计算属性新赋的值，当直接操作计算属性的值时运行setter（get计算结果变化并不会运行setter）。
任何方法都无法通过操作计算属性来改变其值，setter也不行。


### watch属性（watcher）
```
watch: {
    监听变量A: function (代表监听变量A的参数) {
        函数内容
    }
}
```
watcher中的匿名函数为单参数时，被监听变量一旦改变就执行函数内容，单参数代表监听变量变化后的值；匿名函数为双参数时，前一个参数代表变化后的监听变量，后一个代表变化前的。

这种格式的watch无法发现数组、对象的后代内容变化，也无法输出后代内容。

监听子项：  
监听变量处用字符串写法，子项前只能用点，数组的话在点后写序号。  
监听对象属性的话，该属性消失后也会触发回调。  
可以监听一开始不存在的属性，在该属性出现后是会触发回调的。

如果watch的值是布尔值的话，初次渲染时也会执行回调


##### watch的深度监听
专用于数组、对象，每一次后代内容变化都会触发，也可以输出后代内容，格式为：
```
watch:{
    arrayName:{//个站中有用不同格式写法
        handler:function(val,oldval){ // “handler:”为固定格式一部分，【】一次监听state时oldval和val是一致的
            console.log(val.name.y1)
        },
        deep:true //这句为固定格式一部分
    }
}
```


### methods属性
Vue对象中methods属性的 属性 可以匿名函数为值，在Mustache中输入该属性名加() 则可执行函数，例：“属性名()”，可在js中直接调用，例：“Vue对象名.属性名()”。  
使用methods属性不会进行缓存，函数在每次调用、依赖数据改变时都会重新运行。  

- 方法名含中文的话有时候会有问题  
  事件触发的方法的名称带有中文的话，是不会触发这个方法的


### v-bind:a="b"
在标签中插入以上内容让标签中显示出加入a属性，属性值为b的内容（b为data中的对象，b对象的值将作为标签中a属性的属性值）。a可以是html中原本不能显示的非法属性，加了v-bind后就能显示（看起来好像没什么用）。  
若不加v-bind直接在标签中写a="b"，那么渲染后将原封不动如字符串一般展示出a="b"  
若要只显示a属性不要属性值，可直接在标签中写a，无需加上v-bind。  
b可以是一个三元表达式，以此选择出现的属性值  

# 样式


### v-bind:class
标签中输入v-bind:class="{ a:b }"，b为真时class="a"；  
v-bind:class="['a','b']"，class="a,b"；  
v-bind:class=""中可直接写data中的属性名来调用（属性值可为数组可为对象）；  
v-bind:class="[ a , b ]"，这种写法调用data中的a、b属性；a、b处也可以写三元表达式  
以上两行亦可调用计算属性；  
class的值可以直接写三元表达式  
v-bind不会覆盖组件已有样式  


### v-bind:style
使用驼峰式，书写规则参照jq样式，其余与v-bind:class相同，对于需要hack的属性会自动增加前缀。如：  
v-bind:style="{ color: activeColor, fontSize: fontSize + 20 + 'px' }"  
三元表达式例子：  
    :style="true?{marginBottom:45+'px'}:null"  



### （增删）过渡效果

##### 单个元素过渡

`transition`标签

- 所有显示/不显示切换都可以带上该种过渡效果
- 需加效果部分须在transition标签内
- 可以在transition标签中加入appear来设置节点在初始渲染的过渡
- 可以使用css的animation属性

##### 多个元素过渡

`transition-group`标签

用法和transition基本相同，不过在需要v-for循环元素拥有动画效果的话，只能选择transition-group。

其中所有元素都要加上key值

`transition-group`默认会渲染成span标签，可在标签中通过 “tag” 属性修改渲染成的标签。  
加在`transition-group`上的非动画属性会加到新生成的标签上

比transition标签用法的过渡效果类名多一个v-move，作用是：当循环生成元素位子发生改变后，用css属性transition控制其过渡动画。（实现方式是FLIP，即首末倒置）（解决删除行内元素后无动画的方法：v-leave-active中加入 “position: absolute;” ）

注意：

- FLIP动画在空间不足的情况下可能会有不好的动画效果  
  比如元素都是inline-block的情况






##### 用name属性设置一套效果

使用前提： 以name属性值为前缀的css class要先写好一套
各样式后缀功能见： https://cn.vuejs.org/v2/guide/transitions.html#过渡的-CSS-类名


##### 用标签属性单独设置过渡效果各个阶段的css class

在transition标签中加入一系列属性来达成该目的，这种方法的优先级高于普通的类名。
可与Animate.css结合使用，使用方法：
    属性名="animated 效果名"
可加属性为：
appear
appear-class
appear-to-class
appear-active-class
enter-class
enter-active-class
enter-to-class
leave-class
leave-active-class
leave-to-class


##### 显性地设置过渡持续时间

在transition标签中加入属性来设置，拥有最高优先级的权重，两种方法的例子：
1、 “:duration="1000"”
2、 “:duration="{ enter: 500, leave: 800 }"”


##### 用js设置过渡效果

在transition标签中加入 @XX 属性来设置各个阶段执行代码，代码放在methods中。
（推荐在仅用JS过渡的transition标签中添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。）
可加属性如下：
before-appear
appear
after-appear
appear-cancelled
before-enter
enter
after-enter
enter-cancelled（cancelled后缀的应该是中途取消而执行的代码）
before-leave
leave
after-leave
leave-cancelled
【教程未提及】methods中的直接写法（教程只有结合Velocity.js的写法）【教程未提及】


##### 结合 Velocity.js 后用js操作过渡效果的methods部分写法

例子：
methods: {
            beforeEnter: function (el) {//这个不加ie9无法运行
                el.style.opacity = 0
                el.style.marginLeft = 0
            },
            enter: function (el, done) {
                Velocity(el, { opacity: 1,marginLeft:'22px'}, { duration: 300 })//duration为该行语句动画持续时间
                Velocity(el, { opacity:0.5,marginLeft:'112px'}, { duration: 100 })
                Velocity(el, { opacity:1,marginLeft:'0px'},  { complete: done })//enter和leave必须加complete: done，传参也要加上done
            },
            leave: function (el, done) {
                Velocity(el, {marginLeft:'1110px' }, { duration: 1100 })
                Velocity(el, {marginLeft:'666px' }, { duration: 1100 , loop: 2})//loop为循环次数
                Velocity(el, {opacity:0,marginLeft:'0px'},  {  duration: 3100 ,complete: done })
            }
        }
该例子中所有css数值以及duration、loop等数值都可以动态加载，直接写this.xxx即可。
complete可以改写为：
complete: function () {
    //... //这里是该阶段动画（leave或enter）结束后执行的函数，写在done()后面也没什么区别
    done()
}
velocity引进地址：

<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>

（与jq1.10.2不兼容）



##### 过渡模式

transition标签中的mode属性，值可为
in-out: （默认）离开过渡与进入过渡同时进行
out-in: 离开过渡完成后开始进入过渡



### 样式作用域

使用方式：在`style`标签上增加`scoped`属性

效果：

- `style`标签内的样式将只作用于当前组件

原理：

- 在一个作用域内给所有覆盖到的html标签加上相同的 『随机属性』  
  在样式里也加上这个『随机属性』  
  这样就能实现作用域

注意：

- 加`scoped`后外部还是能控制内部样式的
- 『随机属性』加不到渲染函数渲染出的标签上
- 『随机属性』会加到`slot`标签传入的内容

# 判断与循环


### v-if、v-else、v-else-if
`<h1 v-if="ok">Yes</h1>`  
`<div v-if="type === 'A'">`  
复用性：除非标签名或者标签中key属性不一样，不然都只会更改标签中改有差异的部分，被更改的部分不会进行缓存(如jq写的style、input输入的内容)  
这写属性前面不用加:也能获取代理的内容，加了反而会有问题  

可以用在`template`标签上


### v-show
通过css选择显示隐藏

**注意**

- 不支持else
- 不支持在template标签中多次切换【】？  


### v-for【】格式待整理
在标签内加入v-for="(a,b) in c"（in可更改为of），可以循环生成该标签。  
生成标签间固定加入部分可以是data中的数据。  
在mustache或v-html里输入c、b、a分别表示：  
c写在data中，可为数组可为对象，长度决定了循环次数。  
b:c为数组或数字时，b为序号（从0开始，可在mustache中运算）  
  c为对象时，b为序号对应属性的属性名  
a:c为数字时，a为从1开始的序号  
   c为数组时，a为每次循环中c数组中对应序号中的内容。如果是a.xx，则代表c数组中对应序号内容的xx属性的属性值,若循环到内容中没有名为xx的对象，则a.xx处不生成任何代码。  
  c为对象时，a为序号对应属性的属性值。这种情况下，要输出序号的话v-for中应写为(a,b,e) in c,{{e}}就会输出序号。  
如无需序号，可写为v-for="a in c"  
v-for也可单纯用来输出序号，v-for="n in 10"，{{ n }}将会循环生成1到10。  


##### 用函数对v-for循环进行筛选
v-for="a in computedC"中computedC可为计算属性，计算属性中写
function () {
    return this.c.filter(function (c) {
        return 筛选条件写在这
    })
}
在计算属性不适用的情况下 (例如，在嵌套 v-for 循环中) 可以使用method方法
v-for="a in e(c)"
methods: {
    e: function (c) {
        return c.filter(function (c) {
            return 筛选条件写在这
        })
    }
}


##### `v-for`中的`ref`
- 找到 v-for中有ref的组件 的方法：
  `this.$refs.ref值[序号]`
  这里序号指的是：如果想要定位到的组件在拥有这个ref值的组件中排第n个，序号就是n-1
- 这种情况ref可以用动态生成，不过动态生成后找到组件的方法还是和上一条一致



# 组件


### 组件注册
全局注册：要在父实例前注册才有效
         Vue.component('my-component', {
           template: '<div>A custom component!</div>'
         })
局部注册：可用 “<div is='components'></div>” 动态更换组件，可用对象动态加载内容，全局注册不能动态加载
         new Vue({
             components: {
                 'my-component':{
                     template:'<div>A custom component!</div>'}
             }
         })
字符串模版（js中的名称）可用大小驼峰或者kebab-case (短横线隔开式) 命名，在非字符串模板（html中的名称）中用kebab-case都能捕获到。  
（就算在html中使用模板语法，也只有引号内可以分辨大小写，引号外依旧不分别）  
（template在实例中也可用，会把捕获到的dom内容替换为template中内容）  

- name属性不可以是中文名  
  官方提示是：要符合html标签命名规则，同时又不能是html已有标签名
- `Vue.extend`似乎也可以注册  
  看这个[例子](http://jsfiddle.net/6x2v9y20/24/)

### [单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)

组件可以单文件化，放进`.vue`文件里

- 可以把模板、样式、js分成3个文件  
  示例代码如下：

  ```vue
  <template>
    <div>This will be pre-compiled</div>
  </template>
  <script src="./my-component.js"></script>
  <style src="./my-component.css"></style>
  ```



一个template下只能有一个子标签


src 导入要遵循和require() 调用一样的路径解析规则，这就是说你需要用以 ./ 开头的相对路径，引用npm资源的话不用加 ./


· .vue文件的编写
一整个文件就是一个组件，所以不能用vue实例，template下也只能有一个子标签。
与普通组件不同之处是最外层组件是包裹在 export default中，用name属性代表组件名称。
单文件组件中要使用全局组件的话，要先import Vue from 'vue'

· 单文件组件的使用
要先 import componentName from './fileName.vue'
然后再在引入文件的components属性中写上componentName，之后组件就能正常使用了
（componentName与被引入文件中代码无关）





更多内容看[Vue 单文件组件 (SFC) 规范](https://vue-loader.vuejs.org/zh/spec.html)


### 组件html标签中的规则
写普通的html属性可以在渲染后显示，但是写vue的专属属性有特别的一套规则（与非组件的html标签的vue规则完全不同），在下文进行介绍。


### 让组件在超出html标签嵌套规则的情况下正常使用
在需要组件的地方先写一个符合 标签嵌套规则 的标签，加上is属性，如：  
```
<table>
    <tbody is="little"></tbody>
</table>
```
这样组件就能在table标签中显示了  



### 组件通信

##### 组件的入参

用`props`选项实现

- 在组件标签上属性部分写“A属性='XX内容'”就可以将子组件的props选项的A属性改为XX内容字符串。  
- 不能在声明的时候赋值。  
  一次测试中在mounted里是可以获取到的（环境：无人机项目一个后期路由到的页面的子组件，如果一开始就跳到这个路由，结果也还是可以的）  
- 若要将父组件data动态传入子组件则需在前面加上冒号“:”  
- 每次父组件变化都会更新子组件的props中的属性，如果想要 继承数据 在继承后不随着 父组件数据 更新，可使用如下方法使用SON_A：  

```
data: function () {
  return { SON_A: this.a }
}  
```
（这种方法修改子组件数据可以规避控制台警告，目前建议使用这种方式）
让 继承数据 经过处理后再显示有三种方法：
1、直接在{{}}里写表达式，效果与第二点相同
2、computed: {
       counter: function () {
           return this.myMessage+10
       }
   }
3、要 继承数据 不随 父组件数据 更新的话只能用如下方法
   data: function () {
       return { sona: this.myMessage+10 }
   }

小技巧

- prop可以命名为`data`




##### 对组件入参进行验证

作为子组件设置props中的属性时可用 “propA: Number” 限制传入数据的类型，如不合规格则会在控制台发出提醒，可限制为多种类型，可自定义函数来验证，详见：
https://cn.vuejs.org/v2/guide/components.html#Prop-验证

注意：  

> 对象或数组默认值必须由一个函数返回 —— [官网](https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81)



##### 接收模板代码

使用步骤：

1. 在组件中写`<slot></slot>`
2. 使用组件的时候，在组件首尾标签间的模板就会渲染到`<slot></slot>`处

官方名称是：插槽

可接收的模板代码：

- 不定数量不定层级的标签
- 文本

特性：

- 一个组件可以接收多份模板代码（`slot`）






##### 组件向外传值
组件外methods中写好outsidefn单参数函数，组件标签内写好 “@daili='outsidefn'” ，传值方法分为：1、用组件内的watch传值。2、用组件内的methods传值。

1. 用组件内的watch传值：  

   ```js
   watch:{
     anyprop:function(d){//anyprop是组件中props中某个数据
       this.$emit('daili',d)//（单参数d代表监听数据的新值），将单参数改成其它数值也能传递
     }//这样在触发watch时就能触发outsidefn，且单参数等于watch传递的数值
   }
   ```
   
2. 用组件内的methods传值：  

   ```js
   methods: {//组件内写@xx='anymethods'就能触发
     anymethods: function(d){
       this.$emit('daili',d);
     }
   }
   ```

   



1. 达成以上目的还有一个更通用但是稍长的办法：  
   组件标签内写`v-model='b' `   
   触发父组件写`this.$emit('input')`
2. 触发父组件函数时带上一个子组件数据
   `this.$emit('a',b)`中b就是能带上的内部数据，父组件methods中单参数函数中的单参数就能捕捉到内部数据b


用这种方法向组件外传值是可以发生引用传递的，因引用传递导致组件外数据变化时甚至能用watch监听到（未做详细测试）


##### 在子组件上触发methods中的函数（在html子组件上用本地事件触发method中的函数）
在子组件标签中写好“@click.native="b"”就会在点击后触发b函数

【组件教程更新未看内容】
https://cn.vuejs.org/v2/guide/components.html#杂项






##### 事件处理方法

`<button v-on:click="greet">Greet</button>`

1. click处（个人）称为“事件名”，已知的有：

   - click
   - submit
   - keyup  
     只能给文本框使用`keyup.你要的按键（字母、空格、方向键等）`，详见：https://cn.vuejs.org/v2/guide/events.html#按键修饰符  
   - input  
     （未测试，估计是文本框专用的，输入内容一变化就触发）  

   （除此外可能还有更多的事件名，没有深入研究。事件名应该是vue规定的，很多html事件不可用）  

2. greet处（个人）称为“事件命令”  
   可以输入脚本语句，也可以输入函数名（官方称函数名为“事件处理方法”）  
   只在这里放一个函数名的话可以不加括号，但在多个函数名或者与脚本语句混用的情况下，要加括号，如：  
   `<a @click="脚本语句,函数名()">分配完毕</a>`  
   用分号“;”或者逗号“,”做间隔  
   加括号的话可以往括号里传参数（【】未验证会返回参数的事件）

   - **写脚本语句时的this**  
     脚本语句里的data等不需要加`this.`  
     脚本语句里的`this`值为`null`，而使用`window`是会报错的  
     （不过放箭头函数里可以获取到`this`，而window不行）


##### 事件修饰符

在v-on:XX后加入的.XXX称为事件修饰符  
.stop  阻止事件冒泡，如单击子元素只触发子元素的事件而不触发父元素的事件  
.prevent  让表单提交不重新加载页面  
.capture  让默认事件方式从冒泡阶段中监听改为捕获阶段中监听，例如：@click.capture="a($event)"的嵌套中会让从里到外触发even.currentTarget变为从外到里触发  
.self  只在当前元素触发事件，比如单击子元素不触发事件  
.once  事件执行一次  


##### 用.$on()创建自定义事件
`实例名.$on('自定义事件名',function(接收参数){函数内容})`
`实例名.$emit('自定义事件名',发送的参数)`可以触发创建的自定义事件
以上两条可以在任何位子书写
（任何组件通信都可以靠以上两条来完成）


##### `this.$parent`、`this.$children`与`this.$refs`
这些方法可以获取到指定的vue组件实例

**`this.$refs`**

可以用于普通dom也可用于vue组件实例

- 普通dom  
  获取到的就是dom  
  注意：如果对dom使用了v-if，if值如果刚设为true，那这时dom其实是不存在的。`this.$nextTick`中才会存在

- vue组件实例  
  操作方式：在子组件html标签中写 “ref='a'” ，再通过`this.$refs.a`获取到组件实例  
  `this.$refs`在mounted中获取不到，要加个`this.$nextTick(() => {})`才行  
  但是一次测试中是可以的。环境：无人机项目，一个后期通过路由导航到的页面，这页面的mounted里用`this.$refs.`可以立即获取到内容



##### 实例名.$el.textContent = 该实例dom里所有文本内容

？？？



# 周边工具



### Vue Devtools

xml里组件名来源

- 优先找组件的name属性
- 其次找用组件时的名字  
  （比如说在模板里这个组件叫`<Aa></Aa>`，那在devtools的xml里也会是这个名字）
- 再次找路由的`path`  
  如果路由到了一个前2条都找不到名字的组件  
  那么`path`去掉`/`后首字母大写，就会是组件名  
  （部分情况下这条不会生效）
- 还找不到名字的话就会叫`Anonymous`





### vue-cli

官方文档地址：https://cli.vuejs.org/zh/guide/


vue-cli含有模板：https://github.com/vuejs-templates

命令进行中可以取消掉重新使用，能解决部分问题，如以下命令：
“vue init webpack-simple foo”



vue.config.js的配置在官方是放到vue-cli的文档里的
地址为：https://cli.vuejs.org/zh/config  
里边内容是按照配置项来分的，比如`devServer`配置项的地址就是https://cli.vuejs.org/zh/config/#devserver




### element


##### input框
- 处理数字建议用InputNumber组件
  InputNumber组件把按钮隐藏后对数字的各方面操作基本都强于Input组件
  如果在监听 Input组件绑定值 的计算属性中给 Input组件绑定值 赋值，那后续再输入一次，这个值就会变成字符串（因为绑定值在Input组件内其实都是字符串，因此容易出现这种bug）
- InputNumber组件
  如果绑定值为null的话这个组件会将绑定值改为0（会触发视图更新）（undefined的话则不会被更改）


##### 下拉框
- 让下拉框能转换没有显示的选项的方法
  v-for使用拥有所有能转换的数据
  v-show再过滤出需要显示的选项（这里用v-if的话就只能转换有显示的选项的数据）


##### 表单
- 某一项改变后其他项也会重新赋值
  不过因为vue的数据是集中智能异步渲染的，这个 智能 使改变后全等的值不会触发视图更新也不会触发watch，所以平时基本感觉不到重新赋值【】这个智能渲染有空可以做专门测试（虽然是集中渲染，不过监听还是挺可靠的。比如：改变了a，a的watch中emit改变了b，b传入一个组件，这个组件中watch了b，这时watch都能正确运行）
  不过在赋值为依赖某项重新计算得到的数组或对象时，这就会体现出差别了
- 验证
  ```
  整个表单的验证规则:{
      某一个子项:[
          {} // 这个就是某一条验证规则，可以有多条
      ]
  }
  ```
  一条验证规则可以有的属性：type、required、message等，其中message可以是jsx
  在async-validator里（网址是：https://github.com/yiminghe/async-validator）  
  说到某个属性在不同类型下表现不同时，其实指的是**这一条验证规则**的type属性传入不同类型时这个类型的表现不同？？？在Element和async-validator文档里都没看到这句话
  
  - 自定义验证规则
    就是validator方法（与type、required、message等同级）
    validator方法形参为：rule、 value、 callback、 source、 options
    rule中有与validator同级的type、required、message等信息
    value是要验证的值
    callback是验证方法（validate）的回调，不传参代表符合验证条件，有传参则代表不符合验证条件，会触发相关视图效果
    callback是单参数的，这个传参是控制台提示信息，会在不符合验证时在控制台进行打印
- `:model`是必填的
  prop也要填model传入对象的属性
  表单的各种操作都是依据model和prop完成的（包括清空表单）
  （虽然个人感觉没必要设计model）
- 重置表单
  `this.$refs.表单ref值.resetFields()`
  会把表单绑定data的各属性还原成默认值（也就是写在data方法里的值）（属性值为对象或数组的话无法还原）


##### 表格
- 自定义单元格内容
  ```
  <template slot-scope="scope">
    需要的dom（最外层没有标签也可以）
  </template>
  ```
  template中可以用scope.row调取（传给表格的data中）属于这一行的子项
  scope.column调取这一列的内容
  scope.$index调取这一行的序号（从0开始）
  scope中还有一些其他数据
  template改成其他标签也可以
  el-table-column标签上无法加样式与类名


##### 导航框
el-menu
路由的话官网其实写错了，route属性的值就是路由到的地址（就相当于router-link标签的to属性）
lin


##### 自动消失型提示
- this.$message.error(参数)各种传参情况
  - 空串：空白
  - null、undefined、false、数字：提示不出现且控制台阻塞报错
  - 对象：传入对象的表现与给this.$message()传入对象的表现基本一致，其中传空对象也会提示，但没有提示内容


### iview
- 有几率bug
  template做if else时，其中第一个formitem 下无法验证，调用局部验证还会报错“第一个参数不是字符串”
- 3.0的Layout 布局没什么卵用，用了反而增加开发成本

**事件**

iview3组件的事件名真的和文档写的医院，都带`on-`

##### 表单

- 验证函数的`this`是一个对象  
  这个对象有4个属性：`field`、`fullField`、`type`、`validator`  
  验证函数直接写箭头函数是不会改变`this`指向的，不过用在`data`方法`return`外声明的箭头函数是可以改变`this`指向的



3.0Page组件@on-change并不是完全可靠，有一次用中文方法名就不行

替代方案：监听:current.sync



##### 表格

- 自定义单元格内容
  - 使用render函数  
    使用render函数的话，在`columns`props中的对应列不用指定`key`
  - 使用模板  
    官方名称叫[slot-scope 写法](http://v3.iviewui.com/components/table#slot-scope_XF)  
    详细内容可以点 ↑↑↑ 链接去官网看



##### 弹窗

默认弹窗的dom是body标签的子元素

可以选择把dom插入位置改得和模板中的位置一致  
方法是把`Modal`标签的`transfer`属性设为`false`



### [async-validator](https://github.com/yiminghe/async-validator)

一个用来做表单校验的库，被element与iview所依赖

【】把element里的相关内容挪下来，iview中的表现和element里写的一致