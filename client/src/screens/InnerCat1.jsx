import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Row,Col} from 'react-bootstrap'
import routetocategory from '../sidefunctions/routetocategory'
import { getProductsByCategory } from '../reducers/productsReducer';
import ProductCard from '../components/ProductCard';

const InnerCat1 = ({cat}) => {
  let basecat;
  
  const dispatch = useDispatch()

  let {thisc,loading,error}= useSelector((state)=>state.getOneCategoryReducer)//getting pizza state using useSelector
  let {cats}= useSelector((state)=>state.getAllCatsReducer)//getting pizza state using useSelector
  let {products,ploading,perror}= useSelector((state)=>state.getProductsByCategory)//getting pizza state using useSelector
  
  console.log("Allcats loaded: ",cats)

  if(!loading)
  {
    console.log("one cat in inner: ",thisc)
    basecat=[...thisc.basecat]
  }

  console.log("Products fetched...", products)


  return (
    <>

    <div className='container'>
    {!loading && !error ? (
    
    <>
    <div className='row justify-content-center'>
    
        
           {basecat.length===0?(<>No items to display</>):
           (<>
            {basecat.slice(0, 4).map((e, index) => (
            
              <>
              <div className="col-6 col-lg-2" style={{margin:"2%"}}>
                <div className=" border-0 text-center">
                  <img onClick={()=>(routetocategory({cat:cat,subcat:e,basecat:"NA"}))} 
                  className="card-img-top avatarimg" 
                  src={"/images/"+cats.find(item => item.name === e && item.parent === cat)?.catimg || "6.jpg"}
                  alt="Avatar" />
                  <div className="card-body">
                    
                
                    
                    
                    <br></br><p className="card-text">{e}</p>
                  
                  
                  
                  
                  </div>
                </div>
              </div>
              </>
            ))}
            </>
          )}
            
        
    </div>

    <div className='container displaybar'>

    {/*   First Category Product Display   */}
        <div className='row'>
        {basecat.slice(0,1).map(e=>
            <>
              <h3>{e}</h3>
              {!ploading&&!perror?(<>

<Row>
{products.slice(0,7).map(product=>{

  return(<>
    
    {/*(basearr.length==0||product.basecat.some(item=>basearr.includes(item)))&&(filters.length==0||filters.every(item=>[...Object.values(product.filters),...product.variants].includes(item)))?
    (<><ProductCard pobj={product}/></>)
    :(<></>)*/
    
    
    (product.subcategory===e)?
    (<>
    <Col xs={12} sm={4}>
    <ProductCard pobj={product}/>
    </Col>
    </>)
    :(<></>)
    
    }  
    
  
  
  </>)
})}
</Row>

  </>):(<></>)}
            </>
          )
        }
        </div>

<br></br>

       {/* Second - Fourth Category Banners   */}
       <div className='row justify-content-center'>
        {basecat.length!==2&&basecat.slice(1,4).map(e=>
            <>
            <div className="col-xs-12 col-lg-4">
                <div className="card border-0 text-center">
                  <img onClick={()=>(routetocategory({cat:cat,subcat:e,basecat:"NA"}))} 
                  className="card-img-top clickable" 
                  src={"images/"+cats.find(item => item.name === e && item.parent === cat)?.catimg || "6.jpg"}
                  alt="Avatar" />
                  <div className="card-body">
                    <p className="card-text">{e}</p>
                  </div>
                </div>
              </div>
              
            </>
          )
        }
        </div>

    </div>

    {/*   Fifth Category Product Display   */}
    <div className='row'>
      {basecat.slice(4,5).map(e=>
          <>
            <h3>{e}</h3>
            <div className='row'>
             Products in catgory one, create cards in loop
            </div>
          </>
        )}
      </div>

        
    {/* Rest Category Names   */}
    
    {basecat.length>=5?(<>
      <h4> Other Categories</h4>
      {basecat.slice(5,basecat.length).map(e=>
          <>
        <span className='clickable subcat-list-item' onClick={()=>(routetocategory({cat:cat,subcat:e,basecat:"NA"}))}>      {e} &nbsp;&nbsp;</span>
          </>
        )}
    </>):(<></>)}
    







    </>
    )
    : 
    (
      <>Loading...</>
    )}  

    

    </div>
  </> 
  )
}

export default InnerCat1