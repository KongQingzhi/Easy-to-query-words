const Controller = require('egg').Controller;

class IndexController extends Controller {
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

    // 根据email查询出所有信息
    async getAllByEmail() {
        try {
            let email = this.getParam('email');
            let list = await this.ctx.service.indexService.getAllByEmail(email);
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
        }
    }

    // 修改信息
    async update() {
        let email = this.getParam("email");
        let username = this.getParam("username");
        let pwd = this.getParam("pwd");
        let sex = this.getParam("sex");
        let birth = this.getParam("birth");
        let remark = this.getParam("remark");
        const files = this.ctx.request.files;//[{file}]
        //如果前端没有修改头像,则files的值为 [] 
        let num = await this.ctx.service.indexService.update(pwd, username, sex, files, birth, remark, email)
        this.ctx.response.body = num;
    }

}
module.exports = IndexController;