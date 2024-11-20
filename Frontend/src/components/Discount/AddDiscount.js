import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDiscount = () => {
    const [code, setCode] = useState('');
    const [discountRate, setDiscountRate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the discount data to the backend
            await axios.post('http://localhost:6868/discounts', {
                code,
                discountRate,
                expiryDate
            });
            alert('Đã thêm giảm giá thành công!');
            navigate('/discounts');
        } catch (error) {
            console.error('Lỗi khi thêm giảm giá:', error);
            alert('Lỗi khi thêm giảm giá');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Thêm mã giảm giá</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Mã giảm giá</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Nhập mã giảm giá"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Tỷ lệ giảm giá (%)</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            placeholder="Nhập tỷ lệ giảm giá"
                            value={discountRate}
                            onChange={(e) => setDiscountRate(e.target.value)}
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

                <div className="control">
                    <button className="button is-primary">Thêm giảm giá</button>
                </div>
            </form>
        </div>
    );
};

export default AddDiscount;
