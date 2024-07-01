import React, { useEffect, useState }  from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProductById } from '../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'
import { addToCart } from '../actions/cartAction'
import { addToWishlist, removeFromWishlist } from '../actions/userAction'
import { LinkContainer } from 'react-router-bootstrap'

const ProductSrceen = () => {
  
  
    const [queryParameters] = useSearchParams()
    const id = queryParameters.get("id")
  
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProductById(id))//dispatch action
    }, [dispatch,id])
  

    

    const {product,loading,error}= useSelector((state)=>state.getProductById)//getting pizza state using useSelector
    
    const cartState = useSelector((state)=>state.cartReducer);

    //let quantity=1;

    //const [quantity, setQuantity]=useState(1)

    const cartitems=cartState.cartItems

    const [selectedImg, setSelectedImg] = useState("")
    
    const [selectedvariant, setVariant] = useState()

    // Function to handle image selection
    const handleImageClick = (image) => {
        setSelectedImg(image)
    }

    // Render small images
    const renderSmallImages = () => {
        return product.pimage.map((image, index) => (
            <>
            {image!==""?(<>
            <img 
                key={index} 
                src={"/product-images/" + image} 
                /*src={`/product-images/`+image}*/ 
                alt={"Product Image " + index}
                style={{ width: "20%", cursor: "pointer", margin: "5px" }}
                onClick={() => handleImageClick(image)}
            /></>):<></>}
            </>
        ))
    }

    const handleSelectVariant = (variant)=>{
        //event.target.style.backroundColor="green"
        setVariant(variant);
    } 

    const addToCartHandler =()=>{
        if(selectedvariant)
        {const increment = true;
        console.log("calling")

            let quantity=1;

        if(cartitems && cartitems.length!==0)
        {
           cartitems.forEach(item => {
            if(item._id===product._id && item.variant===selectedvariant)
            {   
                quantity = item.quantity+1
            }
        })
        }

        dispatch(addToCart(product,quantity,selectedvariant,increment))}
        else{
            alert("Please select a variant")
        }
    }

    

const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const [wlitem, setWlitem] =useState(false)

  useEffect(() => {
    if (currentUser) {
      setWlitem(currentUser.wishlist.find(wobj => wobj._id === id));
    }
  }, [currentUser, id]);


  const handleAddToWishlist = () =>{
    
    if(!currentUser)
    window.location.href="/login"
    
    else{
      const wishlistobj={
        _id:product._id,
        pname:product.pname,
        brand:product.brand,
        price:product.price,
        pimage:product.pimage[0]
      }
      console.log("adding to wishlist.. ", wishlistobj)
      dispatch(addToWishlist(wishlistobj))
      setWlitem(true)
      //window.location.reload();
    }
  }
  
  const handleRemoveFromWishlist = () =>{
    const wishlistobj={
      _id:product._id
    }
    console.log("removing from wishlist.. ", wishlistobj)
    dispatch(removeFromWishlist(wishlistobj))
    //window.location.reload();
    setWlitem(false)
  }



    return (
        <>
            {!loading && !error ? (
                <div className='container' style={{padding:"1%"}}>
                    <div className='row'>
                        
                        
                        
                        <div className='col-md-4 col-xs-12'>
                            <img alt={"productimage"} src={"/product-images/" + (selectedImg || product.pimage[0])} style={{ width: "100%" }}/>
                            <br/>
                            {renderSmallImages()}
                        </div>




                        <div className='col-md-4 col-xs-12' style={{paddingLeft:"3%"}}>
                            
                            <h3 style={{fontWeight:"bold"}}>{product.pname}</h3>
                            <span style={{color:"rgb(81, 126, 224)"}}>by {product.brand}</span>
                            <br></br><br></br>
                            <h6 style={{fontWeight:"bold", display:"inline"}}>Available Variants : &nbsp;</h6>
                            {
                                product.variants.map(variant=>
                                    <span className='clickable variant' onClick={()=>handleSelectVariant(variant)}>{variant}</span>
                                )
                            }
                            <br></br><br></br>
                            <h6> Selected Variant : <b>{selectedvariant}</b></h6>
                        
                            <hr></hr>
                            
                            <h3 style={{fontWeight:"bold", display:"inline"}}><sup>₹</sup>{product.price}</h3> &nbsp;
                            {product.discount!==0?<>
                            <span style={{ color:"grey",textDecoration:"line-through"}}>M.R.P. ₹{product.price+product.discount}
                            </span>&nbsp;
                            <span style={{color:"red"}}>(Rs. {product.discount} OFF)</span></>
                            :<></>}
                            <br></br>Inclusive of all taxes

                            <hr></hr>
                            <h5 style={{fontWeight:"bold"}}>Product Details</h5> &nbsp;
                            <table className='prod-details-table'>
                                <tr>
                                    <td><b>Brand</b> :</td>
                                    <td>{product.brand}</td>
                                </tr>
                                <tr>
                                    <td><b>Category</b> :</td>
                                    <td>{product.category}</td>
                                </tr>
                                <tr>
                                    <td><b>Sub-Category</b> :</td>
                                    <td>{product.subcategory}</td>
                                </tr>
                                <tr>
                                    <td><b>Type</b> :</td>
                                    <td>{product.basecat.map(item=><>{item} &nbsp;</>)}</td>
                                </tr>
                                {Object.entries(product.filters).map(([key, value]) => (
                                    <tr>
                                    <td><b>{key}</b> :</td>
                                    <td>{value}</td>
                                    </tr>
                                ))}
                            </table>
                            <br/>
                            <h6 style={{fontWeight:"bold"}}>About the product</h6>
                            
                            <p>{product.pdesc}</p>
                            
                        </div>





                        <div className='col-md-4' style={{padding:"2%", border:"1px solid lightgrey", borderRadius:"5%"}}>
                        <h6 style={{textAlign:"center"}}>Product Summary</h6><hr/>
                        <div className='row'>
                            <div className='col-4'>
                                <img alt={"productimage"}  src={"/product-images/" + product.pimage[0]} style={{width:"100%"}}></img>
                            </div>
                            <div className='col-8' style={{textAlign:"right"}}>
                            
                            <h3 style={{fontWeight:"bold"}}><sup>₹</sup>{product.price}</h3> &nbsp;
                            Inclusive of all taxes<br/>
                                {product.discount!==0?<>
                                <span style={{ color:"grey",textDecoration:"line-through"}}>M.R.P. ₹{product.price+product.discount}
                                </span>&nbsp;<br></br>
                                <span style={{color:"red"}}>(SAVE: Rs. {product.discount})</span></>
                                :<></>}
                                
                            </div>
                        </div><br></br>
                        <div className='row' >
                              
                                <h5 style={{fontWeight:"bold", color:"green"}}>In Stock</h5>
                                <table className='w-75' style={{textAlign:"right"}}>
                                    <tr>
                                        <td><b>Delivered by</b> :</td>
                                        <td>TrendIn</td>
                                    </tr>
                                    <tr>
                                        <td><b>Sold by </b> :</td>
                                        <td>{product.brand}</td>
                                    </tr>
                                </table>
                                
                                <hr></hr>
                                <div>
                                <button onClick={addToCartHandler}className='btn btn-success w-100'>Add To Cart</button>
                                <br/><br/>
                                {
                                    !wlitem?(<><button className='btn btn-success w-100' onClick={()=>(handleAddToWishlist(product))}>Add To Wishlist</button>
                                </>):(<><button className='btn w-100' style={{border:"1px solid green"}} onClick={()=>(handleRemoveFromWishlist(product))}>Added to wishlist &#10004;</button>
                                        <a style={{textDecoration:"none", float:"right", marginTop:"2%"}} href="/wishlist">Go to wishlist</a>
                                </>)
                                }
                                
                                
                                
                                </div>
                        </div>
                    </div>
                     
                    </div>
                </div>
            ) : (<>Loading...</>)}
        </>
    )
}

export default ProductSrceen