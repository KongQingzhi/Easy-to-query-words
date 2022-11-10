//router.js
module.exports = (app) => {
    const { router, controller } = app;
    //router.post("/login.do", controller.adminController.login);
    //router.get("/getAllPerson.do", controller.personController.getAllPerson);
    router.get('/showword', controller.startwordCon.showword);
    router.get('/database', controller.startwordCon.database);
    router.get('/review', controller.startwordCon.review);


    router.get("/login.do", controller.loginController.login); // 登录
    router.get("/checklogin.do", controller.loginController.checklogin); // 判断登录
    router.get("/loginOut.do", controller.loginController.loginOut); // 退出登录
    router.post("/addNew.do", controller.loginController.addNew); // 注册

    router.post("/getAllByEmail.do", controller.indexController.getAllByEmail);
    router.post("/update.do", controller.indexController.update); // 修改信息

    router.post("/getAllAdvise.do", controller.feedbackController.getAllAdvise);
    router.get("/joinWord.do", controller.joinWordController.joinWord)

    //http://localhost:7001/getAllMyWord.do
    router.get('/getAllMyWord.do', controller.mywordController.getAllMyWord);
    //修改背诵结果http://localhost:7001/changeBool.do
    router.post('/changeBool.do', controller.mywordController.changeBool);
    //增加单词http://localhost:7001/addEnglishWord.do
    router.post('/addEnglishWord.do', controller.mywordController.addEnglishWord);

    //发送邮件
    router.get('/testSendMail.do', controller.toolController.testSendMail);
    //判断账户是否存在
    router.get('/getSendUserEmail.do', controller.toolController.getSendUserEmail);
    //修改密码
    router.post('/getCodePwd.do', controller.toolController.getCodePwd);
};