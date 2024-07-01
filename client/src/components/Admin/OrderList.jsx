import React, { useEffect, useState  }  from 'react'
import {Form, Container, Table, Modal, Button, Row, Col} from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux'
import { deleteOrder, getAllOrders, updateOrder } from '../../actions/orderAction';
import formatDate from '../../sidefunctions/formatDate'
import {FaSave, FaTrash, FaPenSquare} from "react-icons/fa";

const OrderList = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch]);  




  const {orders,loading} = useSelector((state)=>state.allUserOrdersReducer)
  if(!loading)
  {
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //console.log(orders)
  }
  
  
  
    const [orderStatuses, setOrderStatuses] = useState({});

    const handleStatusChange = (orderId, status) => {
      setOrderStatuses(prevStatuses => ({
        ...prevStatuses,
        [orderId]: status
      }));
    };
  
    const handleOrderUpdate = (orderId) =>{
  
      let neworder=orders.find(e=>(e._id===orderId))
      neworder.status=orderStatuses[orderId]
      console.log("found: ",neworder)

      dispatch(updateOrder(neworder))

    }
  
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedOrder, setSelectedOrder] = useState()

    const viewOrder = (order) =>{
      setSelectedOrder(order)
      setShow(true)
    }
  
  return (
    
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        
        
        {selectedOrder?<>


          <Modal.Header closeButton>
          <Modal.Title>Order Id : {selectedOrder._id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Container>
          <Row>
          <Col md={4}>
              {selectedOrder&&selectedOrder.orderItems.map((item) => (
                <h6 key={item.pname}>
                 <span style={{fontWeight:"bold"}}>{item.brand}</span> {item.pname} ({item.variant}) x {item.quantity} ={" "}
                 <h6 style={{display:"inline"}}><sup>₹</sup>{item.price}</h6> &nbsp;
                                {item.discount!==0?<>
                                <span style={{ color:"red",textDecoration:"line-through"}}>M.R.P. ₹{item.price+item.discount}
                                </span>&nbsp;</>
                                :<></>}
                </h6>
              ))}
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
              <h5 style={{fontWeight:"600"}} > Order Amount : ₹ {selectedOrder.orderAmount}/-</h5>
              <h6> Number of Items : {selectedOrder.orderItems.length}</h6>
              <h6> Order Date: {formatDate(selectedOrder.createdAt)}</h6>
              <h6> Transaction id : {selectedOrder.transactionId}</h6>
              <h6> Shipping Address : {selectedOrder.address}</h6>
              <h6> Email Address : {selectedOrder.email}</h6>
              <h5 style={{fontWeight:"600"}}> Status : {selectedOrder.status}</h5>
            </Col>

            <Col md={3}>
            <img src={"../images/product-images/"+selectedOrder.orderItems[0].pimage[0]} className='w-100'></img>
            </Col>
          </Row>
          </Container>




        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>


        </>:<></>}
        
        
        
      </Modal>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <Container>
      <h2> Manage Orders</h2>
      <hr/>

      <Table striped bordered hover>
        <thead>
          <th>Name</th>
          <th>Date</th>
          <th>Address</th>
          <th>Subtotal</th>
          <th>Status</th>
          <th>Options</th>
        </thead>
        <tbody>
        {
          !loading&&orders.map(order=>(
            <>
            <tr>
              <td>{order.name}</td>
              <td>{formatDate(order.createdAt)}</td>
              <td>{order.address}</td>
              <td>₹ {order.orderAmount}</td>
              
              <Form.Select
              aria-label="Default select example"
              value={orderStatuses[order._id] || order.status} // Use the state value if it exists
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              <option value="Confirmed">Confirmed</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </Form.Select>

              <td>
               <FaPenSquare className='clickable' onClick={()=>viewOrder(order)}></FaPenSquare>
              
               &nbsp;&nbsp;
              <FaSave className='clickable' onClick={()=>(handleOrderUpdate(order._id))}></FaSave>
              
              &nbsp;&nbsp;
              <FaTrash className='clickable' onClick={()=>{dispatch(deleteOrder(order._id))}}/>
             
              </td>
            </tr>
            </>
          ))
        }

        </tbody>
      </Table>


    </Container>
    </>
  )
}

export default OrderList