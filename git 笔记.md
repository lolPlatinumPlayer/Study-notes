cd d:nospace/learngit


学习进度：学完https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013745374151782eb658c5a5ca454eaa451661275886c6000


· 不要使用windows自带记事本编辑文件


· Git专有名词英文
版本库 repository
暂存区 stage（或index）
分支 branch
有改动的文件 modified


· $ git init
把这个目录变成Git可以管理的仓库（表述可能不正确）
（内含工作区与版本库，.git文件夹以外都是工作区，.git是版本库）
并创建了一个master分支


· 把文件提交到分支
（使用下面两个命令前先要确保这个文件存在）
$ git add readme.txt
$ git commit -m "wrote a readme file"
add就是把文件修改添加到暂存区
commit就是把暂存区的所有内容提交到当前分支
commit -m后的内容是对这次提交的说明性文字
因此可以多次add后一次性commit来提交
（测试提交未更改的文件，似乎失败了）


· 同时在版本库和工作区（本地）删除的文件
$ git rm XX
要同步到分支的话要加上
$ git commit -m "remark information"


· $ git status
改命令用于查看状态
1、如工作区有文件未提交到版本库且未被添加到暂存区里，则会打印“Untracked files:”
   并在后面列出文件名（文件名的中文部分会以8进制形式显示）
2、如工作区有文件与分支不一致则会打印“Changes not staged for commit”
   并在后面列出文件名
   （文件名前会出现说明型前缀）
3、如暂存区与分支不一致，则会打印“Changes to be committed:”
   并在后面列出文件名
   （文件名前会出现说明型前缀）
   如暂存区与分支一致，则会在结尾打印“nothing added to commit”
4、如果一切正常，则会打印“nothing to commit, working tree clean”
   （一切正常意为工作区所有文件都与分支一致且暂存区无内容）
   

· 文件名说明型前缀
“deleted: ”
工作区没有而版本库有 或 暂存区没有而分支有
“new file: ”
暂存区有而分支没有
“modified: ”
工作区文件内容与版本库不一致 或 暂存区文件内容与分支不一致
“renamed: ”
（出现过一次，不过不知道触发机制。
测试了 工作区与暂存区不同、工作区与分支不同、暂存区与分支不同 都没触发）


· $ git diff
若暂存区有内容，则将工作区与暂存区比较
若暂存区无内容，则将工作区与分支比较
比较后的打印内容会显示 是否有不同、不同之处在哪


· $ git diff --cached
比较暂存区与分支的不同
比较后的打印内容会显示 是否有不同、不同之处在哪


· $ git log
查看所有提交的版本


· 回退到上个版本
git reset --hard HEAD^
如果commit后有做修改，那执行这个命令就会回到这个commit
HEAD后面`^`的数量代表回退2的`^`数量次方步，可以用^199这种简写（简写似乎不行）


## 还原未commit的更改
$ git checkout -- <file>...
<file>...可以改为`.`来选择所有这些文件
包含本地修改了未add的情况，已add的情况不知道生不生效，未追踪的不生效


· 变成未来某个版本
$ git reset --hard 2b595d5eac
hard后面是未来版本的版本号的头几位，输入后git会自动检索


· $ git reflog
显示记录的每次命令（上次关机前的命令都会保存），每条命令前都会有这条命令所在的版本号


# 下方是做电动车后记录的


## 连接服务端
要生成密钥，并在服务端添加密钥，然后再来一些操作即可连接


## 新建分支
`git branch 分支名`


## 切换分支
`git checkout 分支名`


## 从服务端下载某分支代码并合并
`git pull origin 分支名`（不清楚分支名是服务端还是本地的）


## 提交分支代码到服务端
`git push origin 分支名`（不清楚分支名是服务端还是本地的）


## 将本地另一个分支的代码合并过来
`git merge 分支名`


## 忽略文件
> .gitignore文件只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。
那么解决方法就是先把本地缓存删除（改变成未track状态），然后再提交。 —— 引用自《福信富通GIT使用帮助》
```
git rm -r --cached . // `git rm -r --cached 文件或文件夹`是可行的，前一个没试过
git add .
git commit -m 'xxx'
```



