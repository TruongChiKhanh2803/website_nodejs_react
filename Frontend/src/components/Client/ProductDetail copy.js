import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:6868/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetail();
    }, [productId]);

    if (!product) {
        return <p>Loading product details...</p>;
    }


    const addToCart = (product) => {
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        const existingItem = storedCart.find((item) => item.id === product.id);

        if (existingItem) {
            // Tăng số lượng nếu sản phẩm đã có trong giỏ hàng
            const updatedCart = storedCart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        } else {
            // Thêm sản phẩm mới vào giỏ hàng
            const updatedCart = [...storedCart, { ...product, quantity: 1 }];
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        }

        alert(`${product.name} đã được thêm vào giỏ hàng!`);
    };

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-half-tablet is-one-third-desktop">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src={product.image} alt={product.name} />
                            </figure>
                        </div>
                    </div>
                </div>

                <div className="column is-half-tablet is-two-thirds-desktop">
                    <div className="card">
                        <div className="card-content">
                            <h3 className="title is-3">{product.name}</h3>
                            <p className="subtitle is-5">{product.price} VND</p>



                            <div className="columns is-mobile is-vcentered">
                                <div className="column is-half">
                                    <button className="button is-info"
                                        style={{ width: '100%', padding: '0.70rem' }}
                                        onClick={() => addToCart(product)}>
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                                <div className="column is-half">
                                    <button className="button is-success is-fullwidth">
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                            <p className="content">{product.description}</p>

                            <div className="content">
                                <h4 className="subtitle is-6">Đặc điểm nổi bật</h4>
                                <ul>
                                    <li><strong>Hãng:</strong> {product.category.name}</li>
                                    <li><strong>Màu sắc:</strong> {product.color}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
