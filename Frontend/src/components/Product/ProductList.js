import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getProducts();
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
            const decoded = jwtDecode(response.data.accessToken);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getProducts = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:6868/products', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error("Không tìm nạp được sản phẩm:", error);
        }
    };

    const viewProductDetails = async (productId) => {
        try {
            const response = await axiosJWT.get(`http://localhost:6868/products/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(`Chi tiết sản phẩm:\nTên: ${response.data.name}\nMô tả: ${response.data.description}\nGiá: ${response.data.price}\nSố lượng: ${response.data.stock}`);
        } catch (error) {
            console.error("Lỗi tải dữ liệu sản phẩm:", error);
        }
    };

    const editProduct = (productId) => {
        if (!token) {
            alert("Vui lòng đăng nhập để chỉnh sửa sản phẩm.");
            return;
        }
        navigate(`/products/edit/${productId}`, {
            state: { token },
        });
    };

    const deleteProduct = async (productId) => {
        try {
            await axiosJWT.delete(`http://localhost:6868/products/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Đã xóa sản phẩm thành công!');
            getProducts();
        } catch (error) {
            console.error("Lỗi xóa sản phẩm:", error);
        }
    };

    const addProduct = () => {
        navigate('/products/add');
    };

    return (
        <div className='container mt-5'>
            <div className='mt-5'>
                <button
                    onClick={addProduct}
                    className='button is-success'
                    style={{ marginBottom: '20px' }}
                >
                    Thêm sản phẩm
                </button>
            </div>

            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <th>{index + 1}</th>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <button
                                    onClick={() => viewProductDetails(product.id)}
                                    className='button is-small is-primary mr-2'
                                >
                                    Xem chi tiết
                                </button>
                                <button
                                    onClick={() => editProduct(product.id)}
                                    className='button is-small is-warning mr-2'
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() => deleteProduct(product.id)}
                                    className='button is-small is-danger'
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

export default ProductList;
