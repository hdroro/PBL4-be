import notifiZodiacService from "../services/notifiZodiacService";

const handleGetZodiacMessageDetail = async (req, res) => {
  try {
    if (req.query.idNoti) {
      const idNoti = req.query.idNoti;
      const notiDetail =
        await notifiZodiacService.handleGetNotiZodiacMessageDetail(idNoti);
      return res.status(200).json(notiDetail);
    } else
      return res.status(400).json({ errCode: 3, errMessage: "Thiếu tham số" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { handleGetZodiacMessageDetail };
