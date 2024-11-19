import React, { useState } from "react";

const OrderHistory = () => {
    // Dữ liệu mẫu
    const sampleOrders = [
        {
            orderId: "DH001",
            orderDate: "2024-11-10",
            totalPrice: 500000,
            status: "Đã giao hàng",
            items: [
                { productName: "Điện thoại Samsung Galaxy S21", quantity: 1, price: 250000 },
                { productName: "Ốp lưng điện thoại", quantity: 1, price: 50000 },
            ],
        },
        {
            orderId: "DH002",
            orderDate: "2024-11-15",
            totalPrice: 1200000,
            status: "Đang xử lý",
            items: [
                { productName: "Laptop Dell Inspiron 15", quantity: 1, price: 1200000 },
            ],
        },
    ];

    const [orders] = useState(sampleOrders);

    return (
        <div className="container">
            <h1 className="title is-3">Lịch sử mua hàng</h1>
            {orders.length === 0 ? (
                <p>Bạn chưa có đơn hàng nào.</p>
            ) : (
                <div className="table-container">
                    <table className="table is-striped is-fullwidth">
                        <thead>
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Ngày đặt hàng</th>
                                <th>Tổng giá trị</th>
                                <th>Trạng thái</th>
                                <th>Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.orderId}</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.totalPrice.toLocaleString()} VNĐ</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button
                                            className="button is-small is-info"
                                            onClick={() => alert(JSON.stringify(order.items, null, 2))}
                                        >
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
