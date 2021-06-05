

# 未归类

- hrtGitLab会自动删除空文件夹  
  这个删除操作甚至在git记录里看不到
- hrtGiltLab无法修改文件或目录的大小写  
  （无法检测到这个修改）  
  本地记录里显示的也是更名前的名字

# 基础知识

- 输路径时如果路径中有空格的话  
  路径要用单引号包起来  

### 英文专有名词

- 版本库 repository

- 工作目录  working directory

  - 关于名字  
    目前认为 『工作目录 working directory』 、『工作树 working tree』、『工作区 working tree』表示同一个东西  
    之所以认为这些名词代表同一个东西，是因为有如下判断依据

    - 有一次[《Pro Git》英文版](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F)文字用的`working tree`但是配图用的却是`working directory`
    - [这个stackoverflow提问](https://stackoverflow.com/questions/39128500/working-tree-vs-working-directory)上大家对“working directory”与“working tree”的认知是混淆的

    3个名词在权威文档中都有被使用，下面列出了使用情况

    - 工作树 working tree  
      官方文档的[中](https://git-scm.com/docs/git-add/zh_HANS-CN)、[英](https://git-scm.com/docs/git-add/en)版本的对比结果
    - 工作目录 working directory  
      [和github有关的git少量说明](https://training.github.com/downloads/zh_CN/github-git-cheat-sheet/)中这样翻译
    - 工作区 working tree  
      使用这种翻译的有
      - [博客](https://blog.csdn.net/heart_mine/article/details/79424591)
      - 《Pro Git》[中](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-Git-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)、[英](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F)版本

- 暂存区 stage（或index）  

  > [git官网](https://git-scm.com/about/staging-area)称为"staging area" or "index"

- 分支 branch





> 文件状态
>
> - 已提交（committed）  
>   已提交表示数据已经安全地保存在本地数据库中。
> - 已修改（modified）  
>   已修改表示修改了文件，但还没保存到数据库中。
> - 已暂存（staged）  
>   已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。
>
> —— [《Pro Git》中文版](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-Git-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)




### `git status`

该命令用于查看状态

1. 如工作区有文件未提交到版本库且未被添加到暂存区里，则会打印“Untracked files:”  
   并在后面列出文件名（文件名的中文部分会以8进制形式显示）  
   如果希望中文正确显示的话要先输入一行命令：`git config --global core.quotepath false`（win10下输入这个命令后中文会以乱码方块字显示）
2. 如工作区有文件与分支不一致则会打印“Changes not staged for commit”  
   并在后面列出文件名  
   （文件名前会出现说明型前缀）
3. 如暂存区与分支不一致，则会打印“Changes to be committed:”  
   并在后面列出文件名  
   （文件名前会出现说明型前缀）  
   如暂存区与分支一致，则会在结尾打印“nothing added to commit”
4. 如果一切正常，则会打印“nothing to commit, working tree clean”  
   （一切正常意为工作区所有文件都与分支一致且暂存区无内容）  

### 文件名说明型前缀

“deleted: ”  
工作区没有而版本库有 或 暂存区没有而分支有  
“new file: ”  
暂存区有而分支没有  
“modified: ”  
工作区文件内容与版本库不一致 或 暂存区文件内容与分支不一致  
“renamed: ”  
（出现过一次，不过不知道触发机制。
测试了 工作区与暂存区不同、工作区与分支不同、暂存区与分支不同 都没触发）



# 设置

（目前记得都是本地仓库的设置）


- 免密方法（https方式）  
  输入命令：`git config credential.helper store`  
  效果：下次输入账号密码后就不需要再输入账号密码了（只对输入该命令的项目生效）  
  检验命令成功的方式：看`.git/config`文件里是否有以下内容  

  ```
  [credential]
          helper = store
  ```
  
- “远程仓库名”  
  连接远程仓库时可以设置“远程仓库名”（hrt的git环境强制要设置“远程仓库名”）  
  命令为：`git remote add 远程仓库名 ssh://xxx.git`  
  执行上面这个命令后`.git/config`文件里就长下面这样子  
  
  ```
  [core]
  	repositoryformatversion = 0
  	filemode = false
  	bare = false
  	logallrefupdates = true
  	symlinks = false
  	ignorecase = true
  [remote "远程仓库名"]
  	url = ssh://xxx.git
  	fetch = +refs/heads/*:refs/remotes/远程仓库名/*
  
  ```
  
  后续push时就要这样写：`git push -f 远程仓库名 develop`（？？？）
  
  - `.git/config`里的远程仓库名可以随意更改  
    `git pull origin master`里的origin就是仓库名
  
- `.git/config`里的
  ```
  [remote "origin"]
  	url = ssh://git@192.168.1.220:10022/credit/cmp-big-screen.git
  	fetch = +refs/heads/*:refs/remotes/origin/*
  ```
  是可以删掉的，效果目前感觉就是撤回了如下命令
  git remote add origin http://192.168.1.220/credit/cmp-big-screen.git



# 初始化



### 全局设置

```cmd
git config --global user.name "王佳星"
git config --global user.email "417783514@qq.com"
```



### `git init`

把这个目录变成Git可以管理的仓库（表述可能不正确）
（内含工作区与版本库，.git文件夹以外都是工作区，.git是版本库）
这时候并没有真正创建master分支(`git branch`看不到任何东西)  
要第一次`add`、`commit`之后才有【】表达待整理  
要有master之后才能创建其他分支



### 连接远程仓库

- 一个远程仓库可以下载到一个电脑的不同路径上



##### 初次连接服务端

协议

- https  
  URL以`https://`开头  
  推送需要密码
- SSH  
  URL以`git@`开头  
  （hrt GitLab是以`ssh://git@`开头的）  
  推送不需要密码





- 要生成密钥，并在服务端添加密钥，然后再来一些操作即可连接  
  （这条可能对应的是SSH协议的）



##### 创建git仓库并连接远程仓库

```cmd
git init
git add 一些东西
git commit -m "first commit"
git remote add 远程服务器地址（应该都是以`.git`结尾）
git push -u origin master
```

- 用webstorm的Terminal敲这些命令的话会有问题  

  - `git commit -m 'first commit'`失败  
    `git commit -m first`可以
  - `git remote add origin https://gitee.com/IDontDrive/static_personal_mapbox_code.git`失败

  webstorm版本：2020.3



##### 已有本地仓库的话做如下操作

<span style='opacity:.5'>（下方内容已测试，都可用）</span>

测试环境如下：

- 文件夹名与参考名是否相同：不同
- 是否执行过`git init`命令：是
- 是否执行过`git commit`命令：是
- 网站：码云、github、hrtGitlab

github的话要多加一行`git branch -M main`

```cmd
git remote add origin 远程服务器地址（应该都是以`.git`结尾）
git push -u origin 你要推送的分支名 // 推送一个分支就要执行一次这个命令。如果远程仓库上该分支已有内容的话要在-u处再加上“-f”
```

- 报错
  - 不写`git push -u origin master`而写`git push`的话会报错（至少github是这样）

    ```
    fatal: The current branch main has no upstream branch.
    To push the current branch and set the remote as upstream, use
    
        git push --set-upstream origin main
    ```
    
    这个报错应该是因为没有确定远程仓库（仓库名）导致的
    
  - hrtGitlab在push时报错`fatal: repository 'xxxx.git/' not found`  
    解决方法：remote add时不用http的地址，改用SSH即可













##### 将远程库克隆到本地

`git clone 地址`

这个`地址`都是以`.git`结尾的  
会在输入命令时所在文件夹里新建一个文件夹  

- 只`clone`一个分支  
  `git clone -b branchA 地址`

关于下载到的本地文件夹的名称

- 指定名称  
  `git clone 远程地址 文件夹名称`
- 不指定名称  
  会分配一个名称  
  关于分配名称的规则看[官方说明](https://git-scm.com/docs/git-clone/zh_HANS-CN#git-clone-ltgt)  
  根据经验看大多都是`.git`前的那级路径

经验

- 在文银电脑上clone Study-notes时，发现clone后里边没东西。再执行`git pull origin master`后才有东西

- hrt的gitlab项目无法用http地址clone  

  - 在hrt电脑上用https来clone elementUI也是不行  
    报错如下：  

    ```
    Please make sure you have the correct access rights
    and the repository exists.
    ```

    







# 更改本地仓库连接的远程仓库

`git remote set-url origin 远程仓库地址`  
<span style='opacity:.5'>远程仓库地址是指以`.git`结尾的那个地址</span>



# 分支

### 新建分支

`git branch 分支名`



### 删除分支

- 删除本地分支  
  `git branch -d 分支名`

- 删除远程分支  

  > `git push --delete origin 分支名` —— [SF](https://segmentfault.com/a/1190000019539669)



### 把文件提交到分支

（使用下面两个命令前先要确保这个文件存在）

先`add`后`commit`

- **`add`**
  `git add readme.txt`
  add就是把文件修改添加到暂存区  
  全部添加的话使用`git add -A`，因为`git add .`在1.x版本上不会提交被删除的文件，2.x版本的话两个命令是一致的
- **`commit`**  
  `git commit -m "wrote a readme file"`
  把暂存区的所有内容提交到当前分支
  commit -m后的内容是对这次提交的说明性文字
  因此可以多次add后一次性commit来提交
  （测试提交未更改的文件，似乎失败了）  
  （已add文件被更改后还是会允许commit的，当然，add后的变化是不会被commit上去）



### 切换分支

`git checkout 分支名`  
（廖雪峰中说用`switch`更科学，不过[《Pro Git》](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6)中就是用`checkout`）

bug：

- `checkout`切换分支时如果分支名的大小写打错的话也会切换成功  
  会切换到大小写错误的那个分支  
  这时用`git branch`命令查看不到当前所在的分支



```git
git branch 分支名 // 新建分支
git checkout 分支名 // 切换分支
```

可以简写为`git checkout -b 分支名`



### 重命名分支

- 重命名本地当前（指向的）分支  
  `git branch -m 新的分支名`
- 重命名本地非当前（指向的）分支  
  `git branch -m 旧的分支名 新的分支名`



### 提交分支代码到服务端

- `git push`  
  应该是整体提交
- **提交单个分支**  
  `git push origin 本地分支名`  
- 在服务端新增分支  
  - `git push origin 本地分支名`  
    如果服务端没有该分支的话则会自动在服务端新增该分支  
  - `git push --set-upstream origin 分支名`
- pull的智能性  
  在b分支执行`git pull origin a`后在a分支合并b分支之后  
  a分支是一定可以push到远程仓库的  
  就算在合并b分支前落后了远程仓库几个commit也是可以的
- 不从远程仓库pull就push的话会报错` ! [rejected]        develop -> develop (fetch first)`  
  如果不想pull就push的话可以加-f，比如`git push -u -f origin develop`即可把远程仓库的内容变为本地的



### 覆盖

- 将本地另一个分支的文件覆盖到本分支  
  `git checkout 另一个分支名 文件路径`
- 用一个分支覆盖另一个分支  
  目前没找到这种操作  
  目前的解决方案是：删掉分支b，再从分支a中复制出分支b



# 比较



### 比较2个分支

> `git diff [first-branch]...[second-branch]` —— [和github有关的git少量说明](https://training.github.com/downloads/zh_CN/github-git-cheat-sheet/)

如果完全一致的话就不会打印内容



### `git diff`
若暂存区有内容，则将工作区与暂存区比较  
若暂存区无内容，则将工作区与分支比较  
比较后的打印内容会显示 是否有不同、不同之处在哪  

### `git diff --cached`
比较暂存区与分支的不同  
比较后的打印内容会显示 是否有不同、不同之处在哪  









# 合并

> 不像其他的版本控制系统，Git 并不会尝试过于聪明的合并冲突解决方案。 Git 的哲学是聪明地决定无歧义的合并方案 —— [《Pro Git》](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%AB%98%E7%BA%A7%E5%90%88%E5%B9%B6)



### <span style='color:red'>注意</span>

- 合并过程中不要手动对文件进行多余的修改  

  - 描述：  
    比如说a文件没有冲突而b文件有冲突那你就不要去改a文件  
    不然就算你修复了冲突也无法提交  
    这时你输入`git status`会提示你冲突都解决了让你`commit`但是你`commit`又会提示你`fatal: cannot do a partial commit during a merge.`

  - 误操作后的解决方式：  
    退到合并之前，重新合并
  - 不过有一次Study-notes项目误操作后可以正常提交



### 将本地另一个分支的代码合并过来

`git merge 分支名`



### 冲突时2块的意思

冲突时在文件里有如下字样

```
<<<<<<< HEAD
aaaa
=======
bbbb
>>>>>>> commit号
```

合并这个操作肯定是有一个基础内容，然后把另外一个内容合并到基础内容上  
`<<<<<<< HEAD`和`=======`之间的内容就来自于基础内容  
`=======`和`>>>>>>> commit号`之间的内容就来自于另一个内容




上面的内容是自己猜测的，猜测依据有2个

1. 一次合并的经验  
   `<<<<<<< HEAD`指的是本机上之前commit的内容
   `>>>>>>> commit号`指的是远程服务器上要合并的内容
2. [《Pro Git》](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6)中HEAD指的是合并的基础内容，commit号指的是`merge`命令后的分支



### 从服务端下载指定分支代码并将其与当前分支进行合并

`git pull origin 远程仓库分支名`  （这里origin是远程仓库名）

- 当前内容都已add但未commit也可以正常合并
- 即使当前不在要pull的分支也能执行完毕？？？





**当本地库的代码跟远程库有冲突时**

【】这条下所有内容对于普通的分支合并也适用

- <b style='color:green'>如果pull时已经自动合并冲突的话</b>  
  会出现一些提示，包括以下字样

  ```
  Please enter a commit message to explain why this merge is necessary.
  especially if it merges an updated upstream into a topic branch.
  ```

  这时候有2个选择：

  - 输入commit信息  

    1. 按键盘字母 i 进入insert模式

    2. 输入commit信息（可以输入多行）

    3. 按键盘左上角"Esc"按钮

    4. 输入":wq"，然后按回车键
  - 不自定义commit信息  
    那就只做上文的第3、第4点即可  
    不自定义commit信息的话git也会自动补充上commit信息

- <b style='color:green'>如果pull后还有未合并冲突的话</b>  
  那需要手动合并，操作步骤如下

  1. 有冲突的部分会有如下字样  

     ```
     <<<<<<< HEAD
     Creating a new branch is quick & simple.
     =======
     Creating a new branch is quick AND simple.
     >>>>>>> feature1
     ```

     把这些内容调整好

  2. `git add`有冲突的文件

  3. `git commit`









# 删除文件

- 同时在版本库和工作区（本地）删除的文件  
  `$ git rm XX`   
- 只在暂存区里删除文件（不知道会不会在版本库里删掉）  
  `$ git rm --cached XX`  
  （实操过，还未深入研究文档）  
  <span style='color:red'>虽然刚执行这个命令的时候被这个命令操作的文件还在，但是一次`checkout`其他分支再`merge`后就找不着这些文件了，再`checkout`回原分支也找不着。</span>  
  回退版本就可以找回这些“丢失”的文件  
  <span style='color:red'>但是一次关机开机（可能还有些其他操作）后这些黏贴回来的文件就又不见了</span>



可以在命令中加入`-r`来递归删除



要同步到分支的话要加上  
`$ git commit -m "remark information"`  



# 查看历史



**查看所有“在线路上的”commit**

`git log`

- 只显示变动文件的文件名  
  `git log --name-only`
- 查看哪些commit有更改指定文件  
  `git log 指定文件`
- 查看指定用户的commit  
  `git log --author=用户名`



**查看单项目里的命令历史**

`git reflog`

- 显示记录的每次命令（上次关机前的命令都会保存。不过有一次（电气符号库项目中）输入这个命令显示了内容中包含了十几条关机前的内容），每条命令前都会有这条命令所在的版本号
- add、status等命令是不会被记录的



**查看本机上输入过的所有git命令**

`history`  
操作过，但没看过这个命令的文档





# 在不同commit间切换



### 整体回退



##### 未commit的情况

[这篇文章](https://www.jb51.net/article/200202.htm)有进行描述

已测过`git checkout .`，可行



##### 已commit的情况

[思否文章](https://segmentfault.com/a/1190000020863861)有详细描述



**用`checkout`**

`checkout 版本号`（版本号就是指commit id）  
会新建一个未命名分支  
可以多次`checkout 版本号`  
要退出这个未命名分支的话只要再`checkout`到普通分支就行了  
`checkout`到普通分支后未命名分支就会消失

**不过在未命名分支里做修改的话似乎会导致严重的问题，暂时不要在未命名分支里做任何commit**

- 一次“修改”后安全离开的经验  
  都是在webstorm的控制台里操作的  
  操作步骤如下：
  1. 在一个分支上退了一个commit
  2. 压缩了文件，又删了新产生的压缩包  
     （没有add与commit）
  3. 切换到落后当前分支很多的主支
  4. 控制台报了错：  
     `Your branch is up to date with 'origin/master'.`
  5. 但是成功切换到主支，而且临时分支消失了



**用`reset --hard`**

- 退到指定commit  
  `git reset --hard commit的id`

· 回退到上个版本
`git reset --hard HEAD^`

【】--hard 似乎很有问题？？

如果commit后有做修改，那执行这个命令就会回到这个commit
HEAD后面`^`的数量代表回退2的`^`数量次方步（廖雪峰中说多少个`^`代表回退多少步），可以用~199这种简写

· 变成未来某个版本
$ git reset --hard 2b595d5eac
hard后面是未来版本的版本号的头几位，输入后git会自动检索



### 局部回退

##### 还原某个文件到上一次commit

`git checkout -- 文件名`  
`--`可以省略  
可以输入多个文件，文件间用空格隔开  
文件名处可以改成`.`来选择所有文件  
**文件在已追踪未add状态下可以**  
未追踪或已add都不行

##### 还原某个文件夹到上一次commit

用上一段的方法不行，可以用webstorm实现，操作方法如下：

1. 右键文件夹  
2. 点Git  
3. 点rollback
4. ...





# 忽略

### 用命令忽略文件



**让`add .`不添加某些文件**

`git restore 文件`

- 被这个命令执行过的文件，`add .`将不会添加这些文件  
  对于未追踪(untracked)的文件无法使用这个命令
- 不过对于已经add的文件，使用这个命令并不会从“被add的列表”中移除



**让某些文件不会被追踪**

就是未追踪(untracked)的情况下用`add .`也不会添加的方法  
【】目前还没研究



**从已add列表移除文件**

`git rm --cached 文件`



### 做忽略文件的配置

增加`.gitignore`文件，在里面写上希望忽略的文件或文件夹  

- **按名称忽略内容内容**  
  直接写文件夹名或者文件名（含后缀名）  
  - 不论内容层级多深，只要名称被匹配到就会被忽略  
  - 被忽略的文件夹里边的内容也都会被忽略
- **编码**  
  `.gitignore`文件支持多种编码  
  如果编码不是`utf-8`的话，在`.gitignore`文件里的中文操作将会失效

##### 在配置中忽略已track文件

> .gitignore文件只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。
> 那么解决方法就是先把本地缓存删除（改变成未track状态），然后再提交。 —— 引用自[《福信富通GIT使用帮助》](https://git.fxft.net/fxft/help/src/master/README.md#gitignore%E6%96%87%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8)

```cmd
git rm -r --cached . // `git rm -r --cached 文件或文件夹`
git add -A
git commit -m 'xxx'
```



这个命令的特性

- 这个命令似乎不会缩小`.git`文件的体积  
- 如果`commit`的时候不提交这个命令里的`文件或文件夹`的话，`文件或文件夹`还会存留在远程仓库里

使用这个命令时遇到过的问题

- 有一次输入`git rm -r --cached .`后报错了（电气符号库项目）  
  报错如下：

  ```
  error: the following files have staged content different from both the file and the HEAD:
      samples/resource/lib/epgis画面工具demo.css
      src/tool/getGraphicListInPolygon.js
  (use -f to force removal)
  ```

  猜测报错原因：不能在操作到一半的时候执行这个命令（操作到一半是指一部分内容已add而另一部分未add）

- 有一次输入`git rm --cached samples/resource/lib -r`后导致工作目录下的文件被删了  
  具体情况在本笔记里搜索“git rm --cached XX”来查看





# tag标签

- 查看所有标签  
  `git tag`
- 切换到指定标签  
  `git checkout 标签名`

[点这看更多内容](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE)



# 错误排查

- `Failed to connect to github.com port 443: Timed out`  
  百度结果是开了代理导致的  
  代理关掉一会之后，重启了git Bash2次之后就可以了
- `Operation timed out after 300021 milliseconds with 0 out of 0 bytes received`  
  只百度到一个[可用信息](https://blog.csdn.net/weixin_45667885/article/details/101106642)  
  这个博客说用手机热点（中国移动）时会遇到这个问题，约6小时后改用普通wifi解决了问题
- `OpenSSL SSL_read: Connection was reset, errno 10054`  
  百度上说法五花八门，不过hrt电脑出现这问题的原因就是网络不行  
  换个时间再push或pull就行了
- `OpenSSL SSL_connect: Connection was reset in connection to github.com:443`  
  同上，不过这个命令是在使用powershel时出现的，在git bash和powershell间反复操作后，最终在git bash上成功push  
  不成功是网页上的github无法访问，成功时网页上的github也能访问





# git相关的内容

- 不要使用windows自带记事本编辑文件  
  （可能是因为会把编码改为GBK）

- 各终端可使用git命令的情况
  - powershell：可用
  - git bash：可用
  - cmd：不可用

码云

- 码云上多行commit信息的显示不好  
  一开始只会显示一行，要鼠标移上去一会才会显示全部内容
- 有时候码云上邀请别人加入项目时被邀请人不会收到通知就会自动加入  
  有的时候有通知，需要点击“同意”后才会加入  
  目前2种情况的触发条件未知



git bash

- 即使窗口关闭过，也能查看之前的命令记录  
  且能查看其他目录下的命令



webstorm

webstorm相关内容去webstorm的笔记里查看（位于《其他工具 学习笔记》）



# 学习

cd d:nospace/learngit

### 学习进度

学完https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013745374151782eb658c5a5ca454eaa451661275886c6000



### 可学习内容

- 学习如何查看一段时间内commit改变的内容  
  比如说第10个至第15个commit间共更改了哪些内容，而不是看一个个commit分别改了哪些内容  
  （如果不行的话看看合并commit要怎么操作）

  
  



### git衍生内容学习笔记



研究git对单项目免密方法


感觉发件者获取公钥进行加密，收件者再用私钥解密这个模式没啥问题啊


阮一峰博客阅读笔记http://www.ruanyifeng.com/blog/2011/08/what_is_a_digital_signature.html
有几个问题：
- 为什么还要再对数字签名进行私钥加密，整体都已经加密过了
- hash函数是公开的吗
- 苏珊要确认公钥是否正确只需要找鲍勃确认就行了啊