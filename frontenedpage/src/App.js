import React, { useEffect } from 'react'
import './App.css';
import WebFont from'webfontloader';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';
import { BrowserRouter,
   Routes, 
   Route } from "react-router-dom";
import Products from './components/Products';
import SearchBar from './components/layout/SearchBar';
import LoginSignUp from './components/user/LoginSignUp';
// import { useAlert } from 'react-alert';

import store from './reduximplement/Store';
import { loderUser } from './reduximplement/actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import ProfileAccount from './components/user/ProfileAccount';
import EditUserAccount from './components/user/EditUserAccount';
import ForgetPassword from './components/user/ForgetPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/Cart';
import Homecartproduct from './components/layout/Homecartproduct';
import Shipping from './components/Shipping';
import ConfrimOrder from './components/ConfrimOrder';
import Payment from './components/Payment';
import OrderSucess from './components/OrderSucess';
import OrderDetails from './components/OrderDetails';
import MyOrders from './components/MyOrders';
import Sidebar from './components/DashbordFolder/Sidebar';
import DashbordMy from './components/DashbordFolder/DashbordMy';
import AdminProducts from './components/DashbordFolder/AdminProducts';
import AdminCreateProduct from './components/DashbordFolder/AdminCreateProduct';
import AdminOrders from './components/DashbordFolder/AdminOrders';
import AdminOrderDetails from './components/DashbordFolder/AdminOrderDetails';
import AdminUsers from './components/DashbordFolder/AdminUsers';
import NotFoundpage from './components/NotFoundpage';
import Adminupdateproduct from './components/DashbordFolder/Adminupdateproduct';
// import AdminOrderDetails from './components/DashbordFolder/AdminOrderDetails';




const App = () => {
  // const dispatch=useDispatch();
  // const alert=useAlert();
   const{isAuthenticated,User}=useSelector(state=>state.users);
   



    React.useEffect(()=>{
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"],
              },
        })
        store.dispatch(loderUser());
    },[])

    // window.addEventListener("contextmenu", (e) => e.preventDefault());
 
  return (
    // <div>
     <BrowserRouter>
       <Navbar/>
      {/* <Home/> */}
      
     <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/product/:id" element={<ProductDetails/>}/>
      <Route  path="/products" element={<Products/>}/>
      <Route path="/products/:keyword" element={<Products/>}/>
      <Route  path="/search" element={<SearchBar/>}/>
      <Route path="/loginSignup" element={<LoginSignUp/>}/>
   {isAuthenticated&&
      <Route path="/accountprofile" element={<ProfileAccount/>}/>
    }
      {isAuthenticated&&
      <Route path="/updateprofile" element={<EditUserAccount/>}/>}
      {!isAuthenticated&&
      <Route path="/forgetpassword" element={<ForgetPassword/>}/>}
      
      <Route path="/password/reset/:token" element={<ResetPassword/>}/>
      {isAuthenticated&&
      <Route path="/cart" element={<Cart/>}/>}
      <Route path="/shipping" element={<Shipping/>}/>
      {isAuthenticated&&
      <Route path="/confrimorder" element={<ConfrimOrder/>}/>}
      <Route path="/payment" element={<Payment/>}/>
      <Route path='/sucessorders' element={<OrderSucess/>}/>
      <Route path='/orderdetails/:id' element={<OrderDetails/>}/>
      <Route path='/myorder' element={<MyOrders/>}/>





{/* Admin route */}
{isAuthenticated&&User.role==="admin"&&
<Route path='/mydash' element={<DashbordMy/>}/>}
<Route path='/sidebar' element={<Sidebar/>}/>
<Route path='/adminproducts' element={<AdminProducts/>}/>
<Route path='/adminproductcreate' element={<AdminCreateProduct/>}/>
<Route path='/adminorders' element={<AdminOrders/>}/>
<Route path='/adminorderdetail/:id' element={<AdminOrderDetails/>}/>
<Route path='/adminusers' element={<AdminUsers/>}/>
<Route path='/updateproduct/:id' element={<Adminupdateproduct/>}/>

      </Routes>
      <Footer/>
      </BrowserRouter>
    // </div>
  )
}

export default App
