看的教程是这个：https://cn.redux.js.org/docs/react-redux/api.html


## connect
> `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])(组件)`
- `mapStateToProps(state, [ownProps])`  
  一个函数。返回对象的属性会加到props里  
  第一个参数是store里的state  
  每当store变化这个函数都会执行
  - 让组件的props变化后也执行的方法——指定第二个参数  
    从父组件接收的props变化后就会执行  
    第二个参数就是传递到组件的props  
    【】未测试来自store的props变化后会不会触发、第二个参数包不包括来自store的props（应该是会）
- `mapDispatchToProps(dispatch, [ownProps])`  
  一个函数，返回对象的属性会加到props里  
  这里的dispatch就是触发reducer的方法，要传入action  
  【】官网教程一大段看不懂
  
