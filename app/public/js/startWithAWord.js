const recite = document.querySelector('.recite');
const startword = document.querySelector('.startword');//开始背单词模块
const chinese1 = document.querySelector('#chinese1');//显示中文
const english1 = document.querySelector('#englishshow1');
const chinese2 = document.querySelector('#chinese2');//显示中文
const english2 = document.querySelector('#englishshow2');

const answer1 = document.querySelector('#answer1');
const answer2 = document.querySelector('#answer2');

const next1 = document.querySelector('#next1');//获取下一个
const forget1 = document.querySelector('#forget1');//获取忘记了
const next2 = document.querySelector('#next2');//获取下一个
const forget2 = document.querySelector('#forget2');//获取忘记了
const hint1 = document.querySelector('#hint1');
const hint2 = document.querySelector('#hint2');

const add1 = document.querySelector('#add1');
const add2 = document.querySelector('#add2');

let englishword = '';
let replycount = 0;//回答次数
let wordid = 0;//单词id

let search = window.location.search;
//防止乱码，进行转码
search = decodeURI(search, "utf-8");
//将字符串转为数组
const list = search.substring(1).split("&");

let username = list[0].substring(0, list[0].indexOf('@'));////用户邮箱



// 点击开始背单词
recite.addEventListener('click', function () {
    showword(chinese1);
    english1.innerHTML = '';
})




//显示单词
function showword(chinese) {
    const url = 'http://localhost:7000/showword';
    const promise = axios.get(url, { params: { username } });
    promise.then(res => {
        const data = res.data;
        englishword = data.english;
        wordid = data.id;
        chinese.innerHTML = data.chinese;
    }).catch(e => {
        console.log('error' + e);
    })
}



//对比内容
function compared(chinese, english, answer, hint) {
    const answers = answer.value;

    if (englishword == answers) {
        if (replycount) {
            replycount = 0;
        } else {
            updatedatabase(wordid, username, 'rightcount');
            updatedatabase(username, 'srwc', 'drwc');
        }
        if (chinese == chinese1) {
            console.log(chinese == chinese1);
            showword(chinese);
        } else {
            console.log(chinese == chinese2);
            review(chinese);
        }
        answer.value = '';
        english.innerHTML = '';
        hint.style.visibility = 'hidden';
    } else {
        updatedatabase(wordid, username, 'errorcount');
        updatedatabase(username, 'sewc', 'dewc');
        hint.style.visibility = 'visible';
    }
}

function forgetshow(english) {
    english.innerHTML = englishword;
    updatedatabase(wordid, username, 'errorcount');
    updatedatabase(username, 'sewc', 'dewc');
}
//点击下一个按钮
next1.addEventListener('click', function () {
    compared(chinese1, english1, answer1, hint1);
});
//点击忘记啦按钮
forget1.addEventListener('click', function () {
    forgetshow(english1);
    replycount = 1;
});

//更新数据库
function updatedatabase(...params) {
    const url = 'http://localhost:7000/database';
    if (params.includes(wordid)) {
        const [id, username, count] = params;
        axios.get(url, { params: { id, username, count } }).then(res => {
        }).catch(e => {
            console.log('error' + e);
        })
    } else {
        const [username, count1, count2] = params;
        if (count1 == 'srwc' || count1 == 'sewc') {
            axios.get(url, { params: { username, count1, count2 } }).then(res => {
            }).catch(e => {
                console.log('error' + e);
            })
        }
    }
}

function review(chinese) {
    const url = 'http://localhost:7000/review';
    const promise = axios.get(url, { params: { username } });
    promise.then(res => {
        const data = res.data;
        englishword = data.english;
        wordid = data.id;
        chinese.innerHTML = data.chinese;
    }).catch(e => {
        console.log('error' + e);
    })
}

//复习
const reviewword = document.querySelector('.review');
reviewword.addEventListener('click', function () {
    review(chinese2);
    english2.innerHTML = '';
})


//点击下一个按钮
next2.addEventListener('click', function () {
    compared(chinese2, english2, answer2, hint2);
});
//点击忘记啦按钮
forget2.addEventListener('click', function () {
    forgetshow(english2);
    replycount = 1;
});








add1.addEventListener('click', function () {
    add( );
})

add2.addEventListener('click', function () {
    add();
})

function add() {
    let promise = axios.get("http://localhost:7000/joinWord.do", { params: { username,wordid } });
    promise.then(res => {
        let data = res.data;
        if (data == 1) {
            alert("加入成功")
        } else {
            alert("加入失败")
        }
    })

}