# manager-system

> A Vue.js project

基于Vue的文章后台管理系统

主要功能：
1、文章编写发布
2、文章管理
3、数据统计
4、个人信息


运行截图：
1、登录
![登录界面](https://github.com/DYZ1995/manager-system/blob/master/demo/login.png )

登录验证

![用户名或密码为空](https://github.com/DYZ1995/manager-system/blob/master/demo/login-2.png)

![用户名或密码错误](https://github.com/DYZ1995/manager-system/blob/master/demo/login-1.png)


不同权限用户登录效果

![DYZ](https://github.com/DYZ1995/manager-system/blob/master/demo/login-DYZ.png)

![WY](https://github.com/DYZ1995/manager-system/blob/master/demo/login-WY.png)

2、文章编辑

![文章编辑](https://github.com/DYZ1995/manager-system/blob/master/demo/textEditor.png)

使用了vue-quill-editor富文本框编辑插件，
实现过程

安装vue-quill-editor

安装vue-quill-editor并将其添加进依赖

引入vue-quill-editor

在Vue主文件中引入并使用vue-quill-editor

引入并使用VueQuillEditor

在页面中直接添加VueQuillEditor

在页面添加quill-editor元素，该元素内部支持v-model属性，我们可以自定义v-model，获取该model的值并传递给后台

通过config属性传递配置参数，可以自定义quill-editor的属性

支持在quill-editor上绑定事件

3、文章发布

![文章发布](https://github.com/DYZ1995/manager-system/blob/master/demo/textSend.png)

使用了element的时间选择插件、分页

搜索框实现了模糊查询功能

4、文章管理

![文章管理](https://github.com/DYZ1995/manager-system/blob/master/demo/textManager.png)

5、数据统计

![数据统计](https://github.com/DYZ1995/manager-system/blob/master/demo/dataChart.png)

使用了vue-chartjs