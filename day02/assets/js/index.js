$(function(){
    // 获取用户信息
    getUserInfo()

    // 点击退出
    $('#logout').on('click',function(){
        layui.layer.confirm('是否退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href = '/day02/login.html'
            layer.close(index);
          });
            
    })
       
})
function getUserInfo() {
    $.ajax({
        type:'get',
        url:'/my/userinfo',
        success:function(res){
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败')
            // 渲染用户的信息
            renders(res.data);
        },
        // complete:function(res){
        //     console.log(res);
        //     if (res.responseJSON.status == 1 || res.responseJSON.message == '身份认证失败！') {
        //          // 1. 强制清空 token
        //     localStorage.removeItem('token')
        //         // 2. 强制跳转到登录页面
        //     location.href = '/day02/login.html'
        //     }
        // }
    }) 
}

function renders(userInfo) {
    // 渲染用户名称
    var name = userInfo.nickname || userInfo.username;
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name);
    
    // 渲染用户头像
    // console.log(userInfo);
    
    if (userInfo.user_pic == null) {
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(name[0].toUpperCase());
    }else {
        $('.layui-nav-img').show().prop("src",userInfo.user_pic);
        $('.text-avatar').hide();
    }
    // if (user.user_pic !== null) {
    //     // 3.1 渲染图片头像
    //     $('.layui-nav-img').attr('src', user.user_pic).hide()
    //     $('.text-avatar').show()
    //   } else {
    //     // 3.2 渲染文本头像
    //     $('.layui-nav-img').show()
    //     var first = name[0].toUpperCase()
    //     $('.text-avatar').html(first).hide()
    //   }
}