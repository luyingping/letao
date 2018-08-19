
$(function(){
  var currentPage = 1;
  var pageSize = 5;

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
        console.log(info);
        var htmlStr = template('userTpl', info);
        $('.lt-main tbody').html(htmlStr);
      }
    })
  }




})