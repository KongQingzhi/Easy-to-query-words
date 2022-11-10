const Controller = require('egg').Controller;

class MyWordController extends Controller {
    getParam(key) {
        //得到请求方式: "GET","POST"
        let method = this.ctx.request.method;//"GET", "POST"
        if (method == 'GET') {
            let value = this.ctx.request.query[key];
            return value;
        } else if (method == 'POST') {
            let value = this.ctx.request.body[key];
            return value;
        }
    }

    //获取所有我的单词
    async getAllMyWord() {
        try {
            let email = this.getParam('email');
            let list = await this.ctx.service.mywordService.getAllMyWord(email);
            this.ctx.response.body = list;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = '网络异常';
        }
    }

    //修改背诵结果
    async changeBool() {
        try {
            let bool = this.getParam("bool");
            let id = this.getParam('id');
            let email = this.getParam('email');
            let num = await this.ctx.service.mywordService.changeBool(email,bool, id);
            this.ctx.response.body = num;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = '网络异常';
        }
    }

    //增加单词
    async addEnglishWord() {
        try {
            let email = this.getParam('email');
            let english = this.getParam("english");
            let chinese = this.getParam('chinese');
            // console.log(english, chinese);
            let num = await this.ctx.service.mywordService.addEnglishWord(email,english, chinese);
            this.ctx.response.body = num;
        } catch (e) {
            console.log(e);
            this.ctx.response.body = '网络异常';
        }
    }
}
module.exports = MyWordController;