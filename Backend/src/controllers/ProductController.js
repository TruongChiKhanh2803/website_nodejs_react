import Products from "../models/ProductsModel.js";
import Categories from "../models/CategoriesModel.js";

// Lấy tất cả sản phẩm
export const getProducts = async (req, res) => {
    try {
        const products = await Products.findAll({
            include: {
                model: Categories,
                attributes: ['id', 'name']
            }
        });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
    try {
        const product = await Products.findByPk(req.params.id, {
            include: {
                model: Categories,
                attributes: ['id', 'name']
            }
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Tạo sản phẩm mới
export const createProduct = async (req, res) => {
    const { name, description, price, stock, categoryId } = req.body;
    try {
        const newProduct = await Products.create({ name, description, price, stock, categoryId });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error creating product" });
    }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
    const { name, description, price, stock, categoryId } = req.body;
    try {
        const product = await Products.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.update({ name, description, price, stock, categoryId });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error updating product" });
    }
};

// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.destroy();
        res.json({ message: "Product deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product" });
    }
};

