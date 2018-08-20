

$(function(){
  var currentPage = 1;
  var pageSize = 5;
  
  render();
  function render () {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function ( info ) {
        console.log(info);
        var htmlStr = template('secondTpl', info);
        $('.lt-main tbody').html(htmlStr);
        //分页
        $('.paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function(a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  //点击添加分类
  $('.addCategory .btn').on('click',function() {
    $('.addModal').modal('show');
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var htmlStr = template('addTpl', info);
        $('#addSecond ul').html(htmlStr);
      }
    })
  })

  //点击选中一级分类
  // $('#addSecond li').each(function(v,i){
  //   $(this).on('click',function(){
  //     console.log(1)
  //   })
  // })
  $('#addSecond ul').on('click','a', function(){
    // console.log(11);
    // console.log($(this).html());
    $('#addSecond .add-text').html($(this).html());
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);
    $('#addSecond').data('bootstrapValidator').updateStatus('categoryId', 'VALID');

  })

//表单校验
  $('#addSecond').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传图片'
          }
        }
      },
    }
  });

  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      var imgUrl = data.result.picAddr;
      $('#addSecond img').attr('src', imgUrl);
      $('[name="brandLogo"]').val(imgUrl);
      $('#addSecond').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
    }
});
//阻止浏览器默认提交行为,ajax提交
$('#addSecond').on('success.form.bv', function(e) {
  e.preventDefault();
  $.ajax({
    type: 'post',
    url: '/category/addSecondCategory',
    data: $('#addSecond').serialize(),
    dataType: 'json',
    success: function( info ) {
      // console.log(info);
      if(info.success){
        $('.addModal').modal('hide');
        currentPage = 1;
        render();
        //重置表单
        $('#addSecond').data('bootstrapValidator').resetForm(true);
        $('#addSecond img').attr('src', "./images/none.png");
        $('#addSecond .add-text').html('请选择一级分类');
      }
    }
  })
})

})