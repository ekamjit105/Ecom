import React, { useEffect, useState  }  from 'react'
import {Form, Container, Table, Modal, Button, Row, Col} from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux'
//import { deleteOrder, getAllOrders, updateOrder } from '../../actions/orderAction';
import formatDate from '../../sidefunctions/formatDate'
import {FaSave, FaTrash, FaPenSquare} from "react-icons/fa";
import { deleteUser, getAllUsers } from '../../actions/userAction';

const UserList = () => {
 
   
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch]);  
 
  const {users,loading} = useSelector((state)=>state.getAllUsersReducer)
  if(!loading)
  {
   // users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
   // console.log(users)
  }
 
 
 
 
  return (
    <Container>
      <Row>
      <h2> Manage Users</h2>
      <hr/>
      </Row>

      <Table striped bordered hover>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>isAdmin</th>
          <th>Primary Address</th>
        </thead>
        <tbody>
        {
          !loading&&users.map(user=>(
            <>
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin?<>Admin</>:<>False</>}</td>
              <td>{user.addresses[0]}</td>
              
              <td>

              &nbsp;&nbsp;
              <FaTrash className='clickable' onClick={()=>{dispatch(deleteUser(user._id))}}/>
             
              </td>
            </tr>
            </>
          ))
        }

        </tbody>
      </Table>



    </Container>
  )
}

export default UserList