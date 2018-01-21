第三方岁的dsfsdf123
====================
第三方岁的dsfsdf123
---------------------
# 11第三方岁的dsfsdf
## 22第三方岁的dsfsdf
### 33第三方岁的dsfsdf
#### 44第三方岁的dsfsdf
##### 55第三方岁的dsfsdf
###### 66第三方岁的dsfsdf
只是换行的话，在显示的时候两行间就会变成用空格连接起来
有空行的话，不管空几行都会被视为两个段落，从而在段落间增加间距

空一行
空一行


空两行
空两行


>这一部分是在行首用角括号 “ > ” 引用的效果
> 
> 
> 
> 
>>在这里的一行或多行空白同样会被变成段落的分割标志
>>相邻行同样会变成被空格连接
>>这个引用效果也可以当成缩进来用（没找到其它适合的缩进方法）
>
>## 这行除了 “ > ” 还加了两个井号

斜体：用*左右各一个星号*或者 _左右外侧空格内侧一个下划线_ 包裹
粗体：用**左右各两个星号**或者 __左右外侧空格内侧两个下划线__ 包裹
（在标题上无法使用粗体）

## 无序列表使用星号、加号和减号来做为列表的项目标记，这些符号是都可以使用的
使用星号：

* Candy.
* Gum.
* Booze.

加号：

+ Candy.
+ Gum.
+ Booze.

和减号

- Candy.
- Gum.
- Booze.

都会输出 HTML 为：

<ul>
<li>Candy.</li>
<li>Gum.</li>
<li>Booze.</li>
</ul>

## 有序的列表则是使用 *一般的数字接着一个英文句点及一个空格* 作为项目标记：

1. Red
2. Green
3. Blue
5. Red
0. Red

### 似乎用任意数字他都会按先后顺序排好

1. s
1. a
1. d
1. v
1. b

## 行内链接和参考链接
### 可以打开同主机的文件
直接写相对路径就行
See my [About](/Vue笔记.txt) page for details.
### 行内链接
个人觉得行内链接比参考链接好 [example link](http://example.com/).
链接也可以写标题 [一个#](#参考链接).
链接也可以写标题 [三个#](###参考链接).


这个链接加有titile属性 [example link](http://example.com/ "这是Title内容").
### 参考链接
[1]: http://google.com/ "Google"
[2]: http://search.yahoo.com/ "Yahoo Search"
[3]: http://search.msn.com/ "MSN Search"
个人理解：把链接赋值给一些变量，直接使用变量就等于使用链接 [Google][1] than from
[Yahoo][2] or [MSN][3].



## 可以使用HTML标签
### 连写无属性的标签
> 需要注意的是：HTML标签后要加空行，不然后续一行的markdown语法会失效
<table><tr><td>Foo</td><td>Bar</td></tr></table>
> 需要注意的是：HTML标签后要加空行，不然后续一行的markdown语法会失效

### 有格式地写有属性的标签

  <table>
    <tr>
        <td style='width:333px;background:blue;position:absolute;'>Foo</td>
        <td style='width:333px;background:blue;'>Foo</td>
    </tr>
  </table>





还有要学的东西：
1. 文件内跳转的链接
1. 跳转到其它文件指定位置的链接
   (目前看可以跳转到其他文件，但是不能跳到指定位子)
1. 方便的缩进或者多级的列表 









