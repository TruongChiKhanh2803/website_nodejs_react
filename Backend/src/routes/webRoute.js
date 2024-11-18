import express from "express";
import { getUsers, Register, Login, Logout, getUserById, updateUser, deleteUser } from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/VerityToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.post('/users', Register);
router.post('/login', Login);
router.delete('/logout', Logout);

router.get('/token', refreshToken);

router.get('/users', verifyToken, getUsers);
router.get('/users/:id', getUserById);
router.put('/users/edit/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);

export default router;
