
$(document).ajaxStart(function(){
  NProgress.start();
});

$(document).ajaxStop(function () {
  //模拟网络
  setTimeout(function(){
    NProgress.done();
  },500)
})