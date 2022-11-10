//plugin.js
//注入跨域插件
exports.cors = {
    enable: true,
    package: 'egg-cors',
};
//注入mysql插件,
exports.mysql = {
    enable:true,
    package:'egg-mysql',
}