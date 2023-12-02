const notification_ = require("../models/notification_message");

let handleAddInfoNotificationMessage = (
  idConversation,
  senderId,
  receiverId,
  notificationCount
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notificationMessageData = {};
      const notificationInfo =
        await new notification_().addInfoNotificationMessage(
          idConversation,
          senderId,
          receiverId,
          notificationCount
        );
      notificationMessageData.errCode = 0;
      notificationMessageData.errMessage = "OK";
      notificationMessageData.statusNotificationMessage = notificationInfo;
      resolve(notificationMessageData);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUpdateNotificationMessageInfo = (
  senderId,
  receiverId,
  notificationCount
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notificationMessageData = {};
      const notificationInfo =
        await new notification_().updateNotificationCount(
          senderId,
          receiverId,
          notificationCount
        );
      notificationMessageData.errCode = 0;
      notificationMessageData.errMessage = "OK";
      notificationMessageData.statusNotificationMessage = notificationInfo;
      resolve(notificationMessageData);
    } catch (e) {
      reject(e);
    }
  });
};

let handleGetNotificationMessageInfo = (idConversation, senderID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notificationMessageData = {};
      const notificationInfo =
        await new notification_().getInfoNotificationMessage(
          idConversation,
          senderID
        );
      notificationMessageData.errCode = 0;
      notificationMessageData.errMessage = "OK";
      notificationMessageData.statusNotificationMessage = notificationInfo;
      resolve(notificationMessageData);
    } catch (e) {
      reject(e);
    }
  });
};

let handleGetNotificationByReceiverId = (receiverId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notificationMessageData = {};
      const notificationInfo =
        await new notification_().getNotificationByReceiverId(receiverId);
      notificationMessageData.errCode = 0;
      notificationMessageData.errMessage = "OK";
      notificationMessageData.statusNotificationMessage = notificationInfo;
      resolve(notificationMessageData);
    } catch (e) {
      reject(e);
    }
  });
};

let handleGetAllNotificationMessageInfo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const notificationMessageData = {};
      const notificationInfo =
        await new notification_().getAllInfoNotification();
      notificationMessageData.errCode = 0;
      notificationMessageData.errMessage = "OK";
      notificationMessageData.statusNotificationMessage = notificationInfo;
      resolve(notificationMessageData);
    } catch (e) {
      reject(e);
    }
  });
};

let handleDeleteNotificationMessageInfo = (idConversation, senderID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const notificationMessageData = {};
      await new notification_().deleteInfoNotificationMessage(
        idConversation,
        senderID
      );
      notificationMessageData.errCode = 0;
      notificationMessageData.errMessage = "OK";
      notificationMessageData.statusNotificationMessage = "Xóa thành công";
      resolve(notificationMessageData);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleAddInfoNotificationMessage,
  handleUpdateNotificationMessageInfo,
  handleGetNotificationMessageInfo,
  handleGetNotificationByReceiverId,
  handleGetAllNotificationMessageInfo,
  handleDeleteNotificationMessageInfo,
};
