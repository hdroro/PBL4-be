const { resolve } = require("path");
const db = require("../config/conectDB");
const { rejects } = require("assert");
const { error } = require("console");

class Report {
  constructor(idReport, idPost, idUser, contentReport, timeReport) {
    this.idReport = idReport;
    this.idPost = idPost;
    this.idUser = idUser;
    this.contentReport = contentReport;
    this.timeReport = timeReport;
  }

  async getAllReport() {
    return new Promise((resolve, reject) => {
      const query = `
            select p.idPost,p.idAccPost,p.content,rs.wn from post as p,
            ((select idPost,count(distinct idUser) as wn 
            from report
            where idPost not in 
            (select distinct idPost from result_report)
            group by idPost
            having count(distinct idUser) >= 3)
            union
            (select rp.idPost, count(distinct rp.idUser) as wn 
            from report as rp join result_report as rs on rp.idPost = rs.idPost 
            where rs.statusResult = 0 and rp.timeReport >= rs.timeResolve
            group by rp.idPost
            having count(distinct rp.idUser) >= 3)) as rs
            where p.idPost = rs.idPost and p.isDelete = 0`;
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

  async addReport(idPost, idUser, contentReport, timeReport) {
    return new Promise((resolve, reject) => {
      const query = `insert into report (idPost, idUser, contentReport, timeReport) values (${idPost}, ${idUser}, "${contentReport}", "${timeReport}")`;
      console.log(query);
      db.query(query, (err, results) => {
        if (err)
          return reject({
            errCode: 2,
            errMessage: "Xuat hien loi",
          });
        else return resolve(results.insertId);
      });
    });
  }
}

module.exports = Report;
