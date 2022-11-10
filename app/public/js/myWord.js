let id = null;

let search1 = window.location.search;
//防止乱码，进行转码
search1 = decodeURI(search1, "utf-8");
//将字符串转为数组
const list1 = search1.substring(1).split("&");

let email = list1[0].substring(0, list1[0].indexOf('@'));////用户邮箱



function show1() {
    // 得到自己单词表的所有单词
    let url = 'http://localhost:7000/getAllMyWord.do';
    let promise = axios.get(url, { params: { email } });
    promise.then(res => {
        let wordRoll = document.getElementById('wordRoll');
        let list = res.data;
        for (let i = 0; i < list.length; i++) {
            let vessel = document.createElement('div');//增加一个容器
            vessel.classList.add('wordRollson')
            wordRoll.appendChild(vessel);
            if (list[i].bool == 1) {
                vessel.innerHTML = `
                <div>${list[i].english}</div>
                <div>${list[i].chinese}</div>
                <div>正确</div>
                `
            } else {
                vessel.innerHTML = `
            <div style='color:red;'>${list[i].english}</div>
            <div style='color:red;'>${list[i].chinese}</div>
            <div style='color:red;'>错误</div>
            `
            }
        }
    })
}
//开始背诵单词
async function beginrecite() {
    let url = 'http://localhost:7000/getAllMyWord.do';
    let list = await axios.get(url, { params: { email } });
    let arr = list.data;
    console.log(arr);
    let myWordRectie = document.getElementById('myWordRectie');
    myWordRectie.innerHTML = '';
    let topeglh1 = document.createElement("div");
    topeglh1.classList.add('topeglh1')
    myWordRectie.appendChild(topeglh1);
    let rondnum = Math.round(Math.random() * (arr.length - 1));
    // <marquee>我默认向左滚。。。。。</marquee>
    topeglh1.innerHTML = `<marquee> ${arr[rondnum].chinese}</marquee>`;
    let topeglh2 = document.createElement("input");
    let topeglh2down = document.createElement("div");
    topeglh2.setAttribute('type', 'text');
    topeglh2.setAttribute('placeholder', '请输入英文');
    topeglh2.setAttribute('autofocus', "autofocus");//自动获得焦点
    myWordRectie.appendChild(topeglh2);
    myWordRectie.appendChild(topeglh2down);
    topeglh2.classList.add('topeglh2')
    topeglh2down.classList.add('topeglh2down')

    //退出
    let buttonOut = document.createElement('button');
    buttonOut.innerHTML = '退出'
    buttonOut.classList.add('buttonOut')
    myWordRectie.appendChild(buttonOut);
    buttonOut.addEventListener('click', function () {
        myWordRectie.innerHTML = `
        <div id="R-top"></div>
                <div id="R-body">
                    <div id="R-bodyTop">
                        <div>英文</div>
                        <div>中文</div>
                        <div>结果</div>
                    </div>
                    <div id="wordRollff">
                        <marquee id="wordRoll" direction="up" loop height="350px">
                            <h4 style="text-align:center ;">不是你卷死别人，就是别人卷死你</h4>
                        </marquee>
                    </div>
                </div>
                <div id="R-foot">
                    <button onclick="beginrecite()">开始背单词</button>
                </div>
        `;
    });

    //增加单词
    let buttonAdd = document.createElement('button');
    buttonAdd.innerHTML = '增加我的单词';
    buttonAdd.classList.add('buttonAdd')
    myWordRectie.appendChild(buttonAdd);
    buttonAdd.addEventListener('click', function () {
        let recite = document.getElementById('myWordRectie');
        let addWordDiv = document.createElement('div');
        addWordDiv.style.width = '100%';
        addWordDiv.style.height = '100%';
        addWordDiv.classList.add('addWordDiv');
        recite.appendChild(addWordDiv);
        //加入英文
        let addWordIpt = document.createElement('input');
        addWordDiv.appendChild(addWordIpt);
        addWordIpt.setAttribute('type', 'text');
        addWordIpt.setAttribute('name', 'addEnglish');
        addWordIpt.setAttribute('placeholder', '请输入英文');
        //加入中文
        let addChineseIpt = document.createElement('input');
        addWordDiv.appendChild(addChineseIpt);
        addChineseIpt.setAttribute('type', 'text');
        addChineseIpt.setAttribute('name', 'addChinese');
        addChineseIpt.setAttribute('placeholder', '请输入中文');

        addChineseIpt.onkeydown = function () {
            let key = event.key;
            if (key == "Enter") {
                let english = addWordIpt.value;
                let chinese = addChineseIpt.value;
                //发送axios请求
                let flag = confirm(`是否确认增加该单词
                ${chinese}: ${english}`);
                if (flag) {
                    addEnglishWord(english, chinese);
                    addWordIpt.value = '';
                    addChineseIpt.value = '';
                } else {

                }
            }
        }
        //返回背诵单词
        let bntback = document.createElement('button');
        addWordDiv.appendChild(bntback);
        bntback.classList.add('bntback');
        bntback.innerHTML = '返回继续背单词';
        bntback.addEventListener('click', () => {
            let rmv = document.querySelector('.addWordDiv')
            recite.removeChild(rmv);
        })
    });
    // 键盘事件
    topeglh2.onkeydown = function () {//onkeydown可以识别除fn以外的所有按键
        let aaa = document.querySelector('.topeglh2down').innerHTML.indexOf('拼写正确');
        if (aaa == 0) {//拼写正确
            topeglh2down.innerHTML = '';
            beginrecite();
        } else {
            let key = event.key;
            if (key == "Enter") {
                topeglh2down.innerHTML = '';
                console.log(topeglh2.value);//当键盘敲a时，控制台就输出a
                let ascllipt = (arr[rondnum].english).indexOf(topeglh2.value);
                let flag1 = (arr[rondnum].english).length;
                let flag2 = (topeglh2.value).length;
                console.log(ascllipt);//判断是否正确；输出0（正确）或-1（错误）
                console.log(arr[rondnum].english);//数据库单词

                if (ascllipt == 0 && flag1 == flag2) {
                    //发送请求，修改我的单词表信息
                    webChangeBool(1, arr[rondnum].id);//拼写正确，且一次正确
                    topeglh2down.innerHTML = `拼写正确：${arr[rondnum].english}/:${arr[rondnum].chinese}`;
                    return;
                } else {
                    //发送请求，修改我的单词表信息
                    webChangeBool(0, arr[rondnum].id);//拼写错误
                    topeglh2down.innerHTML = `拼写错误,你的拼写：${topeglh2.value}；正确拼写：${arr[rondnum].english}`;
                    topeglh2.value = ''
                    return;
                }
            } else {
            }
        }
    }
}

//修改背诵结果
function webChangeBool(booling, iding) {
    console.log(booling, iding);
    let promise = axios.post('http://localhost:7000/changeBool.do', { email, bool: booling, id: iding });
    promise.then(res => {
        console.log(res.data);
    }).catch(e => {
        console.log(e);
    })
}
//增加我的单词
function addEnglishWord(english, chinese) {
    let promise = axios.post('http://localhost:7000/addEnglishWord.do', { email, english, chinese });
    promise.then(res => {
        console.log(res.data + '成功');
    }).catch(e => {
        console.log(e);
    })
}






