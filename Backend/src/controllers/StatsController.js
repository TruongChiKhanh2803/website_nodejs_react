import Users from "../models/UserModel.js";
import Products from "../models/ProductsModel.js";
import Orders from "../models/OrdersModel.js";

// Lấy tổng số người dùng
export const getTotalUsers = async (req, res) => {
    try {
        const count = await Users.count();
        res.json({ totalUsers: count });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy số lượng người dùng", error });
    }
};

// Lấy tổng số sản phẩm
export const getTotalProducts = async (req, res) => {
    try {
        const count = await Products.count();
        res.json({ totalProducts: count });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy số lượng sản phẩm", error });
    }
};

// Lấy tổng số đơn hàng
export const getTotalOrders = async (req, res) => {
    try {
        const count = await Orders.count();
        res.json({ totalOrders: count });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy số lượng đơn hàng", error });
    }
};
