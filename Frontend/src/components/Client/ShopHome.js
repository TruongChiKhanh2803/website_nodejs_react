
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';

import axios from "axios";

const ShopHome = () => {
    const [categories, setCategories] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:6868/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get("http://localhost:6868/products");
                setFeaturedProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchCategories();
        fetchFeaturedProducts();
    }, []);

    const handleCategoryClick = (categoryId) => {
        navigate(`/productpage?categoryId=${categoryId}`);
    };

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

    // const goToCart = () => {
    //     navigate("/cart", { state: { cartItems } });
    // };



    return (
        <div>
            {/* Banner */}
            <div className="section">
                <div className="container">
                    <div
                        className="box has-text-centered"
                        style={{
                            backgroundColor: "#e3f2fd",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                        }}
                    >
                        <h1 className="title is-3" style={{ color: "#1e88e5" }}>
                            Chào mừng đến với Shop Điện Thoại!
                        </h1>
                        <p className="subtitle" style={{ color: "#546e7a" }}>
                            Khám phá những sản phẩm công nghệ hiện đại nhất.
                        </p>
                        <button className="button is-info is-large" onClick={() => navigate("/productpage")}>
                            Xem ngay
                        </button>
                    </div>
                </div>
            </div>

            {/* Danh mục sản phẩm */}
            <div className="section">
                <div className="container">
                    <h2 className="title is-4" style={{ color: "#1565c0" }}>
                        Danh mục sản phẩm
                    </h2>
                    <div className="columns is-multiline">
                        {categories.map((category) => (
                            <div key={category.id} className="column is-4"> {/* Each category takes up 4/12 of the space */}
                                <div
                                    className="box has-text-centered"
                                    style={{
                                        backgroundColor: "#f5f5f5",
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        transition: "transform 0.2s ease",
                                    }}
                                >
                                    <h3 className="title is-5" style={{ color: "#1e88e5" }}>
                                        {category.name}
                                    </h3>
                                    <button
                                        className="button is-info"
                                        onClick={() => handleCategoryClick(category.id)}
                                    >
                                        Khám phá
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="section">
                <div className="container">
                    <h2 className="title is-4" style={{ color: "#1565c0" }}>
                        Sản phẩm nổi bật
                    </h2>
                    {loading ? (
                        <div className="has-text-centered">Đang tải sản phẩm...</div>
                    ) : (
                        <div className="columns is-multiline">
                            {featuredProducts.map((product) => (
                                <div key={product.id} className="column is-3">
                                    <div
                                        className="card"
                                        style={{
                                            border: "1px solid #ddd",
                                            borderRadius: "8px",
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "100%", // Ensures card takes full height of its container
                                        }}
                                    >
                                        <div className="card-image">
                                            <figure className="image is-4by3">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    style={{
                                                        borderRadius: "8px 8px 0 0",
                                                        objectFit: "cover", // Ensures the image fills its container
                                                        height: "200px", // Fixed height for consistency
                                                    }}
                                                />
                                            </figure>
                                        </div>
                                        <div className="card-content has-text-centered" style={{ flexGrow: 1 }}>
                                            <h3
                                                className="title is-5"
                                                style={{
                                                    color: "#424242",
                                                    fontSize: "1rem", // Adjust font size for consistency
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap", // Prevent text from overflowing
                                                    maxWidth: "100%", // Ensure text doesn't overflow the card
                                                }}
                                            >
                                                {product.name}
                                            </h3>
                                            <p className="subtitle is-6" style={{ color: "#757575" }}>
                                                {product.price.toLocaleString()} VND
                                            </p>
                                            {/* <button
                                                className="button is-link"
                                                style={{
                                                    minHeight: "40px", // Ensures button has a consistent height
                                                    display: "flex",
                                                    alignItems: "center", // Vertically center the text
                                                    justifyContent: "center", // Horizontally center the text
                                                }}
                                                onClick={() => addToCart(product)}
                                            >
                                                Thêm giỏ hàng
                                            </button> */}

                                            <div className="columns is-mobile is-vcentered">
                                                <div className="column is-auto">
                                                    <button
                                                        className="button is-primary"
                                                        style={{ width: '100%', padding: '0.45rem' }}
                                                        onClick={() => navigate(`/product/${product.id}`)}
                                                    >
                                                        Xem chi tiết
                                                    </button>
                                                </div>
                                                <div className="column is-auto">
                                                    <button
                                                        className="button is-info"
                                                        style={{ width: '100%', padding: '0.70rem' }}
                                                        onClick={() => addToCart(product)}
                                                    >
                                                        <FaShoppingCart />
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>


        </div>
    );
};

export default ShopHome;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const ShopHome = () => {
//     const [categories, setCategories] = useState([]);
//     const [featuredProducts, setFeaturedProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [cartItems, setCartItems] = useState([]);
//     const navigate = useNavigate();


//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:6868/categories');
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };

//         const fetchFeaturedProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:6868/products');
//                 setFeaturedProducts(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//                 setLoading(false);
//             }
//         };

//         fetchCategories();
//         fetchFeaturedProducts();
//     }, []);


//     const handleCategoryClick = (categoryId) => {
//         navigate(`/productpage?categoryId=${categoryId}`);
//     };

//     const addToCart = (product) => {
//         setCartItems([...cartItems, { ...product, quantity: 1 }]);
//         alert(`${product.name} đã được thêm vào giỏ hàng!`);
//     };

//     return (
//         <div>
//             {/* Banner */}
//             <div className="section">
//                 <div className="container">
//                     <div
//                         className="box has-text-centered"
//                         style={{
//                             backgroundColor: "#e3f2fd",
//                             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                             borderRadius: "8px",
//                         }}
//                     >
//                         <h1 className="title is-3" style={{ color: "#1e88e5" }}>Chào mừng đến với Shop Điện Thoại!</h1>
//                         <p className="subtitle" style={{ color: "#546e7a" }}>
//                             Khám phá những sản phẩm công nghệ hiện đại nhất.
//                         </p>
//                         <a href='/productpage' className="button is-info is-large">Xem ngay</a>
//                     </div>
//                 </div>
//             </div>

//             {/* Danh mục sản phẩm */}
//             <div className="section">
//                 <div className="container">
//                     <h2 className="title is-4" style={{ color: "#1565c0" }}>Danh mục sản phẩm</h2>
//                     <div className="columns">
//                         {categories.map((category) => (
//                             <div key={category.id} className="column is-one-third">
//                                 <div
//                                     className="box has-text-centered"
//                                     style={{
//                                         backgroundColor: "#f5f5f5",
//                                         border: "1px solid #ddd",
//                                         borderRadius: "8px",
//                                         transition: "transform 0.2s ease",
//                                     }}
//                                 >
//                                     <h3 className="title is-5" style={{ color: "#1e88e5" }}>{category.name}</h3>
//                                     <button
//                                         className="button is-info"
//                                         onClick={() => handleCategoryClick(category.id)}
//                                     >
//                                         Khám phá
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Sản phẩm nổi bật */}
//             <div className="section">
//                 <div className="container">
//                     <h2 className="title is-4" style={{ color: "#1565c0" }}>Sản phẩm nổi bật</h2>
//                     {loading ? (
//                         <div className="has-text-centered">Đang tải sản phẩm...</div>
//                     ) : (
//                         <div className="columns is-multiline">
//                             {featuredProducts.map((product) => (
//                                 <div key={product.id} className="column is-3">
//                                     <div
//                                         className="card"
//                                         style={{
//                                             border: "1px solid #ddd",
//                                             borderRadius: "8px",
//                                             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                                         }}
//                                     >
//                                         <div className="card-image">
//                                             <figure className="image is-4by3">
//                                                 <img
//                                                     src={product.image}
//                                                     alt={product.name}
//                                                     style={{
//                                                         borderRadius: "8px 8px 0 0",
//                                                     }}
//                                                 />
//                                             </figure>
//                                         </div>
//                                         <div className="card-content has-text-centered">
//                                             <h3 className="title is-5" style={{ color: "#424242" }}>{product.name}</h3>
//                                             <p className="subtitle is-6" style={{ color: "#757575" }}>{product.price}</p>
//                                             <Link to="/cart" state={{ cartItems }}>
//                                                 <button className="button is-link">thêm giỏ hàng</button>
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShopHome;



