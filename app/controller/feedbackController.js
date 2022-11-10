const Controller = require("egg").Controller;

class FeedbackController extends Controller {
    //获取请求参数
    getParam(key) {
        //得到请求方式: "GET","POST"
        let method = this.ctx.request.method;//"GET", "POST"
        if (method == 'GET') {
            let v = this.ctx.request.query[key];
            return v;
        } else if (method == "POST") {
            let v = this.ctx.request.body[key];
            return v;
        }
    }


    async getAllAdvise() {
        try {
            let email = this.getParam("email");
            let choose = this.getParam("choose");
            let advise = this.getParam("advise");
            let num = await this.ctx.service.feedbackService.getAllAdvise(email, choose, advise);
			this.ctx.response.body = num;
        } catch (e) {
            console.log(e);
        }

    }

}

module.exports = FeedbackController;