import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const AddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:6868/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate("/users");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    return (
        <div>
            <section className="hero has-background-grey-light is-fullheight is-fullwidth">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-4-desktop">
                                <form onSubmit={AddUser} className="box">

                                    <p className='has-text-centered'>{msg}</p>

                                    <h1 className='columns is-centered mt-2'>Thêm người dùng</h1>

                                    <div className="field mt-5">
                                        <label className="label">Họ tên</label>
                                        <div className="controls">
                                            <input type="text" className="input" placeholder="Nhập họ tên" value={name} onChange={(e) => setName(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <label className="label">Email</label>
                                        <div className="controls">
                                            <input type="text" className="input" placeholder="Nhập địa chỉ email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <label className="label">Mật khẩu</label>
                                        <div className="controls">
                                            <input type="password" className="input" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <label className="label">Nhập lại mật khẩu</label>
                                        <div className="controls">
                                            <input type="password" className="input" placeholder="Nhập lại mật khẩu" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <button className="button is-success is-fullwidth">Lưu</button>
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

export default AddUser;
