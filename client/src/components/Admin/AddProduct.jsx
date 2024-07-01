import React, { useEffect, useState,useCallback  }  from 'react'
import {Form, Container, Table, Modal, Button, Row, Col} from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux'
import formatDate from '../../sidefunctions/formatDate'
import {FaSave, FaTrash, FaPenSquare, FaEye} from "react-icons/fa";
import { getAllCategories } from '../../actions/categoryAction';
import { deleteProduct, getProductsByCategory, updateProduct } from '../../actions/productAction';
import routetoproduct from '../../sidefunctions/routetoproduct'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

const AddProduct = () => {
  
  
  const dispatch = useDispatch();
  const location = useLocation();
  

  const [selectedCat, setCat] = useState()
  const [selectedSubcat, setSubcat] = useState() //this subcategory object

  const [pid,setPid] = useState()
  const [name, setName] = useState()
  const [brand, setBrand] = useState()
  const [desc, setDesc] = useState()
  const [price, setPrice] = useState()
  const [discount, setDiscount] = useState()
  const [pimages,setPimages] = useState()

  const [basecat, setBasecat] = useState([])
  const [variants, setVariants] = useState([])

  const [selectedfilter, setselectedfilter] =useState()
  const [filters, setFilters] = useState({})

  const [files,setFiles]=useState([])
  //file that will be uploaded


  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch]);  
 
 
  const handleThisSubcategory =(subcat)=>{
    const cobj=cats.find(e=>e.name==subcat&&e.parent==selectedCat)
    setSubcat(cobj)
    setBasecat([])
    setVariants([])

    const fobj={
      "fabric":"Cotton"
    }

    setFilters(fobj)

  }

    
  
  const {cats,loading} = useSelector((state)=>state.getAllCatsReducer)
  //get one product when product is being edited (id passed to component or in path)


  let categories = [], subcategories = []
  let hmap={}
  if(!loading)
  {
    cats.forEach(cat => {
      if(cat.isMain)
      {categories=[...categories,cat];
        hmap[cat.name]=cat.basecat
      }
      else{
      subcategories=[...subcategories,cat]
      }
    });
    //console.log("hmap",hmap)
    //console.log("categories", categories)
  }


useEffect(()=>{
  const pobj = location.state?.pobj;
  const cobj = location.state?.cobj;
  console.log("Recieved POBJ:",pobj)
  console.log("Recieved COBJ:",cobj)
  if(pobj)
  {
    setCat(pobj.category)
    setName(pobj.pname)
    setPid(pobj._id)
    setBasecat(pobj.basecat)
    setFilters(pobj.filters)
    setBrand(pobj.brand)
    setPrice(pobj.price)
    setDesc(pobj.pdesc)
    setDiscount(pobj.discount)
    setVariants(pobj.variants)
    setFiles([...pobj.pimage])
    setPimages([...pobj.pimage])
  }
  if(cobj)
  {
    setSubcat(cobj)
  }
},[])



  const handleAddFilterValue = (value) =>{
    
    //console.log("filters:",filters)
    //console.log("selectedfilter:",selectedfilter)
    //console.log("value:",value)

    let fobj={...filters}
  
    fobj[selectedfilter]=value;
    setFilters(fobj)
    //console.log("filters:",fobj)
    //console.log(Object.keys(filters).length)
  }



  const handleAddProduct = () =>{
    
    let formdata = new FormData();

    console.log(files[0]);
    

    for (let i = 0; i < files.length; i++) {
      if(files[i])
      {formdata.append('file', files[i]);}
    }

    const pobj={
      name:name,
      brand:brand,
      desc:desc,
      category:selectedCat,
      basecategry:selectedSubcat.name,
      price:price,
      discount:discount,
      basecat:basecat,
      variants:variants,
      filters:filters
    }

    console.log("final Product object:",pobj)

    
    formdata.append('pobj', JSON.stringify(pobj));
    
    axios.post('/uploadproductimg',formdata)
    window.location.href="/admin/productlist";
  }



  const handleUpdateProduct=()=>{

    let result = true;

    const pobj={
      _id:pid,
      pname:name,
      brand:brand,
      pdesc:desc,
      category:selectedCat,
      subcategory:selectedSubcat.name,
      price:price,
      discount:discount,
      basecat:basecat,
      variants:variants,
      filters:filters
    }


    // Check if lengths are different
    if (pimages.length !== files.length) {
      result = false;
    } else {
      // Check if content is different
      for (let i = 0; i < pimages.length; i++) {
        if (pimages[i] !== files[i]) {
          result = false;
          break;
        }
      }
    }

    if(!result){
      let formdata = new FormData();

      console.log(files[0]);
      
  
      for (let i = 0; i < files.length; i++) {
        if(files[i])
        {formdata.append('file', files[i]);}
      }

      formdata.append('pobj', JSON.stringify(pobj));
    
      axios.post('/uploadproductimg',formdata)

    }
    else{
      dispatch(updateProduct(pobj))
    }

    window.location.href="/admin/productlist";
  }
 
  return (<>
    {!loading?<>

      <Container>
      <h2> Add Product </h2>
      <hr></hr>


      <Row>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Parent Category</Form.Label>
            <Form.Select value={selectedCat||""} onChange={e=>{setCat(e.target.value); setSubcat("");setBasecat([]);setVariants([]);setFilters({})}}>
            <option value="">-Select-</option>
              {
                categories.map(category=>
                  <option value={category.name}>{category.name}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          </Col>
          <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Subcategory</Form.Label>
            <Form.Select onChange={e=>{handleThisSubcategory(e.target.value);setFilters({})}}>
            <option value="">-Select-</option>
              {
                selectedCat&&hmap[selectedCat]&&hmap[selectedCat].map(category=>
                  <option value={category}>{category}</option>
                )
              }
            </Form.Select>
            {selectedSubcat&&selectedSubcat.name}
          </Form.Group>
        </Col>

    <Col md={3}>
      <Form.Group className="mb-3">
      <Form.Label>Enter Product Name</Form.Label>
      <Form.Control value={name} placeholder='eg. Mens Blue Shirt' onChange={e=>setName(e.target.value)}/>
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group className="mb-3">
      <Form.Label>Enter Product Brand</Form.Label>
      <Form.Control value={brand} placeholder='eg. Levis' onChange={e=>setBrand(e.target.value)}/>
      </Form.Group>
    </Col>
      <Form.Group className="mb-3">
      <Form.Label>Enter Product Description</Form.Label>
      <Form.Control value={desc} placeholder='eg. Good shirt comfort fit' onChange={e=>setDesc(e.target.value)}/>
      </Form.Group>
      </Row>


      <Row>
        <Col md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Enter Selling Price</Form.Label>
          <Form.Control value={price} placeholder='eg. 1500' onChange={e=>setPrice(parseInt(e.target.value))}/>
        </Form.Group>
        </Col>
        <Col md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Enter Discount</Form.Label>
          <Form.Control value={discount} placeholder='eg. 50' onChange={e=>setDiscount(parseInt(e.target.value))}/>
        </Form.Group>
        </Col>
        <Col md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Original Price</Form.Label>
          <Form.Control disabled placeholder='eg. 1550' value={parseInt(price)+parseInt(discount)}/>
        </Form.Group>
        </Col>
      </Row>


      <Row>
        <Col md={5} style={{"border":"1px solid lightgrey", "padding":"2%","margin":"1%", "borderRadius":"10px"}}>
          <Row>
            <Col md={6}>
            
            <Form.Group className="mb-3">
            <Form.Label>Select Basecategories </Form.Label>
            <br></br>
            <sup>(add one or more)</sup><br></br>
                {selectedSubcat&&selectedSubcat.basecat.map(e=><>
                <span className='seloption' onClick={()=>setBasecat(basecat.find(b=>b===e)?[...basecat]:[...basecat,e])}>{e}</span> <br/>
                </>)}
            </Form.Group>
            </Col>
            <Col md={6}>
              
              <h6>Selected Base Categories</h6>
              {
                basecat.map(e=><>
                  <Button className='btn-warning'onClick={()=>setBasecat(basecat.filter(b=>b!==e))}>{e} &#10006;</Button>&nbsp;
                </>)
              }
            </Col>
          </Row>
        </Col>

        <Col md={6} style={{"border":"1px solid lightgrey", "padding":"2%","margin":"1%", "borderRadius":"10px"}}>

        <Form.Group className="mb-3">
               <Row>
                <Col md={6}>
                <Form.Label>Select Available Variants </Form.Label><br/><sup>(one or more)</sup><br/>
               
                  {selectedSubcat&&selectedSubcat.variants.map(e=><>
                  <span className='seloption' onClick={()=>setVariants(variants.find(b=>b===e)?[...variants]:[...variants,e])}>{e}</span> <br/>
                  </>)}
                </Col>
                <Col md={6} style={{borderLeft:"1px solid grey"}}>
                <h6>Selected Variants</h6>
                  {
                    variants.map(e=><>
                      <Button className='btn-warning'onClick={()=>setVariants(variants.filter(b=>b!==e))}>{e} &#10006;</Button>&nbsp;
                    </>)
                  }
                </Col>
              </Row>
            </Form.Group>
       
       
       
        </Col>
        
       
      </Row>
      
      
      
      <Row>
        <Col md={5} style={{ "padding":"2%","margin":"1%", "borderRadius":"10px",border:"1px solid lightgrey", marginRight:"2%",paddingRight:"2%"}}>
        <Form>

            <Form.Group className="mb-3">
              <Form.Label>Select Filter</Form.Label>
              <br/><sup>(select one value applicable from each filter)</sup>
              <Form.Select onChange={e=>{setselectedfilter(e.target.value)}} value={selectedfilter}>
              <option value=""> -select-</option>
              {selectedSubcat&&Object.keys(selectedSubcat.filters).map(e=><>
                <option value={e}> {e}</option>
              </>)}
              </Form.Select>
              <br/>

              <Row>
              <Col md={5} style={{borderRight:"1px solid grey", marginRight:"5px"}}>
                <h6>Filter Values</h6>
                {
                  selectedSubcat&&selectedfilter&&selectedSubcat.filters[selectedfilter].map(e=><>
                    <span className='seloption' onClick={()=>handleAddFilterValue(e)}>{e}</span><br/>
                  </>)
                }
              </Col>
                
              <Col md={5}>
              <h6>Selected Filter Value</h6>
              
              {Object.keys(filters).length !== 0 && 
              (<Button className='btn-warning'>
                  
                  {filters[selectedfilter]}
                </Button>
              )}
              
                
              
              </Col>
              </Row>

            </Form.Group>

          </Form>
        </Col>
        
        
        <Col md={6} style={{"padding":"2%","marginTop":"1%", "borderRadius":"10px",border:"1px solid lightgrey", marginRight:"2%",paddingRight:"2%"}}>
  
          <Row style={{backgroundColor:"whitesmoke"}}>
          <h5>Uploaded images ({files.length})</h5> 
          <br></br><br></br>
          <Col md={4}><input type="file" onChange={e=>setFiles([...files,e.target.files[0]])} /> 
                {files.length==0&&<sup style={{color:"red"}}>**required</sup>}
                
                </Col>
                <br/>
           </Row>
            <Row style={{marginTop:"2%"}}>
            {
            

              [...Array(files.length).keys()].map(i => (<>
              
                <Col md={3}>{files&&<img src={"/product-images/"+files[i]} style={{width:"100%"}}></img>}
                
                
                <Button style={{"float":"right"}} onClick={()=>{
                setFiles(files.filter(e=>e!==files[i]));
              }} className='btn-danger'>&#10006;</Button>
            </Col>
            
              
              
              
              
              </>))

            }
            </Row>
            <Button style={{float:"right"}} className="btn-danger" onClick={()=>setFiles([])}>Clear All</Button>
          
     
        </Col>
      </Row>
      <br/>
      
      {pid?<>
        <Button 
      onClick={()=>handleUpdateProduct()} 
      disabled={!name||!brand||!desc||!selectedCat||!selectedSubcat||!price||basecat.length===0||variants.length===0||files.length===0}
      /*||Object.keys(filters).length!==Object.keys(selectedSubcat.filters).length*/
      className='btn btn-success' style={{"float":"right"}}>
      Update Product
      </Button>

        


      </>:<>
      <Button 
      onClick={()=>handleAddProduct()} 
      disabled={!name||!brand||!desc||!selectedCat||!selectedSubcat||!price||basecat.length===0||variants.length===0||!files[0]}
      /*||Object.keys(filters).length!==Object.keys(selectedSubcat.filters).length*/
      className='btn btn-success' style={{"float":"right"}}>
      Add Product
      </Button>
      </>
      }
      <br/><br/><br/>

    </Container>





    </>:<></>}
    


  

  </>
   
  )
}

export default AddProduct