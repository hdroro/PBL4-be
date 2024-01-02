const { resolve } = require("path");
const db = require("../config/conectDB");
const { rejects } = require("assert");
const { error } = require("console");

class zodiacMessage {
  constructor(idZodiacMessage, idZodiac, content, timePost) {
    this.idZodiacMessage = idZodiacMessage;
    this.idZodiac = idZodiac;
    this.content = content;
    this.timePost = timePost;
  }

  async getAllZodiacMessage() {
    return new Promise((resolve, reject) => {
      const query = `select msg.idZodiac_Message, msg.idZodiac, msg.content, msg.timePost, zd.nameZodiac 
                            from zodiac_message as msg join zodiac as zd on msg.idZodiac = zd.idZodiac 
                            order by msg.timePost desc`;
      db.query(query, (err, results) => {
        if (err)
          reject({
            errCode: 2,
            errMessage: "Xuat hien loi",
          });
        else resolve(results);
      });
    });
  }
  async getZodiacMessageById(id) {
    return new Promise((resolve, reject) => {
      const query = `
            select msg.idZodiac_Message, msg.idZodiac, msg.content, msg.timePost, zd.nameZodiac 
            from zodiac_message as msg join zodiac as zd on msg.idZodiac = zd.idZodiac 
            where msg.idZodiac_Message = ${id}`;
      db.query(query, (err, results) => {
        if (err)
          reject({
            errCode: 2,
            errMessage: "Xuat hien loi",
          });
        else if (results.length == 0)
          reject({
            errCode: 3,
            errMessage: "Message khong ton tai",
          });
        resolve(results[0]);
      });
    });
  }

  async filterZodiacMessage(timeFrom, timeTo) {
    console.log("timeFrom", timeFrom);
    console.log("timeTo", timeTo);
    return new Promise((resolve, reject) => {
      const query = `
      select msg.idZodiac_Message, msg.idZodiac, msg.content, msg.timePost, zd.nameZodiac 
      from zodiac_message as msg join zodiac as zd on msg.idZodiac = zd.idZodiac 
      where msg.timePost >= "${timeFrom}" and msg.timePost <= "${timeTo}"
      order by msg.timePost desc`;
      console.log("query", query);
      db.query(query, (err, results) => {
        if (err)
          reject({
            errCode: 2,
            errMessage: "Xuat hien loi",
          });
        else if (results.length == 0)
          resolve({
            errCode: 3,
            errMessage: "Message khong ton tai",
          });
        resolve(results);
      });
    });
  }

  async createZodiacMessage() {
    return new Promise((resolve, reject) => {
      const query = `insert into zodiac_message (idZodiac, content, timePost) values (${this.idZodiac},'${this.content}','${this.timePost}')`;
      db.query(query, (err, result) => {
        if (err)
          reject({
            errCode: 2,
            errMessage: "Xuat hien loi",
          });
        else resolve(result.insertId);
      });
    });
  }

  async getIdZodiacMessage(idZodiac, timePost, idUser) {
    return new Promise((resolve, reject) => {
      const query = `select notiz.idNoti from zodiac_message as zm inner join notification_zodiac as notiz ON zm.idZodiac_Message = notiz.idZodiacMessage and idUser = ${idUser} and idZodiac=${idZodiac} and timePost="${timePost}"`;
      console.log("query", query);
      db.query(query, (err, result) => {
        if (err)
          reject({
            errCode: 2,
            errMessage: "Xuat hien loi",
          });
        else resolve(result[0].idNoti);
      });
    });
  }
}

module.exports = zodiacMessage;
