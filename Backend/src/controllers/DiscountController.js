
import Discount from "../models/DiscountModel.js";

export const getDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.findAll();
        res.json(discounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Lấy mã giảm giá theo ID
export const getDiscountById = async (req, res) => {
    try {
        const discount = await Discount.findByPk(req.params.id);
        if (!discount) {
            return res.status(404).json({ message: "Discount not found" });
        }
        res.json(discount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Tạo mã giảm giá mới
export const createDiscount = async (req, res) => {
    const { code, discountRate, expiryDate } = req.body;
    try {
        const newDiscount = await Discount.create({ code, discountRate, expiryDate });
        res.status(201).json(newDiscount);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error creating discount" });
    }
};

// Cập nhật mã giảm giá
export const updateDiscount = async (req, res) => {
    const { code, discountRate, expiryDate, isActive } = req.body;
    try {
        const discount = await Discount.findByPk(req.params.id);
        if (!discount) {
            return res.status(404).json({ message: "Discount not found" });
        }

        await discount.update({ code, discountRate, expiryDate, isActive });
        res.json(discount);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error updating discount" });
    }
};

// Xóa mã giảm giá
export const deleteDiscount = async (req, res) => {
    try {
        const discount = await Discount.findByPk(req.params.id);
        if (!discount) {
            return res.status(404).json({ message: "Discount not found" });
        }

        await discount.destroy();
        res.json({ message: "Discount deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting discount" });
    }
};