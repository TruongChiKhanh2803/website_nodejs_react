import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditNews = () => {
    const { NewsID } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [msg, setMsg] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await axios.get(`http://localhost:6868/news/${NewsID}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTitle(response.data.news.Title);
                setContent(response.data.news.Content);
            } catch (error) {
                setMsg("Không thể tải tin tức.");
            }
        };

        if (NewsID && token) {
            fetchNewsData();
        }
    }, [NewsID, token]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                Title: title,
                Content: content,
            };

            await axios.put(`http://localhost:6868/news/edit/${NewsID}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate('/news');
        } catch (error) {
            setMsg('Có lỗi khi cập nhật tin tức.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Chỉnh sửa tin tức</h2>
            {msg && (
                <p className="notification is-danger has-text-centered">
                    {msg}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Tiêu đề</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Nhập tiêu đề tin tức"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Nội dung</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            placeholder="Nhập nội dung tin tức"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button className="button is-success">
                            Cập nhật tin tức
                        </button>
                        <p><a href="/news" className="has-text-link">Quay lại</a></p>

                    </div>
                </div>
            </form>
        </div>
        // <div>
        //     <section className="hero has-background-grey-lighter is-fullheight is-fullwidth">
        //         <div className="hero-body">
        //             <div className="container">
        //                 <div className="columns is-centered">
        //                     <div className="column is-6-desktop">
        //                         <form onSubmit={handleSubmit} className="box">
        //                             <h1 className="title has-text-centered has-text-black">Chỉnh sửa tin tức</h1>
        //                             {msg && (
        //                                 <p className="notification is-danger has-text-centered">
        //                                     {msg}
        //                                 </p>
        //                             )}

        //                             <div className="field">
        //                                 <label className="label">Tiêu đề</label>
        //                                 <div className="control">
        //                                     <input
        //                                         type="text"
        //                                         className="input"
        //                                         placeholder="Nhập tiêu đề"
        //                                         value={title}
        //                                         onChange={(e) => setTitle(e.target.value)}
        //                                         required
        //                                     />
        //                                 </div>
        //                             </div>

        //                             <div className="field">
        //                                 <label className="label">Nội dung</label>
        //                                 <div className="control">
        //                                     <textarea
        //                                         className="textarea"
        //                                         placeholder="Nhập nội dung"
        //                                         value={content}
        //                                         onChange={(e) => setContent(e.target.value)}
        //                                         required
        //                                     ></textarea>
        //                                 </div>
        //                             </div>

        //                             <div className="field">
        //                                 <button className="button is-success is-fullwidth">
        //                                     Cập nhật
        //                                 </button>
        //                             </div>

        //                             <div className="has-text-centered mt-4">
        //                                 <a href="/news" className="button is-light">Quay lại</a>
        //                             </div>
        //                         </form>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        // </div>

    );
};

export default EditNews;
