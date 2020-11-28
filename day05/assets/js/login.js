$(function () {
    // 点击'去注册'切换到注册页面
    $('#logbox2_a').on('click', function () {
        $('.logbox3').show();
        $('.logbox2').hide();
    })
    // 点击'去登录'切换到登录页面
    $('#logbox3_a').on('click', function () {
        $('.logbox2').show();
        $('.logbox3').hide();
    });

    // 正则表达式验证 
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repass: function (value) { //value：表单的值、item：表单的DOM对象
            var psd = $('#logbox3d [name="password"]').val();
            if (psd !== value) {
                return '两次的密码不对，请重新输入';
            }
        }
    })

    // 注册功能的监听事件
    $('#logbox3d').on('submit', function (e) {
        e.preventDefault();
        // 注册请求
        $.ajax({
            type: "post",
            url: '/api/reguser',
            data: {
                username: $('#logbox3d [name="username"]').val(),
                password: $('#logbox3d [name="password"]').val(),
            },
            success: function (res) {
                if (res.status !== 0) {return layer.msg(res.message)}
                layer.msg('注册成功');
                $('#logbox3_a').click();
            }
        })
    })

     // 登录功能的监听事件
     $('#logbox2d').on('submit', function (e) {
        e.preventDefault();
        // 登录请求
        $.ajax({
            type: "post",
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('登录成功');
                // 本地存储res.token
                localStorage.setItem('token',res.token);
                // 跳转主页
                location.href = '/day05/index.html'
            }
        })
    })

})