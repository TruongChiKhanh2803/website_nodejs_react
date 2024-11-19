import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { productId } = useParams(); // Get the product ID from the URL
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
    }, [productId]); // Re-run when the productId changes

    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className="container">
            <div className="columns is-centered">
                {/* Product Image */}
                <div className="column is-half-tablet is-one-third-desktop">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src={product.image} alt={product.name} />
                            </figure>
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="column is-half-tablet is-two-thirds-desktop">
                    <div className="card">
                        <div className="card-content">
                            <h3 className="title is-3">{product.name}</h3>
                            <p className="subtitle is-5">{product.price} VND</p>



                            {/* Add to Cart & Buy Now buttons */}
                            <div className="columns is-mobile is-vcentered">
                                <div className="column is-half">
                                    <button className="button is-primary is-fullwidth">
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                                <div className="column is-half">
                                    <button className="button is-success is-fullwidth">
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                            {/* Product Description */}
                            <p className="content">{product.description}</p>

                            {/* Optionally, you can add additional product details like ratings */}
                            <div className="content">
                                <h4 className="subtitle is-6">Đặc điểm nổi bật</h4>
                                <ul>
                                    <li><strong>Hãng:</strong> {product.category.name}</li>
                                    <li><strong>Màu sắc:</strong> {product.color}</li>
                                    {/* Add any other details you wish to display */}
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
