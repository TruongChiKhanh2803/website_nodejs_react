import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [token, setToken] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:6868/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedData = {
                name,
                email,
                password: password || undefined, 
            };

            await axios.put(`http://localhost:6868/users/edit/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate('/users');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            } else {
                setMsg('An error occurred while updating the user.');
            }
        }
    };

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:6868/token');
            setToken(response.data.accessToken);
        } catch (error) {
            navigate('/login');
        }
    };

    useEffect(() => {
        refreshToken();
    }, []);

    return (
        <div>
            <section className="hero has-background-grey-light is-fullheight is-fullwidth">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-4-desktop">
                                <form onSubmit={handleSubmit} className="box">
                                    <p className='has-text-centered has-text-danger'>{msg}</p>
                                    <h1 className='columns is-centered mt-2'>Chỉnh sửa người dùng</h1>

                                    <div className="field mt-5">
                                        <label className="label">Họ tên</label>
                                        <div className="controls">
                                            <input
                                                type="text"
                                                className="input"
                                                placeholder="Enter full name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <label className="label">Email</label>
                                        <div className="controls">
                                            <input
                                                type="email"
                                                className="input"
                                                placeholder="Enter email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <label className="label">Mật khẩu mới </label>
                                        <div className="controls">
                                            <input
                                                type="password"
                                                className="input"
                                                placeholder="Để trống nếu không cần thay đổi"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <button className="button is-success is-fullwidth">Cập nhật</button>
                                    </div>
                                    <div className="has-text-centered mt-4">
                                        <p><a href="/users" className="has-text-link">Quay lại</a></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EditUser;
