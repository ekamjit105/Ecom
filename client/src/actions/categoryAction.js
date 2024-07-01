import axios from "axios"
export const getAllCategories = ()=>async(dispatch)=>{
    dispatch({type:"GET_CATS_REQUEST"})
    try {
        const response = await axios.get("/api/cats/getAllCategories");
        //will continue after the above request is successfully served at the pizzaRouter.js
       // console.log("in action class")
        
        dispatch({type:"GET_CATS_SUCCESS", payload:response.data})
        //console.log(response.data)

    } catch (error) {
        console.log("error in action class")
        dispatch({type:"GET_CATS_FAIL",payload:error})
    }
}

export const getOneCategory= (cat)=>async(dispatch)=>{

    dispatch({type:"GET_ONEC_REQUEST"})
    try{

        //console.log("sending .. "+cat+" to server")
        const response= await axios.post("api/cats/getonecategory",{cat});
    
        //console.log("recieved",response.data[0])
        dispatch({type:"GET_ONEC_SUCCESS",payload:response.data[0]})
    
    }
    catch(error)
    {
        dispatch({type:"GET_ONEC_FAIL",error})
    }

}

export const getOneSubcategory= (cobj)=>async(dispatch)=>{

    dispatch({type:"GET_ONESC_REQUEST"})
    try{

        //console.log("sending .. ",cobj)
        const response= await axios.post("api/cats/getonesubcategory",cobj);
    
       // console.log("recieved",response.data[0])
        dispatch({type:"GET_ONESC_SUCCESS",payload:response.data[0]})
    
    }
    catch(error)
    {
        dispatch({type:"GET_ONESC_FAIL",error})
    }

}



export const deleteCategory = (cid) => async (dispatch, getState) => {
    try {
      
        const confirmed = window.confirm("Are you sure you want to delete this category?");
        
        if (!confirmed) {
            return; // If user cancels, exit the function
        }  
      
    const response = await axios.post("/api/cats/deletecategory",{cid});
      //console.log(orderid)
      window.location.reload();
    } catch (error) {
      console.log("error deleting product")
    }
  };


  export const updateCategory = (cobj) =>async (dispatch)=>{
    try { 
    console.log("cobj : ",cobj)
    const response = await axios.post("/api/cats/updatecategory",{cobj});
      
      //window.location.reload();
    } catch (error) {
      console.log("error updating category")
    }
  }

  export const updateSubcategory = (cobj) =>async (dispatch)=>{
    try { 
    console.log("cobj : ",cobj)
    const response = await axios.post("/api/cats/updatesubcategory",{cobj});
      
      //window.location.reload();
    } catch (error) {
      console.log("error updating category")
    }
  }