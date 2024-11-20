import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const News = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllNews = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get('http://localhost:6868/news', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.news) {
                    setNews(response.data.news);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
                setError('Lỗi khi tải danh sách tin tức.');
            }
        };

        fetchAllNews();
    }, [navigate]);



    return (
        <div className="container mt-5">
            <h2 className="title">Danh sách Tin tức</h2>

            {error && <div className="notification is-danger">{error}</div>}

            <div className="news-list">
                {news.length === 0 ? (
                    <p>Hiện chưa có tin tức nào.</p>
                ) : (
                    <div className="columns is-multiline">
                        {news.map((item) => (
                            <div key={item.NewsID} className="column is-one-third">
                                <div className="card">
                                    {item.ImageURL && (
                                        <div className="card-image">
                                            <figure className="image is-4by3">
                                                <img src={item.ImageURL} alt={item.Title} />
                                            </figure>
                                        </div>
                                    )}
                                    <div className="card-content">
                                        <p className="title is-4">{item.Title}</p>
                                        <div className="content">
                                            {item.Content.length > 100
                                                ? `${item.Content.slice(0, 100)}...`
                                                : item.Content}
                                        </div>
                                    </div>

                                    <footer className="card-footer">
                                        <button
                                            className="card-footer-item button is-link"
                                            onClick={() => navigate(`${item.NewsID}`)}
                                        >
                                            Xem chi tiết
                                        </button>
                                    </footer>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;
