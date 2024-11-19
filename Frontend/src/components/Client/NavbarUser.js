import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const NavbarUser = () => {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setName(decodedToken.name);
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Invalid token:", error);
                setIsLoggedIn(false);
            }
        }


        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:6868/categories');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleOrderHistoryClick = () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            navigate('/lichsumuahang');
        } else {
            navigate('/login');
        }
    };

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:6868/logout', { withCredentials: true });
            localStorage.removeItem('accessToken');
            setIsLoggedIn(false);
            setName('');
            navigate("/");
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

    const handleCategoryClick = (categoryId) => {
        navigate(`/categories/${categoryId}`);
        setIsDropdownOpen(false);
    };

    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="#">
                        <img src="#" alt="LOGO" width="112" height="28" />
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                Danh mục
                            </a>

                            {isDropdownOpen && (
                                <div className="navbar-dropdown is-boxed">
                                    {categories.map(category => (
                                        <a
                                            key={category.id}
                                            className="navbar-item"
                                            onClick={() => handleCategoryClick(category.id)}
                                        >
                                            {category.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <a href='/sanpham' className="navbar-item">
                            Sản phẩm
                        </a>
                        <a className="navbar-item" onClick={handleOrderHistoryClick}>
                            Lịch sử mua hàng
                        </a>
                    </div>

                    <div className="navbar-end">
                        {isLoggedIn ? (
                            <>
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
                            </>
                        ) : (
                            <div className="navbar-item">
                                <button onClick={() => navigate('/login')} className="button is-primary">
                                    Đăng nhập
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarUser;

