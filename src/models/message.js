const db = require('../config/conectDB');

class Conversation {
    constructor(idMessage, direct, messageText, timeSend, idConversation) {
        this.idMessage = idMessage;
        this.direct = direct;
        this.messageText = messageText;
        this.timeSend = timeSend;
        this.idConversation = idConversation;
    }

    async loadMessages(idUser) {
        console.log("loadMessages " + idUser);
        return new Promise((resolve, reject) => {
            var query = `
                SELECT *
                FROM conversation AS c
                INNER JOIN message AS m ON c.idConversation = m.idConversation
                WHERE m.idConversation = ?
                ORDER BY m.timeSend DESC`;
    
            try {
                db.query(query, [this.idConversation], async (err, results) => {
                    if (err) {
                        reject(err);
                    } else if (results.length === 0) {
                        resolve([]);
                    } else {
                        console.log(results);
                        const mappedResults = results.map(item => {
                            console.log("idAcc2 " + item.idAcc2);
                            if (item.idAcc2 == idUser && item.direct === 0) {
                                console.log("olaaaaaaaaaaaa");
                                item.direct = 0;
                            } else if(item.idAcc2 == idUser && item.direct === 1){
                                item.direct = 1;
                            }
                            else if(item.idAcc1 == idUser && item.direct === 1){
                                item.direct = 0;
                            }
                            else if(item.idAcc1 == idUser && item.direct === 0){
                                item.direct = 1;
                            }
                            return item;
                        });
                        console.log("chillll");
    
                        resolve(mappedResults);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }


    async getAccByidConversation(idConversation){
        return new Promise((resolve, reject) => {
            var query = `SELECT * from conversation where idConversation = ?`;
            db.query(query, [idConversation], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
    })
    }
    

    async saveMessage(){
        return new Promise((resolve, reject) => {
                var query = `INSERT INTO message (direct, messageText, timeSend, idConversation) VALUES (?, ?, ?, ?)`;
                db.query(query, [this.direct, this.messageText, this.timeSend, this.idConversation], (insertErr, insertResults) => {
                    if (insertErr) {
                        return reject(insertErr);
                    }
                    return resolve(insertResults.insertId);
                });
        })
    }

}

module.exports = Conversation;
