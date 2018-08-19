
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  var currentId;
  var isDelete;

  render();
  function render () {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function( info ) {
        // console.log(info);
        var htmlStr = template('userTpl', info);
        $('.lt-main tbody').html(htmlStr);
        //分页
        $('.paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function( a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }
  $('.lt-main tbody').on('click','.btn', function() {
    // console.log(1);
    currentId = $(this).parent().parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    // console.log(currentId);
    $('.isDeleteModal .modal').modal('show');

  })
  $('.btn-isDelete').on('click', function() {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function( info ) {
        // console.log(info);
        if ( info.success ) {
          $('.isDeleteModal .modal').modal('hide');
          render();
        } 
      }
    })
  })



})