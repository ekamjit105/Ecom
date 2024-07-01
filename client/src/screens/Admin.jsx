import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import { Row, Col, ButtonGroup, Container, Navbar } from 'react-bootstrap'
import { Link} from 'react-router-dom';
import InnerAdmin2 from '../components/Admin/InnerAdmin2';

const Admin = ({ history }) => {
  const userState = useSelector((state) => state.loginReducer);
  const { currentUser } = userState;
  useEffect(() => {
    if (localStorage.getItem("currentUser") === null || !currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, [currentUser]);



  return (
    <>
 <br/><br/><br/><br/>
      

      <Navbar fixed="top" collapseOnSelect expand="lg" bg="light" variant="light">
      
        <Navbar.Brand href="/">
        <img src='../images/logo.png' style={{height:"60px", width:"90%"}} alt="logo"/>
        </Navbar.Brand>
        <h2>Admin Panel</h2>
      </Navbar>
      <Container style={{paddingLeft:"0", marginLeft:"0",}}><Row>   
        <Col md={2} style={{backgroundColor:"#141528", height:"140vh"}}>
          <ButtonGroup vertical style={{ minHeight: "400px" }}>
            <Link to="dashboard" className="btn btn-primary" style={{backgroundColor:"#141528", color:"white",border:"0px", padding:"10%"}}>Dashboard</Link>
            <Link to="orderlist" className="btn btn-primary" style={{backgroundColor:"#141528", color:"white",border:"0px", padding:"10%"}}>Manage Orders</Link>
            <Link to="userlist" className="btn btn-primary" style={{backgroundColor:"#141528", color:"white",border:"0px", padding:"10%"}}>Manage Users</Link>
            <Link to="productlist" className="btn btn-primary" style={{backgroundColor:"#141528", color:"white",border:"0px", padding:"10%"}}>Manage Products</Link>
           {/*<Link to="categories" className="btn btn-primary" style={{backgroundColor:"#141528", color:"white",border:"0px", padding:"10%"}}>Manage Categories</Link>
            */} 
            <Link to="addproduct" className="btn btn-primary" style={{backgroundColor:"#141528", color:"white",border:"0px", padding:"10%"}}>Add Product</Link>
            <Link to="addcategory" className="btn btn-primary" style={{backgroundColor:"#141528", color:"white",border:"0px", padding:"10%"}}>Add / Update Category</Link>
            <Link to="addsubcategory" className="btn btn-primary" style={{backgroundColor:"#141528", color:"white",border:"0px", padding:"10%"}}>Add / Update Subcategory</Link>
             
          </ButtonGroup>
        </Col>
        <Col md={10}>
          <InnerAdmin2/>
        </Col>
      </Row>
      
      </Container>
    </>
  );

}

export default Admin