import express from "express";
import userController from '../controllers/userController';
import conversationController from '../controllers/conversationController';
import messageController from '../controllers/messageController';

let router = express.Router();

let initWebRoutes = (app) => {

    router.post('/api/login', userController.handleLoging);
    router.post('/api/logout', userController.handleLogout);
    router.get('/api/matching', userController.getMatching);
    router.get('/api/get-user', userController.getInfoByID);
    router.get('/api/user-chat', conversationController.getUserChat);
    router.get('/api/user-load-message', messageController.getMessage);
    router.get('/api/get-conversation', conversationController.getConversationByID);
    router.post('/api/create-conversation', conversationController.createConversation);
    router.get('/api/user-list', messageController.getAccByidConversation);
    router.post('/api/save-message', messageController.postMessage);
    router.post('/api/signup', userController.handleSignup);
    router.put('/api/block-conversation', conversationController.putBlockConversation);
    router.put('/api/delete-conversation', conversationController.deleteConversation);
    router.post('/api/setting/editprofile', userController.handleEditProfile);
    router.get('/api/setting/editprofile', userController.getProfileSetting);
    router.post('/api/setting/changepassword', userController.handleChangePassword);
    router.get('/api/check-friend-relation', userController.handleCheckFriendRelation);
    router.post('/api/add-friend-relation', userController.handleAddFriendRelation);

    return app.use("/", router);
}

module.exports = initWebRoutes;