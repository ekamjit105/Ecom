
export const placeOrderReducer = (state={},action) => {
  switch(action.type){
    case "ORDER_CREATE_REQUEST":
        return{loading:true};
    case "ORDER_CREATE_SUCCESS":
            return{loading:false,success:true};
    case "ORDER_CREATE_FAIL":
            return{error:action.payload};
    default : return state
    }
}

export const myOrdersReducer = (state={orders:[]},action) => {
       
        switch(action.type){
          case "GET_ORDER_REQUEST":
              return{loading:true};
          case "GET_ORDER_SUCCESS":
                  return{
                loading:false,
                success:true,
                orders:action.payload
        };
          case "GET_ORDER_FAIL":
                  return{error:action.payload};
          default : return state;
          }
      }


      export const allUserOrdersReducer = (state = { orders: [] }, action) => {
        switch (action.type) {
          case "ALL_ORDER_REQUEST":
            return {
              loading: true,
              ...state,
            };
          case "ALL_ORDER_SUCCESS":
            return {
              loading: false,
              success: true,
              orders: action.payload,
            };
          case "ALL_ORDER_FAIL":
            return {
              loading: false,
              error: action.payload,
            };
          default:
            return state;
        }
      };