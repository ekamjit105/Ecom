export const cartReducer = (state = {cartItems:[]},action)=>{
    switch(action.type)
    {
        case "ADD_TO_CART":
            
            const alreadyexists=state.cartItems.find(
                (item)=>(item._id===action.payload._id && item.variant===action.payload.variant)
            )
            if(alreadyexists)
            {
                console.log("name not matched")
                return{
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                    (item._id === action.payload._id && item.variant===action.payload.variant)? action.payload : item)
                    //update the item according to id, else copy all items as it is
                }
            }
            else{    
                return{
                    ...state,
                    cartItems:[...state.cartItems, action.payload]
                };
            }

        case "DELETE_FROM_CART":
            return{
                ...state,
                cartItems:state.cartItems.filter((item)=>(
                    (item._id !== action.payload._id || item.variant!==action.payload.variant)
                ))
            };
        default: return state;
    }
}