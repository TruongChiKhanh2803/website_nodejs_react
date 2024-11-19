import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [msg, setMsg] = useState("");
    const [token, setToken] = useState("");
    const { id } = useParams(); // Get category ID from URL
    const navigate = useNavigate();

    // Fetch category data by ID when token or category ID changes
    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await axios.get(`http://localhost:6868/categories/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setName(response.data.name);
                setDescription(response.data.description);
            } catch (error) {
                console.error("Error fetching category data:", error);
                setMsg("Category not found");
            }
        };

        // Fetch data only if token is available and category ID is valid
        if (token && id) {
            fetchCategoryData();
        }
    }, [token, id]);  // Add both token and id to the dependency array

    // Handle form submission to update category
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedCategory = {
                name,
                description
            };

            await axios.put(`http://localhost:6868/categories/${id}`, updatedCategory, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate("/categories"); // Redirect after successful update
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            } else {
                setMsg("An error occurred while updating the category.");
            }
        }
    };

    // Fetch new access token
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

    return (
        <div>
            <section className="hero has-background-grey-light is-fullheight is-fullwidth">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-4-desktop">
                                <form onSubmit={handleSubmit} className="box">
                                    <p className="has-text-centered has-text-danger">{msg}</p>
                                    <h1 className="columns is-centered mt-2">Chỉnh sửa Danh mục</h1>

                                    <div className="field mt-5">
                                        <label className="label">Tên Danh mục</label>
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
                                                placeholder="Nhập mô tả danh mục"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="field mt-5">
                                        <button className="button is-success is-fullwidth">Cập nhật</button>
                                    </div>
                                    <div className="has-text-centered mt-4">
                                        <p><a href="/categories" className="has-text-link">Quay lại</a></p>
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

export default EditCategory;
