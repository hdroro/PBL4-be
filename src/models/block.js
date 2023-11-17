const db = require('../config/conectDB');

class Block {
    constructor(idBlock, idBlocked, idConversation) {
        this.idBlock = idBlock;
        this.idBlocked=idBlocked;
        this.idConversation = idConversation;
    }

    async checkExist(idBlock, idBlocked){
        return new Promise((resolve, reject) => {
            const query = `select * from block where idBlock=${idBlock} and idBlocked = ${idBlocked}`;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results.length);
            });
        })
    }
    async addInfoBlock(idBlock, idBlocked,idConversation ) {
        if(await this.checkExist(idBlock, idBlocked) > 0) return;
        return new Promise((resolve, reject) => {
            const query = `insert into block (idBlock, idBlocked, idConversation) values (${idBlock}, ${idBlocked}, ${idConversation}) `;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }

    async deleteBlock(idBlock, idConversation ) {
        return new Promise((resolve, reject) => {
            const query = `delete from block where idBlock = ${idBlock} and idConversation = ${idConversation}`;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }

    async getInfoBlock(idConversation) {
        return new Promise((resolve, reject) => {
            const query = `select * from block where idConversation = ${idConversation}`;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }
}

module.exports = Block;