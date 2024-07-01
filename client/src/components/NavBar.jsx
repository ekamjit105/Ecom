import React, { useEffect } from 'react'
import { Navbar, Nav, Container,NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { logoutUser } from '../actions/userAction'
import { getAllCategories } from '../actions/categoryAction'

const NavBar = () => {

  const dispatch = useDispatch()
  const cartState = useSelector((state)=>state.cartReducer)
  const {currentUser} = useSelector((state)=>state.loginReducer)
  

    useEffect(()=>{
        dispatch(getAllCategories())//dispatch action
    }, [dispatch])
    const {cats,loading,error}= useSelector((state)=>state.getAllCatsReducer)//getting pizza state using useSelector
    var myMap = new Map();
    if(!loading && !error)
    {

      cats.sort((a, b) => a.hpos - b.hpos);
     cats.forEach(category => {
        var key=category.parent+category.name
        //console.log(key)  
      myMap.set(key, category.basecat);
      });
      //console.log(myMap.get("Men"))
    }

    const routeToCategory =({cat,subcat,basecat})=>{
      window.location.href="/category?cat="+cat+"&subcat="+subcat+"&basecat="+basecat
    }

  return (
    <>

    <Navbar fixed="top" collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
        <img src='../images/logo.png' style={{height:"60px", width:"90%"}} alt="logo"/>
        </Navbar.Brand>
        
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        
        {loading ? (
    <></>
) : (
    cats.map(category => {
        var counter = 1; // Declare counter here
        return (
            <>
                {category.isMain === true ? (
                    <>
                    <NavDropdown title={category.name} id="navbarScrollingDropdown" style={{fontSize:"20px", padding:"2%", color:"black"}}>
                        <div className="dropdown-columns">
                                       
                            {
                              //console.log("key "+category.parent+""+category.name)
                              
                              myMap.get(category.parent+category.name).map(e => {
                                counter++;
                                return (
                                    <>
                                        <div className='column'>                                        
                                          {counter===2 && <NavDropdown.Item onClick={()=>(routeToCategory({cat:category.name,subcat:"NA", basecat:"NA"}))} style={{color:"rgb(255, 144, 144)", fontSize:"15px", fontWeight: "bold"}} >All in {category.name}</NavDropdown.Item>
                         }
                                        <NavDropdown.Item onClick={()=>(routeToCategory({cat:category.name,subcat:e, basecat:"NA"}))} style={{color:"rgb(255, 144, 144)", fontSize:"15px", fontWeight: "bold"}} >{e}</NavDropdown.Item>
                                            <div className='basecat'>
                                            {myMap.get(category.name+e) && myMap.get(category.name+e).length > 0 && myMap.get(category.name+e).map(x => {
                                                counter++;
                                                return (
                                                    <>
                                                    <NavDropdown.Item  onClick={()=>(routeToCategory({cat:category.name,subcat:e, basecat:x}))} style={{fontSize:"15px"}}>{x}</NavDropdown.Item>
                    
                                                        
                                                    </>
                                                );
                                            })}
                                            </div>
                                            <NavDropdown.Divider />
                                        </div>

                                    </>
                                );
                            })
                            
                            }
                        </div>
                        
                    </NavDropdown>
                    </>
                ) : null}
            </>
        );
    })
)}
        
        
        
        
        
        
        <Nav className="ms-auto">
        

          {currentUser?
            (<LinkContainer to="/">
              <NavDropdown title={currentUser.name} id="basic-nav-dropdown">

              <LinkContainer to="/myorders">
                <NavDropdown.Item>My Orders</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/wishlist">
                <NavDropdown.Item>Wishlist</NavDropdown.Item>
              </LinkContainer>
                <NavDropdown.Item onClick={()=>{dispatch(logoutUser())}}>Log Out</NavDropdown.Item>
            
            </NavDropdown>
            </LinkContainer>)
          :
            (<>
            <LinkContainer to="/login">
                <Nav.Link >Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
                <Nav.Link >Register</Nav.Link>
            </LinkContainer>
            </>
            )
          }
            <LinkContainer to="/cart">
                <Nav.Link >&#128722; 
                {cartState.cartItems.length!==0?<><div style={{fontSize:"13px", display:"inline-block", backgroundColor:"orange", color:'white',height:"20px", width:"20px", borderRadius:"50%", textAlign:"center"}}>{cartState.cartItems.length}</div></>:<></>}
                </Nav.Link>
            </LinkContainer>
            
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br/><br/><br/><br/>
    </>
  )
}

export default NavBar