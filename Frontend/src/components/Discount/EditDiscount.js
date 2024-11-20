import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const EditDiscount = () => {
    const [code, setCode] = useState('');
    const [discountRate, setDiscountRate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [isActive, setIsActive] = useState(true); // Default to true for active
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = location.state;
    const discountId = location.pathname.split('/').pop();

    useEffect(() => {
        const getDiscount = async () => {
            try {
                const response = await axios.get(`http://localhost:6868/discounts/${discountId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCode(response.data.code);
                setDiscountRate(response.data.discountRate);

                // Format the expiryDate to 'YYYY-MM-DD' if it's not already
                const formattedExpiryDate = new Date(response.data.expiryDate).toISOString().split('T')[0];
                setExpiryDate(formattedExpiryDate);

                setIsActive(response.data.isActive); // Fetch the active status
            } catch (error) {
                console.error("Lỗi tải dữ liệu giảm giá:", error);
            }
        };
        getDiscount();
    }, [discountId, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:6868/discounts/edit/${discountId}`, {
                code,
                discountRate,
                expiryDate,
                isActive,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Đã cập nhật giảm giá thành công!');
            navigate('/discounts');
        } catch (error) {
            console.error('Lỗi khi cập nhật giảm giá:', error);
            alert('Lỗi khi cập nhật giảm giá');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Chỉnh sửa giảm giá</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Mã giảm giá</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Nhập mã giảm giá"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Giảm giá (%)</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            value={discountRate}
                            onChange={(e) => setDiscountRate(e.target.value)}
                            placeholder="Nhập tỷ lệ giảm giá"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Ngày hết hạn</label>
                    <div className="control">
                        <input
                            className="input"
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Kích hoạt</label>
                    <div className="control">
                        <label className="radio">
                            <input
                                type="radio"
                                name="isActive"
                                checked={isActive}
                                onChange={() => setIsActive(true)}
                            />
                            Kích hoạt
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                name="isActive"
                                checked={!isActive}
                                onChange={() => setIsActive(false)}
                            />
                            Không kích hoạt
                        </label>
                    </div>
                </div>

                <div className="control">
                    <button className="button is-primary">Cập nhật giảm giá</button>
                </div>
            </form>
        </div>
    );
};

export default EditDiscount;
