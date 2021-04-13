$(document).ready(function(){

  if ($('.cart-content').length) {
    var imageSrc = localStorage.getItem("imageSrc", imageSrc);
    var productName = localStorage.getItem("productName", productName);
    var productPrice = localStorage.getItem("productPrice", productPrice);
    addItemToCart(imageSrc, productName, productPrice)
  }

  //Remove cart item
  $('.cart-item-remove').click(function(){
    $(this).parent().remove();
    updateCartTotal();
  })

  //Updates the cart total when quantity changed
  $('.cart-item-quantity').change(function(){
    var quantity = $(this);
    var quantityValue = $(this).val();
    if (quantityValue < 1 || quantityValue > 200) {
      $(quantity).val(1);
    }
    updateCartTotal();
  })

  //Save product's informations when "add to cart button" is clicked
  $('button[name=addtocart]').click(function(){
    var imageSrc = $(this).siblings('img').attr('src');
    localStorage.setItem("imageSrc", imageSrc);
    var productName = $(this).siblings('.product-name').text();
    localStorage.setItem("productName", productName);
    var productPrice =  $(this).siblings('.product-price').text();
    localStorage.setItem("productPrice", productPrice);
  })

  function addItemToCart(imageSrc, productName, productPrice) {
    var cartRow = document.createElement('div');
    $(cartRow).text(productName)
    var cartItems = $('.cart-content');
    cartItems.append(cartRow);
  }

  //Updates the cart total
  function updateCartTotal() {
    var cartRows = $('.cart-content').children('.cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var price = parseFloat($(cartRow).find('.cart-item-price').text().replace('€', ''));
      var quantity = parseFloat($(cartRow).find('.cart-item-quantity').val());
      total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    $('.cart-total').text('€' + total);
  }

})
