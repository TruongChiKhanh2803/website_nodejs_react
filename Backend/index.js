import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./src/config/Database.js";
// import Users from "./src/models/userModel.js";
import router from "./src/routes/webRoute.js"

dotenv.config();
const app = express();



try {
    await db.authenticate();
    console.log('Kết nối database thành công!');
    // await Users.sync();
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