import './App.css';
import {BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import NavBar from './components/NavBar'
import ProductSrceen from './screens/ProductSrceen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ResetScreen from './screens/ResetScreen';
import OrdersScreen from "./screens/OrdersScreen";
import WishlistScreen from './screens/WishlistScreen';
import Admin from './screens/Admin';
import AddProduct from './components/Admin/AddProduct';
import OrderList from './components/Admin/OrderList';
import Dashboard from './components/Admin/Dashboard';
import UserList from './components/Admin/UserList';
import ProductList from './components/Admin/ProductList';
import AddCategory from './components/Admin/AddCategory';
import AddSubcategory from './components/Admin/AddSubcategory';
import Footer from './components/Footer';

function App() {
  
  const path = window.location.pathname;

  // Check if the path starts with '/admin'
  const isAdminPath = path.startsWith('/admin');
  
  return (
    <>
    
    <BrowserRouter>
    {!isAdminPath && <NavBar />}
      <Routes>
        <Route path='*' element={<HomeScreen/>}></Route>
        <Route path='category' element={<CategoryScreen/>}></Route>
        <Route path='product' element={<ProductSrceen/>}></Route>
        <Route path='cart' element={<CartScreen/>}></Route>
        <Route path='login' element={<LoginScreen/>}></Route>
        <Route path='register' element={<RegisterScreen/>}></Route>
        <Route path='reset-password' element={<ResetScreen/>}></Route>
        <Route path='myorders' element={<OrdersScreen/>}></Route>
        <Route path='wishlist' element={<WishlistScreen/>}></Route>
          
        <Route path="admin" element={<Admin/>}>
          <Route path="*" element={<Dashboard/>} />
          <Route path="orderlist" element={<OrderList />} />
          <Route path="userlist" element={<UserList/>} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="addsubcategory" element={<AddSubcategory />} />
        </Route>
      
      </Routes>
      <br/>
      <Footer/>
    </BrowserRouter>
    </>

   

  );
}

export default App;
