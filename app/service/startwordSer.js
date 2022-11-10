const Service = require('egg').Service;

class StartWord extends Service {
    // 开始背单词
    async showword(username) {
        const user = `${username}word`;
        const sql = `select id, english, chinese from ${user} where rightcount = 0 && errorcount = 0 order by rand() limit 1`;
        const list = await this.ctx.app.mysql.query(sql);
        return list;
    }

    //对数据库的值进行+1
    async database(id, username, ...count) {
        if (id) {
            const user = `${username}word`;
            const sql = `update ${user} set ${count}=${count}+1 where id = ${id}`;
            const list = await this.ctx.app.mysql.query(sql);
            return list;
        } else {
            const [count1, count2] = count;
            const sql = `update user set ${count1}=${count1}+1,${count2}=${count2}+1 where email = '${username}@qq.com'`;
            const list = await this.ctx.app.mysql.query(sql);
            return list;
        }
    }

    //复习单词
    async review(username) {
        const user = `${username}word`;
        const sql = `select id, english, chinese from ${user} where rightcount > 0 || errorcount > 0 order by rand() limit 1`;
        const list = await this.ctx.app.mysql.query(sql);
        return list;
    }
}

module.exports = StartWord;
