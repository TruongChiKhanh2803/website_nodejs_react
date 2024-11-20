// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const NewsDetail = () => {
//     const { NewsID } = useParams(); // Lấy NewsID từ URL
//     const [news, setNews] = useState(null); // Lưu trữ thông tin chi tiết tin tức
//     const [error, setError] = useState(''); // Lưu trữ thông báo lỗi
//     const navigate = useNavigate(); // Sử dụng để điều hướng

//     useEffect(() => {
//         const fetchNewsDetail = async () => {
//             try {
//                 const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage
//                 if (!token) {
//                     navigate("/login"); // Chuyển hướng về login nếu không có token
//                     return;
//                 }

//                 const response = await axios.get(`http://localhost:6868/news/${NewsID}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.data.news) {
//                     setNews(response.data.news); // Lưu chi tiết tin tức vào state
//                 } else {
//                     setError('Không tìm thấy tin tức.');
//                 }
//             } catch (error) {
//                 console.error('Lỗi khi tải chi tiết tin tức:', error);
//                 setError('Lỗi khi tải chi tiết tin tức.');
//             }
//         };

//         fetchNewsDetail();
//     }, [NewsID, navigate]);

//     return (
//         <div className="container mt-5">
//             {error && (
//                 <div className="notification is-danger">{error}</div>
//             )}

//             {!error && news && (
//                 <div className="box">
//                     <h1 className="title is-3">{news.Title}</h1>
//                     {news.ImageURL && (
//                         <figure className="image is-16by9">
//                             <img src={news.ImageURL} alt={news.Title} />
//                         </figure>
//                     )}
//                     <div className="content mt-4">
//                         <p>{news.Content}</p>
//                     </div>

//                     <button
//                         className="button is-link"
//                         onClick={() => navigate(-1)}
//                     >
//                         Quay lại
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default NewsDetail;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewsDetail = () => {
    const { NewsID } = useParams();
    const [news, setNews] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get(`http://localhost:6868/news/${NewsID}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.news) {
                    console.log('CreatedAt:', response.data.news.CreatedAt);
                    setNews(response.data.news);
                } else {
                    setError('Không tìm thấy tin tức.');
                }
            } catch (error) {
                console.error('Lỗi khi tải chi tiết tin tức:', error);
                setError('Lỗi khi tải chi tiết tin tức.');
            }
        };

        fetchNewsDetail();
    }, [NewsID, navigate]);

    return (
        <div className="container mt-5">
            {error && (
                <div className="notification is-danger">{error}</div>
            )}

            {!error && news && (
                <div className="box">
                    <h1 className="title is-3">{news.Title}</h1>

                    {news.ImageURL && (
                        <figure className="image is-16by9">
                            <img src={news.ImageURL} alt={news.Title} />
                        </figure>
                    )}

                    <div className="content mt-4">
                        <p>{news.Content}</p>
                    </div>

                    <div className="content mt-4">
                        <strong>Ngày tạo:</strong>{' '}
                        {news.CreatedAt ? new Date(news.CreatedAt).toLocaleString('vi-VN') : 'Không xác định'}
                    </div>

                    <button
                        className="button is-link"
                        onClick={() => navigate(-1)}
                    >
                        Quay lại
                    </button>
                </div>
            )}
        </div>
    );
};

export default NewsDetail;

