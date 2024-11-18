
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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<><NavbarUser /><Home /></>} />

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

        <Route path="users/editprofile/:id" element={<EditProfile />} />



      </Routes>
    </BrowserRouter>
  );
};

export default App;









// import React from 'react';
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Login from "./components/Login";
// import Register from "./components/Register";
// import Navbar from "./components/Navbar";
// import Dashboard from './components/Dashboard';
// import EditUser from './components/EditUser';


// const App = () => {
//   return (
//     <BrowserRouter>

//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
//         <Route path="/users/edit/:id" element={<EditUser />} />
//       </Routes>

//     </BrowserRouter>
//   );
// };

// export default App;


