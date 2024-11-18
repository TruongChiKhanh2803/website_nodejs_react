import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const NavbarUser = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            setName(decodedToken.name);
        } catch (error) {
            console.error("Invalid token:", error);
            navigate("/login");
        }
    }, [navigate]);

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:6868/logout', { withCredentials: true });
            localStorage.removeItem('accessToken');
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error.response?.data || error.message);
        }
    };

    const navigateToProfile = () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate("/login");
            return;
        }

        const decodedToken = jwtDecode(token);
        navigate(`/users/editprofile/${decodedToken.userId}`);
    };

    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className='container'>
                <div className="navbar-brand">
                    <a className="navbar-item" href="#">
                        <img src="#" alt="LOGO" width="112" height="28" />
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href='/danhmuc' className="navbar-item">
                            Danh mục
                        </a>
                        <a href='/sanpham' className="navbar-item">
                            Sản phẩm
                        </a>
                        <a href='/donhang' className="navbar-item">
                            Lịch sử mua hàng
                        </a>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <h1 className="title is-5" style={{ color: 'blue' }}>
                                Xin chào, {name}!
                            </h1>
                        </div>

                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={navigateToProfile} className="button is-light">
                                    Hồ sơ
                                </button>
                                <button onClick={Logout} className="button is-light">
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarUser;
