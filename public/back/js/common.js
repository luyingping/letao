//进度条事件
$(document).ajaxStart(function(){
  NProgress.start();
});

$(document).ajaxStop(function () {
  //模拟网络
  setTimeout(function(){
    NProgress.done();
  },500)
});
//登录拦截
if(location.href.indexOf('login.html') === -1){
  // console.log(1);
  $.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function( info ) {
      // console.log(info);
      if(info.error === 400){
        location.href = 'login.html';
      }
    }
  })
};
//首页公共部分
$(function() {

  //侧边栏点击效果
  $('.lt-aside .category').on('click',function(){
    $('.content').slideToggle();
  });
  //头部点击侧边栏动画效果
  $('.lt-topbar .meau').on('click', function(){
    $('.lt-aside').toggleClass('current');
    $('.lt-topbar').toggleClass('current');
    $('.lt-main').toggleClass('current');
  });
  //点击退出登录效果
  $('.lt-topbar .logout').on('click', function(){
    $('.modal').modal({
      show: true
    });
  })
  //点击模态框退出
  $('.btn-logout').on('click', function(){
    // location.href = 'login.html';
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function( info ){
        // console.log(info);
        if (info.success){
          location.href = 'login.html';
        }
      }
    })
  });

});