$(document).ready(function(){

  //Remove cart item
  $('.cart-content').on("click", ".cart-item-remove", function(){
    var i = $(this).parent().attr('id');

    $(this).parent().remove();

    localStorage.removeItem('imageSrc' + i);
    localStorage.removeItem('productName' + i);
    localStorage.removeItem('productPrice' + i);

    updateCartTotal();
  })

  //Updates the cart total when quantity changed
  $('.cart-content').on("change", ".cart-item-quantity", function(){
    var quantity = $(this);
    var quantityValue = $(this).val();
    if (quantityValue < 1 || quantityValue > 200) {
      $(quantity).val(1);
    }
    updateCartTotal();
  })

  //Download cart items
  if ($('.cart-content').length) {

    var i = 1;

    while (true) {
      var productNameItem = 'productName' + i;
      if (localStorage.getItem(productNameItem)) {
        var imageSrc = localStorage.getItem('imageSrc' + i);
        var productName = localStorage.getItem('productName' + i);
        var productPrice = localStorage.getItem('productPrice' + i);
        console.log(productName);
        addItemToCart(imageSrc, productName, productPrice, i)
      } else {
        return true;
      }
      i++;
    }
  }

  //Save product's informations when "add to cart button" is clicked
  $('button[name=addtocart]').click(function(){
    var imageSrc = $(this).siblings('img').attr('src');
    var productName = $(this).siblings('.product-name').text();
    var productPrice =  $(this).siblings('.product-price').text();

    var i = 1;

    while (true) {

      var imageSrcItem = "imageSrc" + i;
      var productNameItem = "productName" + i;
      var productPriceItem = "productPrice" + i;

      if (!localStorage.getItem(productNameItem)) {
        localStorage.setItem(imageSrcItem, imageSrc);
        localStorage.setItem(productNameItem, productName);
        localStorage.setItem(productPriceItem, productPrice);
        return true;
      }
      i++;
    }
  })

  //Add item to cart
  function addItemToCart(imageSrc, productName, productPrice, i) {
    var cartRow = document.createElement('div');
    $(cartRow).addClass('cart-row');
    $(cartRow).attr('id', i);
    var cartItems = $('.cart-content');
    var cartRowContents = `
      <img src="${imageSrc}" alt="">
      <p class="cart-item-name">${productName}</p>
      <input type="number" class="cart-item-quantity" value="1">
      <button type="button" class="cart-item-remove"><i class="far fa-trash-alt"></i></button>
      <p class="cart-item-price">${productPrice}</p>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    updateCartTotal();
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
