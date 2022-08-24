import React from 'react'
import { Route, Routes,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PrivateRoute } from './PrivateRoute.js'
import { AdminRoute } from './AdminRoute.js';
import Register from './views/auth/Register.jsx';
import Home from './views/index';
import SingleProductDetail from './views/products/index';
import Search from './views/search/index';


// user Routes
import UserDashboard from './views/dashboard/user/profile/UserProfile'
import UserOrders from './views/dashboard/user/orders/UserOrders.jsx';
import ChangePassword from './views/dashboard/user/changePassword/ChangePassword.jsx';
import Login from './views/auth/Login.jsx';
import ForgetPasswordView from './views/auth/ForgetPassword.jsx';
import SetPasswordView from './views/auth/SetPassword.jsx';
import AllProductsView from './views/products/AllProducts.jsx';
import CartView from './views/cart/index.jsx';

// Admin Routes
import AdminDashboard from './views/dashboard/admin/home/index'
import AdminOrders from './views/dashboard/admin/orders/AllOrders'
import ProcessingOrders from './views/dashboard/admin/orders/ProcessingOrders'
import CanceledOrders from './views/dashboard/admin/orders/CanceledOrders'
import CompletedOrders from './views/dashboard/admin/orders/CompletedOrders'
import CheckOutPage from './views/checkout/index.jsx';


// user Routes
const PrivateRoutes = () =>{
  return [
    {
      path: '/dashboard/profile',
      component: <UserDashboard/>,
    },
    {
      path: '/dashboard/orders',
      component:<UserOrders />
    },
    {
      path: '/dashboard/change-password',
      component:<ChangePassword />
    },
    {
      path:'*',
      component:<Navigate to='/' replace />
    }
  ].map(({path,component})=>{
    return (
      <Route path={path} key={path} element={
        <PrivateRoute>
          {component}
        </PrivateRoute>
      } />
    )
  })
}

// Admin Route
const AdminRoutes = () =>{
  return [
    {
      path: '/dashboard/profile',
      component: <AdminDashboard/>,
    },
    // Orders Routes
    {
      path: '/dashboard/orders/all',
      component: <AdminOrders/>,
    },
    {
      path: '/dashboard/orders/active',
      component: <ProcessingOrders/>,
    },
    {
      path: '/dashboard/orders/canceled',
      component: <CanceledOrders/>,
    },
    {
      path: '/dashboard/orders/completed',
      component: <CompletedOrders/>,
    },
    {
      path:'*',
      component:<Navigate to='/' replace />
    }
  ].map(({path,component})=>{
    return (
      <Route path={path} key={path} element={
        <AdminRoute>
          {component}
        </AdminRoute>
      } />
    )
  })
}


const AppRoutes = ()=>{
  const {user} = useSelector(state=>state.user);
    return (
        <Routes>
          <Route path='/' element={<Home />} exact />
            <Route path='/product/:productId' element={<SingleProductDetail/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path='/forget-password' element={<ForgetPasswordView />} />
            <Route path='/api/users/resetPassword/:token' element={<SetPasswordView />} />
            <Route path='/products/:category' element={<AllProductsView/>} />
            <Route path="/cart" element={<CartView />} />
            <Route path='*' element={<Navigate to='/' replace />} />
            {
              user?.data?.role === 'admin' ? AdminRoutes() : PrivateRoutes()
            }
            
        </Routes>
    )
};

export default AppRoutes