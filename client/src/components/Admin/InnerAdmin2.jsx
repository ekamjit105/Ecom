import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './AddProduct'
import OrderList from './OrderList'
import Dashboard from './Dashboard'
import UserList from './UserList'
import ProductList from './ProductList'
import AddCategory from './AddCategory'
import AddSubcategory from './AddSubcategory'

const InnerAdmin2 = () => {
  return (
   <Routes>
        <Route path="*" element={<Dashboard/>} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/userlist" element={<UserList/>} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/addsubcategory" element={<AddSubcategory />} />
   </Routes>
  )
}

export default InnerAdmin2