const Service = require("egg").Service;

class FeedbackService extends Service {
    async getAllAdvise(email, choose, advise) {
        const sql = "insert into feedback (email,choose,advise)values(?,?,?)";
        let res = await this.ctx.app.mysql.query(sql, [email, choose, advise]);
        return res.affectedRows;
    }


}

module.exports = FeedbackService;