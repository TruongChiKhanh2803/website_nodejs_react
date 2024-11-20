import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const News = db.define('productnews', {
    NewsID: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false, // Không được để trống
    },
    Content: {
        type: DataTypes.TEXT, // Đổi sang TEXT nếu nội dung dài
        allowNull: false, // Không được để trống
    },
}, {
    freezeTableName: true, // Tên bảng không bị đổi
    // timestamps: false, 
});

export default News;
