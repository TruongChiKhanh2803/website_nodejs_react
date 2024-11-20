import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Discounts = db.define('discounts', {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    discountRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 100,
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    freezeTableName: true
});


export default Discounts;
