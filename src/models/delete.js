const db = require('../config/conectDB');

class Block {
    constructor(idDelete, idDeleted, idConversation) {
        this.idDelete = idDelete;
        this.idDeleted = idDeleted;
        this.idConversation = idConversation;
    }

    async addInfoDelete(idDelete, idDeleted, idConversation) {
        return new Promise((resolve, reject) => {
            const query = `insert into delete (idDelete, idDeleted, idConversation) values (${idDelete}, ${idDeleted}, ${idConversation}) `;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }

    async getInfoDelete(idConversation) {
        return new Promise((resolve, reject) => {
            const query = `select * from delete where idConversation = ${idConversation}`;
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