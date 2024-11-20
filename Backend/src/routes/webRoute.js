import express from "express";
import { verifyToken } from "../middlewares/VerityToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

import { getUsers, Register, Login, Logout, getUserById, updateUser, deleteUser, updateUserProfile } from "../controllers/UserController.js";
import { getCategories, createCategory, updateCategory, deleteCategory, getCategoryById } from "../controllers/CategoriesController.js";
import { getProducts, createProduct, updateProduct, deleteProduct, getProductById } from "../controllers/ProductController.js";
import { getTotalUsers, getTotalProducts, getTotalOrders } from "../controllers/StatsController.js";
import { createDiscount, getDiscounts, getDiscountById, updateDiscount, deleteDiscount, } from '../controllers/DiscountController.js';

import { getAllNews, getByNewsID, createNews, updateNews, deleteNews } from "../controllers/NewsController.js";


const router = express.Router();

router.post('/users', Register);
router.post('/login', Login);
router.delete('/logout', Logout);

router.get('/token', refreshToken);

router.get('/users', verifyToken, getUsers);
router.get('/users/:id', getUserById);
router.put('/users/edit/:id', verifyToken, updateUser);
router.put('/users/editprofile/:id', verifyToken, updateUserProfile);
router.delete('/users/:id', verifyToken, deleteUser);



router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', verifyToken, updateCategory);
router.delete('/categories/:id', verifyToken, deleteCategory);


router.get('/products', getProducts);
router.post('/products', createProduct);
router.get('/products/:id', getProductById);
router.put('/products/edit/:id', verifyToken, updateProduct);
router.delete('/products/:id', verifyToken, deleteProduct);


// Thống kê
router.get('/stats/users', getTotalUsers);
router.get('/stats/products', getTotalProducts);
router.get('/stats/orders', getTotalOrders);



router.get('/discounts', getDiscounts);
router.post('/discounts', createDiscount);
router.get('/discounts/:id', getDiscountById);
router.put('/discounts/edit/:id', verifyToken, updateDiscount);
router.delete('/discounts/:id', verifyToken, deleteDiscount);



router.get('/news', getAllNews);
router.get('/news/:NewsID', getByNewsID);
router.post('/news', createNews);
router.put('/news/edit/:NewsID', verifyToken, updateNews);
router.delete('/news/:NewsID', verifyToken, deleteNews);



export default router;
