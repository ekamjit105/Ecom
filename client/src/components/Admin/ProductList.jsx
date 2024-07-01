import React, { useEffect, useState  }  from 'react'
import {Form, Container, Table, Modal, Button, Row, Col} from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux'
import formatDate from '../../sidefunctions/formatDate'
import {FaSave, FaTrash, FaPenSquare, FaEye} from "react-icons/fa";
import { getAllCategories } from '../../actions/categoryAction';
import { deleteProduct, getProductsByCategory } from '../../actions/productAction';
import routetoproduct from '../../sidefunctions/routetoproduct'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ProductList = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch]);  
  
  const {cats,loading} = useSelector((state)=>state.getAllCatsReducer)
  const {ploading, products} = useSelector((state)=>state.getProductsByCategory)
  
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

  const [selectedSubcat, setSubcat] = useState("NA")

  const handleGetProducts=()=>{
    if(!selectedCat)
    alert("Category Not Selected")
    else{
      const subcat = selectedSubcat===""?"NA":selectedSubcat
      const cobj={cat:selectedCat,subcat:subcat}
      console.log("sending : ",cobj)
      dispatch(getProductsByCategory(cobj))
    }
  }

  if(!ploading)
  {
    products.sort((a, b) => a.brand.localeCompare(b.brand));
    //console.log(orders)
  }


  const navigate = useNavigate();

  const handleEditProduct = (pobj) => {
    // Define your object to be passed as a prop
    // Navigate to the /addproduct route and pass the propObject
    
    const cobj=cats.find(e=>e.name==selectedSubcat&&e.parent==selectedCat)
    
    navigate('/admin/addproduct', { state: { pobj , cobj} });
  };

  return (
    <Container>
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
          <Col md={4}> <Button onClick={handleGetProducts}>Get Products </Button> </Col>
          <br></br><br></br>
          </>:<></>
        }
        
      </Row>
      <Row>
      <Container>
      <h3>{selectedCat && selectedSubcat!=="NA"?<>{selectedCat} {selectedSubcat}</>:<></>}</h3><br/>
      <Table striped bordered hover>
        <thead>
          <th>Band</th>
          <th>Name</th>
          <th>Selling Price</th>
          <th>Discount</th>
          <th>Variants</th>
          <th>Options</th>
        </thead>
        <tbody>
        {!ploading && products && products.map(product=>(
          <>
          <tr>
            <td>{product.brand}</td>
            <td>{product.pname}</td>
            <td>{product.price}</td>
            <td>{product.discount}</td>
            <td>{product.variants.map(v=><>{v} </>)}</td>
            <td>
            
            
            <FaEye className='clickable' onClick={()=>routetoproduct(product._id)}></FaEye>

             &nbsp;&nbsp;
            <FaPenSquare className='clickable' onClick={()=>handleEditProduct(product)}></FaPenSquare>
              
             
             &nbsp;&nbsp;
             <FaTrash className='clickable' onClick={()=>{dispatch(deleteProduct(product._id))}}/>
            </td>
          </tr>
          </>
        ))}
        </tbody>
      </Table>
  </Container>
        
      </Row>

    </Container>
  )
}

export default ProductList