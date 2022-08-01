## 学习记录

- 下一次学习[这](https://github.com/jackfrued/Python-100-Days/blob/master/Day01-15/02.%E8%AF%AD%E8%A8%80%E5%85%83%E7%B4%A0.md#%E8%BF%90%E7%AE%97%E7%AC%A6)的“下面的例子演示了比较运算符”



# 起步



- [安装](https://github.com/jackfrued/Python-100-Days/blob/master/Day01-15/01.%E5%88%9D%E8%AF%86Python.md#%E5%AE%89%E8%A3%85python%E8%A7%A3%E9%87%8A%E5%99%A8)
- 确认本机是否安装python  
  `python --version`







## 占位符语法

类似js的模板字符串  
不过表达式是写在字符串后面  
代码如下  

```python
print('%d %% %d = %d' % (表达式1, 表达式2, 表达式3)) 
# 打印结果如下
# 表达式1的结果 % 表达式2的结果 = 表达式3的结果
```

`%d`是整数的占位符，`%f`是小数的占位符，`%%`表示百分号（带占位符的字符串中要表示百分号必须写成`%%`）

## 运算符

- [大致所有的运算符](https://github.com/jackfrued/Python-100-Days/blob/master/Day01-15/02.%E8%AF%AD%E8%A8%80%E5%85%83%E7%B4%A0.md#%E8%BF%90%E7%AE%97%E7%AC%A6)  
  这里感觉写的还是有问题

## 未归类

- **退出命令行**  
  以下两个命令都能正常运行，且没有什么区别
  1. `exit()`
  2. `quit()`
- 变量不需要声明，且可以多次赋值
- 打印变量类型的语句  
  `print(type(变量))`
- 有内置函数对变量进行转换  
  [100day](https://github.com/jackfrued/Python-100-Days/blob/master/Day01-15/02.%E8%AF%AD%E8%A8%80%E5%85%83%E7%B4%A0.md#%E5%8F%98%E9%87%8F%E7%9A%84%E4%BD%BF%E7%94%A8)里搜索“对变量类型进行转换”可以看到几个内置函数
- 可以用括号确保运算的执行顺序

## 记录

已安装python：3.7.6、2.7



# 非重点内容

- arcmap10.2下载的python2.7.3和python官网装的python2.7.18是有差异的  
  用[mxd2qgs](https://github.com/fitnr/mxd2qgs)时报的错就不一样