import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [msg, setMsg] = useState('');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:6868/categories');
            setCategories(response.data);
        } catch (error) {
            console.error("Không tìm nạp được danh mục:", error);
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:6868/products', {
                name: name,
                description: description,
                price: price,
                stock: stock,
                categoryId: categoryId
            });
            navigate("/products");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.message);
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
                                <form onSubmit={addProduct} className="box">
                                    <p className="has-text-centered">{msg}</p>

                                    <h1 className="columns is-centered mt-2">Thêm sản phẩm</h1>

                                    <div className="field mt-5">
                                        <label className="label">Tên sản phẩm</label>
                                        <div className="controls">
                                            <input
                                                type="text"
                                                className="input"
                                                placeholder="Nhập tên sản phẩm"
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
                                                placeholder="Nhập mô tả sản phẩm"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <label className="label">Giá</label>
                                        <div className="controls">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Nhập giá sản phẩm"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <label className="label">Số lượng</label>
                                        <div className="controls">
                                            <input
                                                type="number"
                                                className="input"
                                                placeholder="Nhập số lượng sản phẩm"
                                                value={stock}
                                                onChange={(e) => setStock(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <label className="label">Danh mục</label>
                                        <div className="controls">
                                            <select
                                                className="input"
                                                value={categoryId}
                                                onChange={(e) => setCategoryId(e.target.value)}
                                                required
                                            >
                                                <option value="">Chọn danh mục</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <button className="button is-success is-fullwidth">Lưu</button>
                                    </div>

                                    <div className="has-text-centered mt-4">
                                        <p><a href="/products" className="has-text-link">Quay lại</a></p>
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

export default AddProduct;
