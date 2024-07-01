import Reac, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Row, Col, Container} from 'react-bootstrap'
import { FaPlusCircle, FaMinusCircle,FaTrash} from "react-icons/fa";
import {addToCart, deleteFromCart} from '../actions/cartAction'
import Checkout from '../components/Checkout';

const CartScreen = () => {
  
  const dispatch = useDispatch();
    const cartState = useSelector((state)=>state.cartReducer);
    const cartItems = cartState.cartItems
    //const [firstpizza, ...remainig] = cartItems
    const subTotal = cartItems.reduce((x, item) => x + item.cprice, 0);

    const {currentUser} =useSelector((state)=>state.loginReducer)
    const addresses=currentUser.addresses

    const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

    const handleAddressChange = (event) => {
      setSelectedAddress(event.target.value);
    };


    return(
        <>
            
            <Container>
                <Row style={{"marginTop":"2%"}}><Col md={7}>
                <h1> My Cart</h1>
                    <br/>
                    {cartItems.length!==0?cartItems.map((item)=>(
                        
                        <Row style={{border:'1px solid whitesmoke', borderRadius:"2%", boxShadow: "5px 10px 10px lightgrey", margin:'2%', padding:'2%'}}>
                        <Col md={7}>
                            <h4 className='clickable' onClick={()=>{window.location.href="/product?id="+item._id}}>{item.pname} ({item.variant})</h4>
                            <h5>By {item.brand}</h5>
                            <h5>Quantity : &nbsp;
                            
                            <FaPlusCircle className='clickable' onClick={()=>{dispatch(addToCart(item,item.quantity+1,item.variant,true))}}/> 

                            &nbsp;{item.quantity}&nbsp;

                            <FaMinusCircle className='clickable' onClick={()=>{dispatch(addToCart(item,item.quantity-1,item.variant,false))}}/></h5>
                            
                            <h5>Price : {item.price}/- X {item.quantity}</h5><h4>Rs {item.cprice}/-</h4>
                        
                        
                        </Col>
                        <Col md={4}>
                        <img src={"/product-images/"+item.pimage[0]} alt="" style={{width:'100%'}}></img>
                        </Col>
                        <Col md={1}>
                        <FaTrash className='clickable' onClick={()=>{dispatch(deleteFromCart(item))}}/>
                        </Col>
                    </Row>
                        

                    )):<h2 style={{"margin-top":"10%"}}><center>OOPS! Your Cart is empty <br></br><br></br><h4> <a href="/"> Continue Shopping </a></h4> <br></br><h6> Go to <a href="/myorders"> My Orders </a> to check your orders</h6></center></h2>}
                    
                </Col>
                
                
                
                
                <Col md={5}>
                <h1> Payment Info</h1> 
                <br/><hr></hr>
                <h3>Subtotal = Rs {subTotal}/-</h3>
                <br/>
                <span style={{"color":"grey"}}>Make the payment via multiple options available including net banking, credit/debit cards/wallets and UPI</span>
                <br></br><br></br>
                
                
                <div>
                <h5>Select an Address:</h5>
                <form>
                    {addresses.map((address, index) => (
                    <div key={index}>
                        <input
                        type="radio"
                        id={`address-${index}`}
                        name="address"
                        value={address}
                        checked={selectedAddress === address}
                        onChange={handleAddressChange}
                        />
                        <label htmlFor={`address-${index}`}>&nbsp;{address}</label>
                    </div>
                    ))}
                </form>
                
                </div>
                <br/>



                {subTotal!==0?<>
                <Checkout subTotal = {subTotal} address={selectedAddress}> Proceed to checkout </Checkout></>:<></>}
                
                
                
                
                <br></br>
                <span style={{"color":"green"}}>Orders are delivered all over the globe within 4-5 businuess days <br></br>**Conditions apply</span>
                
                </Col>
                </Row>

            </Container>

       </>
    )

}

export default CartScreen