import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Orders = db.define('orders', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending'
    }
}, {
    freezeTableName: true
});

// Thiết lập mối quan hệ với Users
Users.hasMany(Orders, { foreignKey: 'userId' });
Orders.belongsTo(Users, { foreignKey: 'userId' });

export default Orders;
