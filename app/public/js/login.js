//样式js
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.onclick = function () {
    container.className = "container sign-up-mode";
}

sign_in_btn.onclick = function () {
    container.className = "container";
}

// 注册
async function addNew() {
    let form2 = document.querySelector("form.sign-up-form");
    let email = form2.querySelector("#register-act").value;
    let pwd = form2.querySelector("#register-pwd1").value;
    let pwd2 = form2.querySelector("#register-pwd2").value;
    var aqq = /^[1-9][0-9]{4,10}@qq.com$/.test(email);
    if (aqq == false) {
        alert("请输入正确的格式：xxxxxx@qq.com");
    } else if (pwd == pwd2) {
        let res = await axios.post("/addNew.do", { email, pwd });
        if (res.data == "NO") { //增加成功
            alert("账号已经被使用");
        } else if (res.data.affectedRows) { //账号冲突
            console.log("成功");
            form2.querySelector("#register-act").value = "";
            form2.querySelector("#register-pwd1").value = "";
            form2.querySelector("#register-pwd2").value = "";
            alert("注册成功，请登录");
        } else { //增加失败
            alert("增加异常");
        }
    } else {
        alert("两次输入的密码不一致，请重新输入！")
    }
}


function sendEmailDiv() {
    let sendEmailDiv = document.querySelector('.sendEmailDivbox');
    sendEmailDiv.style.visibility = 'visible';
}

function quitsendEmail() {
    let sendEmailDiv = document.querySelector('.sendEmailDivbox');
    sendEmailDiv.style.visibility = 'hidden';
}

function sendEmail() {
    let newpwdn = document.querySelector('input[name=newpwdn]');
    let newpwdn2 = document.querySelector('input[name=newpwdn2]');
    if (newpwdn.value == newpwdn2.value) {
        //发送请求修改密码
        let codepwd = newpwdn2.value;
        let email = document.querySelector('input[name=sendNO]').value;
        //发送请求
        let promise = axios.post('http://localhost:7000/getCodePwd.do', { codepwd, email });
        promise.then(res => {
            let num = res.data
            if (num) {
                alert('修改密码成功')
            } else (
                alert('网络异常')
            )
        }).catch(e => {
            console.log(e);
        })
    } else {
        alert("两次密码不一致，请重新输入");
    }
}

//获取验证码
let Num = null;
function getCode() {
    let sendNo = document.querySelector('input[name=sendNO]').value;
    let sendbool = /^[1-9][0-9]{4,10}@qq.com$/.test(sendNo);
    let email = null;
    if (sendbool) {
        email = sendNo;
        //判断账号是否存在
        //发送亲求
        let promise = axios.get('http://localhost:7000/getSendUserEmail.do', { params: { email } });
        promise.then(res => {
            let list = res.data
            getCodeNext(list, email)
        }).catch(e => {
            console.log(e);
        })
    } else {
        alert('账号格式有误')
    }
}

function getCodeNext(list, email) {
    if (list.length) {//账号存在
        let promisenext = axios.get('http://localhost:7000/testSendMail.do', { params: { email } });
        promisenext.then(res => {
            Num = res.data;
        }).catch(e => {
            console.log(e);
        })
    } else {//账号不存在
        alert('账号不存在，请注册');
    }
}

//判断验证码是否有误，正确才可以修改密码
function newpwd(Num) {
    let getCodeNum = document.querySelector('input[name=getCode]').value;
    if (getCodeNum == Num) {
        let newpwdn = document.querySelector('input[name=newpwdn]');
        newpwdn.removeAttribute('readonly');
        let newpwdn2 = document.querySelector('input[name=newpwdn2]');
        newpwdn2.removeAttribute('readonly');
    } else {
        alert('验证码为空，或者验证码有误')
    }
}
