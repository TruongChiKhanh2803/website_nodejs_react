import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [msg, setMsg] = useState('');
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState('');
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();

    // Fetch categories data
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get('http://localhost:6868/categories');
                setCategories(response.data);
            } catch (error) {
                console.error("Không tìm nạp được danh mục:", error);
            }
        };

        getCategories();
    }, []);

    // Fetch product data by ID
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`http://localhost:6868/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const product = response.data;
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setStock(product.stock);
                setCategoryId(product.categoryId);
            } catch (error) {
                console.error("Không tìm thấy sản phẩm:", error);
                setMsg("Sản phẩm không tồn tại");
            }
        };

        if (token && id) {
            fetchProductData();
        }
    }, [token, id]);

    // Fetch new access token if needed
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:6868/token');
            setToken(response.data.accessToken);
        } catch (error) {
            navigate('/login');
        }
    };

    useEffect(() => {
        refreshToken(); // Get token when the component mounts
    }, []);

    // Handle form submission to update product
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedProduct = {
                name,
                description,
                price,
                stock,
                categoryId
            };

            await axios.put(`http://localhost:6868/products/edit/${id}`, updatedProduct, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate("/products"); // Redirect after successful update
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.message);
            } else {
                setMsg("Đã có lỗi xảy ra khi cập nhật sản phẩm.");
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
                                    <p className="has-text-centered has-text-danger">{msg}</p>
                                    <h1 className="columns is-centered mt-2">Chỉnh sửa sản phẩm</h1>

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
                                        <button className="button is-success is-fullwidth">Cập nhật</button>
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

export default EditProduct;
