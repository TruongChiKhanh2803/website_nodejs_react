import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Orders from "./OrdersModel.js";
import Products from "./ProductsModel.js";


const { DataTypes } = Sequelize;

const OrderDetails = db.define('order_details', {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Orders,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

// Thiết lập mối quan hệ với Orders và Products
Orders.hasMany(OrderDetails, { foreignKey: 'orderId' });
OrderDetails.belongsTo(Orders, { foreignKey: 'orderId' });

Products.hasMany(OrderDetails, { foreignKey: 'productId' });
OrderDetails.belongsTo(Products, { foreignKey: 'productId' });

export default OrderDetails;
