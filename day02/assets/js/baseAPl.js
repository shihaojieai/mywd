// 每次发动axaj请求之前，都会经过这个函数处理，请求拦截
$.ajaxPrefilter(function(options){
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 统一为有权限的接口，设置 headers 请求头
   if (options.url.indexOf('/my/')  !== -1 ) {
    options.headers = {Authorization:localStorage.getItem('token') || "",}

    options.complete = function(res){
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
             // 1. 强制清空 token
        localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
        location.href = '/day02/login.html'
        }
        
    }
   }
})