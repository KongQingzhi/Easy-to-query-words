const Service = require('egg').Service;

class LoginService extends Service {
    // 登录
    async login(email, pwd) {
        const sql = "select id, email,pwd,username,sex,headimg,birth,remark from user where email=? and pwd=?";
        let list = await this.ctx.app.mysql.query(sql, [email, pwd]);
        return list;
    }

    //统计表中是否有重复的账号, 有返回true,没有返回false
    async countNo(email) {
        const sql = "select count(*) nonum from user where email=?";
        //list：其中一定是有仅只有一个对象 list=[{nonum:0}] 或 [{nonum:1}]
        let list = await this.ctx.app.mysql.query(sql, [email]);
        if (list[0].nonum == 0) {//账号不重复
            return false;
        } else {//要注册的新账号参数no，在表中已经存在了。
            return true;
        }
    }

    // 注册
    async addNew(email, pwd) {
        const em = email.substring(0, email.indexOf('@'));
        const sql1 = "insert into user(email,pwd,birth,headimg,srwc,sewc,drwc,dewc)values(?,?,'2002-09-12 00:00:00','http://localhost:7000/public/upload/1664344671974alexandr-rusnac-xsYysUSY5nw-unsplash.jpg',0,0,0,0)";
        const sql2 = `create table ${em + 'word'} like admin1word`;
        const sql3 = `create table ${em + 'wordself'} like admin1wordself`;
        const sql4 = `insert into ${em + 'word'} select * from cet4`;
        let res1 = await this.ctx.app.mysql.query(sql1, [email, pwd]);
        let res2 = await this.ctx.app.mysql.query(sql2);
        let res3 = await this.ctx.app.mysql.query(sql3);
        let res4 = await this.ctx.app.mysql.query(sql4);
        return { ...res1, ...res2, ...res3, ...res4 };
    }


}
module.exports = LoginService;