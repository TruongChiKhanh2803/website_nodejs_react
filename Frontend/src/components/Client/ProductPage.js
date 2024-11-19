import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';


import Footer from './FooterUser';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('name_asc');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const [categoriesResponse, productsResponse] = await Promise.all([
                    axios.get('http://localhost:6868/categories'),
                    axios.get('http://localhost:6868/products'),
                ]);
                setCategories(categoriesResponse.data);
                setProducts(productsResponse.data);
                setFilteredProducts(productsResponse.data); // Initially, all products are shown
            } catch (error) {
                console.error("Error fetching categories or products:", error);
            }
        };

        fetchCategoriesAndProducts();
    }, []);

    useEffect(() => {
        let filtered = products;

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // Filter by selected category
        if (selectedCategory) {
            filtered = filtered.filter(product => product.categoryId === selectedCategory);
        }

        // Sort products based on selected sort option
        if (sortOption === 'name_asc') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'name_desc') {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortOption === 'price_asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price_desc') {
            filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(filtered);
    }, [products, searchQuery, selectedCategory, sortOption]);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleAddToCart = (productId) => {
        // Handle adding the product to the cart here
        console.log("Added product to cart with id:", productId);
        // You can implement cart functionality here, like saving to local storage or making an API request.
    };

    return (
        <div className="container">
            <div className="columns">
                {/* Sidebar */}
                <div className="column is-one-quarter">
                    <div className="box">
                        <h3 className="title is-4">Danh mục</h3>
                        <div>
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className="button is-light"
                                    onClick={() => handleCategoryClick(category.id)}
                                    style={{ marginBottom: '10px', width: '100%' }}
                                >
                                    {category.name}
                                </button>
                            ))}

                            <a
                                href="/productpage"
                                className="button is-light"
                                style={{ marginTop: '10px', width: '100%' }}
                            >
                                Xem tất cả
                            </a>
                        </div>
                    </div>
                </div>

                {/* Product Listing */}
                <div className="column">
                    <div className="box">
                        <h2 className="title is-3">Sản phẩm</h2>

                        {/* Search and Sort */}
                        <div className="field has-addons" style={{ marginBottom: '20px' }}>
                            <div className="control is-expanded">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Tìm kiếm sản phẩm"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="control">
                                <button className="button is-info">Tìm kiếm</button>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Sắp xếp theo:</label>
                            <div className="control">
                                <div className="select">
                                    <select value={sortOption} onChange={handleSortChange}>
                                        <option value="name_asc">Tên (A-Z)</option>
                                        <option value="name_desc">Tên (Z-A)</option>
                                        <option value="price_asc">Giá (Thấp đến Cao)</option>
                                        <option value="price_desc">Giá (Cao đến Thấp)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Display Products */}
                        <div className="columns is-multiline">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="column is-one-third">
                                    <div className="card">
                                        <div className="card-image">
                                            <figure className="image is-4by3">
                                                <img src={product.image} alt={product.name} />
                                            </figure>
                                        </div>
                                        <div className="card-content">
                                            <h3 className="title is-5">{product.name}</h3>
                                            <p className="subtitle is-6">{product.price} VND</p>
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
                                                        onClick={() => handleAddToCart(product.id)}
                                                    >
                                                        <FaShoppingCart />
                                                        {/* Giỏ hàng */}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductPage;




































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// import Footer from './FooterUser';


// const ProductPage = () => {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [sortOption, setSortOption] = useState('name_asc');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCategoriesAndProducts = async () => {
//             try {
//                 const [categoriesResponse, productsResponse] = await Promise.all([
//                     axios.get('http://localhost:6868/categories'),
//                     axios.get('http://localhost:6868/products'),
//                 ]);
//                 setCategories(categoriesResponse.data);
//                 setProducts(productsResponse.data);
//                 setFilteredProducts(productsResponse.data); // Initially, all products are shown
//             } catch (error) {
//                 console.error("Error fetching categories or products:", error);
//             }
//         };

//         fetchCategoriesAndProducts();
//     }, []);

//     useEffect(() => {
//         let filtered = products;

//         // Filter by search query
//         if (searchQuery) {
//             filtered = filtered.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
//         }

//         // Filter by selected category
//         if (selectedCategory) {
//             filtered = filtered.filter(product => product.categoryId === selectedCategory);
//         }

//         // Sort products based on selected sort option
//         if (sortOption === 'name_asc') {
//             filtered.sort((a, b) => a.name.localeCompare(b.name));
//         } else if (sortOption === 'name_desc') {
//             filtered.sort((a, b) => b.name.localeCompare(a.name));
//         } else if (sortOption === 'price_asc') {
//             filtered.sort((a, b) => a.price - b.price);
//         } else if (sortOption === 'price_desc') {
//             filtered.sort((a, b) => b.price - a.price);
//         }

//         setFilteredProducts(filtered);
//     }, [products, searchQuery, selectedCategory, sortOption]);

//     const handleCategoryClick = (categoryId) => {
//         setSelectedCategory(categoryId);
//     };

//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     const handleSortChange = (e) => {
//         setSortOption(e.target.value);
//     };

//     return (
//         <div className="container">
//             <div className="columns">
//                 {/* Sidebar */}
//                 <div className="column is-one-quarter">
//                     <div className="box">
//                         <h3 className="title is-4">Danh mục</h3>
//                         <div>
//                             {categories.map(category => (
//                                 <button
//                                     key={category.id}
//                                     className="button is-light"
//                                     onClick={() => handleCategoryClick(category.id)}
//                                     style={{ marginBottom: '10px', width: '100%' }}
//                                 >
//                                     {category.name}
//                                 </button>
//                             ))}

//                             <a
//                                 href="/productpage"
//                                 className="button is-light"
//                                 style={{ marginTop: '10px', width: '100%' }}
//                             >
//                                 Xem tất cả
//                             </a>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Product Listing */}
//                 <div className="column">
//                     <div className="box">
//                         <h2 className="title is-3">Sản phẩm</h2>

//                         {/* Search and Sort */}
//                         <div className="field has-addons" style={{ marginBottom: '20px' }}>
//                             <div className="control is-expanded">
//                                 <input
//                                     className="input"
//                                     type="text"
//                                     placeholder="Tìm kiếm sản phẩm"
//                                     value={searchQuery}
//                                     onChange={handleSearchChange}
//                                 />
//                             </div>
//                             <div className="control">
//                                 <button className="button is-info">Tìm kiếm</button>
//                             </div>
//                         </div>

//                         <div className="field">
//                             <label className="label">Sắp xếp theo:</label>
//                             <div className="control">
//                                 <div className="select">
//                                     <select value={sortOption} onChange={handleSortChange}>
//                                         <option value="name_asc">Tên (A-Z)</option>
//                                         <option value="name_desc">Tên (Z-A)</option>
//                                         <option value="price_asc">Giá (Thấp đến Cao)</option>
//                                         <option value="price_desc">Giá (Cao đến Thấp)</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Display Products */}
//                         <div className="columns is-multiline">
//                             {filteredProducts.map(product => (
//                                 <div key={product.id} className="column is-one-third">
//                                     <div className="card">
//                                         <div className="card-image">
//                                             <figure className="image is-4by3">
//                                                 <img src={product.image} alt={product.name} />
//                                             </figure>
//                                         </div>
//                                         <div className="card-content">
//                                             <h3 className="title is-5">{product.name}</h3>
//                                             <p className="subtitle is-6">{product.price} VND</p>
//                                             <button className="button is-primary" onClick={() => navigate(`/product/${product.id}`)}>
//                                                 Xem chi tiết
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default ProductPage;



