import express from "express";
import userController from '../controllers/userController';
import conversationController from '../controllers/conversationController';
import messageController from '../controllers/messageController';
import postController from '../controllers/postController';
import blockController from '../controllers/blockController';

let router = express.Router();

let initWebRoutes = (app) => {

    //user
    router.post('/api/login', userController.handleLoging);
    router.post('/api/logout', userController.handleLogout);
    router.get('/api/matching', userController.getMatching);
    router.get('/api/get-user', userController.getInfoByID);
    router.post('/api/signup', userController.handleSignup);
    router.get('/api/get-user-by-username', userController.getUserByUsername);

    //conversation
    router.get('/api/user-chat', conversationController.getUserChat);
    router.get('/api/get-conversation', conversationController.getConversationByID);
    router.put('/api/block-conversation', conversationController.putBlockConversation);
    router.put('/api/delete-conversation', conversationController.deleteConversation);
    router.put('/api/update-block-conversation', conversationController.updateBlockStatusConversation);

    //message
    router.get('/api/user-load-message', messageController.getMessage);
    router.get('/api/user-list', messageController.getAccByidConversation);
    router.post('/api/save-message', messageController.postMessage);
    
    //posts
    router.get('/api/get-post', postController.getPostByID);

    //block
    router.post('/api/block-conversation', blockController.postBlockInfo);
    router.delete('/api/delete-block-conversation', blockController.deleteBlockInfo);
    router.get('/api/get-block-conversation', blockController.getBlockInfo);
    

    return app.use("/", router);
}

module.exports = initWebRoutes;