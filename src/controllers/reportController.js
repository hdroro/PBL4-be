import reportService from "../services/reportService";

const getAllReport = async (req, res) => {
  try {
    const page = req.query.page;
    const reportData = await reportService.getAllReport(page);
    return res.status(200).json(reportData);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const denyReport = async (req, res) => {
  try {
    if (req.body.idPost) {
      const idPost = req.body.idPost;
      const message = await reportService.denyReport(idPost);
      console.log(message);
      return res.status(200).json(message);
    } else
      return res
        .status(400)
        .json({ errCode: 1, errMessage: "Thiếu trường idPost" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const acceptReport = async (req, res) => {
  try {
    if (req.body.idPost) {
      const idPost = req.body.idPost;
      const message = await reportService.acceptReport(idPost);
      console.log(message);
      return res.status(200).json(message);
    } else
      return res
        .status(400)
        .json({ errCode: 1, errMessage: "Thiếu trường idPost" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const createReport = async (req, res) => {
  try {
    if (req.body.idPost && req.body.idUser && req.body.content) {
      const idPost = req.body.idPost;
      const idUser = req.body.idUser;
      const content = req.body.content;
      const message = await reportService.createReport(idPost, idUser, content);
      console.log(message);
      return res.status(200).json(message);
    } else
      return res
        .status(400)
        .json({ errCode: 1, errMessage: "Thiếu trường để tạo" });
  } catch (err) {
    return res.status(400).json(err);
  }
};
module.exports = {
  getAllReport: getAllReport,
  denyReport: denyReport,
  acceptReport: acceptReport,
  createReport: createReport,
};
