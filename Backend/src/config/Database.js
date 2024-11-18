import { Sequelize } from "sequelize";

const db = new Sequelize('web_nodejs_reactjs_dev', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;