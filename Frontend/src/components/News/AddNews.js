import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNews = () => {
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    // Hàm gửi yêu cầu thêm tin tức
    const handleAddNews = async (e) => {
        e.preventDefault(); // Ngừng reload trang

        try {
            if (!Title || !Content) {
                alert("Vui lòng nhập đầy đủ thông tin!");
                return;
            }
            await axios.post(
                'http://localhost:6868/news',
                { Title: Title, Content: Content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            alert("Thêm tin tức thành công!");
            navigate('/news');
        } catch (error) {
            console.error("Lỗi khi thêm tin tức:", error);
            alert("Không thể thêm tin tức. Vui lòng thử lại.");
        }
    };

    // Dùng useEffect để lấy token khi component được render
    React.useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            setToken(storedToken);
        } else {
            navigate("/login"); // Nếu không có token, chuyển hướng đến trang đăng nhập
        }
    }, [navigate]); // Thêm navigate vào dependencies

    return (
        <div className="container mt-5">
            <h2>Thêm tin tức mới</h2>
            <form onSubmit={handleAddNews}>
                <div className="field">
                    <label className="label">Tiêu đề</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Nhập tiêu đề tin tức"
                            value={Title}
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
                            value={Content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button className="button is-success">
                            Lưu
                        </button>
                        <p><a href="/news" className="has-text-link">Quay lại</a></p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddNews;


