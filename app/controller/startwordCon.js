const Controller = require('egg').Controller;

class StartWord extends Controller {

    getParams(key) {
        if (this.ctx.request.method == 'GET') {
            return this.ctx.request.query[key];
        } else if (this.ctx.request.method == 'POST') {
            return this.ctx.request.body[key];
        }
    }
    // 开始背单词
    async showword() {
        const user = this.getParams('username')
        const list = await this.ctx.service.startwordSer.showword(user);
        this.ctx.response.body = list[0];
    }
    //更新数据库
    async database() {
        const id = this.getParams('id') || 0;//单词表id
        const user = this.getParams('username');//用户邮箱
        if (id) {
            const count = this.getParams('count')
            const list = await this.ctx.service.startwordSer.database(id, user, count);
            this.ctx.response.body = list[0];
        } else {
            const count1 = this.getParams('count1');
            const count2 = this.getParams('count2');
            const list = await this.ctx.service.startwordSer.database(id, user, count1, count2);
            this.ctx.response.body = list[0];
        }
    }

    //复习
    async review() {
        const user = this.getParams('username')
        const list = await this.ctx.service.startwordSer.review(user);
        this.ctx.response.body = list[0];
    }
}

module.exports = StartWord;