$(function() {
    // 点"去注册账号"去注册页面
    $('#logbox_a').on('click',function(){
        $('.logbox1').show();
        $('.logbox').hide();
    })
    // 点"去登录"去登录页面
    $('#logbox1_a').on('click',function(){
        $('.logbox').show();
        $('.logbox1').hide();
    })

    // 自定义正则表达式
//     layui.form.verify({
//     pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        
// })

// 从 layui 中获取 form 对象
var form = layui.form
var layer = layui.layer
// 通过 form.verify() 函数自定义校验规则
form.verify({
  // 自定义了一个叫做 pwd 校验规则
  pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  // 校验两次密码是否一致的规则
  repwd: function(value) {
    // 通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
    // 然后进行一次等于的判断
    // 如果判断失败,则return一个提示消息即可
    var pwd = $('.logbox1 [name=password]').val()
    if (pwd !== value) {
      return '两次密码不一致！'
    }
  }
})
    // 注册功能
    $('#form_res').on('submit',function(e){
        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/api/reguser',
            data:{
                username: $('#form_res [name=username]').val(),
                password: $('#form_res [name=password]').val(),
            },
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    layer.msg('注册成功，请登录')
                    // 模拟人点击
                    $('#logbox1_a').click()
                }    
            }

        })
    })

    // 登录功能
    $('#form_get').on('submit',function(e){
        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    layer.msg('请登录成功')
                    // 模拟人跳转
                    localStorage.setItem('token', res.token);
                    location.href = '/day01/index.html';
                }    
            }

        })
    })
})
