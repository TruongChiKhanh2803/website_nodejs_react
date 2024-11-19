import React from "react";

const Cart = () => {
    const cartItems = [
        { id: 1, name: "Product 1", price: 100, quantity: 2 },
        { id: 2, name: "Product 2", price: 150, quantity: 1 },
        { id: 3, name: "Product 3", price: 200, quantity: 3 },
    ];

    const handleIncrease = (id) => {
        console.log("Increase quantity for product ID:", id);
    };

    const handleDecrease = (id) => {
        console.log("Decrease quantity for product ID:", id);
    };

    const handleRemove = (id) => {
        console.log("Remove product ID:", id);
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="container">
            <h1 className="title is-3">Giỏ hàng của bạn</h1>
            <table className="table is-fullwidth is-striped">
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng cộng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price.toLocaleString()} VND</td>
                            <td>
                                <div className="buttons">
                                    <button
                                        className="button is-small"
                                        onClick={() => handleDecrease(item.id)}
                                    >
                                        -
                                    </button>
                                    <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                                    <button
                                        className="button is-small"
                                        onClick={() => handleIncrease(item.id)}
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                            <td>
                                <button
                                    className="button is-danger is-small"
                                    onClick={() => handleRemove(item.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="has-text-right">
                <h2 className="title is-4">
                    Tổng giá: {calculateTotalPrice().toLocaleString()} VND
                </h2>
                <button className="button is-primary">Thanh toán</button>
            </div>
        </div>
    );
};

export default Cart;
