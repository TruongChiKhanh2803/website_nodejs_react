import dotenv from "dotenv";
import express from "express";
import configViewEngine from "./src/config/viewEngine";
import initWebRoute from "./src/routes/webRoute";

const app = express()
dotenv.config()
const port = process.env.PORT || 3000;

configViewEngine(app)
initWebRoute(app)

app.get('/', (req, res) => {
    res.send('Home page')
})


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})