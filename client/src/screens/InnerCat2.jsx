import React, {useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import routetocategory from '../sidefunctions/routetocategory'
import ProductCard from '../components/ProductCard'
import {Row,Col} from 'react-bootstrap'

const InnerCat2 = ({cat,subcat,basecat}) => {

  let {thisc,loading,error}= useSelector((state)=>state.getOneSubCategoryReducer)//getting pizza state using useSelector
  let {products,ploading,perror}= useSelector((state)=>state.getProductsByCategory)//getting pizza state using useSelector
  
  let brandarr=[]
  if(!ploading&&!perror)
  {
    //console.log("products in cat page:", products) 
    products.forEach(product=>{
      if(!brandarr.includes(product.brand))
      brandarr=[...brandarr,product.brand]
    })

  }


  //console.log("receieved subcat obj : ",thisc)
  const [selected, setSelected] = useState({}); //hashmap 

  //selected arrays based on hashmap
  let [basearr, setBasearr] = useState([])
  let [filters, setFilters] = useState([])
  let [variant, setVariant] = useState(("NA"))
  let [brands, setBrands] = useState([])
  let [minrange, setMinrange] = useState(0)
  let [maxrange, setMaxrange] = useState(50000)


  useEffect(() => {
    if (basecat!=="NA") {
      setSelected(prevState => ({
        ...prevState,
        [basecat]: true
      }));
      setBasearr(prevstate=>([...prevstate,basecat]))
      console.log("Basearr : ",basearr)
      console.log("Selectedarr : ",selected)
    }
  }, [basecat]);



  const handleChange = (event) => {
    
    const { name, checked } = event.target;
    
    setSelected(prevState => ({
      ...prevState,
      [name]: checked
    }));

    if(checked)
    {setBasearr(prevstate=>([...prevstate,name]))}
    else
    {setBasearr(basearr.filter(item => item !== name))}
    console.log("2Basearr : ",basearr)
    console.log("2Selectedarr : ",selected)

  };
 

  const handleFilterChange = (event) => {
    
    const { name, checked } = event.target;
    
    setSelected(prevState => ({
      ...prevState,
      [name]: checked
    }));

    if(checked)
    {setFilters(prevstate=>([...prevstate,name]))}
    else
    {setFilters(filters.filter(item => item !== name))}
  };

  const handleVariantChange = (event)=>{
    const { value } = event.target;
    
    //setFilters(filters.filter(item => item !== variant[0]))
    setVariant(value);
    /*setFilters(prevstate=>([
      ...prevstate,value
    ]))*/
  }

  const handleBrandChange = (event) => {
    
    const { name, checked } = event.target;
    
    setSelected(prevState => ({
      ...prevState,
      [name]: checked
    }));

    if(checked)
    {setBrands(prevstate=>([...prevstate,name]))}
    else
    {setBrands(brands.filter(item => item !== name))}
  };


  const selectsubcatonload = (name) => {
    setSelected(prevState => ({
      ...prevState,
      [name]: true
    }));
   setBasearr(basearr.filter(item => item !== name))
  };



  return (
  <>
  <br/>
   
    <div className='container-fluid inner-cat2-container'>
    <h5 style={{marginLeft:"4%"}}>
    
    <span onClick={()=>(routetocategory({cat:cat,subcat:"NA",basecat:"NA"}))} style={{cursor:'pointer', color:"rgb(252, 23, 99)"}}>{cat} &gt; </span>
    
    <span onClick={()=>(routetocategory({cat:cat,subcat:subcat,basecat:"NA"}))} style={{cursor:'pointer', color:"rgb(191, 6, 66)"}}>{subcat} </span>
    
    {basecat!=="NA" && <span>&gt; {basecat}</span>}
    
    </h5>
    <br/>
    <div className='row'>
    <div className='col-sm-2 filterbar' >
        
        
        {!loading && !error?(<>
          <h6 className='filterhead'>Categories</h6>
          <ul>  
          {thisc.basecat.map(category => (
          <div key={category}>
            <label>
              
              
              <input
                type="checkbox"
                name={category}
                checked={selected[category] || false}
                onChange={handleChange}
              />
              
              
              &nbsp;{category}
            </label>
          </div>
        ))}</ul>
            

        {Object.entries(thisc.filters).map(([arrayName, arrayValues]) => (
        <div key={arrayName}>
        <h6 className='filterhead'>{arrayName}</h6>
          <ul>
            {arrayValues.map((value, index) => (
             
             <div key={value}>
             <label>
              <input
                type="checkbox"
                name={value}
                checked={selected[value] || false}
                onChange={handleFilterChange}
              />
              &nbsp;{value}
            </label>
            </div>
            
          ))}
          </ul>
        </div>
      ))}


      <h6 className='filterhead'>Variant</h6>
<ul>
  {thisc.variants.map(variant => (
    <div key={variant}>
      <label>
        <input
          type="radio"
          name="variant"
          value={variant}
          onChange={handleVariantChange}
        />
        &nbsp;{variant}
      </label>
    </div>
  ))}
</ul>






        </>):(<></>)}
        

        <h6 className='filterhead'>Brands</h6>
          <ul>  
          {!loading && !error &&brandarr.map(brand => (
          <div key={brand}>
            <label>
              
              
              <input
                type="checkbox"
                name={brand}
                checked={selected[brand] || false}
                onChange={handleBrandChange}
              />
              
              
              &nbsp;{brand}
            </label>
          </div>
        ))}</ul>

        <h6 className='filterhead'>PRICE</h6>
        ₹ {minrange} - {maxrange} 
       <br/>Min: <input type="range" id="vol" value={minrange} name="vol" min="0" max="5000" onChange={(event)=>setMinrange(event.target.value)}/>
       <br/>Max: <input type="range" id="vol" value={maxrange} name="vol" min="0" max="50000" onChange={(event)=>setMaxrange(event.target.value)}/>
        
   </div>
    




    {/*
      *
      *
      DISPLAY SECTION 
      *
      *
      */}









    <div className='col-sm-9 displaybar'>
    
    <br></br>
    
    {basearr.length+filters.length+brands.length>0?<>
      
      Applied Filters:
      &nbsp;{basearr.map(e=>(<span className='filter'>{e}</span>))   
      }   
      &nbsp;{filters.map(e=>(<span className='filter'>{e}</span>))   
      }  
      &nbsp;{variant!=="NA"&&<span className='filter'>{variant}</span>}
      &nbsp;{brands.map(e=>(<span className='filter'>{e}</span>))   
      } 

{/*
      Applied Base Categories : &nbsp;{basearr.map(e=>(<span className='filter'>{e}</span>))   
      }   
      <br/>
      Applied Filters : &nbsp;{filters.map(e=>(<span style={{padding:"1%",margin:"1%", borderRadius:"10px",  backgroundColor:"#64CDB1", color:"white"}}>{e}</span>))   
      }  
      <br/>
      Applied Variant : &nbsp;{variant}    
      <br/>
      Applied Brands : &nbsp;{brands.map(e=>(<span style={{padding:"1%",margin:"1%", borderRadius:"10px",  backgroundColor:"#64CDB1", color:"white"}}>{e}</span>))   
      } 



 */}
      <br></br>

    </>:<></>}


 <Row>




    {!ploading&&!perror?(<>
      
      <div className='row'>
      {products.map(product=>{

        return(<>
          
          {/*(basearr.length==0||product.basecat.some(item=>basearr.includes(item)))&&(filters.length==0||filters.every(item=>[...Object.values(product.filters),...product.variants].includes(item)))?
          (<><ProductCard pobj={product}/></>)
          :(<></>)*/
          
          /*(basearr.length==0||product.basecat.some(item=>basearr.includes(item)))&&(filters.length === 0 || filters.some(item => [...Object.values(product.filters)].includes(item)))&&(variant=="NA"||product.variants.includes(variant))?
          (<><ProductCard pobj={product}/></>)
          :(<></>)*/
          (basearr.length===0||product.basecat.some(item=>basearr.includes(item)))
          &&(filters.length === 0 || filters.some(item => [...Object.values(product.filters)].includes(item)))
          &&(variant==="NA"||product.variants.includes(variant))
          &&(brands.length===0||brands.includes(product.brand))
          &&(product.price>=minrange&&product.price<=maxrange)?
          (<>
            <Col xs={12} sm={4}>
          <ProductCard pobj={product}/>
            </Col>
          </>)
          :(<></>)
          
          }  
          
        
        
        </>)
      })}
      </div>

        </>):(<></>)}
    
    </Row>
    </div>
            
    </div>


    </div>
   
   
   
   
   
   
    
  </>  
  )
}

export default InnerCat2