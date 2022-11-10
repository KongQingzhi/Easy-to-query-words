// app/controller/test.js
// 'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
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
    async testSendMail() {
        try {
            let email = this.getParam('email');  // 接收者的邮箱
            let Num = '';
            for (let i = 0; i < 6; i++) {
                Num += Math.floor(Math.random() * 10);
            }
            let subject = '易查验证码';
            let text = 'QQ邮箱易查验证码';
            let html = `<h2>验证码:</h2><span class="content-elem-span">${Num}</span>`;
            let has_send = await this.service.toolService.sendMail(email, subject, text, html);
            if (has_send) {
                this.ctx.response.body = Num;
            } else {
                this.ctx.response.body = '发送失败';
            }
        } catch (e) {
            console.log(e);
        }
    }

    //判断账户是否存在
    async getSendUserEmail() {
        let email = this.getParam('email');
        let list = await this.ctx.service.toolService.getSendUserEmail(email);
        this.ctx.response.body = list;
    }

    //修改密码
    async getCodePwd() {
        let email = this.getParam('email');
        let codepwd = this.getParam('codepwd');
        let num = await this.ctx.service.toolService.getCodePwd(codepwd, email);
        this.ctx.response.body = num;
    }
}

module.exports = TestController;
