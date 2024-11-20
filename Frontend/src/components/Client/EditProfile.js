import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const EditProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    navigate("/login");
                    return;
                }

                const decodedToken = jwtDecode(token);

                if (parseInt(decodedToken.userId) !== parseInt(id)) {
                    navigate("/");
                    return;
                }

                const response = await axios.get(`http://localhost:6868/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (error) {
                console.error(error);
                setMsg("Lỗi khi tải thông tin.");
            }
        };

        fetchProfile();
    }, [id, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            await axios.put(
                `http://localhost:6868/users/editprofile/${id}`,
                { name, email, password },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMsg("Cập nhật thông tin thành công!");
        } catch (error) {
            console.error(error);
            setMsg(error.response?.data?.msg || "Cập nhật thất bại.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Chỉnh sửa hồ sơ</h2>
            <form onSubmit={handleUpdate}>
                <div className="field">
                    <label className="label">Họ tên</label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            type="email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Mật khẩu</label>
                    <div className="control">
                        <input
                            type="password"
                            className="input"
                            value={password}
                            placeholder="Để trống nếu không cần thay đổi"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                {msg && <p>{msg}</p>}

                <div className="field">
                    <button type="submit" className="button is-success">
                        Cập nhật
                    </button>
                    <span><a href="/" className="has-text-link has-text ml-4">Quay lại</a></span>
                </div>

            </form>
        </div>
    );
};

export default EditProfile;
