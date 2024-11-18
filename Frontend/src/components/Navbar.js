import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Navbar = () => {

    const navigate = useNavigate();
    // const Logout = async () => {
    //     try {
    //         await axios.delete('http://loaclhost:6868/logout');
    //         navigate("/");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:6868/logout', { withCredentials: true });
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error.response?.data || error.message);
        }
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
                        <a href='/dashboard' className="navbar-item">
                            Dashboard
                        </a>
                    </div>

                    <div className="navbar-start">
                        <a href='/danhmuc' className="navbar-item">
                            Danh mục
                        </a>
                    </div> <div className="navbar-start">
                        <a href='/sanpham' className="navbar-item">
                            Sản phẩm
                        </a>
                    </div>
                    <div className="navbar-start">
                        <a href='/donhang' className="navbar-item">
                            Đơn hàng
                        </a>
                    </div> <div className="navbar-start">
                        <a href='/users' className="navbar-item">
                            Người dùng
                        </a>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
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
}

export default Navbar;