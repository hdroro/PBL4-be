const db = require('../config/conectDB');

class Conversation {
    constructor(idConversation, idAcc1, idAcc2, isBlocked) {
        this.idConversation = idConversation;
        this.idAcc1 = idAcc1;
        this.idAcc2 = idAcc2;
        this.isBlocked = isBlocked;
    }

    async findConversation(idUser) {
        return new Promise((resolve, reject) => {
            var query = `SELECT *
                        FROM conversation AS c
                        INNER JOIN (
                            SELECT idConversation, MAX(timeSend) AS maxTimeSend, MAX(idMessage) as maxIDmessage
                            FROM message
                            GROUP BY idConversation
                        ) AS maxMessages
                        ON c.idConversation = maxMessages.idConversation
                        INNER JOIN message AS m ON c.idConversation = m.idConversation`;
            try {
                db.query(query, (err, results) => {
                    if(err) reject(err);
                    else if(results.length === 0){
                        return resolve(false);
                    }
                    else {
                        query += ` WHERE (c.idAcc1 = ? OR c.idAcc2 = ?)
                                        AND m.timeSend = maxMessages.maxTimeSend AND m.idMessage = maxMessages.maxIDmessage
                                        ORDER BY maxMessages.maxTimeSend DESC`;
                        db.query(query,[idUser, idUser], (err, results) => {
                            if(err) reject(err);
                            else if(results.length === 0){
                                console.log(11111111);
                                return resolve(false)
                            }
                            else {
                                console.log("kkkkkkkkkkkkkkkkkkk " + idUser);
                                results.map((item) => {
                                    console.log("item.idAcc2 " + item.idAcc2);
                                    if(item.idAcc2 == idUser) {
                                        console.log("kkkkkkkk");
                                        item.direct === 0 ? item.direct = 1 : item.direct = 0;
                                    }
                                })
        
                                console.log("results " + results);
                                return resolve(results);
                            }
                        })
                    }
                })
            } catch (error) {
                console.log(err);
            }
        })
    }

    async saveConversation(){
        return new Promise((resolve, reject) => {
                var query = `INSERT INTO conversation ( idAcc1, idAcc2, isBlocked) VALUES (?, ?, ?)`;
                db.query(query, [this.idAcc1, this.idAcc2, 0], (insertErr, insertResults) => {
                    if (insertErr) {
                        return reject(insertErr);
                    }
                    return resolve(insertResults.insertId);
                });
        })
    }

    async blockConversation(idConversation){
        return new Promise((resolve, reject) => {
            var query = `UPDATE conversation SET isBlocked = ${true} where idConversation =${idConversation}`;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
                
            });
        })
    }

    async deleteConversation(idConversation){
        return new Promise((resolve, reject) => {
            var query = `UPDATE conversation SET isDelete = ${true} where idConversation =${idConversation}`;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
                
            });
        })
    }

    async updateBlockStatusConversation(idConversation){
        return new Promise((resolve, reject) => {
            var query = `UPDATE conversation SET isBlocked = ${false} where idConversation =${idConversation}`;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
                
            });
        })
    }

    async getConversationByID(idConversation){
        return new Promise((resolve, reject) => {
            var query = `select * from conversation where idConversation =${idConversation}`;
                db.query(query, (err, results) => {
                    return resolve(results);
                });
        })
    }

    
    async findUserChat(){
        return new Promise((resolve, reject) => {
            var query = `SELECT * FROM conversation WHERE idAcc2 = ?`;
            try {
                db.query(query, [this.idAcc2], (err, results) => {
                    if(err) reject(err);
                    else if(results.length === 0){
                        return resolve(false);
                    }
                    else return resolve(results);
                })
            } catch (error) {
                console.log(err);
            }
        })
    }

}

module.exports = Conversation;
