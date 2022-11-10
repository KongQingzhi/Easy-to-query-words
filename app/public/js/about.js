window.onscroll = function () {
    let topNav = document.querySelector('.top');
    // console.log(window.pageYOffset);
    if (window.pageYOffset) {
        document.getElementById('backtop').style.display = 'block';
        topNav.style.boxShadow = '0px 4px 11px -3px rgb(0 0 0 / 30%)';
        topNav.style.borderBottom = ' 1px solid rgb(221, 218, 218)';
    } else {
        document.getElementById('backtop').style.display = 'none';
        topNav.style.boxShadow = '';
        topNav.style.borderBottom = '';
    }
}
function toplogin() {
    window.location.href = 'http://localhost:7000/public/html/login.html';
}

let index = 0;
setInterval(function () {
    if (index == 5) index = 0;
    ++index;
    backimg(index);
}, 2000)

function backimg(index) {
    let abright = document.getElementById('abtRight');
    switch (index) {
        case 1:
            abright.style.backgroundImage = "url('http://localhost:7000/public/img/itmetwo.jpg')";
            document.querySelector('.abtLeft .fiveab').style.backgroundColor = '';
            document.querySelector('.abtLeft .oneab').style.backgroundColor = '#F8F6F6';
            break;
        case 2:
            abright.style.backgroundImage = "url('http://localhost:7000/public/img/itmeone.jpg')";
            document.querySelector('.abtLeft .oneab').style.backgroundColor = '';
            document.querySelector('.abtLeft .twoab').style.backgroundColor = '#F8F6F6';
            break;
        case 3:
            abright.style.backgroundImage = "url('http://localhost:7000/public/img/itmethree.jpg')";
            document.querySelector('.abtLeft .twoab').style.backgroundColor = '';
            document.querySelector('.abtLeft .threeab').style.backgroundColor = '#F8F6F6';
            break;
        case 4:
            abright.style.backgroundImage = "url('http://localhost:7000/public/img/itmefour.jpg')";
            document.querySelector('.abtLeft .threeab').style.backgroundColor = '';
            document.querySelector('.abtLeft .fourab').style.backgroundColor = '#F8F6F6';
            break;
        case 5:
            abright.style.backgroundImage = "url('http://localhost:7000/public/img/itmeone.jpg')";
            document.querySelector('.abtLeft .fourab').style.backgroundColor = '';
            document.querySelector('.abtLeft .fiveab').style.backgroundColor = '#F8F6F6';
            break;
    }
}

// 点击跳转事件
function herftopone() {
    document.getElementById('yiChaAboutTop').scrollIntoView(true);
}
function herftoptwo() {
    document.getElementById('founder').scrollIntoView(true);
}
// 回到顶部
function backtop() {
    document.getElementById('bodydiv').scrollIntoView(true);
}