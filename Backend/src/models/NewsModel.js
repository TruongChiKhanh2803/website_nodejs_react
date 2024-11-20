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
        allowNull: false, 
    },
    Content: {
        type: DataTypes.TEXT, 
        allowNull: false,
    },
}, {
    freezeTableName: true, 
    // timestamps: false, 
});

export default News;
