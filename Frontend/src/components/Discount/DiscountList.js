import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const DiscountList = () => {
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [discounts, setDiscounts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    // Refresh the token to ensure the user is authenticated
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:6868/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setExpire(decoded.exp);
            getDiscounts(response.data.accessToken); // Fetch discounts after token is refreshed
        } catch (error) {
            if (error.response) {
                navigate("/login");
            }
        }
    };

    // Axios instance with token handling
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

    // Fetch the discounts from the backend
    const getDiscounts = async (accessToken) => {
        try {
            const response = await axiosJWT.get('http://localhost:6868/discounts', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setDiscounts(response.data);
        } catch (error) {
            console.error("Không tìm nạp được giảm giá:", error);
        }
    };

    // Edit discount function
    const editDiscount = (discountId) => {
        if (!token) {
            alert("Vui lòng đăng nhập để chỉnh sửa giảm giá.");
            return;
        }
        navigate(`/discounts/edit/${discountId}`, {
            state: { token },
        });
    };

    // Delete discount function
    const deleteDiscount = async (discountId) => {
        try {
            await axiosJWT.delete(`http://localhost:6868/discounts/${discountId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Đã xóa giảm giá thành công!');
            getDiscounts(token); // Reload the discounts after deleting
        } catch (error) {
            console.error("Lỗi xóa giảm giá:", error);
        }
    };

    // Add discount function (navigate to the add discount page)
    const addDiscount = () => {
        navigate('/discounts/add');
    };

    return (
        <div className='container mt-5'>
            <div className='mt-5'>
                <button
                    onClick={addDiscount}
                    className='button is-success'
                    style={{ marginBottom: '20px' }}
                >
                    Thêm giảm giá
                </button>
            </div>

            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Mã giảm giá</th>
                        <th>Giảm giá (%)</th>
                        <th>Ngày hết hạn</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {discounts.map((discount, index) => (
                        <tr key={discount.id}>
                            <th>{index + 1}</th>
                            <td>{discount.code}</td>
                            {/* Display the discount rate */}
                            <td>{discount.discountRate}</td>
                            {/* Display the expiry date */}
                            <td>{new Date(discount.expiryDate).toLocaleDateString()}</td>
                            <td>
                                <button
                                    onClick={() => editDiscount(discount.id)}
                                    className='button is-small is-warning mr-2'
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() => deleteDiscount(discount.id)}
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

export default DiscountList;
