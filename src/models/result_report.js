const { resolve } = require('path');
const db = require('../config/conectDB');
const { rejects } = require('assert');
const { error } = require('console');

class ResultReport {
    constructor(idResultReport, idPost, statusResult, timeResolve) {
        this.idResultReport = idResultReport
        this.idPost = idPost;
        this.statusResult = statusResult;
        this.timeResolve = timeResolve;
    }

    async checkReport(idPost){
        return new Promise((resolve,reject)=>{
            const query = `select * from result_report where idPost = ${idPost} and statusResult = 1`;
            db.query(query, (err,results)=>{
                if (err) return reject({
                    errCode: 2,
                    errMessage: "Xuat hien loi",
                });
                else if (results.length == 1) return reject({
                    errCode: 3,
                    errMessage: "Post này đã vi phạm và bị xóa",
                })
                else return resolve();
            })
        })
    }
    async denyReport(idPost,timeResolve){
        return new Promise((resolve,reject)=>{
            const query = `insert into result_report (idPost,statusResult,timeResolve) values (${idPost},0,'${timeResolve}')`;
            db.query(query, (err)=>{
                if (err) return reject({
                    errCode: 2,
                    errMessage: "Xuat hien loi trong denyReport",
                });
                else return resolve();
            })
        })
    }

    async acceptReport(idPost,timeResolve){
        return new Promise((resolve,reject)=>{
            const query = `insert into result_report (idPost,statusResult,timeResolve) values (${idPost},1,'${timeResolve}')`;
            db.query(query, (err,results)=>{
                if (err) return reject({
                    errCode: 2,
                    errMessage: "Xuat hien loi",
                });
                else return resolve();
            })
        })
    }

    async createReport(idPost,idUser,content,time){
        return new Promise((resolve,reject)=>{
            const query = `insert into report (idPost,idUser,contentReport,timeReport) values (${idPost},${idUser},'${content}','${time}')`;
            db.query(query, (err)=>{
                if (err) return reject({
                    errCode: 2,
                    errMessage: "Xuat hien loi",
                });
                else return resolve({
                    errCode: 0,
                    errMessage: "OK",
                });
            })
        })
    }

}

module.exports = ResultReport;