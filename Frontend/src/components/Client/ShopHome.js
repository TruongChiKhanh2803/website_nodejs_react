// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ShopHome = () => {
//     const [categories, setCategories] = useState([]);
//     const [featuredProducts] = useState([
//         { id: 1, name: "iPhone 14 Pro Max", price: "33,000,000 VND", image: "https://via.placeholder.com/150" },
//         { id: 2, name: "Samsung Galaxy S23 Ultra", price: "27,000,000 VND", image: "https://via.placeholder.com/150" },
//         { id: 3, name: "Xiaomi 13 Pro", price: "20,000,000 VND", image: "https://via.placeholder.com/150" },
//     ]);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:6868/categories');
//                 setCategories(response.data);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const handleCategoryClick = (categoryId) => {
//         console.log(`Navigating to category with ID: ${categoryId}`);
//         // Logic điều hướng đến trang chi tiết category
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
//                         <button className="button is-info is-large">Xem ngay</button>
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
//                     <div className="columns">
//                         {featuredProducts.map((product) => (
//                             <div key={product.id} className="column is-one-third">
//                                 <div
//                                     className="card"
//                                     style={{
//                                         border: "1px solid #ddd",
//                                         borderRadius: "8px",
//                                         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                                     }}
//                                 >
//                                     <div className="card-image">
//                                         <figure className="image is-4by3">
//                                             <img
//                                                 src={product.image}
//                                                 alt={product.name}
//                                                 style={{
//                                                     borderRadius: "8px 8px 0 0",
//                                                 }}
//                                             />
//                                         </figure>
//                                     </div>
//                                     <div className="card-content has-text-centered">
//                                         <h3 className="title is-5" style={{ color: "#424242" }}>{product.name}</h3>
//                                         <p className="subtitle is-6" style={{ color: "#757575" }}>{product.price}</p>
//                                         <button className="button is-primary">Thêm vào giỏ</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShopHome;
// --------------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ShopHome = () => {
//     const [categories, setCategories] = useState([]);
//     const [featuredProducts, setFeaturedProducts] = useState([]);
//     const [loading, setLoading] = useState(true); // Thêm loading state để hiển thị trạng thái tải dữ liệu

//     // Lấy danh mục sản phẩm từ API
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
//                 const response = await axios.get('http://localhost:6868/products'); // API lấy danh sách sản phẩm
//                 setFeaturedProducts(response.data); // Gán dữ liệu sản phẩm vào state
//                 setLoading(false); // Đặt loading là false sau khi tải xong
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//                 setLoading(false); // Đặt loading là false nếu có lỗi xảy ra
//             }
//         };

//         fetchCategories();
//         fetchFeaturedProducts(); // Lấy dữ liệu sản phẩm khi component được mount
//     }, []);

//     const handleCategoryClick = (categoryId) => {
//         console.log(`Navigating to category with ID: ${categoryId}`);
//         // Logic điều hướng đến trang chi tiết category
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
//                         <button className="button is-info is-large">Xem ngay</button>
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
//                         <div className="columns">
//                             {featuredProducts.map((product) => (
//                                 <div key={product.id} className="column is-one-third">
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
//                                                     src={product.image} // Sử dụng ảnh từ API
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
//                                             <button className="button is-primary">Thêm vào giỏ</button>
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


// ----------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShopHome = () => {
    const [categories, setCategories] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:6868/categories');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get('http://localhost:6868/products');
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
        console.log(`Navigating to category with ID: ${categoryId}`);
    };

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
                        <h1 className="title is-3" style={{ color: "#1e88e5" }}>Chào mừng đến với Shop Điện Thoại!</h1>
                        <p className="subtitle" style={{ color: "#546e7a" }}>
                            Khám phá những sản phẩm công nghệ hiện đại nhất.
                        </p>
                        <button className="button is-info is-large">Xem ngay</button>
                    </div>
                </div>
            </div>

            {/* Danh mục sản phẩm */}
            <div className="section">
                <div className="container">
                    <h2 className="title is-4" style={{ color: "#1565c0" }}>Danh mục sản phẩm</h2>
                    <div className="columns">
                        {categories.map((category) => (
                            <div key={category.id} className="column is-one-third">
                                <div
                                    className="box has-text-centered"
                                    style={{
                                        backgroundColor: "#f5f5f5",
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        transition: "transform 0.2s ease",
                                    }}
                                >
                                    <h3 className="title is-5" style={{ color: "#1e88e5" }}>{category.name}</h3>
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

            {/* Sản phẩm nổi bật */}
            <div className="section">
                <div className="container">
                    <h2 className="title is-4" style={{ color: "#1565c0" }}>Sản phẩm nổi bật</h2>
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
                                        }}
                                    >
                                        <div className="card-image">
                                            <figure className="image is-4by3">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    style={{
                                                        borderRadius: "8px 8px 0 0",
                                                    }}
                                                />
                                            </figure>
                                        </div>
                                        <div className="card-content has-text-centered">
                                            <h3 className="title is-5" style={{ color: "#424242" }}>{product.name}</h3>
                                            <p className="subtitle is-6" style={{ color: "#757575" }}>{product.price}</p>
                                            <button className="button is-primary">Thêm vào giỏ</button>
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
