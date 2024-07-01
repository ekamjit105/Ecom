import axios from "axios"

export const getProductsByCategory= (cobj)=>async(dispatch)=>{

    dispatch({type:"GET_CPROD_REQUEST"})
    try{

        console.log("sending .. ",cobj)
        const response= await axios.post("/api/products/getproductsbycat",cobj);
    
        //console.log("recieved",response.data)
        dispatch({type:"GET_CPROD_SUCCESS",payload:response.data})
    
    }
    catch(error)
    {
        dispatch({type:"GET_CPROD_FAIL",error})
    }

}

export const getProductById= (id)=>async(dispatch)=>{

    dispatch({type:"GET_ONEP_REQUEST"})
    try{

        console.log("sending .. ",id)
        const response= await axios.post("/api/products/getproductbyid",{id});
    
        console.log("recieved",response.data)
        dispatch({type:"GET_ONEP_SUCCESS",payload:response.data})
    
    }
    catch(error)
    {
        dispatch({type:"GET_ONEP_FAIL",error})
    }

}


export const getDealsProducts= ()=>async(dispatch)=>{

  dispatch({type:"GET_DEALP_REQUEST"})
  try{

      const response= await axios.post("/api/products/getdealsproducts");
  
      console.log("recieved",response.data)
      dispatch({type:"GET_DEALP_SUCCESS",payload:response.data})
  
  }
  catch(error)
  {
      dispatch({type:"GET_DEALP_FAIL",error})
  }

}

export const deleteProduct = (pid) => async (dispatch, getState) => {
    try {
      
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        
        if (!confirmed) {
            return; // If user cancels, exit the function
        }  
      
    const response = await axios.post("/api/products/deleteproduct",{pid});
      //console.log(orderid)
      window.location.reload();
    } catch (error) {
      console.log("error deleting product")
    }
  };

  export const updateProduct= (pobj) =>async (dispatch)=>{
    try { 
    console.log("pobj : ",pobj)
    const response = await axios.post("/api/products/updateproduct",{pobj});
    
    } catch (error) {
      console.log("error updating product")
    }
  }