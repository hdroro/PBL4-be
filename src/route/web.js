import express from "express";
import userController from "../controllers/userController";
import conversationController from "../controllers/conversationController";
import messageController from "../controllers/messageController";
import notificationMessageController from "../controllers/notificationMessageController";
import postController from "../controllers/postController";
import blockController from "../controllers/blockController";
import deleteController from "../controllers/deleteController";
import imageController from "../controllers/imageController";
import compatibilityController from "../controllers/compatibilityController";
import notificationController from "../controllers/notificationMatchingController";
import notificationZodiacController from "../controllers/zodiac_notiController";

import reportController from "../controllers/reportController";
import zodiacMessageController from "../controllers/zodiac_messageController";
import zodiacController from "../controllers/zodiacController";

let router = express.Router();

let initWebRoutes = (app) => {
  //user
  router.post("/api/login", userController.handleLoging);

  router.post("/api/logout", userController.handleLogout);
  router.get("/api/matching", userController.getMatching);
  router.get("/api/get-user", userController.getInfoByID);
  router.post("/api/signup", userController.handleSignup);
  router.get("/api/get-user-by-username", userController.getUserByUsername);
  router.post("/api/setting/editprofile", userController.handleEditProfile);
  router.get("/api/setting/editprofile", userController.getProfileSetting);
  router.post(
    "/api/setting/changepassword",
    userController.handleChangePassword
  );
  router.get("/api/get-user-by-search", userController.getUserBySearch);
  router.get(
    "/api/check-friend-relation",
    conversationController.checkFriendRelation
  );
  router.post(
    "/api/setting/editprofile-brief",
    userController.handleEditProfileBrief
  );

  //conversation
  router.get("/api/user-chat", conversationController.getUserChat);
  router.get(
    "/api/get-id-conversation-by-user",
    conversationController.getIdConversation
  );
  router.get(
    "/api/get-conversation",
    conversationController.getConversationByID
  );
  router.put(
    "/api/block-conversation",
    conversationController.putBlockConversation
  );
  router.put(
    "/api/delete-conversation",
    conversationController.deleteConversation
  );
  router.put(
    "/api/update-block-conversation",
    conversationController.updateBlockStatusConversation
  );
  router.post(
    "/api/create-conversation",
    conversationController.createConversation
  );

  //message
  router.get("/api/user-load-message", messageController.getMessage);
  router.get("/api/get-message-by-idMessage", messageController.getMessageById);
  router.get("/api/user-list", messageController.getAccByidConversation);
  router.get("/api/get-max-idMessage", messageController.getMaxMessageId);
  router.post("/api/save-message", messageController.postMessage);
  router.post("/api/save-file", messageController.postFile);
  router.get("/api/get-file", messageController.getFile);

  //notification-message
  router.post(
    "/api/notifications-message",
    notificationMessageController.postNotificationMessageInfo
  );
  router.get(
    "/api/get-notification-message-info",
    notificationMessageController.getNotificationMessageInfo
  );
  router.get(
    "/api/getall-notification-message-info",
    notificationMessageController.getAllNotificationMessageInfo
  );
  router.get(
    "/api/get-notification-message-info-by-receiverId",
    notificationMessageController.getNotificationByReceiveId
  );

  router.delete(
    "/api/delete-notification-message-info",
    notificationMessageController.deleteNotificationMessageInfo
  );
  router.put(
    "/api/update-notification-message-info",
    notificationMessageController.putUpdateNotificationCount
  );

  //posts
  router.get("/api/get-post", postController.getPostByIDAccPost);
  router.get("/api/get-info-detail-post", postController.getInfoPost);
  router.post("/api/create-post", postController.createPostByUser);
  router.put("/api/update-post", postController.updatePost);
  router.delete("/api/delete-post", postController.deletePostById);

  //block
  router.post("/api/block-conversation", blockController.postBlockInfo);
  router.delete(
    "/api/delete-block-conversation",
    blockController.deleteBlockInfo
  );
  router.get("/api/get-block-conversation", blockController.getBlockInfo);

  //delete
  router.post("/api/delete-conversation", deleteController.postDeleteInfo);
  router.get("/api/get-delete-conversation", deleteController.getDeleteInfo);
  router.get(
    "/api/get-id-conversation",
    deleteController.getIdConversationInDeleted
  );
  router.delete("/api/delete-info-deleted", deleteController.deleteInfoDelete);
  router.put("/api/update-delete-conversation", deleteController.putDeleteInfo);

  //image
  router.get("/api/get-image", imageController.getImageInfo);

  // matching
  router.get(
    "/api/random-matching",
    compatibilityController.handleRandomUserMatching
  );

  // notification
  router.get(
    "/api/get-notification-matching",
    notificationController.handleGetNotificationMatching
  );
  router.post(
    "/api/create-notification-matching",
    notificationController.handleAddNotificationMatching
  );
  router.post(
    "/api/deny-notification-matching",
    notificationController.handleSetDenyNotificationMatching
  );
  router.post(
    "/api/read-notification-matching",
    notificationController.handleSetReadNotificationMatching
  );
  router.get(
    "/api/get-count-not-read-notification-matching",
    notificationController.handleGetCountNotReadNotificationMatching
  );
  router.get(
    "/api/get-detail-notification-matching",
    notificationController.handleGetDetailNotificationMatching
  );

  // report
  router.get("/api/admin/get-all-report", reportController.getAllReport);
  router.get(
    "/api/admin/get-info-detail-post",
    postController.getInfoPostByAdmin
  );
  router.put("/api/admin/deny-report", reportController.denyReport);
  router.put("/api/admin/accept-report", reportController.acceptReport);
  router.put("/api/create-report", reportController.createReport);
  router.post("/api/report", reportController.addReportToReport);

  // zodiac
  router.get("/api/admin/get-list-zodiac", zodiacController.getListZodiac);
  router.get(
    "/api/admin/get-zodiac-info-detail",
    zodiacController.getZodiacById
  );

  //zodiac message
  router.get(
    "/api/get-list-zodiac-message",
    zodiacMessageController.getZodiacMessageByIdUser
  );
  router.post(
    "/api/read-zodiac-message",
    zodiacMessageController.readZodiacMessage
  );
  router.get(
    "/api/admin/get-all-zodiac-message",
    zodiacMessageController.getAllZodiacMessage
  );
  router.get(
    "/api/admin/get-detail-zodiac-message",
    zodiacMessageController.getZodiacMessageDetail
  );
  router.put(
    "/api/admin/create-zodiac-message",
    zodiacMessageController.createZodiacMessage
  );

  router.get(
    "/api/admin/filter-zodiac-message",
    zodiacMessageController.filterZodiacMessage
  );

  router.get(
    "/api/admin/get-id-zodiac-message",
    zodiacMessageController.getIdZodiacMessage
  );

  // zodiac noti
  router.get(
    "/api/admin/get-detail-noti-message-zodiac",
    notificationZodiacController.handleGetZodiacMessageDetail
  );

  //user (admin)
  router.get(
    "/api/admin/get-idZodiac-by-idUser",
    userController.getIdZodiacByIdUser
  );
  router.get("/api/admin/get-list-user", userController.getListUser);
  router.get(
    "/api/admin/get-list-acc-report",
    userController.getListAccReported
  );
  router.get("/api/admin/get-user", userController.getUserByAdmin);
  router.post("/api/admin/delete-user", userController.deleteUserByAdmin);

  return app.use("/", router);
};

module.exports = initWebRoutes;
