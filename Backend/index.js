import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./src/config/Database.js";

// import Users from "./src/models/UserModel.js";
// import Categories from "./src/models/CategoriesModel.js";
// import Products from "./src/models/ProductsModel.js";
// import Orders from "./src/models/OrdersModel.js";
// import OrderDetail from "./src/models/OrderDetailsModel.js";
// import Discounts from "./src/models/DiscountModel.js";
// import News from "./src/models/NewsModel.js";

import router from "./src/routes/webRoute.js"
import multer from "multer";
import path from "path";

dotenv.config();
const app = express();



try {
    await db.authenticate();
    console.log('Kết nối database thành công!');
    // await Users.sync();
    // await Categories.sync();
    // await Products.sync();
    // await Orders.sync();
    // await OrderDetail.sync();
    // await Discounts.sync();
    // await News.sync();
} catch (error) {
    console.error(error);
}

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.listen(6868, () => console.log(`http://localhost:6868`));