import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:6868/categories', {
                name: name,
                description: description,
            });
            navigate('/categories');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            } else {
                setMsg('Lỗi hệ thống, vui lòng thử lại sau!');
            }
        }
    };

    return (
        <div>
            <section className="hero has-background-grey-light is-fullheight is-fullwidth">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-4-desktop">
                                <form onSubmit={handleSubmit} className="box">

                                    <p className="has-text-centered">{msg}</p>

                                    <h1 className="columns is-centered mt-2">Thêm danh mục</h1>

                                    <div className="field mt-5">
                                        <label className="label">Tên danh mục</label>
                                        <div className="controls">
                                            <input
                                                type="text"
                                                className="input"
                                                placeholder="Nhập tên danh mục"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <label className="label">Mô tả</label>
                                        <div className="controls">
                                            <textarea
                                                className="textarea"
                                                placeholder="Nhập mô tả"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <button className="button is-success is-fullwidth">Lưu</button>
                                    </div>

                                    <div className="has-text-centered mt-4">
                                        <p>
                                            <a href="/categories" className="has-text-link">Quay lại</a>
                                        </p>
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

export default AddCategory;
