//样式js
const optionBox = document.querySelector('#option-box');
const flerdiv = document.querySelectorAll('#option-box>div');
const part = document.querySelectorAll('.part');
function show(num) {
    for (let i = 0; i < part.length; i++) {
        part[i].style.display = 'none';
    }
    part[num].style.display = 'block';
}

optionBox.addEventListener('click', function (event) {
    for (let i = 0; i < flerdiv.length; i++) {
        flerdiv[i].setAttribute('index', i);
        flerdiv[i].style.height = 50 + 'px';
        flerdiv[i].children[0].style.color = '#fff';
        flerdiv[i].children[1].style.color = '#fff';
        flerdiv[i].style.backgroundColor = '#0176ea';
    }
    const fler = event.target.parentElement.parentElement;
    if (fler.className == 'fler') {
        fler.style.height = 100 + 'px';
        fler.style.backgroundColor = '#fff';
        fler.children[0].style.color = '#0176ea';
        fler.children[1].style.color = '#0176ea';
        fler.style.borderRadius = 50 + 'px';
        show(Number(fler.getAttribute('index')) + 1);
    }
})



//控制

let userNo = null;
window.onload = function () {
    //判断是否登陆
    async function checkLogin() {
        let res = await axios.get("http://localhost:7000/checklogin.do");
        let flag = res.data;
        if (flag == false) {//未登陆
            window.location.href = "./login.html";
        } else {//已经登陆过
            //得到注册信息，使用全局变量userNo保存email,并显示在页面
            let search = location.search;
            search = search.slice(1);
            search = search.split("&");
            let email = search[0];
            userNo = email;
            let list = await getAllByEmail();
            showList(list);
        }
    }
    checkLogin();
}

//退出登陆
function loginout() {
    let promise = axios.get("http://localhost:7000/loginOut.do");
    promise.then(res => {
        window.location.href = "./login.html";
    }).catch(e => {
        console.log(e);
    })
}

// 渲染到个人头像那
async function showList(list) {
    // 用户名
    let username = list[0].username;
    if (username == null) {
        document.querySelector('.username').innerHTML = '新用户';
        document.getElementById("username").innerHTML = '新用户';
    } else {
        document.getElementById("username").innerHTML = username;
        document.querySelector('.username').innerHTML = username;
    }


    let userPwd = list[0].pwd;
    document.querySelector("input[name=userPwd]").value = userPwd;

    // 邮箱
    let noinput = list[0].email;
    document.querySelector("input[name=userNo]").value = '邮箱：' + noinput;

    // 性别
    let sexinput = list[0].sex;
    document.querySelector("input[name=userSex]").value = '性别：' + sexinput;

    // 取出生日信息并显示
    let birthinput = list[0].birth;
    if (birthinput == null) {
        document.querySelector("input[name=userBrith]").value = '生日';
    } else {
        //处理日期显示格式问题
        let nbirth = new Date(birthinput); //转换成了Date的对象
        let year = nbirth.getFullYear(); //年
        let month = nbirth.getMonth() + 1; //月
        let date = nbirth.getDate(); //日
        if (month < 10) {
            month = '0' + month;
        }
        if (date < 10) {
            date = '0' + date;
        }
        birthinput = `${year}-${month}-${date}`;
        document.querySelector("input[name=userBrith]").value = '生日：' + birthinput;
    }

    // 将remark取出来存在座右铭里
    let motto = list[0].remark;
    if (motto == null) {
        document.querySelector("span.motto").innerHTML = '写一个你的座右铭吧';
    } else {
        document.querySelector("span.motto").innerHTML = motto;
    }

    // 头像

    let boxdiv1 = document.getElementById("box1");
    let u1 = list[0].headimg;
    if (u1 == null) {
        let url = 'http://localhost:7000/public/img/def.png'
        boxdiv1.style.backgroundImage = `${url}`;
    }
    boxdiv1.style.backgroundImage = `url(${u1})`;
    const userImage = document.querySelector('#userImage')
    userImage.style.backgroundImage = `url(${u1})`;

    let boxdiv2 = document.getElementById("box2");
    let u2 = list[0].headimg;
    if (u2 == null) {
        let url = 'http://localhost:7000/public/img/def.png'
        boxdiv2.style.backgroundImage = `${url}`;
    }
    boxdiv2.style.backgroundImage = `url(${u2})`;
    userImage.style.backgroundImage = `url(${u1})`;

    let res = await axios.post("http://localhost:7000/addNew.do", { email: userNo });
    if (res.data == 'No') {
        let list = await getAllByEmail();
    }
}

// 根据email查出所有的信息
async function getAllByEmail() {
    let res = await axios.post("/getAllByEmail.do", { email: userNo });
    let list = res.data;
    return list;
}

// 上传新头像时显示
function prestatic() {
    let file = document.getElementById("choose").files[0];
    let url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    let box2 = document.getElementById("box2");
    box2.style.backgroundImage = `url(${url})`
}

// 修改
async function update() {
    let list = await getAllByEmail();
    let updateDiv = document.querySelector("div.updateDiv");
    updateDiv.querySelector("input[name=userNo]").value = userNo;
    // 用户名
    let username = list[0].username;
    if (username == null) {
        document.querySelector("input[name=username]").value = '新用户';
    }
    document.querySelector("input[name=username]").value = username;
    // 性别
    let sexinput = list[0].sex;
    document.querySelector("input[name=userSex1]").value = sexinput;

    // 取出生日信息并显示
    let birthinput = list[0].birth;
    if (birthinput == null) {
        document.querySelector("input[name=userBrith1]").value = '生日';
    } else {
        //处理日期显示格式问题
        let nbirth = new Date(birthinput); //转换成了Date的对象
        let year = nbirth.getFullYear(); //年
        let month = nbirth.getMonth() + 1; //月
        let date = nbirth.getDate(); //日
        if (month < 10) {
            month = '0' + month;
        }
        if (date < 10) {
            date = '0' + date;
        }
        birthinput = `${year}-${month}-${date}`;
        document.querySelector("input[name=userBrith1]").value = birthinput;
    }

    // 将remark取出来存在座右铭里
    let motto = list[0].remark;
    if (motto == null) {
        document.querySelector(".motto1").value = '写一个你的座右铭吧';
    } else {
        document.querySelector(".motto1").value = motto;
    }
    show(4);
}


//确认修改信息
async function updateIFT() {
    let updateDiv = document.querySelector("div.updateDiv");
    //取出email的值
    let email = updateDiv.querySelector("input[name=userNo]").value;
    email = userNo;
    //取出要修改的其它值
    let username = updateDiv.querySelector("input[name=username]").value;
    let pwd = updateDiv.querySelector("input[name=userPwd]").value;
    let sex = updateDiv.querySelector("input[name=userSex1]").value;
    let birth = updateDiv.querySelector("input[name=userBrith1]").value;
    let remark = updateDiv.querySelector(".motto1").value;
    let file = document.getElementById("choose").files[0];
    // 验证头像格式
    if (file != undefined) {
        let f1 = file.type == "image/png" || file.type == "image/jpeg";
        if (f1 == false) {
            alert("头像格式不对")
            return;
        }
    }

    //axios请求服务,进行修改
    //提交到后台服务
    let formData = new FormData();
    if (file) {//如果修改了头像
        formData.append("uploadFile", file, file.name);
    }
    formData.append("email", email)
    formData.append("username", username)
    formData.append("pwd", pwd);
    formData.append("sex", sex);
    formData.append("birth", birth);
    formData.append("remark", remark);

    const config = {
        headers: {
            "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
        }
    };

    let res = await axios.post("/update.do", formData, config);
    if (res.data == 1) {//修改成功
        alert("修改成功");
        //刷新显示班级中的学生
        let list = await getAllByEmail(); //学生对象数组
        showList(list); //使用表格显示list中的学生
        show(0);
    } else {//修改失败
        alert("修改失败");
    }
}

function showOrHiddenForUpdate() {
    show(0);
}


// 反馈
function feedback() {
    let move = document.getElementById("move");
    move.style.zIndex = "50";
    adshow();
}

function adshow() {
    let mouseOffsetX = 0; // 记录当前鼠标位置
    let mouseOffsetY = 0;
    let isDraging = false; // 记录元素是否可以拖动
    // 鼠标事件1：鼠标按下标记元素为可拖动状态，并且记下鼠标当前位置的偏移
    get('move-header').addEventListener('mousedown', function (e) {
        var e = e || window.event;
        // 鼠标距离div左侧偏移距离 =  e.pageX鼠标距离页面左侧距离 - get('move').offsetLeft为div距离页面左侧距离
        mouseOffsetX = e.pageX - get('move').offsetLeft;
        mouseOffsetY = e.pageY - get('move').offsetTop;

        isDraging = true;
    })

    // 鼠标事件2：鼠标开始移动，要检测浮层是否标记为移动，如果是则更新元素位置到当前鼠标位置
    document.onmousemove = function (e) {
        let ee = e || window.event;
        let moveX = 0;
        let moveY = 0;

        if (isDraging === true) {
            // div左侧距离页面左侧距离 = e.pageX鼠标距离页面左侧距离 - mouseOffsetX鼠标距离div左侧偏移距离
            moveX = ee.pageX - mouseOffsetX;
            moveY = ee.pageY - mouseOffsetY;

            get('move').style.left = moveX + "px";
            get('move').style.top = moveY + "px";
        }

    }
    //  鼠标事件3：放开鼠标后，元素变为不可拖动
    document.onmouseup = function () {
        isDraging = false;
    }
    function get(id) {
        return document.getElementById(id)
    }

}

async function ensure() {
    let move = document.getElementById("move");
    let choose = move.querySelector(".bottom input[name=back]:checked").value;
    let advise = move.querySelector(".bottom textarea").value;
    let email = userNo;
    console.log(choose, advise, email);
    let res = await axios.post("/getAllAdvise.do", { choose, advise, email });
    console.log(res.data);
    if (res.data == 1) {
        alert("提交成功！")
        let move = document.getElementById("move");
        move.querySelector(".bottom textarea").value = '';
    }
}

function cancel() {
    let move = document.getElementById("move");
    move.querySelector(".bottom textarea").value = '';
}




