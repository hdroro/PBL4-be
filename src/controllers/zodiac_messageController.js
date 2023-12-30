import zodiacMessageService from "../services/zodiac_messageService";

const getZodiacMessageByIdUser = async (req, res) => {
  try {
    // if(req.query.idUser && req.session.idUser && req.query.idUser == req.session.idUser){
    if (req.query.idUser && req.query.page) {
      console.log("req.query.page ", req.query.page);
      const idUser = req.query.idUser;
      const page = req.query.page;
      const listMessage =
        await zodiacMessageService.handleGetZodiacMessageByIdUser(idUser, page);
      return res.status(200).json(listMessage);
    } else
      return res.status(400).json({
        errCode: 1,
        errMessage: "Thiếu tham số hoặc không phù hợp user",
      });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const readZodiacMessage = async (req, res) => {
  try {
    // if(req.query.idUser && req.session.idUser && req.query.idUser == req.session.idUser){
    if (req.body.id) {
      const id = req.body.id;
      const message = await zodiacMessageService.handleReadZodiacMessage(id);
      return res.status(200).json(message);
    } else
      return res.status(400).json({
        errCode: 1,
        errMessage: "Thiếu tham số hoặc không phù hợp user",
      });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getAllZodiacMessage = async (req, res) => {
  try {
    const page = req.query.page;
    const listMessage = await zodiacMessageService.getAllZodiacMessage(page);
    return res.status(200).json(listMessage);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const filterZodiacMessage = async (req, res) => {
  try {
    if (req.query.timeFrom && req.query.timeTo) {
      const timeFrom = req.query.timeFrom;
      const timeTo = req.query.timeTo;
      const pageNumber = req.query.pageNumber;

      const listMessage = await zodiacMessageService.handleFilterZodiacMessage(
        timeFrom,
        timeTo,
        pageNumber
      );

      return res.status(200).json(listMessage);
    } else {
      return res
        .status(400)
        .json({ error: "Invalid parameters for filtering." });
    }
  } catch (err) {
    console.error("Error in filterZodiacMessage:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const getZodiacMessageDetail = async (req, res) => {
  try {
    if (req.query.id) {
      const idZodiacMessage = req.query.id;
      const listMessage = await zodiacMessageService.handleGetZodiacMessageById(
        idZodiacMessage
      );
      return res.status(200).json(listMessage);
    } else
      return res.status(400).json({ errCode: 1, errMessage: "Thiếu tham số" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const createZodiacMessage = async (req, res) => {
  try {
    if (req.body.idZodiac && req.body.content && req.body.datetime) {
      const idZodiac = req.body.idZodiac;
      const content = req.body.content;
      const datetime = req.body.datetime;
      const message = await zodiacMessageService.handleCreateZodiacMessage(
        idZodiac,
        content,
        datetime
      );
      return res.status(200).json(message);
    } else
      return res.status(400).json({ errCode: 1, errMessage: "Thiếu tham số" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getIdZodiacMessage = async (req, res) => {
  try {
    if (req.query.idZodiac && req.query.datetime && req.query.idUser) {
      const idZodiac = req.query.idZodiac;
      const datetime = req.query.datetime;
      const idUser = req.query.idUser;
      const idZodiac_Message =
        await zodiacMessageService.handleGetIdZodiacMessage(
          idZodiac,
          datetime,
          idUser
        );
      return res.status(200).json(idZodiac_Message);
    } else
      return res.status(400).json({ errCode: 1, errMessage: "Thiếu tham số" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  getZodiacMessageByIdUser,
  getAllZodiacMessage,
  filterZodiacMessage,
  createZodiacMessage,
  getZodiacMessageDetail,
  readZodiacMessage,
  getIdZodiacMessage,
};
