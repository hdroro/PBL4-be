import notification from "../services/notificationMatchingService";

const handleGetNotificationMatching = async (req, res) => {
  try {
    if (!req.query.idUser) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing inputs parameter!.",
      });
    }
    const notifData = await notification.handleGetNotificationMatching(
      req.query.idUser
    );
    return res.status(200).json({
      errCode: notifData.errCode,
      errMessage: notifData.errMessage,
      data: notifData.data ? notifData.data : {},
    });
  } catch (error) {
    console.log(error);
  }
};

const handleAddNotificationMatching = async (req, res) => {
  if (!req.body.idAcc1 || !req.body.idAcc2) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing inputs parameter!.",
    });
  }
  const notifData = await notification.handleAddNotificationMatching(
    req.body.idAcc1,
    req.body.idAcc2
  );
  return res.status(200).json({
    errCode: notifData.errCode,
    errMessage: notifData.errMessage,
    data: notifData.data,
  });
};

const handleSetDenyNotificationMatching = async (req, res) => {
  if (!req.body.idNotificationMatching) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing inputs parameter!.",
    });
  }
  const notifData = await notification.handleSetDenyNotificationMatching(
    req.body.idNotificationMatching
  );
  return res.status(200).json({
    errCode: notifData.errCode,
    errMessage: notifData.errMessage,
  });
};

const handleSetReadNotificationMatching = async (req, res) => {
  if (!req.body.idNotificationMatching) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing inputs parameter!.",
    });
  }
  const notifData = await notification.handleSetReadNotificationMatching(
    req.body.idNotificationMatching
  );
  return res.status(200).json({
    errCode: notifData.errCode,
    errMessage: notifData.errMessage,
  });
};

const handleGetCountNotReadNotificationMatching = async (req, res) => {
  try {
    if (!req.query.idAcc1) {
      return res.status(200).json({
        errCode: 2,
        errMessage: "Missing inputs parameter!.",
      });
    }
    const notifData =
      await notification.handleGetCountNotReadNotificationMatching(
        req.query.idAcc1
      );
    return res.status(200).json({
      errCode: notifData.errCode,
      errMessage: notifData.errMessage,
      data: notifData.data,
    });
  } catch (error) {}
};

const handleGetDetailNotificationMatching = async (req, res) => {
  if (
    !req.query.idNotificationMatching ||
    !req.query.idAcc1 ||
    !req.query.idAcc2
  ) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing inputs parameter!.",
    });
  }
  const notifData = await notification.handleGetDetailNotificationMatching(
    req.query.idNotificationMatching,
    req.query.idAcc1,
    req.query.idAcc2
  );
  return res.status(200).json({
    errCode: notifData.errCode,
    errMessage: notifData.errMessage,
    data: notifData.data ? notifData.data : {},
  });
};

module.exports = {
  handleGetNotificationMatching,
  handleAddNotificationMatching,
  handleSetDenyNotificationMatching,
  handleSetReadNotificationMatching,
  handleGetCountNotReadNotificationMatching,
  handleGetDetailNotificationMatching,
};
