import express from "express";
import getTestPage from "../controllers/testController";

const router = express.Router()
const initWebRoute = (app) => {

    router.get('/test', getTestPage)

    return app.use('/', router)
}
export default initWebRoute