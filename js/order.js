$(document).ready(function(){

  //Show message when cart is empty
  function emptyCart() {
    if($('.cart-content').children().length == 0) {
      $('.empty-cart-message').show();
    } else {
      $('.empty-cart-message').hide();
    }
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



  var stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'auto',
    token: function(token) {
      var items = []
      var cartRows = $('.cart-content').children('.cart-row');
      for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var quantity = $(cartRow).children('.cart-item-quantity').val()
        var id = $(cartRow).attr('data-item-id');
        items.push({
          id: id,
          quantity: quantity
        })
      }

      fetch('/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stripeTokenId: token.id,
                items: items
            })
        }).then(function(res) {
            return res.json()
        }).then(function(data) {
            alert(data.message)
            $('.cart-content').children().remove();
            updateCartTotal();
            emptyCart();
            localStorage.clear();
        }).catch(function(error) {
            console.error(error)
        })
    }
  })

  $('.purchase-button').click(function(){
    var price = parseFloat($('.cart-total').text().replace('€', '')) * 100
    stripeHandler.open({
      amount: price
    })
  })

})
