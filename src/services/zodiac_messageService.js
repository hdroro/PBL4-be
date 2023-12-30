const zodiacMessage = require("../models/zodiac_message");
const account = require("../models/account");
const noti_zodiac = require("../models/noti_zodiac");
const MyDate = require("../models/mydate");

async function handleGetZodiacMessageByIdUser(idUser, page) {
  try {
    const noti_zodiacModel = new noti_zodiac();
    var listMessage = await noti_zodiacModel.getZodiacMessageByIdUser(idUser);
    if (page != 0) {
      const perPage = 3;
      var lastPage = Math.ceil(listMessage.length / perPage);
      if (lastPage === 0) lastPage = 1;
      const pageNumber = parseInt(page) || 1;
      if (pageNumber < 1 || pageNumber > lastPage)
        throw {
          errCode: 3,
          errMessage: "Page number not correct",
        };
      const start = (pageNumber - 1) * perPage;
      const end = pageNumber * perPage;
      const prev = pageNumber === 1 ? false : pageNumber - 1;
      const next = pageNumber === lastPage ? false : pageNumber + 1;
      if (listMessage.length != 0) {
        listMessage = Array.from(listMessage).slice(start, end);
        listMessage?.forEach((user) => {
          var time = new MyDate(user.timePost.toString());
          user.timePost =
            time.toMyLocaleDateString() + " " + time.toLocaleTimeString();
        });
        return {
          errCode: 0,
          errMessage: "OK",
          listMessage: listMessage,
          prev: prev,
          next: next,
          lastPage: lastPage,
        };
      }
    } else {
      return {
        errCode: 0,
        errMessage: "OK",
        listMessage: listMessage,
      };
    }
  } catch (err) {
    throw err;
  }
}

async function handleReadZodiacMessage(id) {
  try {
    const noti_zodiacModel = new noti_zodiac();
    await noti_zodiacModel.readZodiacMessage(id);
    return {
      errCode: 0,
      errMessage: "OK",
    };
  } catch (err) {
    throw err;
  }
}

async function handleGetZodiacMessageById(id) {
  try {
    const zodiac_messageModel = new zodiacMessage();
    const message = await zodiac_messageModel.getZodiacMessageById(id);
    return {
      errCode: 0,
      errMessage: "OK",
      message: message,
    };
  } catch (err) {
    throw err;
  }
}

async function handleFilterZodiacMessage(timeFrom, timeTo, page) {
  try {
    const zodiac_messageModel = new zodiacMessage();
    var listMessage = await zodiac_messageModel.filterZodiacMessage(
      timeFrom,
      timeTo
    );
    const perPage = 5;
    var lastPage = Math.ceil(listMessage.length / perPage);
    if (lastPage === 0) lastPage = 1;
    const pageNumber = parseInt(page) || 1;
    if (pageNumber < 1 || pageNumber > lastPage)
      throw {
        errCode: 3,
        errMessage: "Page number not correct",
      };
    const start = (pageNumber - 1) * perPage;
    const end = pageNumber * perPage;
    const prev = pageNumber === 1 ? false : pageNumber - 1;
    const next = pageNumber === lastPage ? false : pageNumber + 1;
    if (listMessage.length != 0) {
      listMessage = Array.from(listMessage).slice(start, end);
      listMessage?.forEach((user) => {
        var time = new MyDate(user.timePost.toString());
        user.timePost =
          time.toMyLocaleDateString() + " " + time.toLocaleTimeString();
      });
      return {
        errCode: 0,
        errMessage: "OK",
        listMessage: listMessage,
        prev: prev,
        next: next,
        lastPage: lastPage,
      };
    }
  } catch (err) {
    throw err;
  }
}

async function getAllZodiacMessage(page) {
  try {
    const zodiac_messageModel = new zodiacMessage();
    var listMessage = await zodiac_messageModel.getAllZodiacMessage();
    const perPage = 15;
    var lastPage = Math.ceil(listMessage.length / perPage);
    if (lastPage === 0) lastPage = 1;
    const pageNumber = parseInt(page) || 1;
    if (pageNumber < 1 || pageNumber > lastPage)
      throw {
        errCode: 3,
        errMessage: "Page number not correct",
      };
    const start = (pageNumber - 1) * perPage;
    const end = pageNumber * perPage;
    const prev = pageNumber === 1 ? false : pageNumber - 1;
    const next = pageNumber === lastPage ? false : pageNumber + 1;
    listMessage = Array.from(listMessage).slice(start, end);
    listMessage.forEach((user) => {
      var time = new MyDate(user.timePost.toString());
      user.timePost =
        time.toMyLocaleDateString() + " " + time.toLocaleTimeString();
    });
    return {
      errCode: 0,
      errMessage: "OK",
      listMessage: listMessage,
      prev: prev,
      next: next,
      lastPage: lastPage,
    };
  } catch (err) {
    throw err;
  }
}

async function handleCreateZodiacMessage(idZodiac, content, time_change) {
  try {
    const zodiac_messageModel = new zodiacMessage(
      null,
      idZodiac,
      content,
      time_change
    );
    const id = await zodiac_messageModel.createZodiacMessage();
    const listUser = await new account().getListUserByIdZodiac(idZodiac);
    if (listUser.length > 0) {
      var condition = "";
      listUser.forEach((user) => {
        condition += `(${id},${user.idUser},0),`;
      });
      condition = condition.slice(0, condition.length - 1);
      await new noti_zodiac().createNoti(condition);
    }
    return {
      errCode: 0,
      errMessage: "OK",
    };
  } catch (err) {
    throw err;
  }
}

async function handleGetIdZodiacMessage(idZodiac, timePost, idUser) {
  try {
    const idNoti = await new zodiacMessage().getIdZodiacMessage(
      idZodiac,
      timePost,
      idUser
    );
    return {
      errCode: 0,
      errMessage: "OK",
      idNoti: idNoti,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  handleGetZodiacMessageByIdUser,
  handleReadZodiacMessage,
  handleGetZodiacMessageById,
  handleFilterZodiacMessage,
  getAllZodiacMessage,
  handleCreateZodiacMessage,
  handleGetIdZodiacMessage,
};
