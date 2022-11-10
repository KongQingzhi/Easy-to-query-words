# Easy-to-query-words

## 网站简介

易查单词是一个背诵单词的网站，内置四级单词库，可以高效的帮助备战四级的人群背诵单词。对每一个背过的单词都会进行记录，通过内置算法，有效复习背诵过的单词。同时，网站还支持单词添加功能，可以添加用户遇到的生僻单词，拥有用户自己的单词本。

## 技术路线

Egg.js + MySQL + Axios.js + Node.js + jQuery

## 项目实现

项目利用Egg.js框架进行构建，使用npm工具管理项目相关的包。首先利用HTML、CSS、JS完成页面的基本布局和美化。然后创建项目所需的API，并配置路由，然后通过getman测试API的功能。前端通过Axios.js向后台数据库发送异步的请求，实现对数据库内容的增删改查，最后将后台响应的异步的信息进行处理后渲染在页面相应的位置。

## 项目运行

要运行测试，运行以下命令
1. 安装项目的相关依赖包
```bash
  npm i
```

2. 将项目中的数据表导入到MySQL数据库

进入MySQL可视化工具，选择运行SQL文件

3. 在配置文件中配置数据库参数
找到config文件夹下的config.default.js文件
```
//数据库mysql配置
exports.mysql = {
    client: {
        host: 'localhost',
        port: '3306',
        user: 'root',//管理员名字
        password: '925336',//数据库密码,要根据情况修改
        database: 'societies',//数据库名字，要根据情况修改
    },
};
```
4. 运行
```bash
npm run dev
```
5. 通过浏览器访问项目

```
http://localhost:7000/public/html/about.html
```

**注意** 

请更改配置文件的端口号，位置`config/config.default.js`

