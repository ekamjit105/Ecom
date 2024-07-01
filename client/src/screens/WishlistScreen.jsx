import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Row, Col, Container} from 'react-bootstrap'
import { FaPlusCircle, FaMinusCircle,FaTrash} from "react-icons/fa";
import { removeFromWishlist } from '../actions/userAction';
import routetoproduct from '../sidefunctions/routetoproduct';


const WishlistScreen = () => {

    const dispatch = useDispatch()

    //const {currentUser} = useSelector((state)=>state.loginReducer)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    
    if(!currentUser)
    window.location.href="/login"
    
    const wishlist = currentUser.wishlist

  return (
    <>

        {
            
            wishlist.length===0?(<>
                <center><h2 style={{marginTop:"15%"}}>No items in wishlist!</h2>
                <br></br><br></br><h4> <a href="/"> Continue Shopping </a></h4></center>
                
            </>):(
                
            <Container>
                <Row style={{"marginTop":"2%"}}>
                <h1> My Wishlist</h1>
                    <br/>
                    {wishlist.length!==0?wishlist.map((item)=>(
                        
                        <Col md={2} className='card'>
                            <img className='clickable' onClick={()=>routetoproduct(item._id)} src={"/product-images/"+item.pimage} alt="" style={{width:'100%'}}></img>
                        <div className='card-body'>
                        <span style={{fontWeight:"bold", fontSize:"16px"}} >{item.brand}</span>
                        <br></br>
                        <span className='clickable' style={{fontSize:"14px", color:"grey"}} onClick={()=>routetoproduct(item._id)}>{item.pname}</span>
                        <br></br>
                                <FaTrash className='clickable' style={{float:"right"}} onClick={()=>{dispatch(removeFromWishlist(item));
                            window.location.reload()}}/>
                            
                            <span style={{fontSize:"16px", fontWeight:"bold"}}><sup>₹</sup>{item.price}</span> &nbsp;
            
                        </div>
                            
                        
                        
                        </Col>
                     
                        

                    )):<h2 style={{"margin-top":"10%"}}><center>OOPS! Your Cart is empty <br></br><br></br><h4> <a href="/"> Continue Shopping </a></h4> <br></br><h6> Go to <a href="/myorders"> My Orders </a> to check your orders</h6></center></h2>}
                    
                </Row>

            </Container>
            )
        }



    </>
  )
}

export default WishlistScreen