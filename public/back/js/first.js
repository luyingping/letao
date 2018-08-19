
$(function() {

  var currentPage = 1;
  var pageSize = 5;
  
  render();
  function render () {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function( info ) {
        // console.log(info);
        var htmlStr = template('firstTpl', info);
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
  $('.addCategory .btn').on('click', function() {
    // console.log(111);
    $('.addModal').modal('show');
  })
 
  //表单校验
  $('#addCategory').bootstrapValidator({
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
  })
  $('#addCategory').on('success.form.bv', function(e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#addCategory').serialize(),
      dataType: 'json',
      success: function( info ) {
        // console.log(info);
        if( info.success ) {
          $('.addModal').modal('hide');
          currentPage = 1;
          render();
          $('#addCategory').data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })

})