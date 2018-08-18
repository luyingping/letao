$(function(){
  //表单校验
  $('#login_form').bootstrapValidator({
    fields:{
      username: {
        validators: {
          notEmpty:{
            message:"用户名不能为空"
          },
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须在2-6位之间"
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须在6-12位之间"
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }

  });
  //校验成功后阻止自动提交转ajax提交
  $('#login_form').on('success.form.bv', function(e){
    e.preventDefault();
    $.ajax({
      type: "post",
      url: '/employee/employeeLogin',
      data: $('#login_form').serialize(),
      dataType: 'json',
      success: function( info ) {
        // console.log(info);
        if (info.success){
          location.href = 'index.html';
        }
        if (info.error === 1000) {
          $('#login_form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
        }
        if (info.error === 1001) {
          $('#login_form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
        }
      }
    })
  })
  //重置按钮
  $('[type="reset"]').on('click',function(){
    $('#login_form').data('bootstrapValidator').resetForm();
  })




});