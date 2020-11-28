$(function() {
    // 设置用户信息验证
    
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        repass: function (value) { //value：表单的值、item：表单的DOM对象
            if (value.length > 6) {
                return '昵称的长度不能超过6位';
            }
        }
    })
    get()

    function get() {
        // 注册请求
        $.ajax({
            type: "get",
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {return layer.msg(res.message)}
                // layer.msg('修改成功');
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重设用户信息
    $('#bntReset').on('click',function(e){
        e.preventDefault();
        get()
    })

    // 提交修改
    $('#layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type: "post",
            url: '/my/userinfo',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {return layer.msg(res.message)}
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo() 
               
            }
        })
    })
})