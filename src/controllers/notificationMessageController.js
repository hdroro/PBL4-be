import notificationMessageService from "../services/notificationMessafeService";

const postNotificationMessageInfo = async (req, res) => {
  if (
    req.body.idConversation &&
    req.body.senderID &&
    req.body.receiverId &&
    req.body.notificationCount
  ) {
    const notificationMessageInfo =
      await notificationMessageService.handleAddInfoNotificationMessage(
        req.body.idConversation,
        req.body.senderID,
        req.body.receiverId,
        req.body.notificationCount
      );
    return res.status(200).json({ notificationMessageInfo });
  } else {
    return res.status(400).json({ error: "Error" });
  }
};

const putUpdateNotificationCount = async (req, res) => {
  if (req.body.senderID && req.body.receiverId) {
    const notificationMessageInfo =
      await notificationMessageService.handleUpdateNotificationMessageInfo(
        req.body.senderID && req.body.receiverId
      );
    return res.status(200).json({ notificationMessageInfo });
  } else {
    return res.status(400).json({ error: "Error" });
  }
};

const getNotificationMessageInfo = async (req, res) => {
  if (req.query.idConversation && req.query.senderID) {
    const notificationMessageInfo =
      await notificationMessageService.handleGetNotificationMessageInfo(
        req.query.idConversation && req.query.senderID
      );
    return res.status(200).json({ notificationMessageInfo });
  } else {
    return res.status(400).json({ error: "Error" });
  }
};

const getAllNotificationMessageInfo = async (req, res) => {
  const notificationMessageInfo =
    await notificationMessageService.handleGetAllNotificationMessageInfo();
  return res.status(200).json({ notificationMessageInfo });
};

const getNotificationByReceiveId = async (req, res) => {
  if (req.query.receiverId) {
    const notificationMessageInfo =
      await notificationMessageService.handleGetNotificationByReceiverId(
        req.query.receiverId
      );
    return res.status(200).json({ notificationMessageInfo });
  } else {
    return res.status(400).json({ error: "Error" });
  }
};

const deleteNotificationMessageInfo = async (req, res) => {
  if (req.query.idConversation && req.query.senderID) {
    const notificationMessageInfo =
      await notificationMessageService.handleDeleteNotificationMessageInfo(
        req.query.idConversation,
        req.query.senderID
      );
    return res.status(200).json({ notificationMessageInfo });
  } else {
    return res.status(400).json({ error: "Error" });
  }
};

module.exports = {
  postNotificationMessageInfo,
  putUpdateNotificationCount,
  getNotificationMessageInfo,
  deleteNotificationMessageInfo,
  getAllNotificationMessageInfo,
  getNotificationByReceiveId,
};
