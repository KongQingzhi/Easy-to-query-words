const Service = require('egg').Service;
const path = require("path");
const fs = require("fs");

class IndexService extends Service {

    //根据email查询出所有信息
    async getAllByEmail(email) {
        const sql = "select email, pwd, username, sex, headimg, birth, srwc, sewc, drwc, dewc, remark from user where email=?";
        let list = await this.ctx.app.mysql.query(sql, [email]);
        return list;
    }

    // email,pwd,username,sex,headimg,birth,srwc,sewc,drwc,dewc,remark
    async update(pwd, username, sex, files, birth, remark, email) {
        let url = null;
        if (files.length == 1) {
            let file = files[0];
            const toFileName = '/public/upload/' + Date.now() + file.filename;
            let to = path.dirname(__dirname) + toFileName;
            await fs.copyFileSync(file.filepath, to);
            await fs.unlinkSync(file.filepath);//文件上传结束
            //上传的文件的网络访问路
            url = "http://localhost:7000" + toFileName;
        }
        if (url == null) {
            const sql = "update user set pwd=?,username=?,sex=?,birth=?,remark=?where email=?";
            let res = await this.ctx.app.mysql.query(sql, [pwd, username, sex, birth, remark, email]);
            return res.affectedRows;
        } else {
            const sql = "update user set pwd=?,username=?,sex=?,headimg=?,birth=?,remark=?where email=?";
            let res = await this.ctx.app.mysql.query(sql, [pwd, username, sex, url, birth, remark, email]);
            return res.affectedRows;
        }
    }

}


module.exports = IndexService;