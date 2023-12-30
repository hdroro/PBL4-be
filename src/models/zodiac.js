const db = require("../config/conectDB");

class Zodiac {
  constructor(
    idZodiac,
    nameZodiac,
    dateStart,
    monthStart,
    dateEnd,
    monthEnd,
    srcImgae
  ) {
    this.idZodiac = idZodiac;
    this.nameZodiac = nameZodiac;
    this.dateStart = dateStart;
    this.monthStart = monthStart;
    this.dateEnd = dateEnd;
    this.monthEnd = monthEnd;
    this.srcImgae = srcImgae;
  }

  async getListZodiac() {
    return new Promise((resolve, reject) => {
      const query = `select * from zodiac`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  async getZodiacById(id) {
    return new Promise((resolve, reject) => {
      const query = `select * from zodiac where idZodiac=${id}`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length === 0) reject(err);
        return resolve(results[0]);
      });
    });
  }

  async getIdZodiac(date, month) {
    return new Promise((resolve, reject) => {
      const query = `select idZodiac from zodiac where (dateStart <= ${date} and monthStart = ${month}) or (dateEnd >= ${date} and monthEnd = ${month})`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0].idZodiac);
      });
    });
  }

  async getAvatarByID(idZodiac) {
    console.log("idZodiac " + idZodiac);
    return new Promise((resolve, reject) => {
      const query = `select srcImage from zodiac where idZodiac = ${idZodiac}`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0].srcImage);
      });
    });
  }
}

module.exports = Zodiac;
