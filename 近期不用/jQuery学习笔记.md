


版本：1.10.2



## Ajax
下面以get方法为例子进行说明，`$.post()`与`$.get()`同理，有更多需求的话需要使用$.ajax，它含有jq中ajax的完整功能 
`$.get('url',data,function(data,status){.. },dataType)`
（jq的get方法不会改变url，所有信息api里都是可用的）
- data（可选）
  参数格式是{a:'xx',b:'xx',.. }，用来向后端发送数据
- callback（可选）
  一般用两个参数，第一个参数data和第二个参数status
  - 其中data分两种情况：
    - 请求txt文件时返回其中的所有文本【】未测试
    - 请求php文件时则返回所有echo内容以字符串形式连接在一起的字符串【】应该是dataType选择'text'时的情况
  - status这参数感觉没什么用，请求文件不存在控制台会报错，且回调不执行，文件存在回调就会执行，status值就只有‘SUCCESS’
- dataType（可选）
  指定返回数据格式，如获取服务器返回的json数组则应填写'json'
  不填的话则进行智能判断，智能判断有时是不准确的
  如果返回的数据格式与这里指定的不一致的话则不会执行回调也不会有任何提醒


$.extend( object1, object2 );
/*
1、将对象object2 加入对象object1中，无则增，有则改。
2、如果属性值为对象，则该属性值会被完全覆盖
*/

$.extend( true, object1, object2 );
/*
第一点同上，如果属性值为对象，则对该属性值执行第一条，其属性值中再有属性值为对象的情况也都执行第一条。
*/

$(window).scroll(function(){
    //函数内容写在这
});
每次页面滚动都会触发当中的函数内容
如果要取消掉对“页面滚动”的监听，则写：
$(window).unbind('scroll')
$(window)还有其它一系列操作，并未整理进来


vue-cli与webpack同时存在的情况下，模块化引入jquery的方法：
1. cnpm i jquery@1.11.3 --save
2. webpack.config.js的module.exports的最后加入：
   plugins: [
       new webpack.ProvidePlugin({
           jQuery: "jquery",
           $: "jquery"
       })
   ]
3. 在main.js 加上import $ from 'jquery'

