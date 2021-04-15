$(document).ready(function(){

  $('.purchase-button').click(function(){
    $('.cart-content').children().remove();
    localStorage.clear();
  })

})
