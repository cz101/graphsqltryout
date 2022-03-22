export default function calcTotalPrice(cart) {
 
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally;
   // console.log(cartItem)

    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);

/*
  const init = 0
  return cart.map((cartItem,init)=>{init= init+(cartItem.quantity * cartItem.price)
  console.log(init)
  })
 */ 
}
