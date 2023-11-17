import express from "express";
import userController from '../controllers/userController';
import conversationController from '../controllers/conversationController';
import messageController from '../controllers/messageController';
import postController from '../controllers/postController';
import blockController from '../controllers/blockController';
import deleteController from '../controllers/deleteController';
import imageController from '../controllers/imageController';

let router = express.Router();

let initWebRoutes = (app) => {

    //user
    router.post('/api/login', userController.handleLoging);
    router.post('/api/logout', userController.handleLogout);
    router.get('/api/matching', userController.getMatching);
    router.get('/api/get-user', userController.getInfoByID);
    router.post('/api/signup', userController.handleSignup);
    router.get('/api/get-user-by-username', userController.getUserByUsername);
    router.post('/api/setting/editprofile', userController.handleEditProfile);
    router.get('/api/setting/editprofile', userController.getProfileSetting);
    router.post('/api/setting/changepassword', userController.handleChangePassword);

    //conversation
    router.get('/api/user-chat', conversationController.getUserChat);
    router.get('/api/get-conversation', conversationController.getConversationByID);
    router.put('/api/block-conversation', conversationController.putBlockConversation);
    router.put('/api/delete-conversation', conversationController.deleteConversation);
    router.put('/api/update-block-conversation', conversationController.updateBlockStatusConversation);
    router.post('/api/create-conversation', conversationController.createConversation);

    //message
    router.get('/api/user-load-message', messageController.getMessage);
    router.get('/api/user-list', messageController.getAccByidConversation);
    router.post('/api/save-message', messageController.postMessage);
    router.post('/api/save-file', messageController.postFile);
    router.get('/api/get-file', messageController.getFile);
    
    //posts
    router.get('/api/get-post', postController.getPostByIDAccPost);
    router.get('/api/get-info-detail-post', postController.getInfoPost);
    router.post('/api/create-post', postController.createPostByUser);
    router.put('/api/update-post', postController.updatePost);
    router.delete('/api/delete-post', postController.deletePostById);


    //block
    router.post('/api/block-conversation', blockController.postBlockInfo);
    router.delete('/api/delete-block-conversation', blockController.deleteBlockInfo);
    router.get('/api/get-block-conversation', blockController.getBlockInfo);

    //delete
    router.post('/api/delete-conversation', deleteController.postDeleteInfo);
    router.get('/api/get-delete-conversation', deleteController.getDeleteInfo);
    router.get('/api/get-id-conversation', deleteController.getIdConversationInDeleted);
    router.delete('/api/delete-info-deleted', deleteController.deleteInfoDelete);

    
    //image
    router.get('/api/get-image', imageController.getImageInfo);

    // friend-relation
    router.get('/api/check-friend-relation', userController.handleCheckFriendRelation);
    router.post('/api/add-friend-relation', userController.handleAddFriendRelation);

    return app.use("/", router);
}

module.exports = initWebRoutes;