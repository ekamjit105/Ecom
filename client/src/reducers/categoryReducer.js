export const getAllCatsReducer = (state={cats:[]}, action)=>{
    switch(action.type)
    {
        case "GET_CATS_REQUEST":
            return{
                ...state, 
                loading:true
            };
        case "GET_CATS_SUCCESS":
            return{
                cats:action.payload, 
                loading:false
            };
        case "GET_CATS_FAIL":
                return{
                    error:action.payload, 
                    loading:false
                };
        default:
            return state;
    }
 }

 export const getOneCategoryReducer =(state={thisc:{}, loading:true},action)=>{
    switch(action.type)
    {
        case "GET_ONEC_REQUEST":
            return{
                loading:true
            };
        case "GET_ONEC_SUCCESS":
            return{
                loading:false,
                success:true,
                thisc:action.payload
            };
        case "GET_ONEC_FAIL":
            return{
                error:action.payload
            };
        default : return state;
    }
}


export const getOneSubCategoryReducer =(state={thisc:{}, loading:true},action)=>{
    switch(action.type)
    {
        case "GET_ONESC_REQUEST":
            return{
                loading:true
            };
        case "GET_ONESC_SUCCESS":
            return{
                loading:false,
                success:true,
                thisc:action.payload
            };
        case "GET_ONESC_FAIL":
            return{
                error:action.payload
            };
        default : return state;
    }
}