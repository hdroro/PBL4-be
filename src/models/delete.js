const db = require('../config/conectDB');

class Delete {
    constructor(idDelete, idDeleted, idConversation) {
        this.idDelete = idDelete;
        this.idDeleted = idDeleted;
        this.idConversation = idConversation;
    }

    async checkExist(idDelete, idDeleted){
        return new Promise((resolve, reject) => {
            const query = `select * from deleted where idDelete=${idDelete} and idDeleted = ${idDeleted}`;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results.length);
            });
        })
    }

    async addInfoDelete(idDelete, idDeleted, idConversation) {
        if(await this.checkExist(idDelete, idDeleted) > 0) return;
        else return new Promise((resolve, reject) => {
            const query = `INSERT INTO deleted (idDelete, idDeleted, idConversation) VALUES (${idDelete}, ${idDeleted}, ${idConversation})`;
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
            const query = `select idDelete, idDeleted from deleted where idConversation = ${idConversation}`;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }

    async getIdConversationInDeleted(){
        return new Promise((resolve, reject) => {
            const query = `select idConversation from deleted`;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }

    async deleteInfoDelete(idDelete, idDeleted){
        return new Promise((resolve, reject) => {
            const query = `delete from deleted where idDelete = ${idDelete} and idDeleted = ${idDeleted}`;
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }
}

module.exports = Delete;