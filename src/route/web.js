import express from "express";
import userController from '../controllers/userController';
import conversationController from '../controllers/conversationController';
import messageController from '../controllers/messageController';

let router = express.Router();

let initWebRoutes = (app) => {

    router.post('/api/login', userController.handleLoging);
    router.get('/api/matching', userController.getMatching);
    router.get('/api/get-user', userController.getInfoByID);
    router.get('/api/user-chat', conversationController.getUserChat);
    router.get('/api/user-load-message', messageController.getMessage);
    router.get('/api/user-list', messageController.getAccByidConversation);
    router.post('/api/save-message', messageController.postMessage);

    return app.use("/", router);
}

module.exports = initWebRoutes;