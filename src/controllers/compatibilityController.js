import compatibility from "../services/compatibilityService";

const handleRandomUserMatching = async (req, res) => {
  if (!req.query.idUser || !req.query.onlineUsers) {
    return res.status(200).json({
      errCode: 3,
      message: "Missing inputs parameter!.",
    });
  }
  const randomData = await compatibility.handleGetRandomUserMatching(
    req.query.idUser,
    req.query.onlineUsers
  );
  return res.status(200).json({
    errCode: randomData.errCode,
    message: randomData.errMessage,
    dataUser: randomData.dataUser ? randomData.dataUser : {},
  });
};

module.exports = {
  handleRandomUserMatching,
};
