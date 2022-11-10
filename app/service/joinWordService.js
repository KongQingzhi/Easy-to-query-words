const Service = require("egg").Service;

class JoinWordService extends Service {

    async joinWord(email, wordid) {
        const sufaceName = email + '';
        const sql = `insert into ${sufaceName+'wordself'}(english,chinese) select english,chinese from ${sufaceName+'word'} where id=${wordid}`;
        let res = await this.ctx.app.mysql.query(sql);
        return res.affectedRows;
    }
}

module.exports = JoinWordService;