import express from "express";
import { verifyToken } from "../middlewares/VerityToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getUsers, Register, Login, Logout, getUserById, updateUser, deleteUser, updateUserProfile } from "../controllers/UserController.js";
import { getCategories, createCategory, updateCategory, deleteCategory, getCategoryById } from "../controllers/CategoriesController.js";

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

export default router;
