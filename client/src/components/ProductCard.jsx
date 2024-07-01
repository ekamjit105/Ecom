import React, { useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import routetoproduct from '../sidefunctions/routetoproduct'
import { addToWishlist, removeFromWishlist } from '../actions/userAction'

const ProductCard = ({pobj}) => {
  
  const dispatch = useDispatch()

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  //console.log("Currentuser : ",currentUser)
  
  const [wlitem, setWlitem] =useState(false)

  useEffect(() => {
    if (currentUser) {
      setWlitem(currentUser.wishlist.find(wobj => wobj._id === pobj._id));
    }
  }, [currentUser, pobj._id]);

  const handleAddToWishlist = () =>{
    
    if(!currentUser)
    window.location.href="/login"
    
    else{
      const wishlistobj={
        _id:pobj._id,
        pname:pobj.pname,
        brand:pobj.brand,
        price:pobj.price,
        pimage:pobj.pimage[0]
      }
      console.log("adding to wishlist.. ", wishlistobj)
      dispatch(addToWishlist(wishlistobj))
      setWlitem(true)
      //window.location.reload();
    }
  }
  
  const handleRemoveFromWishlist = () =>{
    const wishlistobj={
      _id:pobj._id
    }
    console.log("removing from wishlist.. ", wishlistobj)
    dispatch(removeFromWishlist(wishlistobj))
    //window.location.reload();
    setWlitem(false)
  }

    return (
    <>
        <div className="card productcard  " >
        <img className='clickable' src={"/product-images/" + pobj.pimage[0]} onClick={()=>routetoproduct(pobj._id)} alt={"productimage"}></img>
        <div className="card-body">
            <span style={{fontWeight:"bold", fontSize:"16px"}} >{pobj.brand}</span>
            
            {wlitem?<><span className='clickable' style={{float:"right", fontSize:"20px"}} onClick={()=>(handleRemoveFromWishlist())}>&#10084;</span>
            </>:<><span className='clickable' style={{float:"right", fontSize:"25px"}} onClick={()=>(handleAddToWishlist())}>&#9825;</span>
            </>}
  
            
            <br></br>
            <span className='clickable' style={{fontSize:"14px", color:"grey"}} onClick={()=>routetoproduct(pobj._id)}>{pobj.pname}</span>
            <br></br>
            <span style={{fontSize:"14px", fontWeight:"bold"}}><sup>₹</sup>{pobj.price}</span> &nbsp;
            {pobj.discount!==0?<>
            <span style={{fontSize:"13px", color:"grey",textDecoration:"line-through"}}>Rs.{pobj.price+pobj.discount}
            </span>&nbsp;
            <span style={{fontSize:"13px", color:"lightred"}}>(<sup>₹</sup>{pobj.discount} OFF)</span></>
            :<></>}
        </div>
        </div>
    </>
  )
}

export default ProductCard