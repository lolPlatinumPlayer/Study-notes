# JSX
> 每个 JSX 元素只是调用 React.createElement(component, props, ...children) 的语法糖。
1. JSX中的style={XX}的XX应该一个对象，可以用变量代理
1. JSX最原本的样子：
   ```
   ReactDOM.render(
       <div>
           <h1>11111111111</h1>
           <h2>11111111111</h2>
       </div>
       ,
       document.getElementById('example')
   );
   ```
   这一段都可以用引入js的方法达到效果，例子：  
   `<script type="text/babel" src="你的名字.js"></script>`
1. jsx标签中{}可放置代码有
    1. 表达式（表达式不折行情况下都是单行语句）
    1. 函数（静态函数或方法函数数都可以）  //方法函数即为组件中内容是函数的方法
    1. 要加多条语句的话可以用闭包
1. 点击等事件
   jsx标签中加入onClick属性，语法：  
   `onClick={() => alert('click')}`  
   onClick中接收一个方法函数或者箭头函数  
   1. 直接写方法函数无法传参
   1. 把方法函数包在箭头函数中可以传参
   1. 箭头函数中可以直接写多行语句
   1. 如果不包箭头函数直接写表达式或者普通函数，那么不需要触发事件，代码就会立即执行
   1. 普通函数中this将是undefined
1. JSX并不是一定要有一个标签包裹在最外层，可以用数组包含多个标签
1. 可以直接用jsx给变量赋值，使用这个变量就相当于使用jsx


# 组件
`class 组件名 extends React.Component {.. }`
1. 类的每个方法间不能加逗号
1. render的return后马上换行的话应该用()把标签包裹起来 
1. 调用组件  
   除了直接写以外还可以用动态渲染的方法：  
   写一个函数return这个组件  
   然后在jsx的html中用`{this.函数名}`的方法调用组件  
1. 组件只有render的话可以用函数写：     
   ```      js
   const App = (单参数) => { // 单参数就是组件的传参，相当于class写法的this.props
	    // js代码
	    return jsx
   }
   ```
1. 可向组件内传递参数  
1. 方法函数    
   `Foo(even){... }`
   1. 可以在jsx标签上用`onClick={this.自定义事件名称}`这种方法调用    
      如果要挂事件则一定要在constructor钩子中加上` this.方法函数名 = this.方法函数名.bind(this)`    
      不挂事件则不需要，一样能用`this.state.xx`和`this.props.xx`
1. 组件的其他方法
	1. getDefaultProps(){.. }【】
	   return 默认props（即包含所有prop的对象，他们将会根据这个对象设置默认值）
	1. propTypes(){.. }【这个应该需要构建才能使用，构建后再研究】【】
	



### props

类型验证及默认值完整内容见：https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html#proptypes

1. 设置初始Props
   语法：

   ```
   static defaultProps = {
       prop名: prop值
   };
   ````

1. 可以传函数，甚至函数可以改变状态



### 全局传参

react的context特性可以让一个组件下的所有后代元素设置共有的参数
而且这些参数在每个后代组件中都可以独立修改，不影响到其他组件（甚至是后代组件）

##### 使用方法

- 最底层组件中

  ```js
  static childContextTypes = {
      themeColor :'随便什么内容'
  }
  getChildContext () {
      return {
          themeColor : 'blue'
      }
  }
  ```

- 要使用context的后代组件中
  - 头部写

    ```js
    static contextTypes = {
        themeColor: 'yellow'//这里是无法赋值的
    }
    ```
  - 使用时写`this.context.themeColor`





# 状态
1. 设置初始state：
   不设置初始值后续也可以操作
    1. ```js
       constructor(props) {//如果需要使用this.props的话这两行必须加props，否则不需要
           super(props) //必须在constructor所有语句前加上这一句
           this.state = { 
               state名: state值
           } 
       }
       ```
    1. ```js
       class 组件名 extends React.Component {
           state={
               state名: state值
           }
           ...
       }
       ```
1. 改变state`this.setState({state名:state值})`
   这个方法是异步的，据说是因为react要收集所有对state的改变请求然后一次性改变
   render中无法使用
1. 读取 `this.state.state名`




# 其他
1. 构建的话将ReactDOM.render()简写为render()的方法
   引入react-dom时写为`
   import { render } from 'react-dom';
   `
1. create-react-app构建的http服务器指向的文件夹是public
1. 三元表达式外面最好加上括号，因为权重不高
1. style属性值可以直接写运算符，如果结果为非，则该样式不会产生，但是如果输出结果参杂了不该有的字符串，则会输出undefined
