const Controller = require('egg').Controller;

class JoinWordController extends Controller {
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

    async joinWord() {
        try {
            let email = this.getParam("username");
            let wordid = this.getParam("wordid");
            let num = await this.ctx.service.joinWordService.joinWord(email, wordid);
            this.ctx.response.body = num;
        } catch (e) {
            console.log("有错" + e);
        }
    }
}
module.exports = JoinWordController;