## JSX
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
    1. 函数（静态函数或“兄弟”函数都可以）
    1. 要加多条语句的话可以用闭包
1. 点击等事件
   jsx标签中加入onClick属性，语法：`
    onClick={() => alert('click')}
   `
   onClick中接收一个“兄弟”函数或者箭头函数
   1. 直接写“兄弟”函数无法传参
   1. 把“兄弟”函数包在箭头函数中可以传参
   1. 箭头函数中可以直接写多行语句
   1. 如果不包箭头函数直接写表达式或者普通函数，那么不需要触发事件，代码就会立即执行
   1. 普通函数中this将是undefined
1. JSX并不是一定要有一个标签包裹在最外层，可以用数组包含多个标签
1. 可以直接用jsx给变量赋值，使用这个变量就相当于使用jsx


## 组件
`class 组件名 extends React.Component {.. }`
1. 因类的相关原因，所以每个周期函数间不能加逗号
1. render的return后马上换行的话应该用()把标签包裹起来 
1. 设置初始Props
   语法：`
    static defaultProps = {
        prop名: prop值
    };
`
1. 渲染子组件
   除了可以直接写以外还可以有动态渲染方法：
   写一个函数return这个组件
   然后在jsx的html中用`{this.函数名}`的方法使用子组件
1. 组件声明只有render的话可以这么简写：     
   ```      
        const App = () => (
            <div>11111111111</div>
        )
   ```
1. 可向组件内传递参数    
1. 组件内包含对象的属性
	1. 自定义事件名称(event){.. }
	   创建点击事件
	   可以在jsx标签上用onClick={this.自定义事件名称}调用
	    1. 在阿里平台的React.Component中时
	       自定义事件一定要在constructor钩子中加上`
	        this.事件名 = this.事件名.bind(this);
	       `
	1. getDefaultProps(){.. }【】
	   return 默认props（即包含所有prop的对象，他们将会根据这个对象设置默认值）
	1. propTypes(){.. }【这个应该需要构建才能使用，构建后再研究】【】
	
	
## 状态
1. 设置初始state：
   不设置初始值后续也可以操作
    1. ```
        constructor() {//【】测这里props能不能改成其他的
            super() //必须在constructor所有语句前加上这一句
            this.state = { 
                state名: state值
            } 
        }
    1. ```
        class 组件名 extends React.Component {
          state={
            state名: state值
          }
          ...
1. 改变state`this.setState({state名:state值})`
   这个方法是异步的，据说是因为react要收集所有对state的改变请求然后一次性改变
   render中无法使用
1. 读取 `this.state.state名`


## 其他
1. 构建的话将ReactDOM.render()简写为render()的方法
   引入react-dom时写为`
   import { render } from 'react-dom';
   `
1. create-react-app构建的http服务器指向的文件夹是public
1. 三元表达式外面最好加上括号，因为权重不高
1. style属性值可以直接写运算符，如果结果为非，则该样式不会产生，但是如果输出结果参杂了不该有的字符串，则会输出undefined