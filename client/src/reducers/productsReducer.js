
export const getProductsByCategory =(state={products:[], ploading:true},action)=>{
    switch(action.type)
    {
        case "GET_CPROD_REQUEST":
            return{
                ploading:true
            };
        case "GET_CPROD_SUCCESS":
            return{
                ploading:false,
                success:true,
                products:action.payload
            };
        case "GET_CPROD_FAIL":
            return{
                perror:action.payload
            };
        default : return state;
    }
}


export const getDealsProducts =(state={products:[], ploading:true},action)=>{
    switch(action.type)
    {
        case "GET_DEALP_REQUEST":
            return{
                ploading:true
            };
        case "GET_DEALP_SUCCESS":
            return{
                ploading:false,
                success:true,
                products:action.payload
            };
        case "GET_DEALP_FAIL":
            return{
                perror:action.payload
            };
        default : return state;
    }
}


export const getProductById =(state={product:{}, loading:true},action)=>{
    switch(action.type)
    {
        case "GET_ONEP_REQUEST":
            return{
                loading:true
            };
        case "GET_ONEP_SUCCESS":
            return{
                loading:false,
                success:true,
                product:action.payload
            };
        case "GET_ONEP_FAIL":
            return{
                error:action.payload
            };
        default : return state;
    }
}