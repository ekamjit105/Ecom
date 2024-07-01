
import React, { useEffect, useState  }  from 'react'
import { deleteCategory, getAllCategories, updateCategory } from '../../actions/categoryAction';
import { useSelector,useDispatch } from 'react-redux'
import {Form, Container, Table, Modal, Button, Row, Col} from 'react-bootstrap';
import {FaSave, FaTrash, FaPenSquare, FaEye} from "react-icons/fa";
import axios from 'axios'

const AddCategory = () => {
   
  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch]);  
  
  const {cats,loading} = useSelector((state)=>state.getAllCatsReducer)

  
  const [selectedCat, setSelectedCat] = useState()
  const [selectedCatId, setSelectedCatId] = useState()
  const [selectedHpos, setSelectedHpos] = useState()

  const [selectedFile, setSelectedFile] = useState();
  //file in the selected category as currently saved in the database 

  const [file,setFile]=useState()
  //file that will be uploaded

  const handleCatEdit = (cid) =>{
    let thiscat = cats.find(e=>e._id===cid)
    console.log(thiscat)
    setSelectedCat(thiscat.name)
    setSelectedHpos(thiscat.hpos)
    setSelectedFile(thiscat.catimg)
    setSelectedCatId(thiscat._id)
    setFile()
  }
  
/*
  const handleClear = () => {
    setSelectedFile(null);
  };
*/

  const handleUpdateCategory = () =>{
    

    if(file&&file.filename!==selectedFile)
    {
      //image file has been changed
      //UPLOAD 
      //and update in DB      
      console.log("sending changed")
      const formdata = new FormData()
      formdata.append('file',file)
      const cobj = {name:selectedCat,
        hpos:selectedHpos,
       }
       formdata.append('cobj', JSON.stringify(cobj));
       axios.post('/uploadcatimg',formdata)

    }
    else{
      //only update in db


      const cobj = {name:selectedCat,
        hpos:selectedHpos,
        _id:selectedCatId
      }
      console.log("sending .. cobj ..",cobj)
      dispatch(updateCategory(cobj))

    }

    window.location.reload()


  }


  const handleAddCategory = () =>{
  
      if(cats.find(e=>e.name==selectedCat))
      {
        alert("Category With Same Name Already Exists. Please Edit it or change the name")
        return;
      }
      //uploadcatimg function in server will automatically handle creation of new category (it requires a new image)

      const formdata = new FormData()
      formdata.append('file',file)
      const cobj = {name:selectedCat,
        hpos:selectedHpos,
       }
       formdata.append('cobj', JSON.stringify(cobj));
      axios.post('/uploadcatimg',formdata)

      window.location.reload()
  }



/*
  const handleUpload=(e)=>{
      //console.log(file)
      const formdata = new FormData()
      formdata.append('file',file)
      axios.post('http://localhost:3000/upload',formdata)
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
  }



  const [image,setImage]=useState()

  useEffect(() => {
    axios.get('http://localhost:3000/getImage')
    .then(res=>setImage(res.data[1].image))
    .catch(err=>console.log(err))
  }, []); 
  */


  return (
    
    <Container>
      <Row>
      <h2> Manage Categories </h2>
      
      
      {/*   
      <hr/>   
      <input type="file" onChange={e=>setFile(e.target.files[0])} ></input>
      <button onClick={handleUpload}>upload</button>
      */}


      



















      
      <hr/>
      
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Enter Category Name</Form.Label>
            <Form.Control placeholder='eg. Mens' value={selectedCat} onChange={e=>setSelectedCat(e.target.value)}/>
          </Form.Group>
        </Col>
        
        
        
        
        
        
        
        
        <Col md={3}>


      
      <input type="file" onChange={e=>setFile(e.target.files[0])} /> 
      <br/>
      <br/>
      {file&&file.filename!==selectedFile?<></>
      :<> 
      {selectedCatId?<img src={`http://localhost:3000/images/`+selectedFile} style={{width:"100px"}}></img>:<></>}  </>}

      {file?<>{file.name}</>:<>{selectedFile}</>}<br></br>
      {/*file&&file.filename!==selectedFile?<>changed</>:<>not changed</>*/}


        </Col>
        <Col md={2}>
        <Form.Group className="mb-3">
          hpos
          <Form.Control placeholder='eg. 0' value={selectedHpos} onChange={e=>setSelectedHpos(e.target.value)}/>
        </Form.Group>
        </Col>
        <Col md={3}>
        <Form.Group className="mb-3">
        
        {selectedCatId?
        <><Button className="btn btn-success" onClick={() => handleUpdateCategory()} disabled={!selectedCat || !selectedHpos ||!selectedFile}>Update Category</Button>
        <br></br><br></br>
        <Button className="btn btn-success" onClick={() => window.location.reload()}>Clear</Button>
        
        </>
        :
        <><Button className="btn btn-success" onClick={() => handleAddCategory()} disabled={!selectedCat || !selectedHpos ||!(selectedFile||file)}>Add Category</Button>
        </>}
        
        
          
        </Form.Group>
        
        </Col>

        {selectedCat}{selectedHpos}
      <hr/>

      <h2>Categories</h2>
      <Container>
        
        <Table striped bordered hover>
        <thead>
          <th>Category Name</th>
          <th>No. Subcategories</th>
          <th>hpos</th>
          <th>Banner</th>
          <th>Edit/Delete</th>
        </thead>
        <tbody>
        {!loading && cats && cats.map(cat=>(
          <>
          {cat.isMain?<>
            <tr>
            <td>{cat.name}</td>
            <td>{cat.basecat.length}</td>
            <td>{cat.hpos}</td>
            <td><center><img src={`http://localhost:3000/images/`+cat.catimg} style={{width:"100px"}}></img></center></td>
            <td>
            
            

             &nbsp;&nbsp;
            <FaPenSquare className='clickable' onClick={()=>handleCatEdit(cat._id)}></FaPenSquare>
            &nbsp;&nbsp;
             <FaTrash className='clickable' onClick={()=>{dispatch(deleteCategory(cat._id))}}/>
            
             </td>
          </tr>

          </>:<></>}
          </>
        ))}
        </tbody>
      </Table>

      </Container>
      
      </Row>
    </Container>


  )
}

export default AddCategory