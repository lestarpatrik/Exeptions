$(document).ready(function(){

  $('.menu-icon').click(function(){
    $('.nav-list').fadeToggle(100);
    $('.menu-icon i').toggleClass('fa-bars');
    $('.menu-icon i').toggleClass('fa-times');
  })

});
