import express from "express";
import userController from '../controllers/userController';

let router = express.Router();

let initWebRoutes = (app) => {

    router.post('/api/login', userController.handleLoging);
    router.get('/api/matching', userController.getMatching);
    router.post('/api/signup', userController.handleSignup);

    return app.use("/", router);
}

module.exports = initWebRoutes;