const Service = require('egg').Service;

class MyWordService extends Service {

    //获取所有我的单词
    async getAllMyWord(email) {
        const sufaceName = email + 'wordself';
        const sql = `select id,english,chinese,bool from ${sufaceName}`;
        let list = await this.ctx.app.mysql.query(sql);
        return list;
    }

    //修改背诵结果
    async changeBool(email, bool, id) {
        const sufaceName = email + 'wordself';
        const sql = `update ${sufaceName} set bool=${bool} where id=${id}`
        console.log(sql);
        let num = await this.ctx.app.mysql.query(sql);
        return num;
    }

    //增加单词
    async addEnglishWord(email, english, chinese) {
        const sufaceName = email + 'wordself';
        const sql = `insert into ${sufaceName}(english,chinese) values('${english}','${chinese}')`;
        let r = await this.ctx.app.mysql.query(sql);
        return r.affectedRows;
    }

}

module.exports = MyWordService;