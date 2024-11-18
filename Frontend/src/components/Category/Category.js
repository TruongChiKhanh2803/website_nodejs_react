import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getCategories();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:6868/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
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
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getCategories = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:6868/categories', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories(response.data);
        } catch (error) {
            console.error("Không tìm nạp được danh mục:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosJWT.delete(`http://localhost:6868/categories/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(categories.filter((category) => category.id !== id));
        } catch (error) {
            console.error("Lỗi xóa danh mục:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/categories/edit/${id}`);
    };

    const handleAdd = () => {
        navigate('/categories/add');
    };

    return (
        <div className="container mt-5">
            <div className="mt-5">
                <button
                    onClick={handleAdd}
                    className="button is-success"
                    style={{ marginBottom: '20px' }}
                >
                    Thêm danh mục
                </button>
            </div>

            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Mô tả</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category.id}>
                            <th>{index + 1}</th>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(category.id)}
                                    className="button is-small is-warning mr-2"
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="button is-small is-danger"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
