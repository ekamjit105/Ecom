import React, { useEffect }  from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getAllCategories, getOneCategory, getOneSubcategory } from '../actions/categoryAction'
import { getDealsProducts, getProductsByCategory } from '../actions/productAction'
import ProductCard from '../components/ProductCard';
import {Container, Row, Col} from 'react-bootstrap'
import routetocategory from '../sidefunctions/routetocategory'
const HomeScreen = () => {
 
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllCategories())//dispatch action
    //dispatch(getOneCategory(cat))//dispatch action
    //dispatch(getOneSubcategory({cat:cat, subcat:subcat}))
    dispatch(getDealsProducts())
}, [dispatch])

let {products,ploading,perror}= useSelector((state)=>state.getDealsProducts)//getting pizza state using useSelector
console.log(products)
let {cats,loading}= useSelector((state)=>state.getAllCatsReducer)//getting pizza state using useSelector

let maincats=[]
let subcats=[]

if(!loading)
{
  cats.map(e=>{
    if(e.isMain)
    {
      maincats=[...maincats,e]
    }
    else{
      subcats=[...subcats,e]
    }
  })
  console.log("maincats:",maincats)
}


  return (
    <>

<div style={{ position: "relative", padding: "5%" }}>
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url('images/homep-banner.jpg')`,
      backgroundSize: "cover", // Ensure the image covers the entire container
      opacity: "1",
      zIndex: -1,
    }}
  ></div>
  <h1 style={{backgroundColor: "white", padding:"2%",display: 'inline-block', fontSize:"7vw", width:"70vw"}}>TrendIn <b>Fashion Sale</b> is Live</h1>
  <h4 style={{backgroundColor: "white", padding:"2%",display: 'inline-block'}}><b>Explore the latest trends now</b></h4>
</div>
<br/>



<Container>

{!loading&&maincats.length!==0?<>
  
  <Row>
    <Col md={6}>
    <div style={{ position: "relative" }} onClick={()=>routetocategory({cat:maincats[0].name, subcat:"NA",basecat:"NA"})}>
    <img className='card-img-top clickable' src={"images/" + maincats[0].catimg} alt="Avatar" />
    <div style={{ position: "absolute", top: "2%", left: "3%", color: "white", zIndex: 1 }}>
        <h1 style={{fontSize:"60px", fontWeight:"bold"}}>Explore <br/>All In <br/>{ maincats[0].name}</h1>
    </div>
  </div>
    </Col>
    <Col md={6}>
    <div style={{ position: "relative" }} onClick={()=>routetocategory({cat:maincats[1].name, subcat:"NA",basecat:"NA"})}>
    <img className='card-img-top clickable' src={"images/" + maincats[1].catimg} alt="Avatar" />
    <div style={{ position: "absolute", top: "2%", left: "3%", color: "white", zIndex: 1 }}>
        <h1 style={{fontSize:"60px", fontWeight:"bold"}}>Explore <br/>All In <br/>{ maincats[1].name}</h1>
    </div>
  </div>
    </Col>
  </Row>



  <div>
<br/><br/>
<center><b><h1>Exclusive Deals of the Day</h1></b></center>

<Row>
{!ploading&&!perror?(<>

  <div className='row'>
  {
  products.map(product=>{
  return(
          <>
        <Col md={3}>

        <ProductCard pobj={product}/>
        </Col>
        
        </>)
    }) 
  }
  </div>
  </>):(<></>)}
  </Row>
</div>











  {
    <>
    <br/>
    <br/>
    <h1>Try Out the <b>Trendiest</b> Collections in {maincats[0].name}</h1>
    
    <div className='row justify-content-center'>
    {maincats[0].basecat.slice(0, 4).map((e, index) => (
            
            <>
            {console.log(cats.find(item => item.name === e && item.parent === maincats[0])?.catimg)}
            <div className="col-6 col-lg-2" style={{margin:"2%"}}>
              <div className=" border-0 text-center">
                <img onClick={()=>(routetocategory({cat:maincats[0].name,subcat:e,basecat:"NA"}))} 
                className="card-img-top avatarimg" 
                src={"/images/"+cats.find(item => item.name === e && item.parent === maincats[0].name)?.catimg || "file_1713788884469.jpg"}
                alt="Avatar" />
                <div className="card-body">          
                  <br></br><p className="card-text">{e}</p>   
                </div>
              </div>
            </div>
            </>
          ))}
    </div>   
    </>
 }
</>:<></>}




























</Container>







    </>
  )
}

export default HomeScreen