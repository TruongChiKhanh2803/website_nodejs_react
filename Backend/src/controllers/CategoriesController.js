// controllers/CategoriesController.js
import Categories from "../models/CategoriesModel.js";

// Lấy danh sách tất cả danh mục
export const getCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm danh mục mới
export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = await Categories.create({ name, description });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy danh mục theo ID để chỉnh sửa
export const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Categories.findByPk(id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.json(category); // Trả về dữ liệu của danh mục
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Sửa danh mục
export const updateCategory = async (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;

    try {
        const category = await Categories.findByPk(id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        category.name = name;
        category.description = description;
        await category.save();

        res.status(200).json({ msg: 'Category updated successfully', category });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

// Xóa danh mục
export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Categories.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await category.destroy();
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
