// app/service/tool.js

'use strict';

const Service = require('egg').Service;

const nodemailer = require('nodemailer');
const user_email = '1471695481@qq.com';
const auth_code = 'bkgeexvespcqgfah';

const transporter = nodemailer.createTransport({
    service: 'qq',
    secureConnection: true,
    port: 465,
    auth: {
        user: user_email, // 账号
        pass: auth_code, // 授权码
    },
});

class ToolService extends Service {

    async sendMail(email, subject, text, html) {

        const mailOptions = {
            from: user_email, // 发送者,与上面的user一致
            to: email,   // 接收者,可以同时发送多个,以逗号隔开
            subject,   // 标题
            text,   // 文本
            html,
        };

        try {
            await transporter.sendMail(mailOptions);
            return true;
        } catch (err) {
            return false;
        }
    }

    //判断账号，是否存在
    async getSendUserEmail(email) {
        const sql = 'select email from user where email=?';
        let list = await this.ctx.app.mysql.query(sql, [email]);
        return list
    }

    //修改密码
    async getCodePwd(codepwd, email) {
        const sql = 'update user set pwd=? where email=?';
        let r = await this.ctx.app.mysql.query(sql, [codepwd, email]);
        return r.affectedRows;
    }

}

module.exports = ToolService;

