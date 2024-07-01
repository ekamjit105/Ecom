
export const addToCart = (product,quantity,variant,increment)=>async(dispatch,getState)=>{
    var cartItem = {
      _id:product._id,
      pname:product.pname,
      pdesc:product.pdesc,
      pimage:product.pimage,
      brand:product.brand,
      price:product.price,
      discount: product.discount,
      
      variant:variant,
      quantity:Number(quantity),
      cprice:product.price*Number(quantity),      
    };

    console.log("add prod to cart: ",cartItem)

    if(quantity<1)
    {
      dispatch({type:"DELETE_FROM_CART",payload:cartItem})
    }

    else
    {
        console.log("Adding..")
      dispatch({type:"ADD_TO_CART",payload:cartItem})    
    }


    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducer.cartItems)
      );
    // STORING THE CART ITEMS in browsers local storage
    //syntax : localStorage.setItem(key, value);
    //value must be a JSON String
}

export const deleteFromCart = (product) =>async(dispatch,getState)=>{
  dispatch({type:"DELETE_FROM_CART",payload:product})

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
}

