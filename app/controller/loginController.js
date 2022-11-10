const Controller = require('egg').Controller;

class LoginController extends Controller {
    //获取请求参数
    getParam(key) {
        //得到请求方式: "GET","POST"
        let method = this.ctx.request.method;//"GET", "POST"
        if (method == 'GET') {
            let v = this.ctx.request.query[key];
            return v;
        } else if (method == "POST") {
            let v = this.ctx.request.body[key];
            return v;
        }
    }

    // 登录
    async login() {
        try {
            let email = this.getParam("email");
            let pwd = this.getParam("pwd");
            let list = await this.ctx.service.loginService.login(email, pwd);
            if (list.length == 1) { // 登录成功
                this.ctx.session.email = list[0].email;
            }
            this.ctx.response.body = list;
        } catch (e) {
            this.ctx.response.body = "有错";
            console.log(e);
        }
    }

    // 判断是否登录
    async checklogin() { // 已经登录
        try {
            if (this.ctx.session.email) {
                this.ctx.response.body = true;
            } else { // 未登录
                this.ctx.response.body = false;
            }
        } catch (e) {
            console.log(e);
        }

    }

    // 退出登录 
    async loginOut() {
        this.ctx.session.email = null;
        this.ctx.response.body = true;
    }

    // 注册
    async addNew() {
        try {
            let email = this.getParam("email");
            let pwd = this.getParam("pwd");
            let flag = await this.ctx.service.loginService.countNo(email);
            if (flag) {
                this.ctx.response.body = "No";
            } else {
                let num = await this.ctx.service.loginService.addNew(email, pwd);
                this.ctx.response.body = num;
            }
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = LoginController;