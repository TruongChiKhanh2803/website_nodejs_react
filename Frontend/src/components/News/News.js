import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const News = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getNews();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:6868/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/login");
            }
        }
    };

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:6868/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getNews = async () => {
        try {
            const response = await axios.get('http://localhost:6868/news', {
                headers: {
                    Authorization: `Bearer ${token}`, // Gửi token trong header
                },
            });

            // Kiểm tra nếu response.data.news là mảng
            if (Array.isArray(response.data.news)) {
                setNews(response.data.news); // Cập nhật tin tức
            } else {
                console.error("Dữ liệu 'news' không phải là mảng:", response.data.news);
            }
        } catch (error) {
            console.error("Không tải được tin tức:", error);
            alert("Lỗi khi tải tin tức!");
        }
    };

    const viewNewsDetails = async (NewsID) => {
        try {
            const token = localStorage.getItem('accessToken'); // Retrieve the JWT token from localStorage
            const response = await axios.get(`http://localhost:6868/news/${NewsID}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Extract data from response
            const { Title, Content, ImageURL, CreatedAt, UpdatedAt, Status } = response.data.news;

            // Prepare a message for alert
            const newsDetails = `
                Tiêu đề: ${Title}
                Nội dung: ${Content}
                ${ImageURL ? `Hình ảnh: ${ImageURL}` : ''}
                Trạng thái: ${Status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
            `;

            // Show the details in the alert
            alert(newsDetails);

        } catch (error) {
            console.error("Lỗi tải dữ liệu tin tức:", error);
        }
    };

    const editNews = (NewsID) => {
        if (!token) {
            alert("Vui lòng đăng nhập để chỉnh sửa tin tức.");
            return;
        }
        navigate(`/news/edit/${NewsID}`, {
            state: { token },
        });
    };

    const deleteNews = async (NewsID) => {
        try {
            await axiosJWT.delete(`http://localhost:6868/news/${NewsID}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Đã xóa tin tức thành công!');
            getNews(); // Reload tin tức sau khi xóa
        } catch (error) {
            console.error("Lỗi xóa tin tức:", error);
        }
    };

    const addNews = () => {
        navigate('/news/add');
    };

    return (
        <div className='container mt-5'>
            <div className='mt-5'>
                <button
                    onClick={addNews}
                    className='button is-success'
                    style={{ marginBottom: '20px' }}
                >
                    Thêm tin tức
                </button>
            </div>

            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {news && news.length > 0 ? (
                        news.map((newsItem, index) => (
                            <tr key={newsItem.NewsID}>
                                <th>{index + 1}</th>
                                <td>{newsItem.Title}</td>
                                <td>{newsItem.Content.substring(0, 50)}...</td>
                                <td>
                                    <button
                                        onClick={() => viewNewsDetails(newsItem.NewsID)}
                                        className='button is-small is-primary mr-2'
                                    >
                                        Xem chi tiết
                                    </button>
                                    <button
                                        onClick={() => editNews(newsItem.NewsID)}
                                        className='button is-small is-warning mr-2'
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        onClick={() => deleteNews(newsItem.NewsID)}
                                        className='button is-small is-danger'
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Không có tin tức</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default News;
