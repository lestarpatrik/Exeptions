$(document).ready(function(){

  //
  function emptyCart() {
    if($('.cart-content').children().length == 0) {
      $('.empty-cart-message').show();
    } else {
      $('.empty-cart-message').hide();
    }
  }

  //Remove cart item
  $('.cart-content').on("click", ".cart-item-remove", function(){
    var i = $(this).parent().attr('id');

    $(this).parent().remove();

    localStorage.removeItem('imageSrc' + i);
    localStorage.removeItem('productName' + i);
    localStorage.removeItem('productPrice' + i);

    updateCartTotal();
    emptyCart();
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
    emptyCart();

    var i = 1;

    while (true) {
      var productNameItem = 'productName' + i;
      if (localStorage.getItem(productNameItem)) {
        var imageSrc = localStorage.getItem('imageSrc' + i);
        var productName = localStorage.getItem('productName' + i);
        var productPrice = localStorage.getItem('productPrice' + i);
        addItemToCart(imageSrc, productName, productPrice, i)
      } else {
        return true;
      }
      i++;
    }
  }

  //Save product's informations when "add to cart button" is clicked
  $('button[name=addtocart]').click(function(){
    $('.product-added-to-cart-bg').show();
    var productName = $(this).siblings('.product-name').text();
    var productPrice =  $(this).siblings('.product-price').text();

    if ($('.product-info').length) {
      var imageSrc = $(this).parent().siblings('img').attr('src').replace('../', '');
    } else {
      var imageSrc = $(this).siblings('img').attr('src');
    }

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

  //Hide message when "continue shopping" is clicked
  $('button[name=continue-shopping]').click(function(){
    $('.product-added-to-cart-bg').hide();
  })

  //Add item to cart
  function addItemToCart(imageSrc, productName, productPrice, i) {
    var cartRow = document.createElement('div');
    $(cartRow).addClass('cart-row');
    $(cartRow).attr('id', i);
    var cartItems = $('.cart-content');
    var cartItemNames = $('.cart-item-name');
    for (var j = 0; j < cartItemNames.length; j++) {
      if ($(cartItemNames[j]).text() == productName) {
        localStorage.removeItem('productName' + i);
        return;
      }
    }
    var cartRowContents = `
      <img src="${imageSrc}" alt="">
      <p class="cart-item-name">${productName}</p>
      <input type="number" class="cart-item-quantity" value="1">
      <button type="button" class="cart-item-remove"><i class="far fa-trash-alt"></i></button>
      <p class="cart-item-price">${productPrice}</p>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    updateCartTotal();
    emptyCart();
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
