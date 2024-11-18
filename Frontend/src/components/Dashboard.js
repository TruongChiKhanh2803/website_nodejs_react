
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:6868/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/login");
            }
        }
    };


    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:6868/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });



    return (
        <div className='container mt-5'>
            <h1 className='title'>Chào mừng: {name}</h1>

        </div>
    );
};

export default Dashboard;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {

//     const [name, setName] = useState('');
//     const [token, setToken] = useState('');
//     const [expire, setExpire] = useState('');
//     const [users, setUsers] = useState([]);
//     const navigate = useNavigate();


//     useEffect(() => {
//         refreshToken();
//         getUsers();
//     }, []);

//     const refreshToken = async () => {
//         try {
//             const response = await axios.get('http://localhost:6868/token');
//             setToken(response.data.accessToken);
//             const decoded = jwtDecode(response.data.accessToken);
//             setName(decoded.name);
//             setExpire(decoded.exp);
//         } catch (error) {
//             if (error.response) {
//                 navigate("/");
//             }
//         }
//     }

//     const axiosJWT = axios.create();

//     axiosJWT.interceptors.request.use(async (config) => {
//         const currentDate = new Date();
//         if (expire * 1000 < currentDate.getTime()) {
//             const response = await axios.get('http://localhost:6868/token');
//             config.headers.Authorization = `Bearer ${response.data.accessToken}`;
//             setToken(response.data.accessToken);
//             const decoded = jwtDecode(response.data.accessToken);
//             setName(decoded.name);
//             setExpire(decoded.exp);
//         }
//         return config;
//     }, (error) => {
//         return Promise.reject(error);
//     });

//     const getUsers = async () => {
//         const response = await axiosJWT.get('http://localhost:6868/users', {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         setUsers(response.data);
//     }

//     return (
//         <div className='container mt-5'>
//             <h1 className='title'>Chào mừng: {name} </h1>
//             <button onClick={getUsers} className='button is-info'>Danh sách người dùng</button>
//             <table className='table is-striped is-fullwidth'>

//                 <thead>
//                     <tr>
//                         <th>id</th>
//                         <th>Họ tên</th>
//                         <th>Email</th>
//                     </tr>
//                 </thead>
//                 <tbody>

//                     {users.map((user, index) => {

//                         <tr key={user.id}>
//                             <th>{index + 1}</th>
//                             <th>{user.name}</th>
//                             <th>{user.email}</th>
//                         </tr>

//                     })}

//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default Dashboard


