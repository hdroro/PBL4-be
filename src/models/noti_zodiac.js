const { resolve } = require('path');
const db = require('../config/conectDB');
const { rejects } = require('assert');
const { error } = require('console');

class noti_zodiac {
    constructor(idZodiacMessage, idUser) {
        this.idZodiacMessage = idZodiacMessage
        this.idUser = idUser;
    }

    //For user
    async getZodiacMessageByIdUser(idUser){
        return new Promise((resolve,reject)=>{
            const query = `
            select *
            from notification_zodiac as noti 
            join zodiac_message as msg on noti.idZodiacMessage = msg.idZodiac_Message 
            join zodiac as zd on zd.idZodiac = msg.idZodiac
            where noti.idUser = ${idUser}
            order by msg.timePost desc`;
            db.query(query, (err,results)=>{
                if (err) return reject({
                    errCode: 2,
                    errMessage: "Xuat hien loi",
                });
                else return resolve(results);
            })
        })
    }

    //For user
    async readZodiacMessage(id){
        return new Promise((resolve,reject)=>{
            const query = `update notification_zodiac set isRead = 1 where idNoti = ${id}`;
            console.log(query);
            db.query(query, (err)=>{
                if (err) return reject({
                    errCode: 2,
                    errMessage: "Xuat hien loi",
                });
                else return resolve();
            })
        })
    }

    //For admin
    async createNoti(condition){
        return new Promise((resolve,reject)=>{
            const query = `insert into notification_zodiac (idZodiacMessage,idUser,isRead) values ${condition}`;
            console.log(query);
            db.query(query, (err)=>{
                if (err) return reject({
                    errCode: 2,
                    errMessage: "Xuat hien loi",
                });
                else return resolve();
            })
        })
    }

}

module.exports = noti_zodiac;