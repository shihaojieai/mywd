$(function() {
    var layer = layui.layer
    var form = layui.form
    // 封装获取动态文章信息列表
    get()
    function get(){
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                if (res.status !== 0) {
                    console.log('获取失败');
                }
                console.log(res);
                var htmlSrt = template('form',res);
                $("tbody").html(htmlSrt)
            }
        })
    }
    
    // 添加文章分类  
    var cl = null;
    $('#btnAdd').on('click',function(){
        //弹出层
        cl = layer.open({
            title: '文章类别管理',
            type: 1, 
            area: ['500px', '300px'],
            content: $('#dialog-add').html(),
          });  
    })

    // 添加文章发起请求
    $("body").on('submit','#form-add',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:"/my/article/addcates",
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }
                layer.msg("新增分类成功！")
                get()
                 // 根据索引，关闭对应的弹出层
                layer.close(cl);
            }
        })
    })


    
    
    var cll = null;
    // 编辑文章获取
    $("tbody").on('click','.bj',function(){
        cll = layer.open({
            title: '修改文章分类',
            type: 1, 
            area: ['500px', '300px'],
            content: $('#dialog-bj').html(),
          }); 
          var id = $(this).attr('data-id')          
        $.ajax({
            type:'GET',
            url:"/my/article/cates/" + id,
            success:function(res){
                form.val('form-bj', res.data)
            }
        })
    })

    // 编辑文章修改
    $("body").on('submit','#form-bj',function(e){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                layer.msg('更新分类信息成功');
                get();
                layer.close(cll);
            }
        })        
    })

    // 编辑文章删除
    $('tbody').on('click','.sc',function(){
        var id = $(this).attr('data-id');
        layer.confirm('是否删除', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                type:"get",
                url:'/my/article/deletecate/' + id,
                success:function(res){
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    get()
                    layer.msg('删除成功')
                    layer.close(index);
                }
            })
            
          });
    })
})