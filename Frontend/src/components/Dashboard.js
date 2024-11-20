
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
//                 navigate("/login");
//             }
//         }
//     };


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



//     return (
//         <div className='container mt-5'>
//             <h1 className='title'>Chào mừng: {name}</h1>

//         </div>
//     );
// };

// export default Dashboard;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        fetchStats();
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

    const fetchStats = async () => {
        try {
            const [usersRes, productsRes, ordersRes] = await Promise.all([
                axios.get('http://localhost:6868/stats/users'),
                axios.get('http://localhost:6868/stats/products'),
                axios.get('http://localhost:6868/stats/orders'),
            ]);
            setStats({
                users: usersRes.data.totalUsers,
                products: productsRes.data.totalProducts,
                orders: ordersRes.data.totalOrders,
            });
        } catch (error) {
            console.error("Error fetching stats:", error);
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
            <div className='columns mt-5'>
                <div className='column'>
                    <div className='box has-text-centered'>
                        <h2 className='title is-4'>Người dùng</h2>
                        <p className='title is-2'>{stats.users}</p>
                    </div>
                </div>
                <div className='column'>
                    <div className='box has-text-centered'>
                        <h2 className='title is-4'>Sản phẩm</h2>
                        <p className='title is-2'>{stats.products}</p>
                    </div>
                </div>
                <div className='column'>
                    <div className='box has-text-centered'>
                        <h2 className='title is-4'>Đơn hàng</h2>
                        <p className='title is-2'>{stats.orders}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

