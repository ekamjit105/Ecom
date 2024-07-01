import axios from 'axios'

export const registerUser = (user) =>async(dispatch) =>{
    
    dispatch({type:'REGISTER_USER_REQUEST'})
    try {
    const response = await axios.post('/api/users/register',user);
    
    dispatch({type:'REGISTER_USER_SUCCESS',payload:response});
    window.location.href = "/login"

    } catch (error) {
        dispatch({type:'REGISTER_USER_FAIL',payload:error})    
    }
}

export const loginUser = (user)=>async(dispatch,getState)=>{
    dispatch({type:"LOGIN_USER_REQUEST"})
    try {
        const response = await axios.post("/api/users/login",user)
        dispatch({type:"LOGIN_USER_SUCCESS", payload:response.data})
        
        console.log(" user logged : ", response.data)

        localStorage.setItem(
            "currentUser",
            JSON.stringify(getState().loginReducer.currentUser)
          );
        window.location.href = "/";
    } 
    catch(error){
        console.log("invalid cred")
        alert("Login fail. Please check your credentials.")
        dispatch({type:"LOGIN_USER_FAIL", payload:error})
    }
}
export const logoutUser = () => (dispatch) => {
    console.log("logging out...")
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };


export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: "GET_USERS_REQUEST" });
    try {
      const response = await axios.get("/api/users/getallusers");
      // console.log(response.data);
      dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
    } catch (err) {
      dispatch({ type: "GET_USERS_FAIL", payload: err });
    }
  };
  
  export const deleteUser = (userid) => async (dispatch) => {
    try {
      //console.log("userid : ", userid)
      const confirmed = window.confirm("Are you sure you want to delete this user?");
        
      if (!confirmed) {
          return; // If user cancels, exit the function
      }  
      
      await axios.post("/api/users/deleteuser", { userid });
      //swal("User Deleted Succss!", "success");
      window.location.reload();
      // console.log(res);
    } catch (error) {
      //swal("Errro While Deleteing User");
    }
  };

  export const addToWishlist = (pobj)=>async(dispatch)=>{
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    currentUser.wishlist = [...currentUser.wishlist, pobj]
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    
  }

  export const removeFromWishlist = (pobj)=>async(dispatch)=>{
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    currentUser.wishlist = currentUser.wishlist.filter(wobj=>wobj._id!==pobj._id)
    console.log("rm ws : ",currentUser.wishlist)
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
  }