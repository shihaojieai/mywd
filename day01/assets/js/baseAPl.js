// 每次发动axaj请求之前，都会经过这个函数处理，请求拦截
$.ajaxPrefilter(function(options){
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})