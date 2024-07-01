import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {Container, Row, Col} from 'react-bootstrap'
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]); 
  
  
  const ordersstate = useSelector((state)=>state.allUserOrdersReducer)
  const {orders,loading}=ordersstate
  const usersstate = useSelector((state)=>state.getAllUsersReducer)

  const [data, setData] = useState([]);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 since getMonth() returns zero-based index
  const currentYear = currentDate.getFullYear();


  let monthlytotal;

  if(!ordersstate.loading)
  {
    const orders=ordersstate.orders
    monthlytotal=orders.reduce((total, order) => {
      const orderDate = new Date(order.createdAt);
      const orderMonth = orderDate.getMonth() + 1; // Adding 1 since getMonth() returns zero-based index
      const orderYear = orderDate.getFullYear();
  
      // Check if order is in the current month and year
      if (orderMonth === currentMonth && orderYear === currentYear) {
          // Parse orderAmount to integer and add to total
          total += parseInt(order.orderAmount);
      }
  
      return total;
  }, 0);


  }

  

  return (
    <>
    
      <Container>
      <h2> Dashboard </h2>
      <hr></hr>
      <Row>


      <Col md={4} className='dashboardheader'>
        <h4>{!ordersstate.loading&&ordersstate.orders.length}</h4>
        Total Number of orders
      </Col>
      <Col md={4} className='dashboardheader'>
      <h4>{!usersstate.loading&&usersstate.users.length}</h4>
        Total Number of users 
      </Col>
      <Col md={4} className='dashboardheader'>
      <h4>{!ordersstate.loading&&monthlytotal}</h4>
        Current Month Earning
      </Col>


    </Row>
    <Row>





    <Col className='dashboardheader'>
      <h4>5742</h4>
        Monthly Customer Visits
      </Col>
        
      <Col className='dashboardheader'>
      <h4>Active</h4>
        Server Status (last 24 Hrs)
      </Col>
      </Row>
      
      </Container> 
    
    </>
  )
}

export default Dashboard