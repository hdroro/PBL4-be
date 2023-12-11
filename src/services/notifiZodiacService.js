const noti_zodiac = require("../models/noti_zodiac");

async function handleGetNotiZodiacMessageDetail(id) {
  try {
    const noti_zodiacModel = new noti_zodiac();
    const notiZodiac = await noti_zodiacModel.getZodiacMessageByIdNoti(id);
    return {
      errCode: 0,
      errMessage: "OK",
      noti_zodiac: notiZodiac,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  handleGetNotiZodiacMessageDetail,
};
