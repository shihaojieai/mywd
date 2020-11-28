$(function () {
    // 表单验证
    var form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        cxpass: function (value) {
            if (value == $('#layui-form [name="oldPwd"]').val()) {
                return '新旧密码不能相同'
            }
        },
        recxpass: function (value) {
            if (value !== $('#layui-form [name="newPwd"]').val()) {
                return '确认密码根新密码相同'
            }
        }
    })

    // 重设密码请求
    $('#layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                console.log(res);
                
                layui.layer.msg('更新密码成功');
                // 重置表单
                $('#layui-form')[0].reset()
            }
        })
    })
})