
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Navbar";
import NavbarUser from "./components/Client/NavbarUser";
import Dashboard from './components/Dashboard';
import EditUser from './components/User/EditUser';
import User from './components/User/User';
import AddUser from './components/User/AddUser';
import PrivateRoute from './components/Auth/PrivateRoute';
import Home from './components/Client/Home';
import EditProfile from './components/Client/EditProfile';


import CategoryList from './components/Category/Category';
import CreateCategory from './components/Category/CreateCategory';
import EditCategory from './components/Category/EditCategory';

import ProductList from './components/Product/ProductList';
import CreateProduct from './components/Product/ProductAdd';
import EditProduct from './components/Product/ProductEdit';
import ProductPage from './components/Client/ProductPage';
import ProductDetail from './components/Client/ProductDetail';
import Cart from './components/Client/Cart';
import Order from './components/Client/Order';


import Footer from './components/Client/FooterUser';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<><NavbarUser /><Home /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="users/editprofile/:id" element={<EditProfile />} />
        <Route path="/productpage" element={<><NavbarUser /><ProductPage /><Footer /></>} />
        <Route path="/product/:productId" element={<><NavbarUser /><ProductDetail /><Footer /></>} />

        <Route path="/cart" element={<><NavbarUser /><Cart /><Footer /></>} />
        <Route path="/order" element={<><NavbarUser /><Order /><Footer /></>} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute requiredRole={0}>
              <><Navbar /><Dashboard /></>
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute requiredRole={0}>
              <><Navbar /><User /></>
            </PrivateRoute>
          }
        />
        <Route
          path="/users/add"
          element={
            <PrivateRoute requiredRole={0}>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <PrivateRoute requiredRole={0}>
              <EditUser />
            </PrivateRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <PrivateRoute requiredRole={0}>
              <><Navbar /><CategoryList /></>
            </PrivateRoute>
          }
        />
        <Route
          path="/categories/add"
          element={
            <PrivateRoute requiredRole={0}>
              <CreateCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories/edit/:id"
          element={
            <PrivateRoute requiredRole={0}>
              <EditCategory />
            </PrivateRoute>
          }
        />



        <Route
          path="/products"
          element={
            <PrivateRoute requiredRole={0}>
              <><Navbar /><ProductList /></>
            </PrivateRoute>
          }
        />
        <Route
          path="/products/add"
          element={
            <PrivateRoute requiredRole={0}>
              <CreateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <PrivateRoute requiredRole={0}>
              <EditProduct />
            </PrivateRoute>
          }
        />


      </Routes>
    </BrowserRouter>
  );
};

export default App;









