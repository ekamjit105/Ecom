import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getMyOrders } from '../actions/orderAction'
import {Container, Row, Col} from 'react-bootstrap' 
import formatDate from '../sidefunctions/formatDate'


const OrdersScreen = () => {
    
    const dispatch = useDispatch();
    
    const orderState = useSelector((state)=>state.myOrdersReducer)
    const {orders} =orderState 
    useEffect(() => {
        dispatch(getMyOrders())
      }, [dispatch]);  

    
return (
    <> <br></br><h2 className="text-center ">Your Orders </h2>
    
    {orders &&
      orders.map((order) => (
        <div className="container border p-4 card">
       <Container>
          <Row>
          <h5> Order id :  <span style={{fontWeight:"600"}}>{order._id} </span></h5>
            <Col md={4}>
              {order.orderItems.map((item) => (
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
              <h4> Order Amount : Rs {order.orderAmount}/-</h4>
              <h6> Number of Items : {order.orderItems.length}</h6>
              <h6> Order Date: {formatDate(order.createdAt)}</h6>
              <h6> Transaction id : {order.transactionId}</h6>
              <h6> Shipping Address : {order.address}</h6>
              <h5> Status : {order.status}</h5>
            </Col>

            <Col md={1}>
            <img src={"/product-images/"+order.orderItems[0].pimage[0]} className='w-100'></img>
            </Col>
          </Row>
          </Container>
        </div>
      ))}
  </>
  )
}

export default OrdersScreen