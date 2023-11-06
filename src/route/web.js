import express from "express";
import userController from '../controllers/userController';
import conversationController from '../controllers/conversationController';
import messageController from '../controllers/messageController';
import postController from '../controllers/postController';

let router = express.Router();

let initWebRoutes = (app) => {

    router.post('/api/login', userController.handleLoging);
    router.post('/api/logout', userController.handleLogout);
    router.get('/api/matching', userController.getMatching);
    router.get('/api/get-user', userController.getInfoByID);
    router.get('/api/user-chat', conversationController.getUserChat);
    router.get('/api/user-load-message', messageController.getMessage);
    router.get('/api/get-conversation', conversationController.getConversationByID);
    router.get('/api/user-list', messageController.getAccByidConversation);
    router.post('/api/save-message', messageController.postMessage);
    router.post('/api/save-file', messageController.postFile);
    router.get('/api/get-file', messageController.getFile)
    router.post('/api/signup', userController.handleSignup);
    router.put('/api/block-conversation', conversationController.putBlockConversation);
    router.put('/api/delete-conversation', conversationController.deleteConversation);

    router.get('/api/get-post', postController.getPostByIDAccPost);
    router.post('/api/create-post', postController.createPostByUser);
    router.put('/api/update-post', postController.updatePost);
    router.delete('/api/delete-post', postController.deletePostById);


    return app.use("/", router);
}

module.exports = initWebRoutes;