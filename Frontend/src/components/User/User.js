
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const User = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUsers();
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

    const getUsers = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:6868/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Không tìm nạp được người dùng:", error);
        }
    };


    const viewUserDetails = async (userId) => {
        try {
            const response = await axiosJWT.get(`http://localhost:6868/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const role = response.data.role === 0 ? 'Quản trị viên' : 'Người dùng';
            alert(`Chi tiết người dùng:\nHọ tên: ${response.data.name}\nEmail: ${response.data.email}\nQuyền truy cập: ${role}`);
            // alert(`Chi tiết người dùng:\nHọ tên: ${response.data.name}\nEmail: ${response.data.email}\nQuyền truy cập: ${response.data.role}`);
        } catch (error) {
            console.error("Lỗi tải dữ liệu người dùng:", error);
        }
    };

    const editUser = (userId) => {
        if (!token) {
            alert("Vui lòng đăng nhập để chỉnh sửa thông tin người dùng.");
            return;
        }
        navigate(`/users/edit/${userId}`, {
            state: { token }, 
        });
    };

    const deleteUser = async (userId) => {
        try {
            await axiosJWT.delete(`http://localhost:6868/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Đã xóa người dùng thành công!');
            getUsers(); 
        } catch (error) {
            console.error("Lỗi xóa người dùng:", error);
        }
    };

    const AddUser = () => {
        navigate('/users/add');
    };

    return (
        <div className='container mt-5'>

            <div className='mt-5'>
                <button
                    onClick={AddUser}
                    className='button is-success'
                    style={{ marginBottom: '20px' }}
                >
                    Thêm người dùng
                </button>
            </div>

            <table className='table is-striped is-fullwidth'>

                <thead>
                    <tr>
                        <th>id</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <th>{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button
                                    onClick={() => viewUserDetails(user.id)}
                                    className='button is-small is-primary mr-2'
                                >
                                    Xem chi tiết
                                </button>
                                <button
                                    onClick={() => editUser(user.id)}
                                    className='button is-small is-warning mr-2'
                                >
                                    Chỉnh sửa
                                </button>
                                {/* <button
                                    onClick={() => deleteUser(user.id)}
                                    className='button is-small is-danger'
                                >
                                    Xóa
                                </button> */}

                                {user.role !== 0 && (
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className='button is-small is-danger'
                                    >
                                        Xóa
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;
