const { resolve } = require("path");
const db = require("../config/conectDB");
const { rejects } = require("assert");
const { error } = require("console");

class noti_zodiac {
  constructor(idZodiacMessage, idUser) {
    this.idZodiacMessage = idZodiacMessage;
    this.idUser = idUser;
  }

  //For user
  async getZodiacMessageByIdUser(idUser) {
    return new Promise((resolve, reject) => {
      const query = `
        select noti.idNoti, noti.isRead, msg.idZodiac_Message, msg.idZodiac, msg.content, msg.timePost, zd.nameZodiac, user.timeRegister from notification_zodiac as noti 
        join zodiac_message as msg on noti.idZodiacMessage = msg.idZodiac_Message 
        join zodiac as zd on zd.idZodiac = msg.idZodiac
        join user on user.idUser = noti.idUser
        where noti.idUser = ${idUser} and msg.timePost >= user.timeRegister
        order by msg.timePost desc`;
      db.query(query, (err, results) => {
        if (err)
          return reject({
            errCode: 2,
            errMessage: "Xuat hien loi",
          });
        else return resolve(results);
      });
    });
  }

  async getZodiacMessageByIdNoti(idNoti) {
    return new Promise((resolve, reject) => {
      const query = `
      select zodiac.nameZodiac, zm.content, zm.timePost from notification_zodiac as noti join zodiac_message as zm on noti.idZodiacMessage = zm.idZodiac_Message 
      join zodiac on zodiac.idZodiac = zm.idZodiac
      where noti.idNoti=${idNoti}`;
      db.query(query, (err, results) => {
        if (err)
          return reject({
            errCode: 2,
            errMessage: "Xuat hien loi",
          });
        else return resolve(results);
      });
    });
  }

  //For user
  async readZodiacMessage(id) {
    return new Promise((resolve, reject) => {
      const query = `update notification_zodiac set isRead = 1 where idNoti = ${id}`;
      console.log(query);
      db.query(query, (err) => {
        if (err)
          return reject({
            errCode: 2,
            errMessage: "Xuat hien loi",
          });
        else return resolve();
      });
    });
  }

  //For admin
  async createNoti(condition) {
    return new Promise((resolve, reject) => {
      const query = `insert into notification_zodiac (idZodiacMessage,idUser,isRead) values ${condition}`;
      console.log(query);
      db.query(query, (err) => {
        if (err)
          return reject({
            errCode: 2,
            errMessage: "Xuat hien loi",
          });
        else return resolve();
      });
    });
  }
}

module.exports = noti_zodiac;
