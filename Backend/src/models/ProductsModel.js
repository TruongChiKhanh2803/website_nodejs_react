import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Categories from "./CategoriesModel.js";

const { DataTypes } = Sequelize;

const Products = db.define('products', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categories,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    freezeTableName: true
});

// Thiết lập mối quan hệ với Categories
Categories.hasMany(Products, { foreignKey: 'categoryId' });
Products.belongsTo(Categories, { foreignKey: 'categoryId' });

export default Products;
