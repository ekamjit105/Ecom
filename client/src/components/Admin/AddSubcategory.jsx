import React, { useEffect, useState  }  from 'react'
import {Form, Container, Table, Modal, Button, Row, Col} from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux'
import formatDate from '../../sidefunctions/formatDate'
import {FaSave, FaTrash, FaPenSquare, FaEye, faCircleXmark} from "react-icons/fa";
import { deleteCategory, getAllCategories, updateCategory, updateSubcategory } from '../../actions/categoryAction';
import { deleteProduct, getProductsByCategory } from '../../actions/productAction';
import routetoproduct from '../../sidefunctions/routetoproduct'
import axios from 'axios'

const AddSubcategory = () => {
  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch]);  
  const {cats,loading} = useSelector((state)=>state.getAllCatsReducer)
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

    //console.log("categories", categories)
  }

  const [selectedCat, setCat] = useState()
  const [selectedCatId, setSelectedCatId] = useState()
  const [selectedSubcat, setSubcat] = useState()
  const [selectedCat2, setCat2] = useState()
  const [selectedSubcat2, setSubcat2] = useState()
  const [basecat,setBasecat] = useState([])
  const [filters,setFilters] = useState({})
  const [variants,setVariants] = useState([])


  const [newbcat,setnewbcat] = useState()
  const [newvariant,setnewvariant] = useState()
  const [newfilter,setnewfilter] = useState()
  const [newfiltervalue, setnewfiltervalue] =useState()
  const [selectedfilter,setselectedfilter] = useState()
  
  
  const [selectedFile, setSelectedFile] = useState();
  //file in the selected category as currently saved in the database 
  const [file,setFile]=useState()
  //file that will be uploaded


  const handleSubcatEdit = () =>{
        setCat2(selectedCat)
        setSubcat2(selectedSubcat)

        
        let thiscat = cats.find(e=>e.parent===selectedCat&&e.name===selectedSubcat)
        setSelectedCatId(thiscat._id)
        setSelectedFile(thiscat.catimg)
        setFile()

        setBasecat(thiscat.basecat)
        setFilters(thiscat.filters)
        setVariants(thiscat.variants)
  }

  const handleSubcatRemove =()=>{
    let thiscat = cats.find(e=>e.parent===selectedCat&&e.name===selectedSubcat)
    dispatch(deleteCategory(thiscat._id))
  }

  const handleUpdateCategory = () =>{
    
    if(file&&file.filename!==selectedFile)
    {
      //image file has been changed
      //UPLOAD 
      //and update in DB      
      console.log("sending changed")
      const formdata = new FormData()
      formdata.append('file',file)
      const cobj = {
        name:selectedSubcat2,
        parent:selectedCat2,
        basecat:basecat,
        filters:filters,
        variants:variants
       }
       formdata.append('cobj', JSON.stringify(cobj));
       axios.post('/uploadsubcatimg',formdata)

    }
    else{
      //only update in db


      const cobj = {
        name:selectedSubcat2,
        parent:selectedCat2,
        basecat:basecat,
        filters:filters,
        variants:variants,
        _id:selectedCatId
      }
      console.log("sending .. cobj ..",cobj)
      dispatch(updateSubcategory(cobj))

    }
    
    window.location.reload()


  }


  const handleAddCategory = () =>{
  
      if(cats.find(e=>e.parent==selectedCat2 &&e.name===selectedSubcat2))
      {
        alert("Category With Same Name Already Exists. Please Edit it or change the name")
        return;
      }

      const formdata = new FormData()
      formdata.append('file',file)
      const cobj = {
        name:selectedSubcat2,
        parent:selectedCat2,
        basecat:basecat,
        filters:filters,
        variants:variants,
        _id:selectedCatId
      }
       formdata.append('cobj', JSON.stringify(cobj));
      axios.post('/uploadsubcatimg',formdata)
      console.log("sending subcat obj", cobj)
      //uploadcatimg function in server will automatically handle creation of new category (it requires a new image)
      //window.location.reload()
  }




  const handleRemoveFilterValue = (filterToRemove) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [selectedfilter]: prevFilters[selectedfilter].filter(item => item !== filterToRemove)
    }));
  };

  const handleAddFilterValue = (value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [selectedfilter]: [...prevFilters[selectedfilter],value]
    }));
  };

const handleAddFilter =()=>{
  setFilters(prevFilters => ({
    ...prevFilters,
    [newfilter]: []
  }));
}

const handleRemoveFilter = () => {
  const updatedFilters = { ...filters };
  delete updatedFilters[selectedfilter];
  setselectedfilter()
  setFilters(updatedFilters);
};














  return (
    <Container>
    <h2> Add/Update Subcategory </h2>
    <hr/>
    <h5>Update Subcategory <sup>*skip this section to create new subcategory</sup></h5>
    
    <Row>

    {
          !loading?<>
          <Col md={4}> 


          <Form.Group className="mb-3">
            <Form.Label>Select Parent Category</Form.Label>
            <Form.Select onChange={e=>{setCat(e.target.value); setSubcat("");}}>
            <option value="">-Select-</option>
              {
                categories.map(category=>
                  <option value={category.name}>{category.name}</option>
                )
              }
            </Form.Select>
          </Form.Group>
          </Col>
          <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Select Subcategory</Form.Label>
            <Form.Select onChange={e=>setSubcat(e.target.value)}>
            <option value="">-Select-</option>
              {
                selectedCat && hmap[selectedCat].map(category=>
                  <option value={category}>{category}</option>
                )
              }
            </Form.Select>
          </Form.Group>

          </Col>

          <Col md={3}>
          <Button onClick={() => handleSubcatEdit()} disabled={!selectedCat||!selectedSubcat}>Edit</Button>
          &nbsp;<Button className="btn-danger" onClick={() =>handleSubcatRemove()} disabled={!selectedCat||!selectedSubcat}>Remove</Button>
          </Col> 
          <br></br><br></br>
          </>:<></>
        }
    </Row>
    <hr/>






        {/* 
        *
        *
        *
        Dynamic Section 
        *
        *
        *
        */}











      <Row>
      <Col md={3}>
        <Form.Group className="mb-3">
            <Form.Label>Select Parent Category</Form.Label>
            <Form.Select onChange={e=>setCat2(e.target.value)} value={selectedCat2||""}>
            <option value="">-Select-</option>
              {
                categories.map(category=>
                  <option value={category.name}>{category.name}</option>
                )
              }
            </Form.Select>
        </Form.Group>
      </Col>
      <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Enter Subcategory Name</Form.Label>
            <Form.Control placeholder='eg. Clothing' onChange={e=>setSubcat2(e.target.value)} value={selectedSubcat2}/>
          </Form.Group>
        </Col>
        
        <Col md={3}>
        {file&&file.filename!==selectedFile?<></>
        :<> 
        {selectedCatId?<img src={`/images/`+selectedFile} style={{width:"100px"}}></img>:<></>}  </>}

        {file?<>{file.name}</>:<>{selectedFile}</>}<br></br>

        <input type="file" onChange={e=>setFile(e.target.files[0])} /> 
        <br/>
        <br/>
        
        </Col> 
      
      </Row>
      
      
      
      <Row>
      <Form.Group className="mb-3">
            <Form.Label>Create Base Categories</Form.Label>
            <Col md={4}>
            <Form.Control placeholder='eg. Shirts' onChange={e=>(setnewbcat(e.target.value))}/>
            </Col>
            <Col md={2}>
            <Button onClick={()=>setBasecat([...basecat,newbcat])}>Add Basecat</Button>
            </Col>
            <br/>
            {
              basecat&&basecat.map(e=>(
                <><Button className='btn-warning' onClick={()=>setBasecat(basecat.filter(b=>b!==e))}>{e} &#10006;</Button>&nbsp; </> 
              ))
            }

      </Form.Group>
      </Row>





      <br></br>
      <Row>
        Create Filter

          <Col md={4}>
              <Form.Control placeholder='Filter name' onChange={e=>setnewfilter(e.target.value)}/></Col>
          <Col md={4}><Button onClick={()=>handleAddFilter()}>Add Filter</Button></Col>
      </Row>
        <br></br>
        
      <Row>
          <Col style={{border:"1px solid lightgrey", padding:"1%"}} md={3}>
            <h5>Filters<sup> (select one to edit)</sup></h5>
            <hr/>
            {filters&&Object.keys(filters).map(e=>(
              <>
              <span style={{padding:"6px"}} className={selectedfilter === e ? 'highlight' : ''} onClick={()=>setselectedfilter(e)}>{e}</span>
              <br></br>
              </>
            ))}



          </Col>

          <Col style={{border:"1px solid lightgrey", padding:"1%"}} md={3}>
            <h5>Values</h5>
            <hr/>
            {
              selectedfilter&&filters[selectedfilter].map(e=>(
                <>

                <Button className='btn-warning' onClick={() => handleRemoveFilterValue(e)}>{e} &#10006;</Button>&nbsp;
                  
                </>
              ))
            }


          </Col>
          
          <Col style={{border:"1px solid lightgrey", padding:"1%"}} md={3}>
            <h5>Add Filter Value</h5>
            <hr/>
            {
              selectedfilter?
                <>
                
                <Form.Control placeholder='Filter Value' onChange={e=>(setnewfiltervalue(e.target.value))}/>
                <Button onClick={()=>handleAddFilterValue(newfiltervalue)}>Add</Button>
                </>:<></>
              
            }
            
            
            
          </Col>
          <Col style={{border:"1px solid lightgrey", padding:"1%"}} md={3}>
            <Button className="btn-danger" onClick={()=>handleRemoveFilter()}>Remove Filter</Button>
          </Col>
        
        </Row>

      <Row>
      <Form.Group className="mb-3">
      <br></br>
            <Form.Label>Create Variants</Form.Label>
            <Col md={4}>
            <Form.Control placeholder='eg. S, M, L etc.' onChange={e=>(setnewvariant(e.target.value))}/>
            </Col>
            <Col md={2}>
            <Button onClick={()=>setVariants([...variants,newvariant])}>Add Variant</Button>
            </Col>
            <br/>
            {
              variants&&variants.map(e=>(
                <><Button className='btn-warning' onClick={()=>setVariants(variants.filter(b=>b!==e))}>{e} &#10006;</Button>&nbsp; </> 
              ))
            }

      </Form.Group>
      </Row>
      <br></br><br></br>
      <span style={{float:"right"}}>
      {selectedCatId?
        <><Button className="btn btn-success" onClick={()=>handleUpdateCategory()}>Update Category</Button>
        &nbsp;&nbsp;
        <Button className="btn btn-success" onClick={() => window.location.reload()}>Clear</Button>
        
        </>
        :
        <><Button className="btn btn-success" onClick={() => handleAddCategory()} disabled={false}>Add Category</Button>
        </>}
    </span>
    </Container>
  )
}

export default AddSubcategory